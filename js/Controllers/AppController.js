(function() {
  angular
    .module('Softengi.controllers')
    .controller('AppController', AppController);

  AppController.$inject = [];


  function AppController() {
    var self = this;
    var actions = [{
      description: 'description-edit',
      name: 'Edit',
      company: 'lol',
      date: '14/04/2013'
    }, {
      description: 'description-params',
      name: 'Params',
      company: 'lol',
      date: '14/04/2013'
    }, {
      description: 'description-filter',
      name: 'Filter',
      company: 'lol',
      date: '14/04/2013'
    }, {
      description: 'description-user',
      name: 'User',
      company: 'lol',
      date: '14/04/2013'
    }, {
      description: 'description-info',
      name: 'Info',
      company: 'lol',
      date: '14/04/2013'
    }, {
      description: 'description-docs',
      name: 'Docs',
      company: 'lol',
      date: '14/04/2013'
    }, {
      description: 'description-comment',
      name: 'Comment',
      company: 'lol',
      date: '14/04/2013'
    }];
    angular.extend(self, {
      actions: actions
    });



  };
})();