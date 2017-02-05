'use strict';

var wrap = require('co-monk');
let collection = 'items';

class Item{
	constructor(){
        
	}

    * getItem (db, params) {

        var items = wrap(db.get(collection));
        let result = yield items.find({'itemid': params.id});
        return result;

    }

    * getItems (db, params) {

        var items = wrap(db.get(collection));
        let result = yield items.find({});
        return result;

    }

    * updateItem (db, params) {

        delete params.data._id;
        var options = { upsert: true, multi: false };
        var items = wrap(db.get(collection));
        let result = yield items.update({ 'itemid': params.id }, params.data, options);
	    return result;

    }	

    * deleteItem (db, params) {

        var items = wrap(db.get(collection));
        let result = yield items.remove({ 'itemid': params.id });
        return result;

    }	
    
};

module.exports = new Item();