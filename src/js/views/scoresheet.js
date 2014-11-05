define('views/scoresheet',[
    'services/log',
    'services/fs',
    'services/ng-fs',
    'services/ng-challenge',
    'services/ng-scores',
	'services/ng-teams',
    'services/ng-stages',
    'directives/sigpad',
    'directives/spinner',
    'angular'
], function(log, fs) {
    var moduleName = 'scoresheet';

    return angular.module(moduleName, []).controller(moduleName + 'Ctrl', [
        '$scope','$fs','$scores','$stages','$modal','$challenge','$window','$q','$teams',
        function($scope,$fs,$scores,$stages,$modal,$challenge,$window,$q,$teams) {
            log('init scoresheet ctrl');
			
			//$scope.selectedTeam = null ; //placeholder var for selected team
			//$scope.selectTeam = function(team) {
            //    $scope.$root.$emit('selectTeam',team);
            //};

			$scope.teams = $teams.teams ;
			
            $fs.read('settings.json').then(function(res) {
                $scope.settings = res;
                load();
            },function() {
                log('unable to load settings');
                $scope.settings = {};
                load();
            });

            function load() {
                $challenge.load($scope.settings.challenge).then(function(defs) {
                    $scope.field = defs.field;
                    $scope.missions = defs.missions;
                    $scope.objectiveIndex = defs.objectiveIndex;
                    angular.forEach($scope.missions,process);
                    $scope.$apply();
                });
            }

            function getObjectives(names) {
                return names.map(function(dep) {
                    return $scope.objectiveIndex[dep].value;
                });
            }

            function process(mission) {
                var key = mission._key;
                var deps = mission.score.reduce(function(all,score) {
                    return all.concat($challenge.getDependencies(score));
                },[]);
                //addd watcher for all dependencies
                $scope.$watch(function() {
                    return deps.map(function(dep) {
                        return $scope.objectiveIndex[dep].value;
                    }).join('|');
                },function(newValue) {
                    mission.errors = [];
                    mission.percentages = [];
                    mission.result = mission.score.reduce(function(total,score) {
                        var deps = $challenge.getDependencies(score);
                        var vars = getObjectives(deps);
                        var res = score.apply(null,vars);
                        if (res instanceof Error) {
                            mission.errors.push(res);
                            //do not count this bit
                            return total;
                        }
                        //check for fraction. TODO: work with Percentage object
                        if (typeof res === 'number' && (res % 1) !== 0) {
                            mission.percentages.push(res);
                            //do not count
                            return total;
                        }
                        return total + res||0;
                    },0);
                });

            }

            $scope.inc = function(objective,amount) {
                objective.value = Math.min(objective.max||Number.Infinity,(objective.value||0)+(amount||1));
            };
            $scope.dec = function(objective,amount) {
                objective.value = Math.max(objective.min||0,(objective.value||0)-(amount||1));
            };

            $scope.score = function() {
                if (!$scope.missions) {return;}
                //step 1: sum all scores from missions without percentages
                var subScore = $scope.missions.filter(function(m) {
                    return m.percentages.length === 0;
                }).reduce(function(total,m) {
                    return total + m.result;
                },0);
                //step 2: sum all percentages
                var bonus = $scope.missions.filter(function(m) {
                    return m.percentages.length !== 0;
                }).reduce(function(total,m) {
                    //sum of mission percentages
                    return total + m.percentages.reduce(function(total,perc) {
                        return total + perc;
                    },0);
                },1);   //add 1 for multiplication later on
                //step 3: apply percentages
                var bonusScore = Math.ceil(subScore * bonus);
                //step 4: add points from missions with percentages
                var restScore = $scope.missions.filter(function(m) {
                    return m.percentages.length !== 0;
                }).reduce(function(total,m) {
                    return total + m.result;
                },0);

                return bonusScore + restScore;
            };

            $scope.isSaveable = function() {
                if (!$scope.missions) {return false;}

                var val =
                    $scope.stage !== undefined && $scope.stage !== null &&
                    $scope.round !== undefined && $scope.round !== null &&
                    $scope.team !== undefined && $scope.team !== null &&
                    $scope.signature !== undefined && $scope.signature !== null &&
                    $scope.missions.every(function(mission) {
                      return mission.result !== undefined && mission.result !== null;
                      });

                console.log("saveable " + val);
                return val;
            };
			

            $scope.showTeams = function() {
                //alert('todo: make work on small screens && improve team selection');
                $scope.setPage('teams');
            };

            $scope.selectTeam = function(team) {
				$scope.team = team;
            };

            $scope.$root.$on('selectTeam',function(e,team) {
                $scope.selectTeam(team);
            });

            $scope.chooseStage = function() {
                //alert('todo: implement choose stage, using random for now');
                $scope.stage = $stages.stages[Math.floor(Math.random() * $stages.stages.length)];
            }

            $scope.chooseRound = function(stage) {
                //alert('todo: implement choose round, using random for now');
                $scope.round = Math.ceil(Math.random() * stage.rounds);
            }

            $scope.discard = function() {
                $scope.signature = null;
                $scope.team = null;
                $scope.stage = null;
                $scope.round = null;
                console.log('discard');
                load();
            }

            //saves mission scoresheet
            //take into account a key: https://github.com/FirstLegoLeague/fllscoring/issues/5#issuecomment-26030045
            $scope.save = function() {
                if (!$scope.team || !$scope.stage || !$scope.round) {
                    alert('no team selected, do so first');
                    return $q.reject(new Error('no team selected, do so first'));
                }
                //todo:
                var fn = [
                    'score',
                    $scope.settings.table,
                    $scope.team.number,
                    +(new $window.Date())
                ].join('_')+'.json';

                var data = angular.copy($scope.field);
                data.team = $scope.team;
                data.stage = $scope.stage;
                data.round = $scope.round;
                data.table = $scope.settings.table;
                data.signature = $scope.signature;


                return $fs.write(fn,data).then(function() {
                    $scores.add({
                        file: fn,
                        team: $scope.team,
                        stage: $scope.stage,
                        round: $scope.round,
                        score: $scope.score()
                    });
                    return $scores.save();
                }).then(function() {
                    log('result saved');
                },function() {
                    log('unable to write result');
                });
            };

            $scope.openDescriptionModal = function (size, mission) {

                var modalInstance = $modal.open({
                  templateUrl: 'descriptionModalContent.html',
                  controller: 'DescriptionModalInstanceCtrl',
                  size: size,
                  resolve: {
                    mission: function () {
                      return mission;
                    }
                  }
                });

                modalInstance.result.then(function (selectedItem) {
                  			
				  $scope.selected = selectedItem;
                }, function () {
                  log.info('Description dismissed at: ' + new Date());
                });
              };
			  
			$scope.openTeamModal = function (size, teams) {

				var modalInstance = $modal.open({
			
				  templateUrl: 'teamModalContent.html',
				  controller: 'TeamModalInstanceCtrl',
				  size: size,
				  resolve: {
				  		  
					teams: function () {
					  return teams;
					  
					  
					}
				  }
				});

				modalInstance.result.then(function (selectedTeam) {
					//log.info('Team selected: ' + selectedTeam);
					//$scope.selectedTeam = selectedTeam;
					$scope.$root.$emit('selectTeam',selectedTeam);
				}, function () {
				    log.info('Team select dismissed at: ' + new Date());
				});
			};
        }
    ]).controller('DescriptionModalInstanceCtrl',[
        '$scope', '$modalInstance', 'mission',
        function ($scope, $modalInstance, mission) {

          $scope.mission = mission;

          $scope.ok = function () {
            $modalInstance.close();
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        }
    ]).controller('TeamModalInstanceCtrl',[
        '$scope', '$modalInstance', 'teams',
        function ($scope, $modalInstance, teams) {

			$scope.teams = teams;
			
			$scope.selectTeamPop = function(team) {
				$scope.team = team;
			};
		  
			$scope.ok = function () {
				$modalInstance.close($scope.team);
			};
		  	  
			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};
        }
    ]);
});
