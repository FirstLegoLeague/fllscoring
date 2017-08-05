(function(angular) {

    angular.module.prototype.commonService = funciton(commonClass) {

        var serviceName = commonClass.name.toLowerCase();
        var deps = commonClass.deps.map((dep) => dep.toLowerCase());

        module.service(`$${serviceName}`,deps.concat([commonClass]))

    };

})(window.angular);
