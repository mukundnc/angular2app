'use strict';

var item = require('../models/item');

class ItemService{
	constructor(){

	}

	* getItem(db, params){
		let data = yield item.getItem(db, params);
		return data;
	}

	* getItems(db, params){
		let data = yield item.getItems(db, params);
		return data;
	}

	* saveItem(db, params){
		//run validation here
		let data = yield item.updateItem(db, params);
		return data;
	}

	* updateItem(db, params){
		//run validation here
		let data = yield item.updateItem(db, params);
		return data;
	}
}

module.exports = new ItemService();