angular.module('Softengi.controllers', []);
angular.module('Softengi.directives', []);
/*angular
  .module('Softengi', [
    'Softengi.controllers',
    'ui.router'
  ]);*/
var app = angular.module('Softengi', [
  'ui.router',
  'Softengi.controllers',
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