import { withBase } from 'vitepress';

const headers = [
    { title: '名称', key: 'name' },
    { title: '描述', key: 'desc' },
    { title: '图片', key: 'img' },
];

export const tsTable = {
    headers,
    items: [
        {
            name: 'Prettify TypeScript',
            desc: 'hover 完整显示类型',
            img: withBase('./assets/PrettifyTypeScript.png'),
            link: 'https://marketplace.visualstudio.com/items?itemName=MylesMurphy.prettify-ts',
        },
        {
            name: 'Pretty TypeScript Errors',
            desc: '优雅错误提示',
            img: withBase('./assets/PrettyTypeScriptErrors.png'),
            link: 'https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors',
        },
    ],
};

export const editTable = {
    headers,
    items: [
        {
            name: 'Formatting Toggle',
            desc: '就是一个 自动格式化 的开关\n自己的代码自动格式化，别人的代码手动格式化',
            img: './assets/FormattingToggle.jpg',
            link: 'https://marketplace.visualstudio.com/items?itemName=tombonnike.vscode-status-bar-format-toggle',
        },
    ],
};
