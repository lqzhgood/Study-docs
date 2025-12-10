# HTML 奇淫技巧

## 换行

### HTML `<pre>` 标签

```html
<pre> xxx </pre>
```

元素表示预定义格式文本。在该元素中的文本通常按照原文件中的编排，以等宽字体的形式展现出来，文本中的空白符（比如空格和换行符）都会显示出来，一般用来展现代码。

```vue preview
<template>
    <pre class="flex m-1">
            ___________________________
            < I'm an expert in my field. >
            ---------------------------
                \   ^__^
                 \  (oo)\_______
                    (__)\       )\/\
                        ||----w |
                        ||     ||
    </pre>
</template>
```

### CSS `white-space` 属性 + \n

```css
white-space: pre-line;
```

[`white-space`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space) 属性用于设置如何处理元素中的空白

::: tip
默认情况下，一个制表符等于 8 个空格，且可以使用 tab-size 属性。对于 normal、nowrap 和 pre-line 值，每个制表符都会被转化为一个空格（U+0020）字符。

**空格**和**其他空白分隔符**之间存在区别。定义如下：

空格
空格（U+0020）、制表符（U+0009）和分段符（例如换行）

其他空白分隔符
Unicode 中定义的所有其他空格分隔符（已定义为空格的分隔符除外）。

如果空白字符被挂起，那么它可能会影响框的固有尺寸的测量结果。
:::

|    属性值    | 换行符 | 空格和制表符 | 文字换行 | 行末空格 | 行末的其他空白分隔符 |
| :----------: | :----: | :----------: | :------: | :------: | :------------------: |
|    normal    |  合并  |     合并     |   换行   |   移除   |         挂起         |
|    nowrap    |  合并  |     合并     |  不换行  |   移除   |         挂起         |
|     pre      |  保留  |     保留     |  不换行  |   保留   |        不换行        |
|   pre-wrap   |  保留  |     保留     |   换行   |   挂起   |         挂起         |
|   pre-line   |  保留  |     合并     |   换行   |   移除   |         挂起         |
| break-spaces |  保留  |     保留     |   换行   |   换行   |         换行         |

### CSS(Unicode 字符) 实现换行

::: tip
在 `Unicode` 中，`0x000A` 字符是专门控制换行的。在 `CSS` 中，我们可以写为 `\A` 或 `\000A` 作为 `after` 伪元素的内容，并添加到指定元素中实现换行效果。
:::

```vue preview
<template>
    <div>
        <span class="br1">第一行 \A</span>
        <span class="br2">第二行 \n</span>
        <span class="br3">第三行 \r</span>
    </div>
</template>

<style scoped>
.br1::after {
    content: '\A';
    white-space: pre;
}
.br2::after {
    content: '\n';
    white-space: pre-wrap;
}
.br3::after {
    content: '\r';
    white-space: pre-wrap;
}
</style>
```

[使用 CSS(Unicode 字符)让 inline 水平元素换行](https://www.zhangxinxu.com/wordpress/2012/03/tip-css-multiline-display/)

## 各种空格

::: tip 三种空格实体字符

-   **`&nbsp;`** 不换行空格（No-Break Space）
    -   占据的宽度可能会受到字体样式、容器宽度、CSS 布局和其他相关因素的影响
-   **`&ensp;`** 半角空格（En Space）
    -   **占据的宽度正好是 1/2 个中文字符的宽度**
-   **`&emsp;`** 全角空格（Em Space）
    -   **占据的宽度正好是 1 个中文字符的宽度**

:::

```vue preview
<template>
    <div>
        <div>姓&emsp;&emsp;名： xxxx</div>
        <div>手&ensp;机&ensp;号： xxxx</div>
        <div>电子邮箱： xxxxxxx</div>
    </div>
</template>
```
