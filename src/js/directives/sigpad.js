/**
 * wraps Thomas J Bradleys signature-pad
 * in a angularjs component
 */
define([
    'directives/ng-directives',
    'jquery',
    'signaturepad'
],function(module) {
    return module.directive('fllSigpad',['$parse',function($parse) {
        return {
            template: '<canvas></canvas>',
            controller: function() {
                this.compress = function(sig) {
                    return sig.reduce(function(arr,curr) {
                        arr.push(curr.lx,curr.ly,curr.mx,curr.my);
                        return arr;
                    },[]);
                };
                this.expand = function(sig) {
                    if (!(sig && sig.length)) {
                        return [];
                    }
                    var i,res = [];
                    for (i=0; i<sig.length; i+=4) {
                        res.push({
                            lx: sig[i],
                            ly: sig[i+1],
                            mx: sig[i+2],
                            my: sig[i+3]
                        });
                    }
                    return res;
                };
            },
            link: function($scope,element,attrs,ctrl) {
                var model = $parse(attrs.ngModel);
                var config = $parse(attrs.fllSigpad)($scope)||{};

                var c = element[0].getElementsByTagName('canvas')[0];
                c.width = c.clientWidth;
                c.height = c.clientHeight;

                var api = $(element).signaturePad({
                    drawOnly:true,
                    onDrawEnd: function() {
                        model.assign($scope,ctrl.compress(this.getSignature()));
                        $scope.$apply();
                    }
                });

                $scope.$watch(attrs.ngModel,function(newValue) {
                    api.regenerate(ctrl.expand(newValue));
                },true);
            }
        };
    }]);
});
