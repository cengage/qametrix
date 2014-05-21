'use strict';

angular.module('sapience.charts').controller('dashboardController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
    $http.get('sapience/metrics').success(function(data) {
    	$scope.mainMetrics=[];
    	$scope.mainMetrics=data;
    	console.log('Main metrics data is : '+$scope.mainMetrics);
    });
    
    $scope.section1=false;
    $scope.section2=false;
    $scope.section3=false;
    
 // List of Categories
    $scope.cateogories=[];
    
 // List of Product Selected
    $scope.applicationList=[];
    
    $scope.spiderChartModel = {};
    $scope.lineChartModel = {};
    $scope.spiderChartModel.expectedSeries = {name: 'Expected', data: []};
    $scope.lineChartModel.expectedSeries = {name: 'Expected', data: []};
 
    $rootScope.$on('productSelection', function(event, application) {
    	
    	if($scope.applicationList==''){

    	    
    	    $scope.cateogories= [{
    			
    	        'value': 'Code Quality',
    	        'selected':false,
    	        'connectorId': '531be23471154d0000b07505,533e2a5bb34b99201ee85345' // code quality for Clover or Sonar connectors
    	    },{
    	    	
    	        'value': 'Project Tracking',
    	        'selected':false,
    	        'connectorId': '533a3dfef48d45e41873a7a9' // project Tracking for Jenkin connector
    	    },{
    	    	
    	        'value': 'Defect Metrics',
    	        'selected':false,
    	        'connectorId': '531be20171154d0000b07504' // defect metrics for Jira connector
    	    }];
    	}
    	
    	application.selected = !application.selected;

    	if(application.selected){
    		
    	$scope.applicationList.push(application.name);
    	
    	}else{
    		
    		$scope.applicationList.splice($scope.applicationList.indexOf(application.name), 1);
    	}
    	
    	console.log('Selected Products are : '+$scope.applicationList);
    	
    	if($scope.cateogories!=''){
    		
    		$scope.cateogories.forEach(function(category){
    			if(category.selected){
    				$scope.applicationSelected(category,'directFGBP');
    			}
    		});
    		
    	}
    	
    	
    });
    
    $scope.applicationSelected=function(application,fetchBy) {
    	
    	console.log('selected Category is : '+application.value);
    	
   	 	$scope.spiderApplicationSeries = [];
		$scope.lineApplicationSeries = [];
		   
		 $scope.metricData = {};
		 $scope.spiderChartModel.categories = [];
		 $scope.lineChartModel.categories = [];

		 $scope.mainMetrics.forEach(function(metric) {
			 var selectedConnectors=application.connectorId.split(',');
			 selectedConnectors.forEach(function(selectedConnector) {

				 if(metric.category.connector==selectedConnector){
 		
					 $scope.spiderChartModel.categories.push(metric.category.name);
					 $scope.lineChartModel.categories.push(metric.category.name);
					 if (metric.product.name in $scope.metricData) {
						 $scope.metricData[metric.product.name] = $scope.metricData[metric.product.name].concat([metric.value]);
					 } else {
						 $scope.metricData[metric.product.name] = [metric.value];
					 }
				 }
 		
			 });

		 });
		 
		 console.log('we are here now , check application selected: '+application.selected);
		 
		 if(fetchBy=='directFGBC'){
			 application.selected = !application.selected;
		 }

		 if (application.selected) {

			 console.log('product selected are :'+$scope.applicationList);
			 $scope.applicationList.forEach(function(productApplication){
			 
			 var randomColor = '#' + ((1 << 24) * Math.random() | 0).toString(16);
			 $scope.spiderApplicationSeries.push({name: productApplication, data: $scope.metricData[productApplication], color: randomColor});
			 $scope.lineApplicationSeries.push({name: productApplication, data: $scope.metricData[productApplication], color: randomColor});
			 });
			 
		 } else {
			 
			 var applicationToPop = $.grep($scope.spiderApplicationSeries, function(e) {
				 return e.name == application.name;
			 });
			 $scope.spiderApplicationSeries.pop(applicationToPop);
			 $scope.lineApplicationSeries.pop(applicationToPop);
		 }

		 $scope.spiderChartModel.applicationSeries = $scope.spiderApplicationSeries;
		 $scope.lineChartModel.applicationSeries = $scope.lineApplicationSeries;

		 if(application.connectorId=='533a3dfef48d45e41873a7a9'){
			 if(application.selected){
			 
				 console.log('inside'+ application.value);
				 $scope.section2= true;
				 $scope.buildSpiderChart($scope.spiderChartModel, 'spiderChart2');
				 $scope.buildLineChart($scope.lineChartModel, 'lineChart2');
			 }
			 else{
				 $scope.section2= false;
			 }
		 }
		 else if (application.connectorId=='531be20171154d0000b07504') {
			 if(application.selected){
				 
				 console.log('inside'+ application.value);
				 $scope.section3= true;
				 $scope.buildSpiderChart($scope.spiderChartModel, 'spiderChart3');
				 $scope.buildLineChart($scope.lineChartModel, 'lineChart3');
			 }
			 else{
				 $scope.section3= false;
			 }
		}
		else{
			if(application.selected){
				
				console.log('inside'+ application.value);
				$scope.section1= true;
				$scope.buildSpiderChart($scope.spiderChartModel, 'spiderChart');
				$scope.buildLineChart($scope.lineChartModel, 'lineChart');
			}
			else{
				$scope.section1= false;
			}
		 }
    	
    };

    $scope.buildLineChart = function(lineChartModel, lineChartId) {
        new Highcharts.Chart({
            chart: {
                renderTo: lineChartId,
                type: 'line',
                height: 400
            },
            title: {
                text: 'Quality Metrics',
                x: -20 //center
            },
            subtitle: {
                x: -20
            },
            xAxis: {
                categories: lineChartModel.categories
            },
            yAxis: {
                title: {
                    text: 'Count'
                },
                plotLines: [
                    {
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }
                ]
            },
            tooltip: {
                valueSuffix: ''
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

    $scope.buildSpiderChart = function(spiderChartModel, spriderChartId) {

        new Highcharts.Chart({
            chart: {
                renderTo: spriderChartId,
                polar: true,
                type: 'line',
                height: 500
            },

            title: {
                text: 'Quality Metrics',
                x: -50,
                y: 50
            },

            xAxis: {
                categories: spiderChartModel.categories,
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
    };
    
}]);