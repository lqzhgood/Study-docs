<template>
    <v-card class="card" :class="{ mobile }">
        <template v-slot:prepend>
            <div class="iconWrap">
                <v-img :src="icon" :width="24" class="icon" />
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
                    :src="c.icon || getDefaultFavicon(c.link)"
                    :width="24"
                    :height="24"
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
const { mobile } = useDisplay();

const { icon, title, desc, tag, link, items = [] } = defineProps<NavItem>();

if (link) {
    items.push({
        title: title,
        icon: icon,
        link: link,
    });
}

function getDefaultFavicon(link: string) {
    return new URL('favicon.ico', link).toString();
}
</script>

<style lang="sass" scoped>
.card
    background: #f6f6f7
    display: flex
    flex-direction: column
    height: 100%
    .iconWrap
        width: 40px
        height: 40px
        background: #e7e8ec
        display: inline-flex
        align-items: center
        justify-content: center
        .icon
            flex: 0 0 auto
    .title
        font-size: 16px
        font-weight: 700
    .desc
        font-size: 12px
        color: rgb(103, 103, 108)
        flex: 1 1 auto
.card.mobile
    .title
        font-size: 14px

.extend-card
    position: absolute
    width: 100%
</style>
