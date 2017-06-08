'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', ['ui.router'])
  
    .config((
        $stateProvider
      , $urlRouterProvider
      ) => {

      $stateProvider
        .state('home', {
          url: '/home',
          component: 'home'
        })

      $urlRouterProvider.otherwise('/home')
    })

    .component('home', {
      templateUrl: 'views/home.html',
      controller: HomeCtrl
    })

    function HomeCtrl($http) {
      this.res = []
      this.txt = 'HomeCtrl';
      this.debug = false;

      // this.$onInit = function() {
      //   $http
      //     .get('http://localhost:3000/server-1/now')
      //     .then(res => {
      //       this.now = res.data.now;
      //       console.log(res.data.now)
      //     })
      // }

      this.translate = function(payload) {
        $http.post('http://localhost:3000/server-2/translate'
          , {
            text: payload.source,
            de: payload.de,
            es: payload.es,
            it: payload.it,
            sr: payload.sr
          })
          .then(res => {
            this.payload = null;
            this.res = res.data;
          })
      }
    }
