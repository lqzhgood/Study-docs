<template>
    <div>
        <div class="search">
            <v-text-field
                clearable
                label="搜索"
                prepend-inner-icon="mdi-keyboard-outline"
                v-model="keyword"
            ></v-text-field>
        </div>

        <div v-for="v in filterNavList" class="navPage" :class="{ mobile }">
            <h2 tabindex="-1">{{ v.title }}</h2>
            <div class="wrap">
                <MyCard
                    v-for="vv in v.items"
                    :key="vv.title"
                    :icon="vv.icon"
                    :title="vv.title"
                    :desc="vv.desc"
                    :link="vv.link"
                    :items="vv.items"
                />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { computed, ref } from 'vue';

import MyCard from './components/MyCard.vue';
import { NAV_LIST } from './data';
import { filterNavItem } from './utils';

const { mobile } = useDisplay();

const keyword = ref('');

const filterNavList = computed(() => {
    return NAV_LIST.map(v => {
        const lv1Arr = v.items
            .map(vv => {
                const items =
                    vv.items?.filter(vvv => {
                        return filterNavItem(keyword.value, vvv);
                    }) || [];
                return {
                    ...vv,
                    items,
                };
            })
            .filter(vv => {
                const show = filterNavItem(keyword.value, vv);
                return show || vv.items?.length > 0;
            });

        return {
            ...v,
            items: lv1Arr,
        };
    });
});

console.log('filterNavList', filterNavList);
</script>

<style src="./index.sass"></style>
<style lang="sass" scoped>
.search
    padding-top: 50px
.wrap
    display: grid
    gap: 24px
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))
</style>
