<style lang="scss" scoped>
.serverMenu {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 8px 0 0;
    height: calc(100vh - 56px);
    background-color: hsl(216, calc(1 * 7.2%), 13.5%);
    width: 72px;
    float: left;
    //noinspection CssInvalidPropertyValue
    overflow-y: overlay;

    &__listItem {
        margin-bottom: 8px;
        cursor: pointer;
        position: relative;
        display: block;

        &.disabled > div:last-child {
            filter: brightness(80%);

            & > div > i {
                filter: brightness(40%)
            }
        }

        &:hover > div:first-child {
            position: absolute;
            display: block;
            height: 20px;
            width: 8px;
            border-radius: 0 4px 4px 0;
            left: -4px;
            top: 50%;
            transform: translateY(-50%);
            background-color: hsl(0, calc(1 * 0%), 100%);
        }

        &:hover > div:last-child > img, &:hover > div:last-child > div {
            border-radius: 20%;
            -webkit-transition: .5s all;
            -moz-transition: .5s all;
            -ms-transition: .5s all;
            -o-transition: .5s all;
            transition: .5s all;
        }

        &.router-link-active > div:first-child {
            position: absolute;
            display: block;
            height: 48px;
            width: 8px;
            border-radius: 0 4px 4px 0;
            left: -4px;
            top: 50%;
            transform: translateY(-50%);
            background-color: hsl(0, calc(1 * 0%), 100%);
        }

        &.router-link-active > div:last-child > img, &.router-link-active > div:last-child > div {
            border-radius: 20%;
        }

        & > div:last-child {
            height: 48px;
            width: 48px;
            margin: 0 auto;

            & > img {
                border-radius: 50%;
            }

            & > div {
                border-radius: 50%;
                display: inline-block;
                width: 48px;
                height: 48px;
                position: relative;
                background-color: hsl(220, calc(1 * 7.7%), 22.9%);

                &:hover {
                    border-radius: 20%;
                    -webkit-transition: .5s all;
                    -moz-transition: .5s all;
                    -ms-transition: .5s all;
                    -o-transition: .5s all;
                    transition: .5s all;
                }

                & > span {
                    font-weight: 500;
                    font-size: 15px;
                    margin: 0;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: white;
                }

                & > svg {
                    margin: 0;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: white;
                }
            }
        }
    }

    &__guildSeparator {
        height: 2px;
        width: 32px;
        border-radius: 1px;
        background-color: hsla(217, calc(1 * 7.6%), 33.5%, 0.48);
        margin: 0 auto 8px auto;
    }
}

.greenButton {
    &:hover > div > div {
        background-color: hsl(139, calc(1 * 47.3%), 43.9%);
    }

    &:hover svg {
        color: white !important;
    }

    & svg {
        color: hsl(139, calc(1 * 47.3%), 43.9%) !important;
    }
}
</style>

<template>
    <div ref="serverMenu" class="serverMenu">
        <u-tooltip :popper="{ placement: 'right' }" class="block!" :text="user.name">
            <nuxt-link to="/User" class="serverMenu__listItem user">
                <div></div>
                <div>
                    <nuxt-img v-if="user" class="img-fluid" :src="user.image" alt="User icon"/>
                </div>
            </nuxt-link>
        </u-tooltip>

        <div class="serverMenu__guildSeparator"></div>

        <template v-if="finishedGuilds" v-for="guild in finishedGuilds">
            <div class="guildSeparator"></div>
            <u-tooltip :popper="{ placement: 'right' }" class="block!" :text="guild.name">
                <nuxt-link :to="`/server/${guild.id}`"
                           :class="{'router-link-active': route.fullPath.includes(`/server/${guild.id}`)}"
                           class="serverMenu__listItem">
                    <div></div>
                    <div>
                        <template v-if="getGuildIcon(guild)">
                            <nuxt-img class="img-fluid" :src="getGuildIcon(guild)" alt="Server icon"/>
                        </template>
                        <div v-else>
                            <span>{{ getGuildName(guild) }}</span>
                        </div>
                    </div>
                </nuxt-link>
            </u-tooltip>
        </template>
        <u-tooltip :popper="{ placement: 'right' }" class="block!" text="Invite Bot">
            <a href="" class="serverMenu__listItem greenButton">
                <div></div>
                <div>
                    <div>
                        <font-awesome-icon class="fa-lg" icon="fa-solid fa-plus"/>
                    </div>
                </div>
            </a>
        </u-tooltip>
        <u-tooltip :popper="{ placement: 'right' }" class="block!" text="Reload Server List">
            <a href="#" @click="resetServerData"
               class="serverMenu__listItem greenButton">
                <div></div>
                <div>
                    <div>
                        <span v-if="resetButton !== '00:00'">{{ resetButton }}</span>
                        <font-awesome-icon v-else icon="fa-solid fa-rotate-right"/>
                    </div>
                </div>
            </a>
        </u-tooltip>
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue";

const [refreshDateStorage, setRefreshDateStorage] = useLocalStorage('refreshDateStorage');
const [guildsStorage, setGuildsStorage, removeGuildsStorage] = useLocalStorage('guildsStorage');
const [tokenStorage, setTokenStorage, removeTokenStorage] = useLocalStorage('tokenStorage');

let route = useRoute();

import {useNuxtApp} from '#app';

const {data} = useAuth();
const {$getSwaggerAxiosOptions} = useNuxtApp()
import {DiscordGuildApi} from "~~/services/autogenerated/V1/api/discord-guild-api";
import axios from "axios";

let DiscordGuildService = new DiscordGuildApi($getSwaggerAxiosOptions());
const dayjs = useDayjs();

let finishedGuilds = ref([]);
let resetButton = ref("00:00");
let interval = ref(null);
let user = data.value.user;

function getGuildIcon(guild) {
    if (guild.icon) {
        return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`;
    }

    return null;
}

function hasServerManagement(guild) {
    return (guild.permissions & (8 | 32)) > 0;
}

function getGuildName(guild) {
    let output = "";

    let count = 0;
    for (const item of guild.name.split(" ")) {
        output += item[0];
        count++;
        if (count === 4) {
            break;
        }
    }

    return output.substring(0, Math.min(output.length, 4));
}

async function resetServerData() {
    let timeTillRefreshAllowed = refreshDateStorage.value;
    if (timeTillRefreshAllowed) {
        if (dayjs().isBefore(dayjs(timeTillRefreshAllowed))) {
            let dif = dayjs(timeTillRefreshAllowed).toDate().getTime() - dayjs().toDate().getTime();
            let seconds = dif / 1000;
            if (seconds > 0) {
                return;
            }
        }
    }

    if (resetButton.value && resetButton.value !== '00:00') return;
    removeGuildsStorage();
    removeTokenStorage();
    await getServerData();
}

function startTimer(duration) {
    let timer = duration, minutes, seconds;
    interval = setInterval(function () {
        minutes = parseInt(String(timer / 60), 10);
        seconds = parseInt(String(timer % 60), 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        resetButton.value = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(interval);
        }
    }, 1000);
}

async function getServerData() {
    let timeTillRefreshAllowed = refreshDateStorage;
    if (timeTillRefreshAllowed) {
        if (dayjs().isBefore(dayjs(timeTillRefreshAllowed.value))) {
            let dif = dayjs(timeTillRefreshAllowed.value).toDate().getTime() - dayjs().toDate().getTime();
            let seconds = dif / 1000;
            if (seconds > 0) {
                startTimer(seconds);
            }
        }
    }

    finishedGuilds.value = [];
    let guilds = guildsStorage.value;
    if (guilds == null || guilds === "[]") {
        let bearerToken = (await axios({
            method: 'GET',
            url: `/api/token`,
        })).data;

        let config = {
            headers: {
                'Authorization': "Bearer " + bearerToken
            }
        };

        let newGuilds = [];

        try {
            newGuilds = (await axios.get(
                'https://discord.com/api/users/@me/guilds',
                config
            )).data;
        } catch (e) {
            return;
        }

        const uniqueArray = newGuilds.reduce((acc, value) => {
            if (!acc.includes(value)) {
                acc.push(value);
            }
            return acc;
        }, []);

        let array = [];
        for (let i = 0; i < uniqueArray.length; i++) {
            array.push(uniqueArray[i].id);
        }

        let checks = (await DiscordGuildService.checks({
            request_body: array,
        })).data;

        for (let i = 0; i < uniqueArray.length; i++) {
            if (!hasServerManagement(uniqueArray[i])) continue;
            if (!checks[i]) continue;
            finishedGuilds.value.push(uniqueArray[i]);
        }

        startTimer(120);
        let date = dayjs();
        setRefreshDateStorage(date.add(120, 's').toDate());
    } else {
        finishedGuilds.value = JSON.parse(guilds);
    }

    setGuildsStorage(JSON.stringify(finishedGuilds.value));
}

onMounted(async () => {
    await getServerData();
});
</script>