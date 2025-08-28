# 初步认识

## 配置文件 Package.json

和 Chrome 插件一样， Vscode 扩展也有一个配置清单，除了描述插件的基本名称等信息外，还需要声明权限、入口文件便于插件的注册和启动，这些全部集中在 `package.json` 中。

> [!TIP] 所有字段
> https://code.visualstudio.com/api/references/extension-manifest

::: details 部分字段解释

```json
{
    // 插件的名字，应全部小写，不能有空格
    "name": "vscode-ext-xxx",
    // 插件的友好显示名称，用于显示在应用市场，支持中文
    "displayName": "VSCode插件demo",
    // 描述
    "description": "VSCode插件demo集锦",
    // 关键字，用于应用市场搜索
    "keywords": ["vscode", "plugin", "demo"],
    // 版本号
    "version": "1.0.0",
    // 发布者，如果要发布到应用市场的话，这个名字必须与发布者一致
    "publisher": "publisher",
    // 表示插件最低支持的vscode版本
    "engines": {
        "vscode": "^1.27.0"
    },
    // 插件应用市场分类，可选值： [Programming Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, SCM Providers, Other, Extension Packs, Language Packs]
    "categories": ["Other"],
    // 插件图标，至少128x128像素
    "icon": "images/icon.png",
    // 插件的主入口
    "main": "./src/extension",
    // 扩展的激活事件数组，可以被哪些事件激活扩展，后文有详细介绍
    "activationEvents": ["onCommand:extension.sayHello"],
    // 功能点配置，整个插件最重要最多的配置项
    "contributes": {},
    // 同 npm scripts
    "scripts": {
        "postinstall": "node ./node_modules/vscode/bin/install",
        "test": "node ./node_modules/vscode/bin/test"
    },
    // 开发依赖
    "devDependencies": {
        "typescript": "^2.6.1",
        "vscode": "^1.1.6",
        "eslint": "^4.11.0",
        "@types/node": "^7.0.43",
        "@types/mocha": "^2.2.42"
    },
    // 后面这几个应该不用介绍了
    "license": "SEE LICENSE IN LICENSE.txt",
    "bugs": {
        "url": "https://github.com/usename/repo/issues"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/usename/repo"
    },
    // 主页
    "homepage": "https://github.com/usename/repo/blob/master/README.md"
}
```

:::

其中有两个比较重要的字段着重说一下

### 启动时机 activationEvents

插件启动的时机，可用字段详见文档 [activation-events](https://code.visualstudio.com/api/references/activation-events)。以下列举常用字段。

::: tip
也可以将此项理解为申请的 “权限”，如果你的代码没生效，可以设置为 \* 试试。
:::

#### 启动时

设置为 \* 会在 `VsCode` 启动时同时启动插件，可以让插件立即可用，但也会让 `VsCode` 启动变慢，一般可用 `onStartupFinished` 替代，效果类似于 `window.onload`。

#### 打开某种文件时

使用此项会影响打开文件的速度。

任意文件可以设置为

```json
"activationEvents": [
    "onLanguage"
]
```

更精细化的特定语言文件

```json
"activationEvents": [
    "onLanguage:json",
    "onLanguage:markdown",
    "onLanguage:typescript"
]
```

#### 执行命令时

```
"activationEvents": [
    "onCommand:extension.sayHello"
]
```

### 功能点 contribute

此项可以声明插件的一些功能点配置，详见文档 [contribution-points](https://code.visualstudio.com/api/references/contribution-points)

::: details

```json
{
    // 插件配置项
    "configuration": {
        "type": "object",
        // 配置项标题，会显示在vscode的设置页
        "title": "vscode-plugin-demo",
        "properties": {
            // 这里我随便写了2个设置，配置你的昵称
            "vscodePluginDemo.yourName": {
                "type": "string",
                "default": "guest",
                "description": "你的名字"
            },
            // 是否在启动时显示提示
            "vscodePluginDemo.showTip": {
                "type": "boolean",
                "default": true,
                "description": "是否在每次启动时显示欢迎提示！"
            }
        }
    },
    // 命令
    "commands": [
        {
            "command": "extension.sayHello",
            "title": "Hello World"
        }
    ],
    // 快捷键绑定
    "keybindings": [
        {
            "command": "extension.sayHello",
            "key": "ctrl+f10",
            "mac": "cmd+f10",
            "when": "editorTextFocus"
        }
    ],
    // 菜单
    "menus": {
        // 编辑器右键菜单
        "editor/context": [
            {
                // 表示只有编辑器具有焦点时才会在菜单中出现
                "when": "editorFocus",
                "command": "extension.sayHello",
                // navigation是一个永远置顶的分组，后面的@6是人工进行组内排序
                "group": "navigation@6"
            },
            {
                "when": "editorFocus",
                "command": "extension.demo.getCurrentFilePath",
                "group": "navigation@5"
            },
            {
                // 只有编辑器具有焦点，并且打开的是JS文件才会出现
                "when": "editorFocus && resourceLangId == javascript",
                "command": "extension.demo.testMenuShow",
                "group": "z_commands"
            },
            {
                "command": "extension.demo.openWebview",
                "group": "navigation"
            }
        ],
        // 编辑器右上角图标，不配置图片就显示文字
        "editor/title": [
            {
                "when": "editorFocus && resourceLangId == javascript",
                "command": "extension.demo.testMenuShow",
                "group": "navigation"
            }
        ],
        // 编辑器标题右键菜单
        "editor/title/context": [
            {
                "when": "resourceLangId == javascript",
                "command": "extension.demo.testMenuShow",
                "group": "navigation"
            }
        ],
        // 资源管理器右键菜单
        "explorer/context": [
            {
                "command": "extension.demo.getCurrentFilePath",
                "group": "navigation"
            },
            {
                "command": "extension.demo.openWebview",
                "group": "navigation"
            }
        ]
    },
    // 代码片段
    "snippets": [
        {
            "language": "javascript",
            "path": "./snippets/javascript.json"
        },
        {
            "language": "html",
            "path": "./snippets/html.json"
        }
    ],
    // 自定义新的activitybar图标，也就是左侧侧边栏大的图标
    "viewsContainers": {
        "activitybar": [
            {
                "id": "tools",
                "title": "工具栏",
                "icon": "images/tools.svg"
            }
        ]
    },
    // 自定义侧边栏内view的实现
    "views": {
        // 和 viewsContainers 的id对应
        "tools": [
            {
                "id": "copy",
                "name": "复制"
            },
            {
                "id": "del",
                "name": "删除"
            }
        ]
    },
    // 图标主题
    "iconThemes": [
        {
            "id": "testIconTheme",
            "label": "测试图标主题",
            "path": "./theme/icon-theme.json"
        }
    ]
}
```

:::

## 入口文件 extension.ts

`src\extension.ts` 文件为源码的入口文件，我们会发现一共导出了两个方法

```ts
export function activate(context: vscode.ExtensionContext) {}

export function deactivate() {}
```

`activate` 会在插件启动时（`package.json -> activationEvents`）时执行 **一次**

当插件失活时会执行 `deactivate`， 若执行过程为异步，必须返回 `Promise`， 否则视为同步。

整个插件采用发布订阅模式，在 `activate` 中通过 `context.subscriptions.push` 将各种函数逻辑放入队列中注册，在对应事件触发时执行。

如：

```js
context.subscriptions.push(
    vscode.commands.registerCommand('extension.sayHello', () => {
        vscode.window.showInformationMessage(
            '您执行了extension.sayHello命令！'
        );
    })
);
```

## API & 示例

Api 除了官方文档，还可以参见类型文件 `node_modules\@types\vscode\index.d.ts` 非常细而全。

也可以参看官方 Demo [仓库](https://github.com/microsoft/vscode-extension-samples/)，几乎每个 Api 均有示例且一直在更新。 好评~ 👏
