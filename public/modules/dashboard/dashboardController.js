'use strict';

angular.module('sapience.charts').controller('dashboardController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
    $http.get('sapience/metrics').success(function(data) {
    	$scope.mainMetrics=[];
    	$scope.mainMetrics=data;
    	console.log('Main metrics data is : '+$scope.mainMetrics);
        /*$scope.loadMetrics(data);*/
    });

    $scope.spiderChartModel = {};
    $scope.lineChartModel = {};
    $scope.spiderChartModel.expectedSeries = {name: 'Expected', data: []};
    $scope.lineChartModel.expectedSeries = {name: 'Expected', data: []};

    $scope.spiderApplicationSeries = [];
    $scope.lineApplicationSeries = [];
    
    $rootScope.$on('productSelection', function(event, application) {
    	console.log('application or product id is : '+application.id);
    	$scope.cateogories= [{
    		'name': application.name,
            'value': 'Code Quality',
            'selected':false,
            'connectorId': '531be23471154d0000b07505,533e2a5bb34b99201ee85345' // code quality for Clover or Sonar connectors
        },{
        	'name': application.name,
            'value': 'Project Tracking',
            'selected':false,
            'connectorId': '533a3dfef48d45e41873a7a9' // project Tracking for Jenkin connector
        },{
        	'name': application.name,
            'value': 'Defect Metrics',
            'selected':false,
            'connectorId': '531be20171154d0000b07504' // defect metrics for Jira connector
        }];
    });
    
    $scope.applicationSelected=function(application) {
    	
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

        application.selected = !application.selected;

        if (application.selected) {
            var randomColor = '#' + ((1 << 24) * Math.random() | 0).toString(16);
            $scope.spiderApplicationSeries.push({name: application.value, data: $scope.metricData[application.name], color: randomColor});
            $scope.lineApplicationSeries.push({name: application.value, data: $scope.metricData[application.name], color: randomColor});
        } else {
            var applicationToPop = $.grep($scope.spiderApplicationSeries, function(e) {
                return e.name == application.name;
            });
            $scope.spiderApplicationSeries.pop(applicationToPop);
            $scope.lineApplicationSeries.pop(applicationToPop);
        }

        $scope.spiderChartModel.applicationSeries = $scope.spiderApplicationSeries;
        $scope.lineChartModel.applicationSeries = $scope.lineApplicationSeries;
        $scope.buildSpiderChart($scope.spiderChartModel);
        $scope.buildLineChart($scope.lineChartModel);
    };

    $scope.buildLineChart = function(lineChartModel) {
        new Highcharts.Chart({
            chart: {
                renderTo: 'lineChart',
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

    $scope.buildSpiderChart = function(spiderChartModel) {

        new Highcharts.Chart({
            chart: {
                renderTo: 'spiderChart',
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
    }
}]);