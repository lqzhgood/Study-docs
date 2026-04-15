import { type HeadConfig } from 'vitepress';

// const isDevelopment = process.env.NODE_ENV === 'development';

export const head: HeadConfig[] = [
    // 随机主题：首次进入页面时随机选择一套配色，同步执行避免闪烁
    [
        'script',
        {},
        `(function(){var t=['sage','lavender','blue','amber'];document.documentElement.dataset.theme=t[Math.floor(Math.random()*t.length)]})()`,
    ],
    ['link', { rel: 'icon', href: '/docs/favicon.ico' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
        'link',
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: '',
        },
    ],
    [
        'link',
        {
            href: 'https://fonts.googleapis.com/css2?family=LXGW+WenKai:wght@300;400;700&display=swap',
            rel: 'stylesheet',
        },
    ],
];
