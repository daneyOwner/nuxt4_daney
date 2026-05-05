<template>
    <div id="sidebar">
        <div>
            <slot name="side-menu"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "side-menu",
}
</script>

<style scoped>
.sidebar-closed {
    width: 250px;
}

.sidebar-open {
    width: 250px;
}

#sidebar {
    flex-shrink: 0;
    height: 100vh;
    width: 250px;
    position: sticky;
    z-index: 1029;
    top: 0;
    left: 0;
    overflow-x: hidden; /* Disable horizontal scroll */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}

@media (max-width: 991px) {
    #sidebar {
        width: 0;
    }

    .sidebar-closed {
        width: 0 !important;
    }

    .sidebar-open {
        width: 250px !important;
    }
}
</style>