console.log('Yo');

var app = angular.module('plates-api-app', ['ngMaterial', 'ngMessages']);
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
        let views = $scope.plates[i].page_views;
        let viewsToInteger = parseInt(views);
        $scope.totalViews += viewsToInteger;
        //

        // Gets the total sold plates
        if ($scope.plates[i].sold == 'Yes') {
          $scope.soldPlatesTotal += 1;
        }

        // Get the total sellers that have been Contacted
        let contact = $scope.plates[i].sellercontacted;
        let contactToInteger = parseInt(contact);
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
