<template>
    <button v-on="$listeners" :class="`button ${elevation ? 'elevate' : ''} state__${disabled ? 'disabled' : variant ? `${variant}` : 'primary'
    } state__${hover ? `${variant}-hover` : ''}`" :disabled="disabled || loading"
        :style="`padding: ${padding}; width: ${width};`">
        <span style="margin: auto">
            <slot v-if="!loading"></slot>
            <span v-else>loading...</span>
        </span>
    </button>
</template>
<script lang="ts">
export default {
    model: {},
    props: {
        padding: {
            type: String,
            default: "15px",
        },
        variant: {
            type: String,
            default: "primary",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: "",
        },
        icon: {
            type: String,
            default: "",
        },
        loading: {
            type: Boolean,
            default: false,
        },
        prefix_icon: {
            type: Boolean,
            default: false,
        },
        hover: {
            type: Boolean,
            default: true,
        },
        elevation: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'button'
        }
    },
    data() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
.button {
    background: white;
    border-radius: 5px;
    outline: none;
    border: none;
    cursor: pointer;
    text-align: center;
    color: white;
    display: flex !important;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0 5%;
}

.elevate {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
}

.state {
    &__primary {
        padding: 4px 26px;
        background: #1BC5BD;
        border-radius: 5px;
        flex: none;
        order: 0;
        flex-grow: 0;
        margin: 13px 0px;
    }

    &__secondary {
        padding: 4px 26px;
        background: #005B96;
        border-radius: 5px;
        flex: none;
        order: 0;
        flex-grow: 0;
        margin: 13px 0px;
    }

    &__error {
        padding: 4px 26px;
        background: red;
        border-radius: 5px;
        flex: none;
        order: 0;
        flex-grow: 0;
        margin: 13px 0px;
    }

    &__success {
        padding: 4px 26px;
        background: #1BC5BD;
        border-radius: 5px;
        flex: none;
        order: 0;
        flex-grow: 0;
        margin: 13px 0px;
    }

    &__outlined {
        padding: 4px 26px;
        border-radius: 5px;
        flex: none;
        order: 0;
        flex-grow: 0;
        margin: 13px 0px;
        border: 1px solid #524eb6;
        box-sizing: border-box;
        color: #524eb6;
        background: transparent;
    }

    &__outlined-hover:hover {
        background: #1BC5BD;
    }

    &__flat {
        padding: 4px 26px;
        border-radius: 5px;
        flex: none;
        order: 0;
        flex-grow: 0;
        margin: 13px 0px;
        box-sizing: border-box;
        color: #524eb6;
        background: transparent;
        box-shadow: none;
    }

    &__flat-hover:hover {
        background: #1BC5BD;
    }

    &__disabled {
        color: grey;
        cursor: not-allowed;
    }
}
</style>