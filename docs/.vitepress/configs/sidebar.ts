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
    '/powerfully/': [
        {
            text: '工具与配置',
            items: [
                {
                    text: 'VsCode',
                    link: '/powerfully/vscode/',
                },
                {
                    text: 'Vps',
                    link: '/powerfully/vps/',
                    items: [
                        {
                            text: 'DMIT 初始化',
                            link: '/powerfully/vps/',
                        },
                    ],
                },
                {
                    text: 'Nas',
                    link: '/powerfully/nas/',
                    items: [
                        {
                            text: 'OpenList',
                            link: '/powerfully/nas/OpenList/',
                            items: [
                                {
                                    text: '网盘下载',
                                    link: '/powerfully/nas/OpenList/panDownload/',
                                },
                            ],
                        },
                    ],
                },
                {
                    text: 'Openwrt',
                    link: '/powerfully/openwrt/',
                    items: [
                        {
                            text: '初始化',
                            link: '/powerfully/openwrt/init.md',
                        },
                        {
                            text: 'Zerotier',
                            link: '/powerfully/openwrt/zerotier/',
                        },
                    ],
                },
            ],
        },
    ],
    '/workflow/': [
        {
            text: 'HTML / CSS 相关',
            collapsed: false,
            items: [{ text: 'HTML 奇淫技巧', link: '/workflow/html/tricks' }],
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
