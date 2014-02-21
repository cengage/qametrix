function spiderChartController($scope, limitToFilter) {
  $scope.ideas = [
    ['ideas1', 1],
    ['ideas2', 8],
    ['ideas3', 5]
  ];
  
  $scope.limitedIdeas = limitToFilter($scope.ideas, 2);
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
	        text: 'Quality Metrics',
	    },
	    
	    xAxis: {
	        categories: ['Show Stopper', 
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
	        name: 'LCO',
	        data: [1,1,3,7,12],
	        pointPlacement: 'on'
	    }, {
	        name: 'Expected',
	        data: [0,0,5,10,15],
	        pointPlacement: 'on'
	    }]
		
      });
	  
      scope.$watch("items", function (newValue) {        
      }, true);
      
    }
  }
});