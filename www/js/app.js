// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

//controller
app.controller('ctrlCarousel', function($scope)
{
  //array dei possibili valori del carousel,
  //settare l'attributo initvalue (es initvalue=2)
  //per impostare il valore iniziale del Carousel
  $scope.values=['value-1','value-2','value-3','value-4'];

  //array dei valori selezionati dall'utente [id_1:value,id_2:value,...]
  $scope.valuecarousel={};

  $scope.getValue=function()
  {
    alert(JSON.stringify($scope.valuecarousel))
  }
});

//directive customCarousel
app.directive('customCarousel', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {callback: '=callback'},
    templateUrl: 'custom-button-carousel.html',
    link: function(scope, element, attrs)
    {
      //recupero i valori degli attributi
      var index=0;
      var v = JSON.parse(attrs.values);
      var id=attrs.id;

      var initvalue = attrs.initvalue;
      if(initvalue)
      {
        //check se il valore iniziale è nel range dei valori ammissibili
        initvalue= initvalue>v.length-1?0:initvalue;
        initvalue= (initvalue<0)?0:initvalue;
        index=initvalue;
      }

      //init
      scope.selected= v[index];
      scope.callback[id]= v[index];

      //funzione next
      scope.nextCar= function()
      {
        index++;
        if(index== v.length)
          index=0;
        scope.selected= v[index];
        scope.callback[id]= v[index];
      };

      //funzione prev
      scope.prevCar= function()
      {
        index--;
        if(index==-1)
          index=v.length-1;
        scope.selected= v[index];
        scope.callback[id]= v[index];
      };
    }
  };
});


