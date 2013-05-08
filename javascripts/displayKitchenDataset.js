google.load('visualization', '1', {packages: ['corechart']});
google.load('visualization', '1', {packages:['table']});

var visualization;
var data;

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

  data = response.getDataTable();
  var options = {
			width:1650, 
			height:800,
			axisTitlesPosition: 'in',
			vAxis: {
				title: "Number of instances",
				titleTextStyle: {color: 'black', fontName: 'Esteban', fontSize: 20},
				maxValue: 55,
				gridlines: {count: 12},
				},
			hAxis: {
				title: "Verbs", 
				textStyle: {color: 'black', fontName: 'Esteban', fontSize: 16},
				slantedTextAngle: 65,
				titleTextStyle: {color: 'black', fontName: 'Esteban', fontSize: 20},
				},
			colors: ['#800000'],
			legend: 'none',
		};
  visualization = new google.visualization.ColumnChart(document.getElementById('visualization'));
  visualization.draw(data,options);
  google.visualization.events.addListener(visualization, 'select', selectHandler);
}
google.setOnLoadCallback(drawVisualization);

function selectHandler(e){
	 var selection = visualization.getSelection();
	 var item = data.getFormattedValue(selection[0].row,0);


	 var detailQuery = new google.visualization.Query('https://docs.google.com/spreadsheet/tq?key=0AqSXSwxevkk4dFExS2wyVGJRa01rSWtlQ2NoSEF4OVE');
	 detailQuery.setQuery("select A, sum(E) where B = '" + item + "' group by A");	 
	 detailQuery.send(handleDetailQueryResponse);

	 var objectQuery = new google.visualization.Query('https://docs.google.com/spreadsheet/tq?key=0AqSXSwxevkk4dFExS2wyVGJRa01rSWtlQ2NoSEF4OVE');
	 objectQuery.setQuery("select C, sum(E) where B = '" + item + "' group by C");	 
	 objectQuery.send(handleObjectQueryResponse);
}

function handleDetailQueryResponse(detailResponse) {
  if (detailResponse.isError()) {
    alert('Error in query: ' + detailResponse.getMessage() + ' ' + detailResponse.getDetailedMessage());
    return;
  }

  var tableOptions = {
			width: 300,
			page: 'enable',
			pageSize: 10,
			showRowNumber: true,
		};

  var detailData = detailResponse.getDataTable();
  
  var table = new google.visualization.Table(document.getElementById('details'));
  table.draw(detailData,tableOptions);
}

function handleObjectQueryResponse(objectResponse) {
  if (objectResponse.isError()) {
    alert('Error in query: ' + objectResponse.getMessage() + ' ' + objectResponse.getDetailedMessage());
    return;
  }


  var objectChartOptions = {
			 width:800, 
			height:500,
			axisTitlesPosition: 'in',
			vAxis: {
				title: "Number of Instances",
				titleTextStyle: {color: 'black', fontName: 'Esteban', fontSize: 20},
				},
			hAxis: {
				title: "Objects",
				textStyle: {color: 'black', fontName: 'Esteban', fontSize: 16},
				slantedTextAngle: 65,
				titleTextStyle: {color: 'black', fontName: 'Esteban', fontSize: 20},
				},
			colors: ['#800000'],
			legend: 'none',
		};

  var objectData = objectResponse.getDataTable();
  var objectChart = new google.visualization.ColumnChart(document.getElementById('objects'));

  objectChart.draw(objectData,objectChartOptions);
}


