var visualization;
google.load('visualization', '1', {packages: ['columnchart']});

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
			width:2000, 
			height:600,
			vAxis: {title: "Number of instances"},
			hAxis: {title: "Verbs"},
			colors: ['#800000'],
		}
  visualization = new google.visualization.ColumnChart(document.getElementById('visualization'));
  visualization.draw(data,options);
}

google.setOnLoadCallback(drawVisualization);
