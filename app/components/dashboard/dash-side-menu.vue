<style lang="scss" scoped>
@import "~/assets/scss/variables";


.navMenu {
    background-color: hsl(223, calc(var(--saturation-factor, 1) * 6.9%), 19.8%);
    height: calc(100vh - 56px);
    margin-top: 56px;
    overflow-y: overlay;

    & > ul > li {
        font-size: 14px;

        & > a {
            padding: 3px 0 4px 10px;
        }
    }
}

.navbar-toggler {
    background-color: $menu-bg;
}

.top-row {
    height: 3.5rem;
    background-color: rgba(0, 0, 0, 0.4);
}

.navbar-brand {
    font-size: 1.1rem;
}

.oi {
    width: 2rem;
    font-size: 1.1rem;
    vertical-align: text-top;
    top: -2px;
}

.nav-item {
    font-size: 0.9rem;
    padding-bottom: 0.5rem;
}

.nav-item:first-of-type {
    padding-top: .5rem;
}


.nav-item a {
    background-color: $menu-bg;
    color: #d7d7d7;
    border-radius: 4px;
    height: 34px;
    display: flex;
    align-items: center;
}

.nav-item a.router-link-active {
    background-color: $menu-hover-bg;
    color: white;
}

.nav-item a:hover {
    background-color: $menu-hover-bg;
    color: white;
}
</style>

<template>
    <div class="navMenu">
        <ul ref="navList" class="nav flex-column">
            <li class="nav-item px-2">
                <nuxt-link class="nav-link" :to="'/Server/' + guildUid + '/Dashboard'">
                    Dashboard
                </nuxt-link>
            </li>
            <li class="nav-item px-2">
                <span class="fw-bolder">Verification System</span>
            </li>
            <li class="nav-item px-2">
                <nuxt-link class="nav-link" :to="'/Server/' + guildUid + '/VerificationSetup'">
                    Verification Setup
                </nuxt-link>
            </li>
<!--            <li class="nav-item px-2">
                <nuxt-link class="nav-link" :to="'/Server/' + guildUid + '/Settings'">
                    Settings
                </nuxt-link>
            </li>
            <li class="nav-item px-2">
                <nuxt-link class="nav-link" :to="'/Server/' + guildUid + '/ModerationLogs'">
                    Moderation Logging
                </nuxt-link>
            </li>
            <li class="nav-item px-2">
                <nuxt-link class="nav-link" :to="'/Server/' + guildUid + '/Leveling'">
                    Leveling
                </nuxt-link>
            </li>
            <li class="nav-item px-2">
                <nuxt-link class="nav-link" :to="'/Server/' + guildUid + '/StickyNotes'">
                    Sticky Notes
                </nuxt-link>
            </li>-->
        </ul>
    </div>
</template>

<script>
export default {
    name: "dash-side-menu",
    data() {
        return {
            guildUid: null,
        }
    },
    watch: {
        '$route.fullPath': {
            handler: function (path, oldPath) {
                this.fullPathChanged(path);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        fullPathChanged(path) {
            path = path.replace("/Server/", "").replace("/server/", "");
            if (path.includes("/")) path = path.split("/")[0];
            this.guildUid = path;
        }
    },
    mounted() {
        this.fullPathChanged(this.$route.path);
    },
}
</script>