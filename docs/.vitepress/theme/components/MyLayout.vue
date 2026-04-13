<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import { useData } from 'vitepress';
import { useTheme } from 'vuetify';
import { watch, onMounted } from 'vue';

const { Layout } = DefaultTheme;

const { frontmatter, isDark } = useData();
const vTheme = useTheme();

// 同步 VitePress 的暗色状态到 Vuetify
const syncTheme = () => {
    vTheme.global.name.value = isDark.value ? 'dark' : 'light';
};

onMounted(syncTheme);
watch(isDark, syncTheme);
</script>

<template>
    <Layout :class="frontmatter.layoutClass" v-bind="$attrs">
        <template #aside-outline-before></template>
    </Layout>
</template>
