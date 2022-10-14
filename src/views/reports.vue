<template>
    <div class="reports">
        <section class="reports-top">
            <div class="reports-top__title">
                <p>Reports</p>
                <p>Easily generate a report of your transactions</p>
            </div>
            <div class="reports-top__actions">
                <c-select placeholder="Select project" v-model="filters.projects"
                    :items="[{name: 'All projects'}, ...projects]" itemText="name" height="32px"></c-select>
                <c-select placeholder="Select gateway" v-model="filters.gateways"
                    :items="[{name: 'All gateways'}, ...gateways]" itemText="name" height="32px"></c-select>
                <c-calendar placeholder="From Date" v-model="filters.fromDate"></c-calendar>
                <c-calendar placeholder="To Date" v-model="filters.toDate"></c-calendar>
                <c-button variant="secondary">Generate report</c-button>
            </div>
        </section>

        <section class="reports-body">
            <div class="reports-body__LHS">
                <div class="reports-body__container">
                    <p class="reports-body__container-filter"> {{filters.projects}} | {{filters.gateways}} </p>
                    <Project @click="HandleProjectClick"
                        v-for="(project, i) in filterProductsByName(this.filters.projects)" :project="project"
                        :index="i" :selected="selected" @changeSelected="(data) => selected = data" :filters="filters"
                        :key="i" />
                    <template v-if="filters.gateways === 'All gateways' && filters.projects !== 'All projects'">
                        <Gateway @click="HandleProjectClick" v-for="(gateway, i) in gateways" :gateway="gateway"
                            :index="i" :selected="selected" @changeSelected="(data) => selected = data"
                            :filters="filters" :key="i" />
                    </template>
                </div>
                <div class="reports-body__RHS-chart__total" v-if="!determineDataToUse.show" style="margin-top: 27px">
                    TOTAL: 14,065 USD
                </div>
                <div class="reports-body__empty" v-if="projects.length < 1 && gateways.length < 1">
                    <p>No reports</p>
                    <p>Currently you have no data for the reports to be generated.
                        Once you start generating traffic through the Balance application
                        the reports will be shown.</p>
                    <img src="../assets/no-reports.svg" alt="">
                </div>
            </div>
            <div class="reports-body__RHS" v-if="determineDataToUse.show">
                <div class="reports-body__RHS-labels">
                    <div v-for="(label, i) in FetchChartData(determineDataToUse.data).labels" :key="i">
                        <div class="badge"></div> <span>{{label}}</span>
                    </div>
                </div>
                <div class="reports-body__RHS-chart">
                    <c-chart class="reports-body__RHS-graph" :chartData="chartData"></c-chart>
                </div>
                <div class="reports-body__RHS-chart__total">
                    {{determineDataToUse.data.toUpperCase()}} TOTAL | 14,065 USD
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="js">
import { mapGetters } from "vuex";
import Project from "../components/views/Project";
import Gateway from "../components/views/GateWay";
export default {
    name: "Reports",
    computed: {
        ...mapGetters({ projects: "getProjects", gateways: "getGateways" }),
        determineDataToUse() {
            if (this.filters.projects === 'All projects' && this.filters.gateways === 'All gateways') {
                return { show: false }
            } else if (this.filters.projects === 'All projects' && this.filters.gateways !== 'All gateways') {
                return { show: true, data: 'projects' }
            } else if (this.filters.projects !== 'All projects' && this.filters.gateways === 'All gateways') {
                return { show: true, data: 'gateways' }
            } else {
                return { show: false }
            }
        }
    },
    data() {
        return {
            selected: null,
            filters: {
                projects: "All projects",
                gateways: "All gateways",
                fromDate: null,
                toDate: null
            },
            chartData: {
                datasets: [
                    {
                        label: "My First Dataset",
                        data: [60, 40],
                        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
                        hoverOffset: 4,
                    },
                ]
            }
        }
    },
    components: {
        Project,
        Gateway
    },
    methods: {
        HandleProjectClick(data) {
            this.selected = this.selected === data ? null : data
        },
        filterProductsByName(data) {
            if (!data || data === 'All projects') return this.projects;
            const project = this.projects.find((project) => project.name === data);
            return [project]
        },
        FetchChartData(payload) {
            const labels = [];
            const data = payload === 'gateways' ? this.gateways : this.projects
            data.map((data) => {
                labels.push(data.name)
            });
            this.chartData.labels = labels
            return { labels }
        }
    }
}
</script>

<style lang="scss">
.reports {
    &-top {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: space-between;
        padding: 1%;

        &__title {
            p:first-child {
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 700;
                font-size: 24px;
                line-height: 28px;
                color: #011F4B;
            }

            p:nth-child(2) {
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 19px;
                color: #7E8299;
            }
        }

        &__actions {
            display: flex;
            align-items: baseline;
            gap: 23px;
        }
    }

    &-body {
        display: flex;
        align-items: center;
        gap: 31px;

        &__LHS {
            width: 100%;
        }

        &__RHS {
            width: 100%;
            height: 554px;

            &-labels {
                width: 99%;
                height: 53px;
                background: #F1FAFE;
                border-radius: 10px;
                display: flex;
                align-items: center;
                gap: 20px;
                justify-content: center;

                div {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
            }

            &-chart {
                padding: 10px;
                height: 445px;

                &__total {
                    background: #F1FAFE;
                    border-radius: 10px;
                    padding: 15px;
                    font-size: 16px;
                    text-align: left;
                    font-weight: 700;
                    width: 100%;
                }
            }

            &-graph {
                height: 100px;
            }
        }

        &__empty {
            margin-top: 100px;

            img {
                display: flex;
                margin: auto;
            }

            p:first-child {
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 700;
                font-size: 24px;
                line-height: 28px;
                text-align: center;
                color: #011F4B;
                margin-top: 10px;
            }

            p:nth-child(2) {
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 19px;
                text-align: center;
                color: #7E8299;
                width: 470px;
                justify-content: center;
                margin: auto;
                margin-bottom: 51px;
            }
        }

        &__container {
            background: #F1FAFE;
            border-radius: 10px;
            height: 554px;
            overflow: scroll;
            width: 99%;
            padding: 2%;

            &-filter {
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 19px;
                color: #011F4B;
                margin-bottom: 34px;
            }

            &-project {
                height: auto;
                background: #FFFFFF;
                border-radius: 10px;
                padding: 2%;
                margin-bottom: 5px;
                cursor: pointer;
                display: flex;
                justify-content: space-between;

                span {
                    font-family: 'Roboto';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 164.4%;
                    color: #011F4B;
                }
            }
        }
    }
}

.badge {
    width: 15px;
    height: 15px;
    background: #F24E1E;
    border-radius: 5px;
}

#doughnut-chart {
    width: 270px !important;
    height: 269.44px !important;
    margin: auto;
    margin-top: 94px;
}
</style>