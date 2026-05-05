<style lang="scss" scoped>
@import "~/assets/scss/variables";

.navMenu {
    background-color: hsl(223, calc(var(--saturation-factor, 1) * 6.9%), 19.8%);
    height: calc(100vh - 56px);
    margin-top: 56px;
    //noinspection CssInvalidPropertyValue
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

    &:first-of-type {
        padding-top: .5rem;
    }

    & > a {
        background-color: $menu-bg;
        color: #d7d7d7;
        border-radius: 4px;
        height: 34px;
        display: flex;
        align-items: center;
        padding-right: 0;

        &.router-link-active {
            background-color: $menu-hover-bg;
            color: white;
        }
    }

    & > a:hover {
        background-color: $menu-hover-bg;
        color: white;
    }
}
</style>

<template>
    <div class="navMenu">
        <ul ref="navList" class="nav flex-column">
            <li class="nav-item px-2">
                <nuxt-link class="nav-link matchAll" to="/User">
                    Dashboard
<!--                    <span class="badge bg-secondary ms-2">Soon</span>-->
                </nuxt-link>
            </li>
            <li class="nav-item px-2">
                <nuxt-link class="nav-link" to="/User/Payments">
                    Payments
                    <!--                    <span class="badge bg-secondary ms-2">Soon</span>-->
                </nuxt-link>
            </li>
<!--            <li class="nav-item px-2">
                <span class="fw-bolder">TEST</span>
            </li>
            <li class="nav-item px-2">
                <nuxt-link class="nav-link" to="/User/PersonalData">
                    Personal Data
                    <span class="badge bg-secondary ms-2">Soon</span>
                </nuxt-link>
            </li>
            <li class="nav-item px-2">
                <nuxt-link class="nav-link" to="/User/Leveling">
                    Leveling
                </nuxt-link>
            </li>
            <li class="nav-item px-2">
                <nuxt-link class="nav-link" to="/User/Embeds">
                    Embeds
                </nuxt-link>
            </li>-->
        </ul>
    </div>
</template>

<script>
export default {
    name: "user-side-menu",
    data() {
        return {
            guildUid: null,
        }
    },
}
</script>