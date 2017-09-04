define('views/clock', [
    'services/log',
    'services/ng-message',
    'services/ng-settings',
    'angular'
], function (log) {
    var moduleName = 'clock';
    return angular.module(moduleName, []).controller(moduleName + 'Ctrl', [
        '$scope', '$message', '$settings', '$timeout',
        function ($scope, $message, $settings, $timeout) {
            log('init clock ctrl');

            $scope.state = 'stopped';
            $scope.armTime = ($settings.settings.duration || 150) * 1000;

            $message.on('clock:arm', function (msgData) {
                msgData.data.countdown ? $scope.arm(msgData.data.countdown * 1000) : $scope.arm();//countdown might not be defined, in which case we ant to call this function with no parameters
                $scope.$apply();
            }, true);
            $message.on('clock:start', function (msgData) {
                msgData.data.countdown ? $scope.start(msgData.data.countdown * 1000) : $scope.start();//countdown might not be defined
                $scope.$apply();
            }, true);
            $message.on('clock:stop', function () {
                $scope.stop();
                $scope.$apply()
            }, true);

            $message.on('clock:pause', function () {
                $scope.pause();
                $scope.$apply();
            }, true);

            $scope.getStateClass = function () {
               return $scope.state;
            };

            $scope.notifyAndExecute = function (command) {
                $message.send(`clock:${command}`);
                $scope[command]();
            };

            $scope.arm = function (countdown) {
                $scope.armTime = countdown || $scope.armTime;
                $scope.time = $scope.armTime;
                $scope.state = 'armed';
                $scope.remainingPauseTime = undefined;
                log(`armed clock to ${$scope.armTime / 1000} seconds`)
            };

            $scope.pause = function () {
                if ($scope.state === 'started') {
                    $scope.state = 'paused';
                    $scope.remainingPauseTime = $scope.time;
                }
                else if ($scope.state === 'paused') {
                    $scope.resumeStamp = new Date();
                    $scope.state = 'started';
                    $scope.tick();
                }
            };

            $scope.start = function (countdown) {
                $scope.arm(countdown);
                log('starting clock');
                $scope.startStamp = new Date();
                $scope.state = 'started';
                $scope.tick();
            };

            $scope.stop = function () {
                $scope.state = 'stopped';
            };


            $scope.tick = function () {
                if ($scope.state === 'started') {
                    var now = new Date();
                    if ($scope.remainingPauseTime) {
                        $scope.time = $scope.remainingPauseTime - (now - $scope.resumeStamp);
                    } else {
                        $scope.time = $scope.armTime - (now - $scope.startStamp);
                    }
                    if ($scope.time <= 0) {
                        $scope.time = 0;
                        $scope.stop()
                    } else {
                        $timeout($scope.tick, 10);
                    }
                }
            };

            $scope.arm();

        }
    ]).filter('time', function () {
        return function (milliseconds, subSecondAccuracy) {
            var subseconds = String(milliseconds % 1000).slice(0, subSecondAccuracy);
            while (subseconds.length < subSecondAccuracy) {
                subseconds = subseconds.concat('0')
            }
            var seconds = parseInt(milliseconds / 1000);
            var minutes = parseInt(seconds / 60);
            return `${minutes}:${seconds % 60}.${subseconds}`
        }
    });
});
