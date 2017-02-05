'use strict';

var koa = require('koa');
var monk = require('monk');
var serve = require('koa-static');
var gzip = require('koa-gzip');
var bodyParser = require('koa-bodyparser');
var routes = require('./server/routes');
var view = require('./server/views/jsonresponseview'); 
var config = require('./config/config');

    
var db = monk(config.dbConnectionString);   

var app = koa();
app.use(gzip());
app.use(serve('web'));
app.use(serve('libs'));
app.use(bodyParser());

app.use(function*(next) {
    this.db = db;
    this.type = 'application/json';
    yield next;
    console.log('%s - %s', this.method, this.url);
});

app.use(function *(next){
    try{
        yield next; 
    } catch (err) { //executed only when an error occurs & no other middleware responds to the request
        // view.onError(this, 'application failed to respond', 22);
        //delegate the error back to application
        // this.app.emit('error', err, this);
        this.throw('error occurred in application: %s', err);
    }
});

routes.configure(app);

app.listen(config.port || 3000);
console.log('http server started listening on port %s', config.port || 3000);





