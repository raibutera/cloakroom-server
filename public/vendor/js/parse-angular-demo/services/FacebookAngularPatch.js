'use strict';

angular.module('cloakroomApp.parseWrappers', [])
.factory('FacebookAngularPatch',function ($q, $window, $timeout) {

  // rai's stuff below
  var deferredSDK = $q.defer();
  var getFacebookSDK = deferredSDK.promise;

  $window.fbAsyncInit = function() {
    deferredSDK.resolve($window.FB);
  };


  // brandid stuff below
  var fbApiAngular = function() {

    var params = [].splice.call(arguments, 0);
    var defer = $q.defer();
    var angularWrap = $timeout;

    getFacebookSDK.then(function(FB){

      // Pushing callback function that will resolve to the params array
      params.push(function(response){
        if (!_.isUndefined(response.error)) {
          angularWrap(function(){
            defer.reject(response.error);
          });
          return;
        }

        angularWrap(function(){
          defer.resolve(response);
        });
      });

      FB.api.apply(FB, params);

    });

    return defer.promise;
  };


  // using the fbPromise we set up in index.html, we extend the FB SDK with FB.apiAngular
  // now we use FB.apiAngular instead of FB.api, which gives us an angular wrapped promise

  getFacebookSDK.then(function(FB){
    FB.apiAngular = fbApiAngular;
  });

  return {
    getFacebookSDK: getFacebookSDK
  };
});
