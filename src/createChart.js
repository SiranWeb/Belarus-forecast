export function createChart([rows, dynamicTicks]) {
    google.charts.load('current', {
        packages: ['corechart', 'line']
    });
    google.charts.setOnLoadCallback(drawBasic);

    function drawBasic() {

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Time');
        data.addColumn('number', 'Temp');

        data.addRows(rows);

        var options = {
            hAxis: {
                title: 'Time'
            },
            vAxis: {
                title: 'Temperature, °С'
            },
            legend: 'none',
            pointSize: 6,
            ticks: dynamicTicks
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart'));

        chart.draw(data, options);
    }
};