import './score.js'
import './score_validation.js'
import './rankings.js'

function Scores(CRUDInterface, teams, stages, messenger) {

    var self = this;

    self.validator = new ScoreValidator();

    CRUDInterface.load().then(setScores);

    this.add = function(score) {
        return CRUDInterface.add(score).then(setScores);
    };

    this.delete = function(scoreId) {
        CRUDInterface.delete(scoreId).then(setScores);
    };

    this.update = function(score) {
        CRUDInterface.update(score).then(setScores);
    }

    function setScores(scores) {
        if(!scores) return;
        self.scores = scores.map(score => new Score(score));
        self.validator.validate(self.scores, team, stages);
        self.rankings = new Rankings().calculate(scores, stages, teams)
    }

}
