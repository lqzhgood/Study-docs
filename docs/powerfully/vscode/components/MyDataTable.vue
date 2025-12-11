<template>
    <v-data-table
        hide-default-header
        hide-default-footer
        :headers="headers"
        :items="items"
        density="compact"
    >
        <template v-slot:item.name="{ value, item }">
            <v-btn
                class="text-none"
                prepend-icon="mdi-link-variant"
                :href="value"
                variant="text"
                target="_blank"
            >
                {{ item.name }}
            </v-btn>
        </template>
        <template v-slot:item.desc="{ value }">
            <div style="white-space: pre-wrap">{{ value }}</div>
        </template>
        <template v-slot:item.img="{ value }">
            <v-menu open-on-hover open-delay="0" location="end">
                <template v-slot:activator="{ props }">
                    <a :href="value" target="_blank" v-bind="props">
                        <img :src="value" class="img" />
                    </a>
                </template>

                <v-card max-width="500">
                    <img :src="value" />
                </v-card>
            </v-menu>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">
const { items, headers } = defineProps({
    headers: Array,
    items: Array,
});
</script>

<style scoped lang="sass">
.img
    width: 50px
    box-sizing: content-box
    padding-right: 10px
</style>
