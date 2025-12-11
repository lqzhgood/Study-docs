import { basename } from 'node:path';
import { defineConfig } from 'vitepress';
import MarkdownPreview from 'vite-plugin-markdown-preview';

import { head, nav, sidebar } from './configs/';

const APP_BASE_PATH = basename(process.env.APP_BASE_PATH || '');

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-CN',
    title: 'Study-Docs',
    description: 'Day Day Up',
    head: head,

    base: APP_BASE_PATH ? `/${APP_BASE_PATH}/` : '/',
    outDir: '../dist/',

    vite: {
        plugins: [MarkdownPreview()],
    },

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav,
        sidebar,

        /* 右侧大纲配置 */
        outline: {
            level: 'deep',
            label: '目录',
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
        ],
    },
});
