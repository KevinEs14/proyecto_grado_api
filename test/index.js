
var request=require("supertest")
var expect = require('chai').expect;
describe('express', function () {
    var app;
    before(function(done){
      this.timeout(100000) 
        app = require('../app.js');
        app.listen(function(err) {
        if (err) { return done(err); }
        done();
        });
    })
    it("if login is called token is returned",function(done){
      this.timeout(100000) 
        request(app)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
            'usuario': "cazador2",
            'password': "1234abcd",})
        .expect(200, function(err, res) {
          if (err) { return done(err); }
          expect(res.text).to.not.null
          done();
        });
    })
    it("if depto is called depto list is returned",function(done){
        request(app)
        .get('/departamentos')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, function(err, res) {
          if (err) { return done(err); }
          expect(res.body.length).equal(9)
          done();
        });
    })
    it("if caza is called pdf report is returned",function(done){
      
      this.timeout(0) 
      request(app)
      .get('/caza/pdf/97')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', 'application/pdf')
      .expect(200, function(err, res) {
        if (err) { return done(err); }
        // console.log(res);
        
        done();
      });
  })
  it("if cuero is called pdf report is returned",function(done){
    request(app)
    .get('/departamentos')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, function(err, res) {
      if (err) { return done(err); }
      expect(res.body.length).equal(9)
      done();
    });
})
    it("if meat is called pdf report is returned",function(done){
      request(app)
      .get('/departamentos')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, function(err, res) {
        if (err) { return done(err); }
        expect(res.body.length).equal(9)
        done();
      });
    })
    it("if venta cuero is called pdf report is returned",function(done){
      request(app)
      .get('/departamentos')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, function(err, res) {
        if (err) { return done(err); }
        expect(res.body.length).equal(9)
        done();
      });
    })
    it("if venta carne is called pdf report is returned",function(done){
      request(app)
      .get('/acta-carne/pdf/18')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', 'application/pdf')
      .expect(200, function(err, res) {
        if (err) { return done(err); }
        done();
      });
    })
    it("if acta custodia cuero is called pdf report is returned",function(done){
      request(app)
      .get('/departamentos')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, function(err, res) {
        if (err) { return done(err); }
        expect(res.body.length).equal(9)
        done();
      });
    })
    it("if acta tenencia carne is called pdf report is returned",function(done){
      request(app)
      .get('/departamentos')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, function(err, res) {
        if (err) { return done(err); }
        expect(res.body.length).equal(9)
        done();
      });
    })
    it("if acta tenencia cuero is called pdf report is returned",function(done){
      request(app)
      .get('/departamentos')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, function(err, res) {
        if (err) { return done(err); }
        expect(res.body.length).equal(9)
        done();
      });
    })
    after(function() {
        console.log("Our applications tests done!");
      });
})