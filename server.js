const express = require('express');
const app = express();
const path    = require("path");
const bodyParser = require('body-parser')
const jsonfile = require('jsonfile')

app.use(bodyParser.json());

/* 
 * Initiliaze quiz data. 
 */

let quizData = [];
let quizAnswers = [];
let usersScores = [];

jsonfile.readFile('./data/quizData.json', function(err, data) {
    if(!err){
        quizData = data.quizData;
        quizAnswers = data.answers; 
    }else{
        console.log(err);
    }
});

jsonfile.readFile('./data/usersScores.json', function(err, data) {
    if(!err){
        usersScores = data;
    }else{
        console.log(err);
    }
});


/*
 * Routing.
 */

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/src/www/index.html'));
});

app.use('/build', express.static(path.join(__dirname, './build')));

app.get('/api/quiz', function (req, res) {
    res.send(quizData);
});

app.get('/api/answers', function (req, res) {
    res.send(quizAnswers);
});

app.get('/api/scores', function(req, res){
    res.send(usersScores);
});

app.post('/api/save/score', function(req, res){

    usersScores.push({
        date: new Date().getTime(),
        user: req.body.user,
        score: req.body.score
    })

    res.sendStatus(200);    
});


const gracefulShutdown = function(msg, callback) {
    jsonfile.writeFile('./data/usersScores.json', usersScores , function (err) {
        console.log('App exit through ' + msg);
        callback();
    });
};

// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});



app.listen(3000, function () {
	console.log('Quiz app listening on port 3000!');
});


