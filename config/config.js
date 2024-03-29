
module.exports.port = 3000;

module.exports.dbConnectionString = "localhost/angular2"

module.exports.corsOptions = {
    origin : '*',
    allowMethods : 'POST,GET,PUT,DELETE,OPTIONS',
    exposeHeaders : 'WWW-Authenticate, Server-Authorization',
    allowHeaders : 'x_radio_partnerid, x_radio_auth, Cache-Control, ragma, Origin, Authorization, Content-Type, X-Requested-With',
    // maxAge : '',
}
