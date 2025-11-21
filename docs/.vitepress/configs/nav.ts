import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
    { text: 'Home', link: '/' },
    { text: '导航', link: '/nav' },
    {
        text: '前端',
        activeMatch: '^/fe',
        items: [
            {
                text: 'JavaScript',
                link: '/fe/javascript/2',
            },
            {
                text: 'HTML',
                link: '/fe/html/basic',
            },
        ],
    },
    {
        text: '专题',
        activeMatch: '^/special',
        items: [
            {
                text: 'VsCode 插件开发',
                link: '/special/vscode-ext/hello-world',
            },
        ],
    },
    {
        text: 'Demo',
        activeMatch: '^/demo',
        link: '/demo/api-examples',
    },
];
