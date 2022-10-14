<template>
    <div>
        <div @click="$emit('click', index)"
            class="reports-body__container-project">
            <span>{{gateway.name}}</span>
            <span>TOTAL: 10,065 USD</span>
        </div>
        <c-table v-if="selected === index" :headers="headers" :items="reports">
        </c-table>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    props: {
        gateway: {
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
        ...mapGetters({ gateways: "getGateways" })
    },
    data() {
        return {
            reports: null,
            headers: [
                { title: 'Date', value: 'created' },
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
    async mounted() {
        this.reports = await this.$store.dispatch("fetchReports", { gatewayId: this.gateway.gatewayId, from: this.filters.fromDate, to: this.filters.toDate })
    }
}
</script>

<style>

</style>