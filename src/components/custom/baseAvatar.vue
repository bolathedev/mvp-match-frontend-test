<template>
    <div class="avatar" :style="`color: ${color}; background: ${background}`">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: "white"
        },
        background: {
            type: String,
            default: "#F6CA65"
        }
    }
}
</script>

<style>
.avatar {
    width: 43px;
    height: 43px;
    border-radius: 5px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 23px;
    line-height: 27px;
    text-align: center;
    color: #FFFFFF;
    padding-top: 8px;
}
</style>