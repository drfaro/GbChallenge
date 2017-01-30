angular.module("gbChallenge").controller("mainController",function($scope,$http){
	console.log("gbChallenge");
    $scope.gbForm = {}
    $scope.gbForm.collisions = "(1,1)(2,1)(3,1)(4,2)(5,3)(6,3)(7,3)(8,1)(9,1)(0,1)"
    //$scope.gbForm.collisions = "(1, 2) (2, 3) (1, 4) (5, 6) (6, 7) (9, 7)\n(99,4) (1, 2) (2, 3) (5, 6) (6, 7) (9, 7)"
    $scope.listCollisions = [];


	$scope.postCollisions = function(data){
        $http({
                method: 'POST',
                url: "/collisions",
                headers: Headers,
                timeout:8000,
                data: [$scope.gbForm.collisions]
        }).then(function successCallback(resource){
            console.log(resource.data);
            $scope.getTwoCollisions();
        }, function errorCallback(exception) {
            throw exception;
        });
    }

	$scope.getTwoCollisions = function(){
        $http({
                method: 'GET',
                url: "/collisions",
                headers: Headers,
                timeout:8000
        }).then(function successCallback(resource){
            $scope.listCollisions = resource.data;
            $scope.deleteCollisions();
        }, function errorCallback(exception) {
            throw exception;
        });


    }
    $scope.deleteCollisions = function(){
        $http({
                method: 'DELETE',
                url: "/collisions",
                headers: Headers,
                timeout:8000
        }).then(function successCallback(resource){
            console.log(resource.data)
        }, function errorCallback(exception) {
            throw exception;
        });


    }

});