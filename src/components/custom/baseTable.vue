<template>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <template v-for="(header, i) in headers">
                        <th :key="i" style="text-align: center" v-if="!header.hide">
                            <slot :name="header.value">
                                {{ header.title }}
                            </slot>
                        </th>
                    </template>
                </tr>
            </thead>
            <tbody v-if="!loading">
                <tr v-for="(item, i) in items" :key="i"
                    :style="i % 2 != 0 ? 'background: white' : 'background: #F1FAFE'">
                    <template v-for="(header, i) in headers">
                        <td style="align-items: center" :key="i" v-if="!header.hide">
                            <slot :name="`body-${header.value}`" :itemprop="item">
                                {{ item[header.value] }}
                            </slot>
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>
        <div v-if="items.length < 1" class="no-data">
            <div>
                <p>No Data</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        headers: {
            type: Array,
            default: () => []
        },
        items: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        },
    }
}
</script>

<style lang="scss" scoped>
.no-data {
    width: 100%;
    background: white;
    height: 200px;
    margin: auto;
    display: flex;
    justify-content: center;
    text-align: center;
    padding-top: 5em;
}

.table-container {
    overflow: hidden;
    width: 100%;
    position: relative;
    margin-bottom: 20px;
}

.table {
    margin: 1em;
    margin-left: 0;
    // margin-top: 51px;

}

table {
    width: 100%;
    justify-content: space-between;
    margin: 1em;
    margin-left: 0;
    // margin-top: 51px;
    margin-bottom: 0;

    thead {
        width: 100%;
        height: 50px;
        background: #FFFFFF;

        tr {
            border-radius: 8px;
            padding: 2%;

            th {
                padding: 2%;
                width: 150px;
            }
        }
    }

    tbody {
        margin-top: 24px;
        background: white;

        tr {
            height: 50px;

            td {
                width: 10px;
                text-align: center;
                padding: 15px;
            }
        }
    }
}
</style>