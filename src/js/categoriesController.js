angular.module('phonebook')
.controller('CategoriesController', ['$scope', 'DataService', function($scope, DataService) {
	$scope.data = [];
	$scope.search = function () {
		var txt = $scope.searchText;
		var data = [];
		DataService.fetchCategory(txt).then(function (length) {
			data.push({
				name: txt,
				num: length
			});

			var vis=d3.select(".chart").append("svg:svg").attr("width",100).attr("height",700);
			var rect=vis.selectAll("rect").data(data).enter().append("svg:rect");
			rect.attr("height",function(d) {
				return d.num;
			})
			  .attr("width", 15)
			  .attr("x",function(d,i) {
			  	return i*20;
			  })
			  .attr("y",function(d) {return 0;})
			  .attr("fill","steelblue")
			  .text(function(d) { return d.name; });
		});
	};
}]);
