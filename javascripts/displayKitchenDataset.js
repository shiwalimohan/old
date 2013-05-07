var visualization;
google.load('visualization', '1', {packages: ['corechart']});

function drawVisualization() {
  var query = new google.visualization.Query('https://docs.google.com/spreadsheet/tq?key=0AqSXSwxevkk4dFExS2wyVGJRa01rSWtlQ2NoSEF4OVE');

  query.setQuery("select B, sum(E) group by B order by 0 - sum(E)");
  query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();
  var options = {
			width:1650, 
			height:800,
			axisTitlesPosition: 'in',
			vAxis: {
				title: "Number of instances",
				titleTextStyle: {color: 'black', fontName: 'Esteban', fontSize: 20},
				maxValue: 70,
				gridlines: {count: 8},
				},
			hAxis: {
				title: "Verbs", 
				textStyle: {color: 'black', fontName: 'Esteban', fontSize: 15},
				slantedTextAngle: 60,
				titleTextStyle: {color: 'black', fontName: 'Esteban', fontSize: 20},
				},
			colors: ['#800000'],
			legend: 'none',
		}
  visualization = new google.visualization.ColumnChart(document.getElementById('visualization'));
  visualization.draw(data,options);
}

google.setOnLoadCallback(drawVisualization);
