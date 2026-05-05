<style lang="scss" scoped>
.left {
    padding: 0;
    float: left;
    position: absolute;
    left: 24px;
    top: 50%;
    transform: translateY(-50%);
}

.right {
    padding: 0;
    float: right;
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
}

ul {
    & > li {
        float: right;
        list-style: none;
        padding-left: 8px;
        padding-right: 8px;

        &:first-child {
            padding-left: 8px;
            padding-right: 0;
        }

        &:last-child {
            padding-left: 0;
            padding-right: 8px;
        }

        & > a {
            text-decoration: none;
            color: rgba(255, 255, 255, .55);

            &:hover {
                color: rgba(255, 255, 255, .75);
            }
        }
    }
}
</style>

<template>
    <footer ref="footer" class="text-white fixed bottom-0 left-0 right-0 h-[56px] bg-[#202225]">
        <div>
            <div class="relative block lg:hidden h-[56px]">
                <span class="absolute left-6 top-1/2 transform -translate-y-1/2">Copyright © 2022{{ date }} {{$constants.main.botName}}</span>
                <ul class="absolute right-6 top-1/2 transform -translate-y-1/2 space-x-2">
                    <li>
                        <a href="/about/cookies"
                           class="text-[rgba(255,255,255,.55)] hover:text-[rgba(255,255,255,.75)]">Cookies Policy</a>
                    </li>
                    <li>
                        <a href="/about/termsOfService" class="text-[rgba(255,255,255,.55)] hover:text-[rgba(255,255,255,.75)]">Terms
                        of Service</a></li>
                    <li><a href="/about/privacy"
                           class="text-[rgba(255,255,255,.55)] hover:text-[rgba(255,255,255,.75)]">Privacy Policy</a>
                    </li>
                </ul>
            </div>
            <div class="relative hidden lg:block h-[56px]">
                <span class="absolute inset-x-0 top-1/2 transform -translate-y-1/2 text-center">Copyright © 2022{{
                        date
                    }} {{$constants.main.botName}}</span>
                <ul class="absolute right-6 top-1/2 transform -translate-y-1/2 space-x-2">
                    <li><a href="/about/cookies"
                           class="text-[rgba(255,255,255,.55)] hover:text-[rgba(255,255,255,.75)]">Cookies Policy</a>
                    </li>
                    <li><a href="/about/termsOfService"
                           class="text-[rgba(255,255,255,.55)] hover:text-[rgba(255,255,255,.75)]">Terms of Service</a>
                    </li>
                    <li><a href="/about/privacy"
                           class="text-[rgba(255,255,255,.55)] hover:text-[rgba(255,255,255,.75)]">Privacy Policy</a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script setup>
const { $constants } = useNuxtApp();

const dayjs = useDayjs();
let date;
getDate();

function getDate() {
    let year = dayjs().year();
    date = year === 2022 ? "" : "-" + year;
}
</script>
