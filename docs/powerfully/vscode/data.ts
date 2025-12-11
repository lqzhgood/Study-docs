import { withBase } from 'vitepress';

// const images = import.meta.glob<{ default: ImageMetadata }>(
//     './assets/*.{jpeg,jpg,png,gif}'
// );

const headers = [
    { title: '名称', key: 'name' },
    { title: '描述', key: 'desc' },
    { title: '图片', key: 'img' },
];

export const editTable = {
    headers,
    items: [
        {
            name: 'Formatting Toggle',
            desc: '就是一个 自动格式化 的开关\n自己的代码自动格式化，别人的代码手动格式化',
            img: new URL('./assets/FormattingToggle.jpg', import.meta.url).href,
            link: 'https://marketplace.visualstudio.com/items?itemName=tombonnike.vscode-status-bar-format-toggle',
        },
    ],
};

export const tsTable = {
    headers,
    items: [
        {
            name: 'Prettify TypeScript',
            desc: 'hover 完整显示类型',
            img: new URL('./assets/PrettifyTypeScript.png', import.meta.url)
                .href,
            link: 'https://marketplace.visualstudio.com/items?itemName=MylesMurphy.prettify-ts',
        },
        {
            name: 'Pretty TypeScript Errors',
            desc: '优雅错误提示',
            img: new URL('./assets/PrettyTypeScriptErrors.png', import.meta.url)
                .href,
            link: 'https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors',
        },
    ],
};
