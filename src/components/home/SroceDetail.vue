<template>
    <v-layout row wrap>
        <v-flex md6 xs12>
            <div id="chart">
                <apexchart type=radialBar height=350 :options="chartOptions" :series="series" />
            </div>
        </v-flex>
        <v-flex md6 xs12>
            <v-layout row wrap>
                <v-flex class="borderBottle" xs6>
                    <h1>CPALL</h1>
                    <p class="grey--text text--darken-1">บริษัท ซีพี ออลล์ จำกัด (มหาชน)</p>
                </v-flex>
                <v-flex class="borderBottle" xs6>
                    <h1 class="text-xs-right green--text"><v-icon large class="success--text" pr-3>arrow_drop_up</v-icon>79.00</h1>
                    <h4 class="text-xs-right grey--text"><v-icon small class="grey--text">access_time</v-icon>30/5/2019</h4>
                </v-flex>
                <v-flex xs12>
                    <v-chip outline color="primary">SET</v-chip>
                    <v-chip outline color="error">กลุ่มอุตสาหกรรม</v-chip>
                    <v-chip outline color="success">บริการ</v-chip>
                    <v-chip outline color="warning">SET50</v-chip>
                    <v-chip outline color="info">SET100</v-chip>
                </v-flex>
                <v-flex xs12>
                    <table>
                        <tr><td class="grey--text text--darken-4">วันที่เริ่มต้นซื้อขาย</td><td class="grey--text text--darken-2">14 ตุลาคม พ.ศ.2546</td></tr>
                        <tr><td>เว็บไซต์</td><td class="grey--text text--darken-2">www.cpall.co.th</td></tr>
                        <tr><td>มูลค่าหลักทรัพย์ตามราคาตลาด (ล้านบาท)</td><td class="grey--text text--darken-2">709,665.01</td></tr>
                        <tr><td>P/E (เท่า)</td><td class="grey--text text--darken-2">33.35</td></tr>
                        <tr><td>P/BV (เท่า)</td><td class="grey--text text--darken-2">7.87</td></tr>
                    </table>
                </v-flex>
                <v-flex xs12>
                    <p class="text-xs-right"><a href="">ดูรายละเอียดเพิ่มเติม</a></p>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts'
    export default {
        data() {
            return {  
                series: [44, 55, 67, 83],
                chartOptions: {
                    plotOptions: {
                        radialBar: {
                        dataLabels: {
                            name: {
                            fontSize: '22px',
                            },
                            value: {
                            fontSize: '16px',
                            },
                            total: {
                            show: true,
                            label: 'Total',
                            formatter: function () {
                                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                                return 249
                            }
                            }
                        }
                        }
                    },
                    labels: ['หุ้นคุณค่า', 'หุ้นเติบโต', 'หุ้นปันผล', 'หุ้นราคาถูก'],
                }
            }
        },
        components: {
            apexchart: VueApexCharts,
        }
    }
</script>

<style scoped>
    .borderBottle {
        border-bottom: 2px solid #757575;
    }
    table {
        width: 100%;
    }
    th, td {
        border-bottom: 1px solid #ddd;
    }
</style>
