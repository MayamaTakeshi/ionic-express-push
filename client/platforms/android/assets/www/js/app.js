// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $cordovaPush) {
  var androidConfig = {
    "senderID": "614148493339"
  };

  document.addEventListener("deviceready", function() {
    $cordovaPush.register(androidConfig).then(function(result) {
      console.log('result: ' + result);
      //alert('result: ' + result);
      //success
    }, function(err) {
      // error
      alert('Registration error: ' + err);
    });

    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
      switch(notification.event) {
      case 'registered':
        if(notification.regid.length > 0) {
          //alert('registration ID = ' + notification.regid);
          $rootScope.device_token = notification.regid;
        }
        break;
      case 'message':
        //alert(JSON.stringify(notification));
        var title = notification.payload['gcm.notification.title'];
        var body = notification.payload['gcm.notification.body'];
        alert(body);
        break;
      case 'error':
        alert('GCM error = ' + notification.msg);
        break;
      default:
        alert('An unknown GCM event has occurred');
        break;
      }
    });

  });

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('MainCtrl', function($scope, $rootScope, $http) {
  $scope.msg = "hello hello hello";
  $scope.delay = 10;
  $scope.startAlarm = function() {
    var delay = $scope.delay || 0;
    $http.get('https://qabcs.brastel.com/push_test?token=' + $rootScope.device_token + '&delay=' + delay + '&msg=' + $scope.msg).then(function(resp) {
      console.log('Success: ' + resp);
      //alert('Success: ' + resp);
    }, function(err) {
      alert('Failed: ' + JSON.stringify(err)); 
    });
  };
});
