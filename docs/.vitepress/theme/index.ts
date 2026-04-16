import DefaultTheme from 'vitepress/theme';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import './styles/index.sass';

import {
    VCard,
    VCardText,
    VDataTable,
    VImg,
    VAvatar,
    VIcon,
    VBtn,
    VMenu,
    VSpacer,
    VCardActions,
    VDivider,
    VExpandTransition,
    VTimeline,
    VTimelineItem,
    VList,
    VListItem,
    VTooltip,
    VTextField,
} from 'vuetify/components';
// import * as directives from 'vuetify/directives';
// import * as components from 'vuetify/components';
// const vuetify = createVuetify({ components, directives });

import { createVuetify } from 'vuetify';
import { useData, type Theme } from 'vitepress';
import MyLayout from './components/MyLayout.vue';

const vuetify = createVuetify({
    components: {
        VCard,
        VCardText,
        VImg,
        VAvatar,
        VIcon,
        VBtn,
        VSpacer,
        VCardActions,
        VDivider,
        VExpandTransition,
        VTimeline,
        VTimelineItem,
        VList,
        VListItem,
        VTooltip,
        VTextField,
        VDataTable,
        VMenu,
    },
    directives: {},
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    background: '#faf8f5',
                    surface: '#faf8f5',
                    'surface-bright': '#fdfbf8',
                    'surface-variant': '#efeae4',
                    'on-background': '#3a3632',
                    'on-surface': '#3a3632',
                    'on-surface-variant': '#8a827a',
                    primary: '#8a9a7b',
                    'on-primary': '#ffffff',
                },
            },
            dark: {
                dark: true,
                colors: {
                    background: '#1b1a18',
                    surface: '#1b1a18',
                    'surface-bright': '#26231f',
                    'surface-variant': '#221f1c',
                    'on-background': '#e8e4df',
                    'on-surface': '#e8e4df',
                    'on-surface-variant': '#a0988f',
                    primary: '#b8c8a8',
                    'on-primary': '#1b1a18',
                },
            },
        },
    },
});

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.use(vuetify);
    },
    Layout: MyLayout,
} satisfies Theme;
