var debugProject = angular.module('debugProject', ['ui.router']);


debugProject.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
	function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url : '/',
        templateUrl: 'partials/main.html'
      })
      .state('todo', {
        url : '/todo-items',
        templateUrl: 'partials/todo.html'
      })
      ;
	}
]);


debugProject.controller('mainController', function($scope, UserService) {

  var self = this;

  self.greeting = 'tence';

  UserService.getUser()
    .then(function(data){
      // Do I welcome more than one user? Why not!
      self.users = data;
    })
    .catch(function(error){
      console.error('there was an error retrieving data: ', error);
    });

});


debugProject.controller('todoController',
    function($scope, DataService, UserService) {

  var self = this;

  self.newItem = {};

  self.todos = [];

  UserService.getUser()
    .then(function(data){
      self.users = data;
    })
    .catch(function(error){
      console.error('there was an error retrieving data: ', error);
    });

  DataService.getData()
    .then(function(data){
      self.todos = data.result;
    })
    .catch(function(error){
      console.error('there was an error retrieving data: ', error);
    });

  self.createItem = function(newItem){
    var tempObj = {
      'owner': newItem.owner.name,
      'title' : newItem.title,
      'description' : newItem.desc
    };
    self.todos.push(tempObj);
  };

});


debugProject.factory('DataService', function($http, $rootScope, $q){

  var getData = function(){
    var d = $q.defer();
    $http.get('/api/v1/todos')
      .success(function(data){
        return d.resolve(data);
      })
      .error(function(error){
        return d.reject(error);
      });
    return d.promise;
  };

  return {
    getData : getData
  }

});


debugProject.factory('UserService', function($http, $rootScope, $q){

  var getUser = function(){
    var d = $q.defer();
    $http.get('/api/v1/user')
      .success(function(data){
        if (!data || !data['result'] || !data['result'].length) {
          // Invalid response.
          d.reject(data);
        }

        // Return only the data the controller is interested in.
        return d.resolve(data['result']);
      })
      .error(function(error){
        return d.reject(error);
      });
    return d.promise;
  };

  return {
    getUser : getUser
  }

});

