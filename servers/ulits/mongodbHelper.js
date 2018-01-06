const mongoose = require('mongoose');

class MongoDb{
    constructor(options){

        this.url = options.server || "http://127.0.0.1:";
        this.port = options.port || 27017;
        this.name = options.name;
        this._url = this.url+this.port+'/'+this.name;
    }

    async db(){
        mongoose.Promise = global.Promise;
        await mongoose.connect(this._url, { });
    }
}

module.exports = MongoDb;
