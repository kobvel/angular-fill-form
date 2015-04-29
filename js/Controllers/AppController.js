(function() {
  angular
    .module('Softengi.controllers')
    .controller('AppController', AppController);

  AppController.$inject = ['$scope'];


  function AppController($scope) {
    var self = this;

    var actions = [{
      id: 0,
      description: 'Corrective Action #1',
      name: 'John Doe',
      company: 'Company A',
      date: '5/10/2013'
    }, {
      id: 1,
      description: 'Corrective Action #2',
      name: 'Scott Taylor',
      company: 'Company B',
      date: '5/13/2013'
    }];
    var companies = ['Company 1', 'Company 2', 'Company3'];

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
      number: '123.123.21.1234',
      supervisor: null,
      description: null,
      wellNumber: {
        name: '',
        region: '',
        state: '',
        field: ''
      },
      region: null,
      state: null,
      field: null,
      severity: {
        loss: true,
        fatality: false,
        hospitalization: false,
        spill: true,
        spill2: false,
        damage: false
      }
    };
    var result = {};
    var nonApply = false;
    var toJson = [];

    angular.extend(self, {
      actions: actions,
      companies: companies,
      wells: wells,
      regexpDate: regexpDate,
      input: input,
      nonApply: nonApply,
      toggleModal: toggleModal,
      editionData: [],
      editTable: editTable,
      updateTable: updateTable,
      deleteRow: deleteRow,
      addTableRow: addTableRow,
      open: open,
      generateResult: generateResult,
      editionEnabled: editionEnabled,
      getJson: getJson,
      fields: null,
      correctives: [],
      opened: false,
      submitEnabled: submitEnabled
    });

    function generateResult() {

      self.actions.forEach(addAction);

      self.fields = [{
        "name": "Date and Time of Incident",
        "values": self.input.date,
        "required": true
      }, {
        "name": "Reported By",
        "values": self.input.reporter,
        "required": true
      }, {
        "name": "Company of Reporter",
        "values": self.input.company,
        "required": true
      }, {
        "name": "Contact Number",
        "values": self.input.number,
        "required": true
      }, {
        "name": "Supervisor Name",
        "values": self.input.supervisor
      }, {
        "name": "High Level Description of Incident",
        "values": self.input.description,
        "required": true
      }, {
        "name": "Well Number",
        "values": self.input.wellNumber.name,
        "required": true

      }, {
        "name": "Region",
        "values": self.input.wellNumber.region
      }, {
        "name": "State",
        "values": self.input.wellNumber.state
      }, {
        "name": "Field Office",
        "values": self.input.wellNumber.field
      }, {
        "name": "Incident Severity (Check all that Apply)",
        "values": getSeverity(),
        "required": true
      }];
    }

    function rebuildData(element, index, array) {
      if (element.required) {
        delete element.required
      }

      if (element.values) {
        var arr = [];
        arr.push(element.values);

        element.values = arr;
      } else {
        console.log(array.splice(index, 1));
      }
      console.log(element.$$hashkey);
    }

    function getJson() {
      toJson = self.fields.concat(self.correctives);
      toJson.forEach(rebuildData);

      self.result = {
        "workflowCreationInform4/06/2013 03:40 A6/P6ation": {
          "workflowTypeName": "Incident Report",
          "name": "Report - 2013.05.09"
        },
        "workflowStepUpdateInformation": {
          "stepIdOrName": "Initial Step",
          "fields": toJson
        }
      }
      myData = JSON.stringify(self.result, function(key, val) {
        if (key == '$$hashKey' || key == 'required') {
          return undefined;
        }
        return val;
      });

      console.log(myData);
    }

    function addAction(element, index) {
      self.correctives.push({
        "name": "Description of Corrective Action " + '(' + (index + 1) + ')',
        "values": element.description
      }, {
        "name": "Action Taken By (name) " + '(' + (index + 1) + ')',
        "values": element.name
      }, {
        "name": "Company " + '(' + (index + 1) + ')',
        "values": element.company
      }, {
        "name": "Date " + '(' + (index + 1) + ')',
        "values": element.date
      });
    }

    function getSeverity() {
      var str = ['Loss of well control', 'Fatality(ies)', 'Hospitalizaion or medical treatment', 'Spill offsite > 50 Bbls', 'Spill to water, any amount', 'Property damage'];
      var c = 0;
      var result = [];
      if (self.nonApply) {
        return 'None Apply';
      } else {

        if (self.input.severity.loss === true) {
          result.push(str[0]);
        };

        if (self.input.severity.fatality === true) {
          result.push(str[1]);
        };

        if (self.input.severity.hospitalization === true) {
          result.push(str[2]);
        };

        if (self.input.severity.spill === true) {
          result.push(str[3]);
        };

        if (self.input.severity.spill2 === true) {
          result.push(str[4]);
        };

        if (self.input.severity.damage === true) {
          result.push(str[5]);
        };

      }
      if (result.length <= 0) {
        result = null;
      };

      return result;
    }

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
        self.editionData[id] = true;
      } else {
        alert('You reach limit of correctives, please remove some to add new!');
      }
    }

    function submitEnabled() {
      var bool = true;

      for (key in self.fields) {

        if (self.fields[key].required) {
          bool = bool && self.fields[key].values;
        }
      }
      return bool;
    }

    function editionEnabled() {
      var bool = true;
      for (var i = self.editionData.length - 1; i >= 0; i--) {
        bool = bool && !self.editionData[i];
      };
      return bool;
    }

    function lookForId() {
      var arr = [0, 1, 2, 3, 4];
      var b = [];
      for (var i = actions.length - 1; i >= 0; i--) {
        b[i] = actions[i].id;
      };

      function search(input, second) {
        var result = [];

        for (var i = input.length - 1; i >= 0; i--) {
          if (second.indexOf(input[i]) === -1 && result.indexOf(input[i]) === -1) {
            result.push(input[i]);
          };
        };

        return result[0];
      }


      return search(arr, b);
    }

    function deleteRow(id) {
      if (actions.length > 1) {
        self.actions.splice(id, 1);
      } else {
        alert('Your form need to consist at least from one Corrective, please add new, to delete this one.');
      }
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

      self.opened = true;
    }

    var regexpDate = '/^(?=\d)(?:(?:(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})|(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))|(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2}))($|\ (?=\d)))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\ [AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/';
    $scope.formats = ['d/MM/yyyy hh:mm a'];
    $scope.format = $scope.formats[0];
  };
})();