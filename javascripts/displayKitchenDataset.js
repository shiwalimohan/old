google.load('visualization', '1.1', {packages: ['corechart']});
google.load('visualization', '1.1', {packages:['table']});

var visualization;
var data;

if (document.title == 'Kitchen Data Set'){
   var url='http://docs.google.com/spreadsheet/tq?key=0AqSXSwxevkk4dFkyZGdPQ2hnZVRlVzBSbkFkNkV6MkE';
   var urlVerbClasses='http://docs.google.com/spreadsheet/tq?key=0AqSXSwxevkk4dHplcXpJUWJNVlBFd2JiWjdJS2xILUE';
}

if (document.title == 'Home Data Set'){
   var url='http://docs.google.com/spreadsheet/tq?key=0AqSXSwxevkk4dG9WUjRfOFAyUkhmVDJrRGpsTDJReGc';
   var urlVerbClasses='http://docs.google.com/spreadsheet/tq?key=0AqSXSwxevkk4dG14OUFPQVMwd0FzMEt0UlNoZVdpMHc';
}

function drawVisualization() {
  var query = new google.visualization.Query(url);
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
			height:700,
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
			chartArea: {top:6, left:25, height:'80%', width:'100%'},

		};
  visualization = new google.visualization.ColumnChart(document.getElementById('visualization'));
  visualization.draw(data,options);
  google.visualization.events.addListener(visualization, 'select', selectHandler);
}
google.setOnLoadCallback(drawVisualization);

function selectHandler(e){
	 var selection = visualization.getSelection();
	 var item = data.getFormattedValue(selection[0].row,0);


	 var detailQuery = new google.visualization.Query(url);
	 detailQuery.setQuery("select A, sum(E) where B = '" + item + "' group by A");	 
	 detailQuery.send(handleDetailQueryResponse);

	 var objectQuery = new google.visualization.Query(url);
	 objectQuery.setQuery("select C, sum(E) where B = '" + item + "' group by C");	 
	 objectQuery.send(handleObjectQueryResponse);

	 var verbClassQuery = new google.visualization.Query(urlVerbClasses);
	 verbClassQuery.setQuery("select B where A ='" + item + "'");
	 verbClassQuery.send(handleVerbClassQueryResponse);
}

function handleDetailQueryResponse(detailResponse) {
  if (detailResponse.isError()) {
    alert('Error in query: ' + detailResponse.getMessage() + ' ' + detailResponse.getDetailedMessage());
    return;
  }

  var tableOptions = {
			width: 300,
			page: 'enable',
			pageSize: 15,
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
			 chartArea:{left:0,top:0,width:"100%",height:"100%"},
			 fontName: 'Esteban',
			 fontSize: 16,
			 height: 300,
			 legend: {position: 'right'},
  };

  var objectData = objectResponse.getDataTable();
  var objectChart = new google.visualization.PieChart(document.getElementById('objects'));

  objectChart.draw(objectData, objectChartOptions);
}

function handleVerbClassQueryResponse(verbClassQueryResponse){
  if (verbClassQueryResponse.isError()) {
    alert('Error in query: ' + verbClassQueryResponse.getMessage() + ' ' + verbClassQueryResponse.getDetailedMessage());
    return;
  }

  var tableOptions = {
			width: 300,
			page: 'enable',
			pageSize: 15,
			showRowNumber: true,
		};

  var verbClassData = verbClassQueryResponse.getDataTable();
  
  var table = new google.visualization.Table(document.getElementById('senses'));
  table.draw(verbClassData,tableOptions);
}


