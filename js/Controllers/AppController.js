(function() {
  angular
    .module('Softengi.controllers')
    .controller('AppController', AppController);

  AppController.$inject = ['$scope'];


  function AppController($scope) {
    var self = this;
    $scope.showModal = false;
    var actions = [{
      id: 0,
      description: 'Corrective Action #1',
      name: 'John Doe',
      company: 'Company A',
      date: '5/10/2013'
    }, {
      id: 1,
      description: 'Corrective Action #1',
      name: 'Scott Taylor',
      company: 'Company B',
      date: '5/13/2013'
    }, {
      id: 2,
      description: 'Corrective Action #1',
      name: 'John Doe',
      company: 'Company A',
      date: '5/10/2013'
    }, {
      id: 3,
      description: 'Corrective Action #1',
      name: 'Scott Taylor',
      company: 'Company B',
      date: '5/13/2013'
    }, {
      id: 4,
      description: 'Corrective Action #1',
      name: 'Scott Taylor',
      company: 'Company B',
      date: '5/13/2013'
    }];

    var wells = [{
      name: 'Well-01',
      region: 'South',
      state: 'Oklahoma',
      field: 'Ringwood'
    }, {
      name: 'Well-02',
      region: 'North',
      state: 'Montana',
      field: 'Sidney'
    }, {
      name: 'Well-03',
      region: 'North',
      state: 'North Dakota',
      field: 'Tioga'
    }];

    var input = {
      date: '5/13/2013 3:40 PM',
      reporter: 'John Doe',
      company: null,
      number: '405.234.9751',
      supervisor: null,
      description: '',
      well: ''
    };
    var nonApply = false;

    angular.extend(self, {
      actions: actions,
      wells: wells,
      input: input,
      nonApply: nonApply,
      toggleModal: toggleModal,
      isCollapsed: false,
      editionData: [],
      editTable: editTable,
      updateTable: updateTable,
      deleteRow: deleteRow,
      show: show,
      addTableRow: addTableRow,
      open: open
    });

    /*   {
      "name": "Well-01",
      "region": "South",
      "state": "Oklahoma",
      "field": "Ringwood"
  }*/

    /*  $scope.newContact = new ParseObject({
      'name', 'region', 'field'
  });*/
    function addTableRow() {
      var id = lookForId();
      if (actions.length < 5) {
        actions.push({
          id: id,
          description: 'new description',
          name: 'new name',
          company: 'new company',
          date: 'set date'
        });
      } else {
        alert('You reach limit of correctives, please remove some to add new!');
      }
    }

    function lookForId() {
      var arr = [0, 1, 2, 3, 4];
      for (var i = actions.length - 1; i >= 0; i--) {
        console.log(actions[i].id, arr[i]);
        if (actions[i].id !== arr[i]) {

          return i;

        }
      };
    }


    function deleteRow(id) {
      self.actions.splice(id, 1);

    }

    function show() {
      console.log(self.actions);
    }

    function editTable(action) {
      self.editionData[action.id] = true;
    };

    function updateTable(action) {
      self.editionData[action.id] = false;
    };


    function toggleModal() {
      self.isCollapsed = !self.isCollapsed;
    };


    function open($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    }

    $scope.formats = ['d/MM/yyyy hh:mm AM/PM', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  };
})();