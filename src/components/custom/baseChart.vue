<script>
import { Doughnut } from "vue-chartjs";
export default {
    extends: Doughnut,
    props: {
        chartData: {
            required: true,
            type: Object,
        },
    },
    mounted() {
        this.renderChart(this.chartData, {
            plugins: {
                legend: {
                    display: false
                },
                responsive: true
            }
        })
    },
};
</script>