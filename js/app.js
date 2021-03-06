console.log('Yo');

var app = angular.module('plates-api-app', ['ngMaterial', 'ngMessages', 'ngMdBadge']);
app.controller("mainController", ['$scope', '$timeout', '$http', function($scope, $timeout, $http){

  $scope.loaded = false;

  $http({
  method: 'GET',
  url: 'http://www.apnaplates.com/plates_for_sales/getAutoSuggestionForPlates'
  }).then(function successCallback(response) {
      // console.log(response);
      // console.log(response.data);
      $scope.plates = response.data;
      $scope.total = response.data.length;
      // Gathers the total views
      $scope.totalViews = 0;
      $scope.soldPlatesTotal = 0;
      $scope.viewsPerPlate = 0;
      $scope.totalSellerContacted = 0;
      $scope.searchFilter = [
          {id: 1, name: 'All', value: 'All'},
          {id: 2, name: 'Singh', value: 'Singh'},
          {id: 3, name: 'Krishna', value: 'Krishna'},
          {id: 4, name: 'Jag', value: 'Jag'},
          {id: 4, name: 'Faisal', value: 'Faisal'},
          {id: 4, name: 'Khan', value: 'Khan'},
          // {id: 4, name: 'Sold Plates', value: 'Yes'},
          // {id: 4, name: 'Disabled Plates', value: 'Disable'}
      ]
      // this callback will be called asynchronously
      // when the response is available

      var justPlateCharArray = [];

      for (var i=0; i<$scope.total; i++) {
        // console.log("Plate List >", $scope.plates[i].plate_id.toUpperCase());
        justPlateCharArray.push($scope.plates[i].plate_id.toUpperCase())
      }
      // console.log(justPlateCharArray);


      for (var i=0; i<$scope.total; i++) {

        // Getting TOTAL VIEWS
        var views = $scope.plates[i].page_views;
        var viewsToInteger = parseInt(views);
        $scope.totalViews += viewsToInteger;
        //

        // Gets the total sold plates
        if ($scope.plates[i].sold == 'Yes') {
          $scope.soldPlatesTotal += 1;
        }

        // Get the total sellers that have been Contacted
        var contact = $scope.plates[i].sellercontacted;
        var contactToInteger = parseInt(contact);
        $scope.totalSellerContacted += contactToInteger;

      }
      // console.log("Total Views >", $scope.totalViews);

      // views per plate
      $scope.viewsPerPlate = $scope.totalViews / $scope.total;

      $scope.loaded = true;
    }, function errorCallback(response) {
      console.log("API ERROR");
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });


}]);
