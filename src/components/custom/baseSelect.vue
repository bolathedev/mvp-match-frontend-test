<template>
    <div class="select">
        <p v-if="label"> {{ label }} </p>
        <button @click="toggle" :style="`width: auto; min-width: ${width}; height: ${height}; border-radius: 5px`">
            <span v-if="selected">{{ selected |
            truncate(28)
            }}</span>
            <span v-else> {{ placeholder }} </span>
            <img src="../../assets/caret-down.svg" alt="">
        </button>
        <ul v-on-clickaway="closeDropDown" v-if="isOpen" :style="`width: auto; min-width: ${width}`">
            <template v-for="(item, i) in items">
                <li v-if="getItemType(item) !== 'object'" :class="item === selected ? 'selected' : ''" :key="i"
                    @click="selectItem(item)">
                    <span> {{ item | truncate() }} </span>
                </li>
                <li v-else :class="item[itemText] === selected ? 'selected' : ''" :key="`key-${i}`"
                    @click="selectItem(item)">
                    <span> {{ item[itemText] | truncate() }} </span>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
export default {
    props: {
        itemText: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ""
        },
        width: {
            type: String,
            default: '155px'
        },
        height: {
            type: String,
            default: '48px'
        },
        placeholder: {
            type: String,
            default: "Select an option"
        },
        items: {
            type: Array,
            default: () => []
        },
        returnObject: {
            type: Boolean,
            default: false
        },
        value: {
            type: [String, Object],
            default: ''
        }
    },
    mixins: [clickaway],
    data() {
        return {
            isOpen: false,
            selected: this.value
        }
    },
    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
        },
        closeDropDown() {
            this.isOpen = false;
        },
        getItemType(data) {
            return typeof data;
        },
        selectItem(item) {
            if (typeof item === 'object') {
                this.selected = item[this.itemText];
            } else {
                this.selected = item;
            }

            if (this.returnObject && typeof item === 'object') {
                this.isOpen = false;
                this.$emit('input', item);
            } else if (typeof item === 'object') {
                this.isOpen = false;
                this.$emit('input', item[this.itemText]);
            }

            if (typeof item !== 'object') {
                this.isOpen = false;
                this.$emit('input', item);
            }
        }
    },
    filters: {
        truncate(value, length) {
            if (value?.length > 29) {
                return value.substring(0, 29) + '...';
            }

            return value;
        }
    },
    mounted() {
        if (!this.itemText) {
            this.items.forEach((item, i) => {
                if (this.getItemType(item) === 'object') {
                    const keys = Object.keys(item);
                    this.itemText = keys[0];
                }
            })
        }

        // check if value prop is part of the items array
        if (this.value) {
            const exists = this.items.find(item => {
                if (this.getItemType(item) === 'object') {
                    return item[this.itemText] === this.value;
                }
                return item === this.value;
            });

            if (exists) {
                this.selected = this.value;
            } else {
                this.selected = '';
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.select {
    margin-top: 1em;
}

ul {
    width: 282px;
    max-height: 250px;
    height: auto;
    margin-top: 8px;
    background: white;
    border-radius: 8px;
    border: 1px solid #1BC5BD;
    position: absolute;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 9999;
}

li {
    list-style-type: none;
    padding: 1em;
    margin-left: -3em;
    cursor: pointer;
    text-transform: capitalize;

    &:hover {
        background: #1BC5BD;
        color: white;
        opacity: 100% !important;
    }
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

    img {
        margin-left: 12px
    }
}

p {
    margin: 0;
    margin-bottom: 6px;
}

.selected {
    background: #1BC5BD;
    color: white;
    opacity: 57%;
}
</style>