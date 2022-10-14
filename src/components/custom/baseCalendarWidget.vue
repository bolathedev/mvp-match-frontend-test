<template>
    <div class="calendar">
        <button class="button" @click="toggle"> {{date || placeholder}} <img src="../../assets/calendar.svg" alt="">
        </button>
        <a-calendar v-on-clickaway="closeCalendar" v-model:value="value" v-if="show" class="calendarComponent"
            :fullscreen="false" @panelChange="onPanelChange">
        </a-calendar>
    </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
export default {
    props: {
        placeholder: {
            type: String,
            default: 'Select A date'
        },

    },
    mixins: [clickaway],
    data() {
        return {
            show: false,
            value: null,
            date: null
        }
    },
    methods: {
        closeCalendar() {
            this.show = false
        },
        toggle() {
            this.show = !this.show;
        },
        onPanelChange(payload) {
            console.log(payload)
        },
        formatDate(date) {
            const map = {
                mm: date.getMonth() + 1,
                dd: `${date.getDate()}`.length === 1 ? `0${date.getDate()}` : date.getDate(),
                yyyy: date.getFullYear()
            }
            return `${map.yyyy}-${map.mm}-${map.dd}`
        }
    },
    watch: {
        value: {
            handler(newVal, oldVal) {
                this.date = this.formatDate(newVal._d);
                this.$emit('input', this.date);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.calendar {
    width: auto;
}
button {
    outline: none;
    border: 1px solid #1BC5BD;
    display: flex;
    align-items: center;
    padding: 20px;
    cursor: pointer;
    justify-content: space-between;
    background: #1BC5BD;
    text-transform: capitalize;
    color: white;
    height: 32px;
    border-radius: 5px;
    width: auto;

    img {
        margin-left: 12px
    }
}

.calendarComponent {
    max-height: 250px;
    height: auto;
    margin-top: 8px;
    background: white;
    border-radius: 8px;
    position: absolute;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 9999;
}
</style>