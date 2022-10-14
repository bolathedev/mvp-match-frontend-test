<template>
    <div class="layout">
        <!-- create side bar -->
        <div class="layout-sidebar">

            <img src="../assets/logo.svg" alt="">

            <div class="layout-sidebar__links">
                <div class="layout-sidebar__links-link">
                    <img class="layout-sidebar__link-icon" src="../assets/route1.svg" alt="">
                </div>
                <div class="layout-sidebar__links-link">
                    <img class="layout-sidebar__link-icon" src="../assets/route2.svg" alt="">
                </div>
                <div class="layout-sidebar__links-link">
                    <img class="layout-sidebar__link-icon" src="../assets/route3.svg" alt="">
                </div>
                <router-link to="/dashboard/reports" class="layout-sidebar__links-link">
                    <img class="layout-sidebar__link-icon" src="../assets/route4.svg" alt="">
                </router-link>
                <div class="layout-sidebar__links-link">
                    <img class="layout-sidebar__link-icon" src="../assets/route5.svg" alt="">
                </div>
            </div>
        </div>

        <!-- create main content -->
        <section class="layout-content">
            <!-- create top navbar -->
            <div class="layout-content__topnav">
                <p class="layout-content__topnav-title">
                    <img src="../assets/horizontal-menu.svg" alt="">
                </p>
                <div class="layout-content__topnav-user">
                    <c-avatar color="white">JD</c-avatar>
                    <p> John Doe </p>
                </div>
            </div>
            <router-view class="layout-content__view"></router-view>
        </section>
    </div>
</template>

<script lang="js">
export default {
    name: "dashboard-layout",
    mounted() {
        this.$store.dispatch("fetchProjects");
    }
}
</script>

<style lang="scss">
.layout {
    display: flex;

    &-sidebar {
        background: #FFFFFF;
        padding: 24px 24px 81px 32px;
        gap: 24px;
        position: sticky;
        top: 0;
        width: 100px;
        height: 70vh;
        display: block;

        img:first-child(1) {
            border-bottom: 1px solid #E5E5E5;
        }

        &__links {
            margin: 93px 0 0;

            &-link {
                display: flex;
                align-items: self-end;
                justify-content: flex-start;
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 21px;
                letter-spacing: -0.02em;
                color: black;
                margin-bottom: 24px;
                padding: 12px 0;
                cursor: pointer;

                &:hover {
                    color: #7c78d3;
                }
            }

        }
    }

    &-content {
        width: 100%;

        &__topnav {
            display: flex;
            justify-content: space-between;
            padding: 2%;
            position: sticky;
            top: 0;
            z-index: 999;
            border-bottom: 1px solid #F3F6F9;
            background: white;

            &-user {
                font-family: 'Roboto';
                display: flex;
                align-items: baseline;

                p {
                    margin-left: 12px
                }
            }
        }

        &__view {
            height: auto;
            overflow: scroll;

        }
    }
}

// style active link
.router-link-active {}
</style>