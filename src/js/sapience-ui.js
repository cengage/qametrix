var sapienceUI = angular.module('sapienceUI', []);

sapienceUI.controller('spiderChartController', function($scope) {
  $scope.applications = [
    { id: 0,selected: false, name: 'In-Context',},
    { id: 1,selected: false, name: 'NatGeo'},
    { id: 2,selected: false, name: 'GVRL'},
    { id: 3,selected: false, name: 'Smithsonian'},
    { id: 4,selected: false, name: 'MindTap'},
    { id: 5,selected: false, name: 'Ocean'},
    { id: 6,selected: false, name: 'SAS'},
    { id: 7,selected: false, name: 'CHOA'},
    { id: 8,selected: false, name: 'GTX'}];
		   
  $scope.metricData = {};
  $scope.metricData[$scope.applications[0].id] = {spider: [1,1,1,1,1,1,1],line: [11,92,83,14,25,36,47,58,9,10,11,12]};
  $scope.metricData[$scope.applications[1].id] = {spider: [2,2,2,2,2,2,2],line: [21,82,63,24,15,26,47,58,69,10,11,12]};
  $scope.metricData[$scope.applications[2].id] = {spider: [3,3,3,3,3,3,3],line: [31,72,73,4,45,16,27,58,69,70,11,12]};
  $scope.metricData[$scope.applications[3].id] = {spider: [4,4,4,4,4,4,4],line: [41,62,53,24,85,6,17,28,69,70,81,12]};
  $scope.metricData[$scope.applications[4].id] = {spider: [5,5,5,5,5,5,5],line: [51,52,23,4,75,66,7,18,29,70,81,92]};
  $scope.metricData[$scope.applications[5].id] = {spider: [1,2,3,4,5,5,5],line: [61,42,33,64,5,6,77,58,19,50,81,92]};
  $scope.metricData[$scope.applications[6].id] = {spider: [5,4,3,2,2,1,1],line: [71,32,43,54,5,86,7,8,19,40,61,12]};
  $scope.metricData[$scope.applications[7].id] = {spider: [2,2,1,1,3,3,4],line: [81,22,33,44,35,96,7,38,29,10,51,72]};
  $scope.metricData[$scope.applications[8].id] = {spider: [1,5,2,4,3,4,2],line: [91,12,13,4,5,26,7,68,95,107,41,62]};
  
  $scope.spiderChartModel = {};
  $scope.lineChartModel = {};
  $scope.spiderChartModel.expectedSeries = {name:'Expected',data: [2,2,2,3,2,4,1]};
  $scope.lineChartModel.expectedSeries = {name:'Expected',data: [90,90,90,90,90,90,90,90,90,90,90,90]};
  
  $scope.spiderApplicationSeries = [];
  $scope.lineApplicationSeries = [];
  
  $scope.applicationToggled = function(application){
	application.selected = !application.selected;

	if(application.selected){
		$scope.spiderApplicationSeries.push({name:application.name, data: $scope.metricData[application.id].spider,color:"#"+((1<<24)*Math.random()|0).toString(16)});		
		$scope.lineApplicationSeries.push({name:application.name, data: $scope.metricData[application.id].line,color:"#"+((1<<24)*Math.random()|0).toString(16)});		
	}else{
		var applicationToPop = $.grep($scope.spiderApplicationSeries, function(e){ return e.name == application.name; });
		$scope.spiderApplicationSeries.pop(applicationToPop);
		$scope.lineApplicationSeries.pop(applicationToPop);
	}
    $scope.spiderChartModel.applicationSeries = $scope.spiderApplicationSeries;
    $scope.lineChartModel.applicationSeries = $scope.lineApplicationSeries;
	$scope.buildSpiderChart($scope.spiderChartModel);
	$scope.buildLineChart($scope.lineChartModel);
  }

  $scope.buildLineChart = function(lineChartModel){
	new Highcharts.Chart({
			chart: {
			renderTo: 'lineChart',
	        type: 'line'
			},
            title: {
                text: 'Monthly Average Temperature',
                x: -20 //center
            },
            subtitle: {
                text: 'Source: WorldClimate.com',
                x: -20
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: '% Code Coverage'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '%'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [lineChartModel.expectedSeries].concat(lineChartModel.applicationSeries)
        });
	};
  
  $scope.buildSpiderChart = function(spiderChartModel){
	
	new Highcharts.Chart({
        chart: {
			renderTo: 'spiderChart',
	        polar: true,
	        type: 'line'
	    },
	    
	    title: {
	        text: 'Quality Metrics'
	    },
	    
	    xAxis: {
	        categories: ['% Code Coverage','Cyclomatic Complexity','Show Stopper', 
	                'Critical', 'Medium','Low','Trivial'],
	        tickmarkPlacement: 'on',
	        lineWidth: 0
	    },
	        
	    yAxis: {
	        gridLineInterpolation: 'polygon',
	        lineWidth: 0,
	        min: 0
	    },
	    
	    tooltip: {
	    	shared: true,
	        pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
	    },
	    
	    legend: {
	        align: 'right',
	        verticalAlign: 'top',
	        y: 70,
	        layout: 'vertical'
	    },
	    
	    series: [spiderChartModel.expectedSeries].concat(spiderChartModel.applicationSeries)		
      });
	}
});