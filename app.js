angular.module('App.controllers', []);
angular.module('App.directives', []);

var app = angular.module('App', [
  'ui.router',
  'App.controllers',
  'ui.bootstrap'
]);

app.config(function($stateProvider, $urlRouterProvider) {


  $urlRouterProvider.otherwise("/generalTab")

  $stateProvider
    .state('generalTab', {
      url: "/generalTab",
      templateUrl: "tabs/generalTab.html"
    })

  .state('correctiveAction', {
    url: "/correctiveAction",
    templateUrl: "tabs/correctiveAction.html"
  })

  .state('reviewAndSubmit', {
    url: "/reviewAndSubmit",
    templateUrl: "tabs/reviewAndSubmit.html"
  })

})