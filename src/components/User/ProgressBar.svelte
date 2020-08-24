<script>
    import Chart from 'chart.js';
    import { toSize } from "./user";
    import { onMount } from "svelte";
    export let progress_bar;

    let type = 'line';
    let ctx;
    let lineChart;

    onMount(() => {
        progress_bar = progress_bar.progress_bar
        for (let i = 0; i < progress_bar.length; i++) {
            progress_bar[i].sum = parseInt(progress_bar[i].sum)
            progress_bar[i].size = toSize(progress_bar[i].sum)
        }

        ctx = document.getElementById('lineChart').getContext('2d');
        lineChart = new Chart(ctx, {
            type: type,
            data: {
                datasets:[{
                    label: "Progress over time",
                    data: [],
                    borderColor: 'rgba(23,36,205, 1)',
                    borderWidth: 1,
                    lineTension: 0
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time'
                    }],
                    yAxes: [{
                        ticks: {
                            callback: function(value, index, values) {
                                return toSize(value);
                            }
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            return toSize(tooltipItem.yLabel);
                        }
                    }
                }
            }
        });
        lineChart.data.datasets[0].data = progress_bar.map(({created_at, size, sum}) => {
            return {x: created_at, y: sum}
        });
        lineChart.update();
    })

</script>

<div style="display: block; width: 100%; height: 100%;">
    <canvas id="lineChart"></canvas>
</div>