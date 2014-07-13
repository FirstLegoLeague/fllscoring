"use strict";

describe('ng-connect',function() {
    var ngServices = factory('services/ng-services');
    var connect = factory('services/ng-connect',{
        'services/ng-services': ngServices
    });

    var $connect;

    beforeEach(function() {
        angular.mock.module(connect.name);
        angular.mock.inject(["$connect", function(_$connect_) {
            $connect = _$connect_;
        }]);
    });

    describe('service signature',function() {
        it('should have a send method',function() {
            expect($connect.send).not.toBe(undefined);
        });

        it('should have a get method',function() {
            expect($connect.get).not.toBe(undefined);
        });
    });

});
