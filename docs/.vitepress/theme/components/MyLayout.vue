<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import { useData } from 'vitepress';
import { useAttrs, ref } from 'vue';

const { Layout } = DefaultTheme;

const { frontmatter } = useData();
</script>

<template>
    <Layout :class="frontmatter.layoutClass" v-bind="$attrs">
        <template #aside-outline-before></template>
    </Layout>
</template>
