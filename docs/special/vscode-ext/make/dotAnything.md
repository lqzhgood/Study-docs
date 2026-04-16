# 从零到一：Dot Anything 开发手记

## 起因

写代码时有一个反复出现的小别扭：脑子里想的是"把 `name` 打印出来"，手上的操作却是先输 `clg`，等 snippet 弹出来，展开成 `console.log()`，再把光标挪进括号，输入 `name`。一行代码，思维被打断了两次。

传统 snippet 的逻辑是"先选模板，再填内容"，但人的思维是反过来的——先想到 `name`，再想到要 log 它。这个顺序差异很微妙，但日积月累就变成了一种隐隐的不爽。

某天突然想到：如果直接输入 `name.log`，让编辑器自己把它变成 `console.log('name:', name)` 呢？先写脑中蹦出来的词，再按 `.` 告诉编辑器"怎么用它"。

```
name.log  →  console.log('name:', name);
```

不是"选模板 → 填空"，而是"先写你想的 → 按 `.` 转换"。顺序调换一下，编码体验截然不同。这就是 **Dot Anything** 的起点。

---

## 功能是怎么一层层长出来的

这些功能不是一开始规划好的，是用着用着发现"这里少了点什么"，然后加上去的。

### 基础转换（v1.0）

最核心的需求就一句话：输入 `word.trigger`，替换成一段模板文本。

```json
{
    "trigger": "log",
    "snippet": "console.log('#word#:', #word#);"
}
```

输入 `myVar.log` → 得到 `console.log('myVar:', myVar);`

### 格式化后缀（v1.1）

光原封不动替换 `word` 远远不够。经常需要对变量做大小写转换、命名风格切换——`HelloWorld` 在 log 标签里想显示成 `hello-world` 怎么办？

模板里写 `#word^toKebabCase#`，`^` 后面接转换函数名。内置了 9 个常用的格式化函数：`toLowerCase`、`toUpperCase`、`toCamelCase`、`toSnakeCase`、`toKebabCase`、`toPascalCase`……

```
HelloWorld.log → console.log('hello-world:', HelloWorld);
```

这一步做完，模板的表达力一下子上来了。

### 光标占位符（v1.2）

模板展开后，如果还需要在某些位置手动填内容呢？比如一个 React Hook 模板：

```
const [✏️, set✏️] = useState(✏️);
```

用户需要依次在三个位置输入内容，而且第二个位置的值应该是第一个的首字母大写版本。这就需要类似 VS Code 原生 snippet 的 Tab 跳转系统，还得支持离开时自动转换格式。

这是整个项目里最折腾的功能，后面单独展开。

### 替换范围（v1.3）

默认只替换 `word` 部分。但有时候想替换整行（加注释前缀），甚至整个文件（生成模板文件）。加了 `replaceMode`：`word` / `line` / `file` 三种模式。

### 自定义正则匹配（v1.4）

默认用 `(\S+)$` 匹配 `.` 前面的非空白字符。但如果只想匹配数字？或者想同时捕获两个词？

```json
{
    "trigger": "px",
    "pattern": "(\\d+)$",
    "snippet": "#word#px"
}
```

`16.px` → `16px`（只有数字才触发）

甚至可以设 `pattern: ""`，实现"无 word 触发"——只要按 `.`，就直接用整行内容做模板。

---

## 和 VS Code API 打交道

做 VS Code 扩展，本质上是在它给的 API 框架里腾挪。有些地方给得很到位，有些地方就得自己想办法。

### `CompletionItemProvider`

整个扩展的基石。注册一个补全提供器，指定 `.` 和 `。` 作为触发字符：

```typescript
vscode.languages.registerCompletionItemProvider(
    '*', // 对所有语言生效
    {
        provideCompletionItems(document, position) {
            // 用户输入 . 时触发
            // 检查光标前的文本，匹配规则，返回补全项
        },
    },
    '.',
    '。', // 触发字符（中文句号兼容）
);
```

`document` + `position` 两个参数能推导出几乎所有上下文：当前行文本、文件路径、语言类型、行号、列号、工作区路径——这就是环境变量系统的数据来源。

每个 `CompletionItem` 有几个属性需要精心配合：

- **`insertText`**：补全后插入的文本（或 `SnippetString`）
- **`range`**：要替换的文本范围（从 `word` 起始到 `.` 后面）
- **`filterText`**：设为 `word.trigger`，保证用户继续输入 trigger 时能正确过滤
- **`sortText`**：用规则的添加顺序，保证配置里写在前面的规则排前面

### `CompletionItem.command`

容易被忽视但极其重要的 API。每个补全项可以附带一个 command，在用户接受补全后自动执行：

```typescript
item.command = {
    command: 'dot-anything._startSnippetSession',
    title: '',
    arguments: [parsed],
};
```

光标占位符的追踪会话就靠它启动。为什么不在 `provideCompletionItems` 里处理？因为那时文本还没插入，不知道最终的光标位置。`command` 在插入完成后执行，时机刚好。

### `additionalTextEdits` 与 `range` 的坑

做 `replaceMode: 'line'` 时踩了个印象深刻的坑。

直觉做法是把 `CompletionItem.range` 设成整行范围。结果补全列表直接乱了——VS Code 用 `range` 内的文本做前缀匹配，范围太大就匹配不上，补全项根本不显示。

折腾了一阵才找到正确做法：`range` 只覆盖 `word.trigger` 部分（保证过滤正常），其余文本用 `additionalTextEdits` 删除：

```typescript
if (replaceMode === 'line') {
    const fullRange = document.lineAt(position.line).range;
    const edits: vscode.TextEdit[] = [];
    // 删除 word 前面的内容
    if (fullRange.start.isBefore(wordRange.start)) {
        edits.push(
            vscode.TextEdit.delete(
                new vscode.Range(fullRange.start, wordRange.start),
            ),
        );
    }
    // 删除光标后面的内容
    if (position.isBefore(fullRange.end)) {
        edits.push(
            vscode.TextEdit.delete(new vscode.Range(position, fullRange.end)),
        );
    }
    item.additionalTextEdits = edits;
}
```

一个字段解决不了的问题，两个字段组合着来。这个 bug 拖到 v1.3.2 才修好，之前一直没意识到根因在 `range` 上。

### `SnippetString` 的能力边界

VS Code 的 `SnippetString` 支持 `${1:default}` 的制表位语法，按 Tab 跳转，同编号制表位同步编辑：

```typescript
item.insertText = new vscode.SnippetString(
    'const [${1:name}, set${1:name}] = useState(${2:null});',
);
```

但 **VS Code 不提供任何 API 让你知道用户何时离开一个制表位，也没有在离开时修改内容的回调**。光标占位符的核心功能——"离开时应用 modifier 转换"——在 API 层面完全没有支持。

---

## 光标占位符：API 不给，自己造

这是整个项目里技术含量最高的部分。

想做的效果是这样的：

```
模板: const [#✏️1^toLowerCase-state#, set#✏️1^toPascalCase-State#] = useState(#✏️2-initial#);
展开: const [${1:state}^toLowerCase, set${1:State}^toPascalCase] = useState(${2:initial});

用户在 $1 输入 "myValue"，按 Tab 跳到 $2 时：
→ const [myvalue, setMyValue] = useState(${2:initial});
```

同索引不同 modifier——VS Code 原生 snippet 中根本不存在的概念。

### 用事件监听模拟 Tab Stop 生命周期

既然 API 不给，就自己造。思路是维护一个全局会话状态，通过事件监听推断用户的占位符操作：

```typescript
interface SnippetSession {
    documentUri: string; // 文档标识
    insertOffset: number; // snippet 插入的起始位置
    placeholders: PlaceholderRange[]; // 每个占位符的位置信息
    currentIndex: number; // 当前所在的制表位索引
}
```

需要监听三类事件：

1. **`onDidChangeTextDocument`** —— 用户在占位符中打字，更新所有占位符的偏移量
2. **`onDidChangeTextEditorSelection`** —— 光标位置变了，判断是否从一个占位符跳到了另一个（模拟"Tab Stop 离开"）
3. **`onDidChangeActiveTextEditor`** —— 切了编辑器标签页，结束会话

### 偏移量同步

这是最难调的部分。

想象一下：snippet 中有三个占位符，用户在第一个里多打了 3 个字符。后面两个占位符的位置都要往后移 3。如果第一和第二个是同索引的（VS Code 会同步编辑），移位逻辑更复杂——每个占位符都会各自触发独立的 `contentChange` 事件，不能把 delta 重复累加。

反复调试后，摸索出三种情况要分别处理：

```typescript
export function updatePlaceholderOffsets(
    delta: number,
    changeOffset: number,
): void {
    // 先找到变化发生在哪个占位符内
    let changedPlaceholderIndex: number | null = null;
    for (const placeholder of activeSession.placeholders) {
        const start = activeSession.insertOffset + placeholder.startOffset;
        const end = activeSession.insertOffset + placeholder.endOffset;
        if (changeOffset >= start && changeOffset <= end) {
            changedPlaceholderIndex = placeholder.index;
            break;
        }
    }

    for (const placeholder of activeSession.placeholders) {
        const start = activeSession.insertOffset + placeholder.startOffset;
        const end = activeSession.insertOffset + placeholder.endOffset;

        if (changeOffset >= start && changeOffset <= end) {
            // 情况1：变化在占位符内部 → 只调整 endOffset
            placeholder.endOffset += delta;
        } else if (
            changedPlaceholderIndex !== null &&
            placeholder.index === changedPlaceholderIndex &&
            start > changeOffset
        ) {
            // 情况2：同索引的后续占位符 → 整体位移
            // VS Code 同步编辑了它们的内容，各自有独立的 contentChange 事件
            placeholder.startOffset += delta;
            placeholder.endOffset += delta;
        } else if (changeOffset < start) {
            // 情况3：变化在占位符之前 → 整体位移
            placeholder.startOffset += delta;
            placeholder.endOffset += delta;
        }
    }
}
```

情况 2 最微妙。VS Code 自动同步编辑同索引制表位时，每个占位符的 `contentChange` 是独立事件。最初没区分这种情况，对同索引占位符的 `endOffset` 做了多余的 delta 累加，导致偏移错乱。这个 bug 到 v1.4.2 才发现。

### 模拟"离开占位符"事件

通过 `onDidChangeTextEditorSelection` 跟踪光标位置变化，核心判断是"光标是否从一个占位符跳到了另一个"：

```typescript
export async function handleSelectionChange(editor, selection): Promise<void> {
    const offset = editor.document.offsetAt(selection.active);
    const currentPlaceholder = findPlaceholderAtOffset(activeSession, offset);

    if (lastPlaceholderIndex !== currentPlaceholder?.index) {
        // 对上一个占位符的所有实例应用 modifier
        const edits = collectPlaceholderEdits(editor, lastPlaceholderIndex);
        if (edits.length > 0) {
            const totalDelta = await applyEdits(editor, edits);
            // ⚠️ await 之后 session 可能已被其他事件清除
            if (!activeSession) return;
            if (totalDelta !== 0) {
                updatePlaceholderOffsetsAfter(totalDelta, firstEditStart);
            }
        }

        // 离开了所有占位符 → 结束会话
        if (currentPlaceholder === null) {
            endSnippetSession();
            return;
        }
    }

    lastPlaceholderIndex = currentPlaceholder?.index ?? null;
}
```

这里有个 async 竞态问题。`applyEdits` 要调 `editor.edit()`，是异步的。`await` 期间用户可能做了别的操作，触发其他事件把 session 清掉了。所以每个 `await` 后面都得检查 `if (!activeSession) return;`。第一次遇到这个问题时，表现是偶发的"在不存在的位置做编辑"异常，排查了好一阵才意识到是竞态。

### 占位符语法设计

最终定的语法：`#✏️<index>^<modifier>-<comment>#`

- `#✏️1-name#` → 索引 1，默认值 "name"，无 modifier
- `#✏️1^toUpperCase-NAME#` → 索引 1，默认值 "NAME"，离开时应用 toUpperCase
- `#✏️2^toCamelCase-value#` → 索引 2，默认值 "value"，离开时转驼峰

解析器将它转成 VS Code snippet 格式 `${1:name}^toUpperCase`，`^toUpperCase` 显示在选区外面作为视觉提示，用户能看到但编辑不到。

为什么选 `✏️` 做标记？因为它不会和正常代码冲突，在 JSON 配置里一眼就能认出"这里是可编辑位置"。

---

## 其他设计决策

### `new Function()` 执行用户代码

用户在 JSON 配置里写的 function 规则是一个箭头函数字符串。怎么把字符串变成可执行函数？

```typescript
r.fn = new Function(`return (${r.snippetStr})`)();
```

先用 `new Function` 创建一个返回箭头函数的包装函数，立即执行拿到箭头函数本身。好处是函数在规则加载时一次编译，后续调用无开销。

同样的手法也用于用户自定义格式化函数（`dot-anything.fns`）：

```json
{
    "name": "addPrefix",
    "fn": "(s='', { fns }) => `use${fns.toPascalCase(s)}`"
}
```

自定义函数能访问所有内置函数，同名时覆盖内置的——可扩展性拉满。

### ConfigCache 与 Disposable 代理

每次触发补全都去读配置、编译正则、编译函数，太浪费了。`ConfigCache` 做了三级缓存（rules、quickRules、fns），只在 `dot-anything.rules` 或 `dot-anything.fns` 配置变更时清除。补全触发时 `getRules()` 就是一个 `null` 检查加直接返回。

配置变更时不仅要清缓存，还要重新注册 `CompletionItemProvider`——旧的 provider 闭包里可能持有过期引用。但每次变更都往 `context.subscriptions` 里 push 新的 disposable 会导致内存膨胀。解决办法是用一个代理：

```typescript
let disposable = registerProvider();
// subscriptions 里始终只有一个代理对象
context.subscriptions.push({ dispose: () => disposable.dispose() });

// 配置变更时，替换内部引用
disposable.dispose();
disposable = registerProvider();
```

### 中文句号兼容

注册触发字符时加了 `。`。中文输入法下 `.` 会变成 `。`，不做兼容的话每次都得切输入法。小事，但自己用着舒服。

---

## 性能优化

补全列表是实时弹出的，`provideCompletionItems` 慢了几十毫秒用户就能感觉到卡。

### 替换引擎：从暴力循环到单次正则

v1.0 的模板替换非常朴素——双层循环暴力 `replaceAll`：

```typescript
// v1.0：外层遍历 12 个环境变量 key，内层遍历 10 个格式化函数
// 每一轮对 snippet 字符串做一次 replaceAll
return Object.entries(envVars).reduce((pre, [key, value]) => {
    return quickRules.reduce((iPre, { makeKey, makeValue }) => {
        return iPre.replaceAll(makeKey(key), makeValue(value));
    }, pre);
}, snippetStr);
```

**一条规则 120 次字符串扫描**。20 条规则就是 2400 次 `replaceAll`，而且字符串不可变，每次都产生新对象。

v1.1.5 加了短路优化——snippet 中不包含 `#key^` 就跳过该 key 的格式化函数遍历：

```typescript
for (const [key, value] of Object.entries(envVars)) {
    result = result.replaceAll(`#${key}#`, value);

    // snippet 中没有 #key^，跳过所有格式化函数
    if (!result.includes(`#${key}^`)) {
        continue;
    }

    for (const { makeKey, makeValue } of quickRules) {
        result = result.replaceAll(makeKey(key), makeValue(value, { fns }));
    }
}
```

大部分 snippet 只用一两个 key 的一两种格式，这一步 `includes` 检查就能砍掉 90% 的无效循环，效果立竿见影。

但本质思路没变，还是在"所有 key × 所有函数"的空间里剪枝。到 v1.4.0 彻底换了做法——单次正则扫描：

```typescript
const PLACEHOLDER_PATTERN = /#([^#^]+?)(?:\^([^#]+))?#/g;

result = rule.snippetStr.replace(PLACEHOLDER_PATTERN, (orig, key, format) => {
    const rawValue = envMap[key];
    if (rawValue === undefined) return orig;
    if (!format) return rawValue;
    const fn = fns[format];
    return fn ? fn(rawValue, { fns }) : orig;
});
```

一次正则遍历，遇到 `#key#` 或 `#key^format#` 就地查表替换。不管多少环境变量和格式函数，**snippet 字符串只被走一遍**。O(K × N × L) → O(L)。代码也从嵌套循环变成一个 `replace` 调用——更快，也更好读。

### 编译前置

v1.0 每次触发补全都要现场干准备工作：读配置、拼接多行 snippet、`new Function` 编译函数字符串——这些结果在配置不变时完全一样，却每次重复。

引入 `ConfigCache` 后全部前置到规则加载阶段：

```typescript
getRules(): InnerRule[] {
    if (!this.rules) {
        for (const v of this.getConfig<Rule[]>('rules', [])) {
            const patternRegex = new RegExp(v.pattern ?? '(\\S+)$');  // 编译正则
            const snippetStr = Array.isArray(v.snippet)               // 拼接 snippet
                ? v.snippet.join('\n') : v.snippet;

            if (r.type === 'function') {
                r.fn = new Function(`return (${r.snippetStr})`)();    // 编译函数
            }
            parsed.push(r);
        }
        this.rules = parsed;
    }
    return this.rules;  // 后续直接返回
}
```

只在配置变更时重新编译。补全触发时 `getRules()` 和 `getFns()` 接近零开销。

### 正则预编译

格式化函数内部的正则字面量，每次调用都会创建新的 `RegExp` 对象。提升到模块级常量后复用：

```typescript
// 优化前：每次调用 toKebabCase 都创建三个新 RegExp
export function toKebabCase(str = '') {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase()
        .replace(/^-+|-+$/g, '');
}

// 优化后：模块加载时创建一次
const CAMEL_BOUNDARY = /([a-z])([A-Z])/g;
const WHITESPACE_UNDERSCORE = /[\s_]+/g;
const LEADING_TRAILING_HYPHEN = /^-+|-+$/g;

export function toKebabCase(str = '') {
    return str
        .replace(CAMEL_BOUNDARY, '$1-$2')
        .replace(WHITESPACE_UNDERSCORE, '-')
        .toLowerCase()
        .replace(LEADING_TRAILING_HYPHEN, '');
}
```

9 个格式化函数共享 7 个预编译正则。单次节省微不足道，但补全场景中这些函数可能被大量调用（多条规则 × 多个占位符 × 数组元素逐个格式化），积少成多。

同样思路也用在 `lib.ts` 的占位符匹配正则和数组索引正则上：

```typescript
const PLACEHOLDER_PATTERN = /#([^#^]+?)(?:\^([^#]+))?#/g;
const DOT_INDEX_PATTERN = /^(.+?)\.(\d+)$/;
```

### 工厂函数消除重复代码

v1.0 中 9 个格式化函数的 QuickRule 定义全是手写对象字面量，高度重复。用工厂函数消除：

```typescript
// 优化前：9 段几乎一样的代码
{ name: 'toLowerCase', makeKey: (k) => '#' + k + '^toLowerCase#', makeValue: toLowerCase },
{ name: 'toUpperCase', makeKey: (k) => '#' + k + '^toUpperCase#', makeValue: toUpperCase },
// ... 重复 9 次

// 优化后
function createQuickRule(name: string, makeValue: Function): QuickRule {
    return { name, makeKey: (k) => `#${k}^${name}#`, makeValue };
}

export const baseQuickRules: QuickRule[] = [
    createQuickRule('toLowerCase', toLowerCase),
    createQuickRule('toUpperCase', toUpperCase),
    // ...
];
```

不算运行时优化，但减少了打包体积，新增格式化函数也从"抄 8 行模板"变成"加一行调用"。

### 打包瘦身

`.vscodeignore` 排除开发配置、TypeScript 源码、sourcemap、测试文件，VSIX 包只保留 `dist/extension.js`、`package.json`、README 和图片。扩展安装后加载更快。

---

## 几个记忆深刻的 bug

**lineText 中的幽灵 dot**（v1.3.2）。`lineText` 环境变量应该是"去掉触发 `.` 后的整行文本"。但早期实现只处理了行尾的 dot，当 dot 在行中间时（`obj.prop.trigger`），那个 `.` 会残留。修复方式是精确地在光标位置做拼接：

```typescript
lineText: lineText.slice(0, position.character - 1) +
    lineText.slice(position.character);
```

**fileType 的 schema 类型不匹配**（v1.4.2）。`package.json` 里 `fileType` 的 JSON Schema 只写了 `"type": "array"`，但代码实际支持 `string | string[]`。用户写 `"fileType": "javascript"` 时 VS Code 会弹配置警告。看着无关痛痒，但用户的第一反应是"是不是我写错了"——体验很差。

**同索引占位符偏移不同步**（v1.4.2）。前面详细说过了。VS Code 同步编辑同索引制表位时触发多个独立 `contentChange` 事件，最初没区分"内部变化"和"同索引位移"，导致偏移计算错乱。

这几个 bug 有个共同特点：简单场景下不会触发，只有特定条件组合下才暴露。snippet 扩展的麻烦之处就在于状态空间大、边界条件多，很多问题是用了一段时间后才发现的。

---

## 上架

构建用 esbuild。对纯 Node 的 VS Code 扩展来说比 webpack 快很多，配置也短：

```javascript
esbuild.build({
    entryPoints: ['src/extension.ts'],
    bundle: true,
    outfile: 'dist/extension.js',
    external: ['vscode'],
    format: 'cjs',
    platform: 'node',
    minify: production,
    sourcemap: !production,
});
```

测试走另一条路——`tsc` 编译到 `out/`，由 `@vscode/test-cli` 在真实 VS Code 实例中运行。构建和测试两条管线互不干扰。

发布到 Marketplace 需要先在 Azure DevOps 建组织、拿 Personal Access Token。第一次走这套流程有点绕——微软的账号体系从来不以简洁著称——但配好后就是 `npx @vscode/vsce publish` 一条命令。

`package.json` 里几个影响上架体验的字段：

```json
{
    "publisher": "lqzh",
    "icon": "public/logo_128.png",
    "galleryBanner": { "color": "#0D1117", "theme": "dark" },
    "categories": ["Snippets", "Formatters"],
    "keywords": ["Snippets", "Formatters", "convert", "transform", "template"],
    "pricing": "Free"
}
```

`categories` 和 `keywords` 决定搜索可见性，`icon` 是 128×128 PNG，`galleryBanner` 控制 Marketplace 页面顶部颜色。后来加了 GitHub Actions 自动发布，推 tag 就触发构建和发版。

---

## 回头看

**`vscode.d.ts` 比官方文档更有用。** 很多 API 行为细节（比如 `range` 会影响补全过滤）只在类型定义的 JSDoc 注释里才提到。文档讲"这个 API 能做什么"，类型注释才说"它会怎么做"。

**API 不支持不等于做不了。** 光标占位符系统是整个项目里最复杂的部分，VS Code 没有任何直接支持。但三个事件监听组合起来，配上一套偏移量状态管理，就能模拟出制表位的完整生命周期。不完美，有边界条件要处理，有 async 竞态要防，但它 work。关键是想清楚状态模型。

**自己用自己的东西很重要。** 几乎每个版本的新功能都是自己用着用着发现"少了点什么"——`replaceMode` 来自想快速加注释前缀，`pattern` 来自想只匹配数字做 px 转换。凭空想功能，大概率想不到这些。

**先跑起来，再慢慢好起来。** v1.0 的替换引擎是暴力双层循环，难看但能用。先发出去，后面再改成正则引擎。如果一开始就追求"最优解"，可能到现在还在设计。

---

`name.log`，回车，继续写下一行。
