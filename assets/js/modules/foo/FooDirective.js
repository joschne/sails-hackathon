angular.module('FooModule')
.directive('bar',function(){
  return {
    controller: ['$scope', '$http', function($scope, $http){

      //Get all permission data
      $http.get('article')
      .then(function(response){
        $scope.articles = response.data;
      })

    }],
    templateUrl: 'templates/bar.html'
  }
});
