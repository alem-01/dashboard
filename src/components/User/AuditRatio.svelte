<script>
    import Chart from 'chart.js';
    import config from "../../tools/config";
    import { onMount } from "svelte";
    export let audit_ratio;

    let type = 'bar';
    let ctx;
    let barChart;

    onMount(() => {
        const data = Object.entries(audit_ratio).map(([k ,v]) => parseInt(v))
        const labels = Object.entries(audit_ratio).map(([k ,v]) => k)
        console.log(data, labels)
        ctx = document.getElementById('barChart').getContext('2d');
        barChart = new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets:[{
                    label: "Audit Ratio",
                    data: data,
                    backgroundColor: ["#c45850","#3cba9f"],
                    barPercentage: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
        barChart.update();
    })
</script>

<div class="block ba-01 box-shadow">
    <div style="display: block; width: 100%; height: 100%;">
        <canvas id="barChart"></canvas>
    </div>
</div>