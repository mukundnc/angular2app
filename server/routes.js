'use strict';

var router = require('koa-router');
var itemController = require('./controllers/itemcontroller');
var view = require('./views/jsonresponseview'); 

var controllerMethods = {
	getitem : itemController.getItem,
	getitems : itemController.getItems,
	saveitem : itemController.saveItem,
	updateitem : itemController.updateItem
}

function * getHandler(){
	var params = this.params;
	let data;
	if(!params.id){
		data = yield controllerMethods.getitems(this.db, params);
	} else{
		data = yield controllerMethods.getitem(this.db, params);
	}
	view.onSuccess(this, data, 1);
}

function * postHandler(){
	var params = this.params;
	params.data = this.request.body;
	let data;
	if(!params.id){
		data = yield controllerMethods.saveitem(this.db, params);
	} else{
		data = yield controllerMethods.updateitem(this.db, params);
	}
	view.onSuccess(this, data, 1);
}

function configure(app) {
	var subRouter = new router();
	subRouter.get('/items/:id', getHandler);
	subRouter.get('/items', getHandler);
	subRouter.post('/items/:id', postHandler);
	subRouter.post('/items', postHandler);	 
	var mainRouter = new router();
	mainRouter.use('/api', subRouter.routes(), subRouter.allowedMethods());	
	app.use(mainRouter.routes());
	app.use(mainRouter.allowedMethods());
}

module.exports = {
	configure : configure
};
