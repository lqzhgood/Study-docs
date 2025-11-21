<template>
    <div v-for="v in NAV_LIST">
        <h2 tabindex="-1">{{ v.title }}</h2>
        <v-row align="stretch" :dense="mobile">
            <v-col cols="12" md="3" v-for="vv in v.items">
                <!-- @click="windowOpen(vv.link)" -->
                <v-card class="fill-height card" :title="vv.title" hover>
                    <template v-slot:prepend>
                        <v-avatar rounded="0" class="icon">
                            <v-img :src="vv.icon" />
                        </v-avatar>
                    </template>
                    <template v-slot:append>
                        <v-avatar size="24">
                            <v-img
                                alt="John"
                                src="https://cdn.vuetifyjs.com/images/john.png"
                            ></v-img>
                        </v-avatar>
                    </template>

                    <v-card-text>{{ vv.desc }}</v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="teal-accent-4"
                            text="Learn More"
                            variant="text"
                            @click="reveal = true"
                        ></v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                        <v-card
                            v-if="reveal"
                            class="position-absolute w-100"
                            height="100%"
                            style="bottom: 0"
                        >
                            <v-card-text class="overflow-auto fill-height pb-0">
                                <div>
                                    <span>font-weight-bold ms-1 mb-2</span>
                                    <v-spacer tag="span" />
                                    Today
                                </div>

                                <v-list lines="two">
                                    <v-list-item
                                        v-for="n in 3"
                                        :key="n"
                                        :title="'Item ' + n"
                                        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
                                        prepend-avatar="https://transform.tools/static/favicon.png"
                                    ></v-list-item>
                                </v-list>
                            </v-card-text>

                            <v-card-actions class="pt-0">
                                <v-btn
                                    color="teal-accent-4"
                                    text="Close"
                                    variant="text"
                                    @click="reveal = false"
                                ></v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-expand-transition>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { NAV_LIST } from './data';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();

const reveal = ref(false);

const messages = [
    {
        from: 'You',
        message: `Sure, I'll see you later.`,
        time: '10:42am',
        color: 'deep-purple-lighten-1',
    },
    {
        from: 'John Doe',
        message: 'Yeah, sure. Does 1:00pm work?',
        time: '10:37am',
        color: 'green',
    },
    {
        from: 'You',
        message: 'Did you still want to grab lunch today?',
        time: '9:47am',
        color: 'deep-purple-lighten-1',
    },
];

async function windowOpen(link: string) {
    await nextTick();

    setTimeout(() => {
        window.open(link, '_blank');
    }, 300);
}
</script>

<style src="./index.sass"></style>

<style lang="sass" scoped>

.card
    background: #f6f6f7
    .icon
        background: #e7e8ec
</style>
