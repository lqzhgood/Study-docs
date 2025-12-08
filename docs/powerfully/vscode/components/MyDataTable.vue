<template>
    <v-data-table
        hide-default-header
        hide-default-footer
        :headers="headers"
        :items="items"
        density
    >
        <template v-slot:item.img="{ value }">
            <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                    <a :href="value" target="_blank" v-bind="props">
                        <img :src="value" class="img" width="50" />
                    </a>
                </template>

                <v-card min-width="300">
                    <img :src="value" />
                </v-card>
            </v-menu>
        </template>
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
    max-height: 50px
    transition: all 0.3s ease-in-out
    // &:hover
    //     max-height: 500px
</style>
