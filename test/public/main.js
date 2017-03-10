var angularTodo = angular.module('angularTodo', []);

angularTodo.controller('mainController', function($scope, $http) {
	$scope.formData = {};

	$http.get("/api/todos").success(function(data) {
		$scope.todos = data;
	}).error(function(data) {
		console.log('Error: ' + data);
	});

	$scope.createTodo = function() {
		$http({method: 'POST', url: '/api/todos', data: $scope.formData, dataType: 'json', headers: {'Content-Type': 'application/json'}}).success(function(data) {
			$scope.formData = {};
			$scope.todos = data;
			console.log(data);
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	};

	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
		.success(function(data) {
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

});