<template>
    <v-card class="card" :class="{ mobile }">
        <template v-slot:prepend>
            <div class="iconWrap">
                <v-img :src="getUrl(icon)" :width="24" class="icon" />
            </div>
        </template>
        <template v-slot:title>
            <div class="title">{{ title }}</div>
        </template>

        <v-card-text class="pb-0">
            <div class="desc">{{ desc }}</div>
        </v-card-text>
        <v-card-actions dense>
            <v-spacer></v-spacer>

            <v-btn
                color="medium-emphasis"
                size="xs-small"
                v-for="c in items"
                :key="c.title"
                :href="c.link"
                target="_blank"
            >
                <v-img
                    :src="getUrl(c.icon)"
                    :width="24"
                    :height="24"
                    referrerpolicy="no-referrer"
                >
                    <template v-slot:error>
                        <v-btn
                            color="medium-emphasis"
                            icon="mdi-open-in-new"
                            size="xs-small"
                        ></v-btn>
                    </template>
                </v-img>
                <v-tooltip activator="parent" location="bottom">
                    {{ c.title }}
                </v-tooltip>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { NavItem } from '../utils';
import { withBase } from 'vitepress';
const { mobile } = useDisplay();

const { icon, title, desc, tag, link, items = [] } = defineProps<NavItem>();

if (link) {
    items.push({
        title: title,
        icon: icon,
        link: link,
    });
}

function getUrl(link: string) {
    return link.startsWith('/') ? withBase(link) : link;
}
</script>

<style lang="sass" scoped>
.card
    background: var(--vp-c-bg-soft)
    display: flex
    flex-direction: column
    height: 100%
    border-radius: 16px
    border: 1px solid var(--vp-c-divider)
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)
    &:hover
        transform: translateY(-4px)
        box-shadow: var(--vp-shadow-2)
        border-color: var(--vp-c-brand-soft)
    .iconWrap
        width: 40px
        height: 40px
        background: var(--vp-c-brand-soft)
        border-radius: 12px
        display: inline-flex
        align-items: center
        justify-content: center
        .icon
            flex: 0 0 auto
    .title
        font-size: 16px
        font-weight: 600
    .desc
        font-size: 12px
        color: var(--vp-c-text-2)
        flex: 1 1 auto
.card.mobile
    .title
        font-size: 14px

.extend-card
    position: absolute
    width: 100%
</style>
