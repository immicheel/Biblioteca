angular.module("planeacion").run(function ($rootScope, $state, toastr) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    switch(error) {
      case "AUTH_REQUIRED":
        $state.go('anon.login');
        break;
      case "FORBIDDEN":
        //$state.go('root.home');
        break;
      case "UNAUTHORIZED":
      	toastr.error("Acceso Denegado");
				toastr.error("No tiene permiso para ver esta opción");
        break;
      default:
        $state.go('internal-client-error');
    }
  });
});

angular.module('planeacion').config(['$injector', function ($injector) {
  var $stateProvider = $injector.get('$stateProvider');
  var $urlRouterProvider = $injector.get('$urlRouterProvider');
  var $locationProvider = $injector.get('$locationProvider');

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  /***************************
   * Anonymous Routes
   ***************************/
  $stateProvider
    .state('anon', {
      url: '',
      abstract: true,
      template: '<ui-view/>'
    })
    .state('anon.login', {
      url: '/login',
      templateUrl: 'client/login/login.ng.html',
      controller: 'LoginCtrl',
      controllerAs: 'lc'
    })
    .state('anon.logout', {
      url: '/logout',
      resolve: {
        'logout': ['$meteor', '$state', 'toastr', function ($meteor, $state, toastr) {
          return $meteor.logout().then(
            function () {
	            toastr.info("Sesión finalizada.");
              $state.go('anon.login');
            },
            function (error) {
              toastr.error(error.reason);
            }
          );
        }]
      }
    });

  /***************************
   * Login Users Routes
   ***************************/
  $stateProvider
    .state('root', {
      url: '',
      abstract: true,
      templateUrl: 'client/layouts/root.ng.html',
      controller: 'RootCtrl as ro',
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    }
    })
    .state('root.home', {
      url: '/',
      templateUrl: 'client/home/home.ng.html',      
      controller: 'HomeCtrl as ho',
      ncyBreadcrumb: {
		    label: "Home"
		  },
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    },
    })
    .state('root.libros', {
			url: '/libros',
			templateUrl: 'client/libros/libros.html',
			controller: 'LibrosCtrl as lib',
			resolve: {
				"currentUser": ["$meteor", function($meteor){
          return $meteor.requireUser();
          }]
			}
    })
    .state('root.categorias', {
			url: '/categorias',
			templateUrl: 'client/categorias/categorias.html',
			controller: 'CategoriasCtrl as cat',
			resolve: {
				"currentUser": ["$meteor", function($meteor){
          return $meteor.requireUser();
          }]
			}
    })
    .state('root.alumnos', {
			url: '/alumnos',
			templateUrl: 'client/alumnos/alumnos.html',
			controller: 'AlumnosCtrl as alum',
			resolve: {
				"currentUser": ["$meteor", function($meteor){
          return $meteor.requireUser();
          }]
			}
    })
    .state('root.prestamos', {
			url: '/prestamos',
			templateUrl: 'client/prestamos/prestamos.html',
			controller: 'PrestamosCtrl as pres',
			resolve: {
				"currentUser": ["$meteor", function($meteor){
          return $meteor.requireUser();
          }]
			}
    })
   .state('root.listaAdministradores', {
      url: '/listaAdministradores',
      templateUrl: 'client/administradores/listaAdministradores.html',      
      controller: 'ListaAdministradoresCtrl as lam',
      ncyBreadcrumb: {
		    label: "Admins"
		  },
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    },
    }) 

    .state('root.admins', {
      url: '/admins',
      templateUrl: 'client/administradores/admins.html',      
      controller: 'AdministradoresCtrl as am',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
          return $meteor.requireUser();
        }]
      },
    })

    .state('root.editarAdministrador', {
      url: '/admins/:id,:pantallaAnterior',
      templateUrl: 'client/administradores/admins.html',      
      controller: 'AdministradoresCtrl as am',
      ncyBreadcrumb: {
        label: "Admins"
      },
      resolve: {
        "currentUser": ["$meteor", function($meteor){
          return $meteor.requireUser();
        }]
      },
    })
    
}])