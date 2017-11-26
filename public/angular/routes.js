myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'homeController',
            templateUrl: 'views/restaurants.html',
            controllerAs: 'home'
        })
        .when('/customers', {
            controller: 'custController',
            controllerAs: 'cust',
            templateUrl: 'views/customer.html'

        })

    .otherwise({
        //redirectTo:'/'
        template: '<h1>404 page not found</h1>'
    });
}]);
