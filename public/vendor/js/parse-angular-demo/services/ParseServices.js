'use strict';

angular.module('cloakroomApp.parseWrappers')
.factory('ParseSDK', function(FacebookAngularPatch) {

  // pro-tip: swap these keys out for PROD keys automatically on deploy using grunt-replace
  Parse.initialize("Aei0OqEhpTIYENRvjm926yigPR6r9poODYXX3wg2", "BjjYxkhiZ8IWPE6wo6K7edBA0vqsJO45pa6DADya"); // cloakroom
  // Parse.initialize("IfO72UAaOPEGHwyGjLoxQpe4RxsFEm6USQmt8Jrr", "EMrLhVsJRIsj1tiR8jZ95u1DRsbuR1ndSPsLQfPE"); // CR Rai

  // FACEBOOK init
  FacebookAngularPatch.getFacebookSDK.then(function(FB) {

    Parse.FacebookUtils.init({
      // pro-tip: swap App ID out for PROD App ID automatically on deploy using grunt-replace
      // appId: 265277097014494, // Facebook App ID
      appId: 250159355192935, // Facebook App ID
      channelUrl: '//www.cloakroom.me/channel.html', // Channel File
      cookie: true, // enable cookies to allow Parse to access the session
      xfbml: false, // parse XFBML
      frictionlessRequests: true // recommended
      // status: false      // brandid left this off but the tip article I read made me want to set it to false?
    });

  });

});
