function spiderChartController($scope, limitToFilter) {
  $scope.applications = [
	{ id: 0, name: 'Select Application'},
    { id: 1, name: 'LCO'},
    { id: 2, name: 'GVRL'}];
  $scope.selectedApplication = $scope.applications[0];
  
  $scope.metricTypes = [
	{ id: 0, name: 'Select Metric Type'},
	{ id: 1, name: 'Bugs'},
	{ id: 2, name: 'Code Quality'},
  ];
  $scope.selectedMetricType = $scope.metricTypes[0]; 
		   
  $scope.metricData = {};
  $scope.metricData[$scope.applications[1].name + $scope.metricTypes[1].name] = [1,1,1,1,1,1,1];
  $scope.metricData[$scope.applications[1].name + $scope.metricTypes[2].name] = [2,2,2,2,2,2,2];
  $scope.metricData[$scope.applications[2].name + $scope.metricTypes[1].name] = [3,3,3,3,3,3,3];
  $scope.metricData[$scope.applications[2].name + $scope.metricTypes[2].name] = [4,4,4,4,4,4,4];
  
  $scope.$watch('selectedMetricType', function() {
			var spiderDataForType = $scope.getMetrics($scope.selectedApplication, $scope.selectedMetricType); 
			$scope.spiderData = spiderDataForType;
           });
		   
  $scope.getMetrics = function(application, metricType){
	return $scope.metricData[application.name+metricType.name];
  };
}

angular.module('sapienceUI', [])
  .directive('spiderChart', function () {
  return {
    restrict: 'C',
    replace: true,
    scope: {
      items: '='
    },
    controller: function ($scope, $element, $attrs) {
    },
    template: '<div id="container" style="margin: 0 auto">not working</div>',
    link: function (scope, element, attrs) {

      var chart = new Highcharts.Chart({
        chart: {
			renderTo: 'container',
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
	    
	    series: [{
	        name: 'Actual',
	        data: [0,0,0,0,0,0,0],
	        pointPlacement: 'on'
	    }, {
	        name: 'Expected',
	        data: [2,2,2,3,2,4,1],
	        pointPlacement: 'on'
	    }]		
      });
	  
      scope.$watch("items", function (newData) {
        chart.series[0].setData(newData, true);
      }, true);      
    }
  }
});