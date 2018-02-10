
var app = require('./../app');
var request = require('supertest')(app);
var should = require("should"); 

describe('auth/login', function () {
    var user = {
        "username": "zc",
        "password": "123",
        "type": 1
    };
    it('should login an user', function (done) {
        request.post('/auth/v1.0/E001-001/login')
            .send(user)
            .expect(200, function (err, res) {
                should.not.exist(err);
                res.body.should.have.property('success', false);
                done();
            });
    });
    it('should login username is null', function (done) {
        user.username = null
        request.post('/auth/v1.0/E001-001/login')
            .send(user)
            .expect(200, function (err, res) {
                should.not.exist(err);
                res.body.should.have.property('success', false);
                done();
            });
    });
    it('should login password is error', function (done) {
        user.username = 'zcaa'
        request.post('/auth/v1.0/E001-001/login')
            .send(user)
            .expect(200, function (err, res) {
                should.not.exist(err);
                res.body.should.have.property('success', false);
                done();
            });
    });
})

describe('auth/signup', function () {
    var user = {
        "username": "zcd1",
        "nickname": "zc1",
        "password": "1231",
        "type": 1,
        "auth": 1,
        "phone": '1231',
        "email": '1231@qq.com'
    };
    it('return should get  user  with token', function (done) {
        request.post('/auth/v1.0/E001-001/signup')
            .send(user)
            .expect(200, function (err, res) {
                should.not.exist(err);
                res.body.should.have.property('success', true);
                res.body.should.have.property('access_token')
                done();
            });
    });
    var user = {
        "password": "123dd11",
        "type": 1,
        "phone": '122dd',
        "email": "232d3@QQ.com"
    };
    it('miss the username', function (done) {
        request.post('/auth/v1.0/E001-001/signup')
            .send(user)
            .expect(200, function (err, res) {
                should.not.exist(err);
                res.body.should.have.property('success', false);
                done();
            });
    });
    var user = {
        "username": "zcq111",
        "password": "123112",
        "type": 1,
        "phone": '121112'
    };
    it('miss the email', function (done) {
        request.post('/auth/v1.0/E001-001/signup')
            .send(user)
            .expect(200, function (err, res) {
                should.not.exist(err);
                res.body.should.have.property('success', false);
                done();
            });
    });
    var user = {
        "username": "zcweq",
        "password": "12311",
        "type": 1,
        "email": "23dsf23@QQ.com"
    };
    it(' miss the phone', function (done) {
        user.username = null
        request.post('/auth/v1.0/E001-001/login')
            .send(user)
            .expect(200, function (err, res) {
                should.not.exist(err);
                res.body.should.have.property('success', false);
                done();
            });
    });
    var user = {
        "username": "zcq",
        "password": "12311",
        "type": 1,
        "phone": '122',
        "email": "2323@QQ.com"
    };
    it('repeat the username', function (done) {
        user.username = 'zcaa'
        request.post('/auth/v1.0/E001-001/login')
            .send(user)
            .expect(200, function (err, res) {
                should.not.exist(err);
                res.body.should.have.property('success', false);
                done();
            });
    });
})
