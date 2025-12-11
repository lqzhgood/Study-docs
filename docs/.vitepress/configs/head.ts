import { withBase, type HeadConfig } from 'vitepress';

// const isDevelopment = process.env.NODE_ENV === 'development';

export const head: HeadConfig[] = [
    ['link', { rel: 'icon', href: withBase('/favicon.ico') }],
];
