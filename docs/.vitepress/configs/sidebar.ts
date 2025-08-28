import type { DefaultTheme } from 'vitepress';

export const sidebar: DefaultTheme.Config['sidebar'] = {
    '/fe/': [
        {
            text: 'JavaScript',
            items: [{ text: '数据类型', link: '/fe/javascript/2' }],
        },
        {
            text: 'HTML ',
            items: [{ text: '元素相关', link: '/fe/html/elm' }],
        },
    ],
    '/special/': [
        {
            text: 'Vscode 插件开发',
            items: [
                {
                    text: 'HelloWorld',
                    link: '/special/vscode-ext/hello-world',
                },
                {
                    text: '初步认识',
                    link: '/special/vscode-ext/begin',
                },
            ],
        },
    ],
    '/demo/': [
        {
            text: 'api-examples',
            link: '/demo/api-examples',
        },
        {
            text: 'markdown-examples',
            link: '/demo/markdown-examples',
        },
    ],
};
