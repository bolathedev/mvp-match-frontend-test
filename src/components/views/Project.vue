<template>
    <div>
        <div v-if="project.name.toLowerCase() !== filters.projects.toLowerCase()" @click="$emit('click', index)"
            class="reports-body__container-project">
            <span>{{project.name}}</span>
            <span>TOTAL: 10,065 USD</span>
        </div>
        <c-table v-if="selected === index && hide" :headers="headers" :items="reports">
            <template #body-gatewayId="{ itemprop }">
                <span>{{ FilterGateWaysById(itemprop.gatewayId).name }}</span>
            </template>
        </c-table>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    props: {
        project: {
            type: Object,
            default: () => { },
            required: true
        },
        selected: {
            type: Number
        },
        index: {
            type: Number
        },
        filters: {
            type: Object,
            default: () => { }
        }
    },
    computed: {
        ...mapGetters({ gateways: "getGateways" }),
        hide() {
            if (this.filters.projects === 'All projects') return true;
            if (this.filters.gateways === 'All gateways') return false;
            return true
        }
    },
    data() {
        return {
            reports: null,
            headers: [
                { title: 'Date', value: 'created' },
                { title: 'Gateway', value: 'gatewayId', hide: false },
                { title: 'Transaction ID', value: 'paymentId' },
                { title: 'Amount', value: 'amount' },
            ]
        }
    },
    methods: {
        FilterGateWaysById(id) {
            return this.gateways.find((gateway) => gateway.gatewayId === id);

        }
    },
    watch: {
        'filters.projects': {
            deep: true,
            handler() {
                if (this.filters.projects === 'All projects') return this.$emit("changeSelected", null)
                this.$emit("changeSelected", this.index)
            }
        },
        'filters.gateways': {
            deep: true,
            async handler(newVal, oldVal) {
                const reports = await this.$store.dispatch("fetchReports", { projectId: this.project.projectId, from: this.filters.fromDate, to: this.filters.toDate });
                if (this.filters.gateways === 'All gateways') {
                    this.reports = reports
                    this.headers[1].hide = false;
                    return
                }
                this.reports = reports.filter((report) => {
                    return this.FilterGateWaysById(report.gatewayId).name === newVal
                });
                this.headers[1].hide = true
            }
        },
        'filters.toDate': {
            deep: true,
            async handler(newVal, oldVal) {
                const reports = await this.$store.dispatch("fetchReports", { projectId: this.project.projectId, from: this.filters.fromDate, to: this.filters.toDate });
                console.log(reports)
                this.reports = reports.filter((report) => {
                    return this.FilterGateWaysById(report.gatewayId).name === newVal
                });
            }
        },
        'filters.fromDate': {
            deep: true,
            async handler(newVal, oldVal) {
                const reports = await this.$store.dispatch("fetchReports", { projectId: this.project.projectId, from: this.filters.fromDate, to: this.filters.toDate });
                console.log(reports)
                this.reports = reports.filter((report) => {
                    return this.FilterGateWaysById(report.gatewayId).name === newVal
                });
            }
        }
    },
    async mounted() {
        this.reports = await this.$store.dispatch("fetchReports", { projectId: this.project.projectId, from: this.filters.fromDate, to: this.filters.toDate })
    }
}
</script>

<style>

</style>