import { NavCategory } from './type';

export const NAV_LIST: NavCategory[] = [
    {
        title: '前端工具',
        items: [
            {
                icon: 'https://caniuse.com/img/favicon-128.png',
                title: 'Can I use',
                desc: '前端 API 兼容性查询',
                link: 'https://caniuse.com',
            },
            {
                icon: 'https://npm.devtool.tech/logo.svg',
                title: 'npm 库在线执行',
                desc: '在浏览器控制台中在线运行调试与测试 npm 中的库',
                link: 'https://npm.devtool.tech',
            },
            {
                icon: 'https://transform.tools/static/favicon.png',
                title: 'transform',
                desc: '一个支持多语言的在线转换器',
                link: 'https://transform.tools/json-schema-to-typescript',
            },
            {
                icon: 'https://play.vuejs.org/logo.svg',
                title: 'Vue Playground',
                desc: 'vue 在线编译解析',
                link: 'https://play.vuejs.org/',
            },
            {
                icon: 'https://play.vuejs.org/logo.svg',
                title: 'React Playground',
                desc: 'Vue 编译产物',
                link: 'https://play.vuejs.org/',
            },
            {
                icon: 'https://esm.sh/favicon.svg',
                title: 'Esm Playground',
                desc: 'Esm 在线编译解析',
                link: 'https://esm.sh/',
            },
            {
                icon: 'https://esm.sh/favicon.svg',
                title: 'Esm Playground',
                desc: '在线代码平台',
                link: 'https://jsfiddle.net/',
                // https://codesandbox.io/
                // https://stackblitz.com/
                // https://playcode.io/react
            },
        ],
    },
    {
        title: 'Web 工具',
        items: [
            {
                icon: 'http://lqzhgood.github.io/tools/watermark/waves.svg',
                title: '图片水印',
                desc: '在线生成图片水印',
                link: 'http://lqzhgood.github.io/tools/watermark',
                tag: '原创',
            },
            {
                icon: 'http://lqzhgood.github.io/tools/watermark/waves.svg',
                title: 'PhotoShop',
                desc: '全功能在线 Ps',
                link: 'https://ps.pic.net/',
            },
        ],
    },
];
