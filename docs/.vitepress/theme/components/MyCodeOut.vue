<template>
    <div class="code-wrap">
        <!-- <slot></slot> -->

        <v-card class="mx-auto">
            <template v-slot:title>
                <slot name="code"></slot>
            </template>

            <v-card-text class="bg-surface-light pa-4 position-relative">
                <div class="actions cursor-pointer"  @click="show = !show">
                    <span>{{ `<code>` }}</span>
                  <v-icon  :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" ></v-icon>
                </div>
                <v-expand-transition>
                    <div v-show="show" class="codes">
                        <slot name="view"></slot>
                    </div>
                </v-expand-transition>
            </v-card-text>
        </v-card>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const show = ref(false);
</script>
<style lang="sass" scoped>

.code-wrap
    margin: 16px 0

.actions
    position: absolute
    display: flex
    justify-content: space-between
    width: 100%
    padding: 8px 16px
    top: 0
    left: 0
.codes
    > :global(div)
        margin-bottom: 0 !important
</style>
