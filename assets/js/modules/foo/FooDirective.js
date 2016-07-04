angular.module('FooModule')
.directive('linkPopover',function(){
  return {
    scope:{
      "hdsUrl" : '@',
      "hdsUnoderedUrls" : '@',
      "dbpediaUrl" :'@',
      "wikipediaUrl" : '@',
      "label" : '@'
    },
    transclude: true,
    controller: ['$scope', '$http', function($scope, $http){

      

    }],
    templateUrl: '/templates/linkPopover.html'
  }
})
.directive('bar',function(){
  return {
    controller: ['$scope', '$http', function($scope, $http){

      //Get all permission data
      $http.get('/article')
      .then(function(response){
        $scope.articles = response.data;
      })

    }],
    templateUrl: '/templates/bar.html'
  }
});
