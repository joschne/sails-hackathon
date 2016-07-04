var myApp = angular.module('adminApp', ['ng-admin', 'FooModule']);

// // Routes / States
// myApp.config(['$stateProvider', function ($stateProvider) {
//   $stateProvider.state('state1', {
//     parent: 'main',
//     url: '/state1',
//     template: '<div class="row"><div class="col-lg-12"><div class="page-header"><h1>state 1</h1></div><i-config-permissions></i-config-permissions></div></div>',
//   });
//   $stateProvider.state('state2', {
//     url: '/state2',
//     template: '<div class="container"><i-page-header>My Profile <ma-view-actions><ma-back-button></ma-back-button></ma-view-actions></i-page-header><i-user-profile></i-user-profile></div></div></div>',
//   });
// }]);



myApp.config(['NgAdminConfigurationProvider', function(NgAdminConfigurationProvider) {
  var nga = NgAdminConfigurationProvider;
  // create an admin application
  var admin = nga.application('My First Admin').baseApiUrl('/'); // main API endpoint

  // create a articles entity
  var article = nga.entity('article');

  // set the fields of the user entity list view
  article.listView()
  .fields([
    nga.field('id'),
    nga.field('filename'),
    nga.field('categ'),
    nga.field('date', 'date')
  ])
  .filters([
    nga.field('filename.contains', 'template')
    .label('')
    .pinned(true)
    .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search in Filename" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
    nga.field('id').label('ID'),
    nga.field('text.contains', 'template')
    .label('')
    .pinned(true)
    .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search in Text" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
    nga.field('id').label('ID'),
    nga.field('categ.contains').label('Category'),


  ])
  // .perPage(5)
  .listActions(['<a href="article/text/{{entry.values.id}}" class="btn btn-xs btn-default"><i class="fa fa-external-link"></i> details</a>']);

  article.creationView().fields([
    nga.field('xml').validation({required:true}),
    nga.field('title'),
    nga.field('category')
  ]);

  // use the same fields for the editionView as for the creationView
  article.editionView().fields(article.creationView().fields());

  // add the article entity to the admin application
  admin.addEntity(article);

  //Configure the Menu
  admin.menu(nga.menu()
  .addChild(
    nga.menu(admin.getEntity('article')))
  );


  // attach the admin application to the DOM and run it
  nga.configure(admin);
}]);

myApp.config(['RestangularProvider', function(RestangularProvider) {
  RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
    if (operation == 'getList') {

      params.skip = (params._page - 1) * params._perPage;
      params.limit = params._perPage;
      delete params._page;
      delete params._perPage;

      if(params._sortField){
        params.sort = params._sortField;
        delete params._sortField;
      }

      if(params._sortDir){
        params.sort = params.sort + " " +  params._sortDir;
        delete params._sortDir;
      }

      if(params._filters){

        params.where = params._filters;
        delete params._filters;

        var queryObject = {};
        angular.forEach(params.where, function(value, key){
          var keyParts = key.split('.');
          var columnName = keyParts[0]; //e.g. name
          if(keyParts.length === 2 && value){
            var queryModifier = keyParts[1]; //e.g. contains
            var x = {};
            x[queryModifier] = value;
            queryObject[columnName] = x;
          }
          if(keyParts.length == 1){
            queryObject[columnName] = value;
          }
        })
        params.where = JSON.stringify(queryObject);

      }
    }

    return { params: params };
  });
}]);
