socket.on('returnPieChart', function(pieChartInfoArray) {
	(function () {
		var chart = new CanvasJS.Chart('chartContainer',
		{
			title:{
				text: 'Payment breakdown',
				fontFamily: 'arial black'
			},
            animationEnabled: true,
			legend: {
				verticalAlign: 'bottom',
				horizontalAlign: 'center'
			},
			theme: 'theme1',
			data: [
			{        
				type: 'pie',
				indexLabelFontFamily: 'Garamond',       
				indexLabelFontSize: 20,
				indexLabelFontWeight: 'bold',
				startAngle:0,
				indexLabelFontColor: 'MistyRose',       
				indexLabelLineColor: 'darkgrey', 
				indexLabelPlacement: 'inside', 
				toolTipContent: '{name}: {y}',
				showInLegend: true,
				indexLabel: '#percent%', 
				dataPoints: pieChartInfoArray
			}
			]
		});
		chart.render();
	}) ();
});