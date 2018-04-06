'use strict';
const uuid = require('uuid');
const crypto = require('crypto');

// 提供加密算法
module.exports = function () {
    
        let cj = {};
    
        cj.UUID = function() {
            return uuid.v1().replace(/[-]/g, '')
        };
        cj.MD5 = function(text) {
            return crypto.createHash('md5').update(text +='').digest('hex');
        };
        cj.SHA1 = function(text) {
            return crypto.createHash('sha1').update(text +='').digest('hex');
        };
        cj.SHA256 = function(text){
            return crypto.createHash('sha1').update(text +='').digest('hex');
        };
        return cj;
}();