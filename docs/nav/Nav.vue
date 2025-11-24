<template>
    <div v-for="v in NAV_LIST" class="navPage" :class="{ mobile }">
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
</template>
<script setup lang="ts">
import MyCard from './components/MyCard.vue';

import { NAV_LIST } from './data';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
</script>

<style src="./index.sass"></style>
<style lang="sass" scoped>
.wrap
    display: grid
    gap: 24px
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))
</style>
