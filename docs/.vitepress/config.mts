import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-CN',
    title: 'Study-Docs',
    description: 'Day Day Up',

    base: './',
    outDir: '../dist/',

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
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
                text: 'Demo',
                activeMatch: '^/demo',
                link: '/demo/api-examples',
            },
        ],

        sidebar: {
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
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
        ],
    },
});
