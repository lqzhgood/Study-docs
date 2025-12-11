import { NavCategory } from './utils';

export const NAV_LIST: NavCategory[] = [
    {
        title: '前端工具',
        items: [
            {
                icon: 'https://caniuse.com/img/favicon-128.png',
                title: 'Can I use',
                desc: 'API 兼容性查询',
                items: [
                    {
                        title: 'Nodejs',
                        icon: '/assets/icons/ie.webp',
                        link: 'https://caniuse.com',
                    },
                    {
                        title: 'Nodejs',
                        icon: 'https://nodejs.org/static/images/favicons/favicon.png',
                        link: 'https://node.green/',
                    },
                ],
            },
            {
                icon: 'https://raw.githubusercontent.com/github/explore/refs/heads/main/topics/npm/npm.png',
                title: 'npm',
                desc: '深渊凝视你，你也凝视着深渊',
                items: [
                    {
                        icon: 'https://npm.devtool.tech/logo.svg',
                        title: '在浏览器控制台中在线运行调试与测试 npm 中的库',
                        link: 'https://npm.devtool.tech',
                    },
                    {
                        icon: 'https://npmtrends.com/favicon.ico',
                        title: '对比下哪个 npm 库坑少星多',
                        link: 'https://npmtrends.com/',
                    },
                ],
            },
            {
                icon: '/assets/icons/exchange.png',
                title: '代码转换',
                desc: 'A To B， A === B',
                items: [
                    {
                        title: '代码转换',
                        icon: 'https://transform.tools/static/favicon.png',
                        link: 'https://transform.tools/json-schema-to-typescript',
                    },
                    {
                        title: 'curl 转换',
                        icon: 'https://curlconverter.com/favicon.ico',
                        link: 'https://curlconverter.com/node-axios/',
                    },
                ],
            },
            {
                icon: '/assets/icons/puzzle.png',
                title: '查看编译产物',
                desc: '我来组成头、胸、手、腿...部',
                items: [
                    {
                        title: 'Babel',
                        icon: 'https://babeljs.io/img/favicon.png',
                        link: 'https://babeljs.io/repl',
                    },
                    {
                        title: 'AST',
                        icon: 'https://astexplorer.net/favicon.png',
                        link: 'https://astexplorer.net/',
                    },
                    {
                        title: 'Ts AST',
                        icon: 'https://raw.githubusercontent.com/github/explore/refs/heads/main/topics/typescript/typescript.png',
                        link: 'https://ts-ast-viewer.com',
                    },
                    {
                        title: 'Vue',
                        icon: 'https://raw.githubusercontent.com/github/explore/main/topics/vue/vue.png',
                        link: 'https://play.vuejs.org/',
                    },
                    {
                        title: 'React',
                        icon: 'https://playground.react.dev/favicon.ico',
                        link: 'https://playground.react.dev/',
                    },
                ],
            },
            {
                icon: '/assets/icons/cmd.png',
                title: '在线代码平台',
                desc: 'run in web',
                items: [
                    {
                        title: 'jsfiddle',
                        link: 'https://jsfiddle.net/',
                        icon: 'https://jsfiddle.net/img/favicon.png',
                    },
                    {
                        title: 'codesandbox',
                        link: 'https://codesandbox.io/',
                        icon: 'https://codesandbox.io/favicon.ico',
                    },
                    {
                        title: 'stackblitz',
                        link: 'https://stackblitz.com/',
                        icon: 'https://stackblitz.com/_astro/favicon.svg',
                    },
                    {
                        title: 'playcode',
                        link: 'https://playcode.io/react',
                        icon: 'https://playcode.io/static/img/favicons/favicon@2x.png',
                    },
                ],
            },
            {
                icon: '/assets/icons/cmd.png',
                title: '拿来主义',
                desc: 'show me the code',
                items: [
                    {
                        title: '按钮',
                        link: 'https://cssbuttons.io/',
                        icon: 'https://cssbuttons.io/favicon-96x96.png',
                    },
                ],
            },
        ],
    },
    {
        title: 'Web 工具',
        items: [
            {
                icon: '/assets/icons/image-editing.png',
                title: '图片处理',
                desc: '在线图片处理工具',
                items: [
                    {
                        icon: 'http://lqzhgood.github.io/tools/watermark/waves.svg',
                        title: '在线生成图片水印',
                        link: 'http://lqzhgood.github.io/tools/watermark',
                    },
                    {
                        icon: 'https://ps.pic.net/favicon.ico',
                        title: '全功能在线 Ps',
                        link: 'https://ps.pic.net/',
                        keys: ['photoShop'],
                    },
                ],
            },
            {
                icon: '/assets/icons/check-mail.png',
                title: '信息传递',
                desc: '文字、文件、图片、表单...',
                items: [
                    {
                        icon: '/assets/icons/form.png',
                        title: '表单收集',
                        link: 'https://tally.so/',
                    },
                    {
                        icon: '/assets/icons/file.png',
                        title: '无需注册文件互传',
                        link: 'https://send.bitiful.com',
                    },
                    {
                        icon: 'https://gcore.jsdelivr.net/gh/s0urcelab/serverless-cloud-notepad@master/static/favicon.ico',
                        title: 'notepad 云笔记',
                        link: 'https://cloud-notepad.lqzh.workers.dev/',
                    },
                ],
            },
        ],
    },
    {
        title: '系统工具',
        items: [
            {
                icon: '/assets/icons/image-editing.png',
                title: 'IP相关',
                desc: 'IP',
                items: [
                    {
                        icon: 'https://ippure.com/favicon-96x96.png',
                        title: '检测IP纯净度',
                        link: 'https://ippure.com/',
                    },
                ],
            },
        ],
    },
];

// https://www.flaticon.com/search?word=file
// https://github.com/github/explore/blob/main/topics/typescript/typescript.png
