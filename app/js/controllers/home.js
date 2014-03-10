'use strict';

angular.module('sapience.system').controller('HomeController', ['$scope', '$http','Global', 
    function($scope, $http, Global) {
        $scope.global = Global;

      $scope.applications = [];

    $http.get("http://localhost:3000/products")
    .success(function(data, status, headers, config) {
        data.forEach(function(product,index,array){
          var product = {id:index,selected:false,name:product.name};
          $scope.applications.push(product);
        });
    }).error(function(data, status, headers, config) {
        $scope.status = status;
    });
		   
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
	        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
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
    }
]);
