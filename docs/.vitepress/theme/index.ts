import DefaultTheme from 'vitepress/theme';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader

import {
    VCard,
    VCardText,
    VCol,
    VImg,
    VRow,
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
} from 'vuetify/components';
// import * as directives from 'vuetify/directives';
// import * as components from 'vuetify/components';
// const vuetify = createVuetify({ components, directives });

import { createVuetify } from 'vuetify';
import { useData, type Theme } from 'vitepress';
import MyLayout from './MyLayout.vue';

const vuetify = createVuetify({
    components: {
        VCard,
        VCardText,
        VCol,
        VImg,
        VRow,
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
    },
    directives: {},
});

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.use(vuetify);
    },
    Layout: MyLayout,
} satisfies Theme;
