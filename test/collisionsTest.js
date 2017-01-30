
var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http'); 
var collisions = require('../routes/collisions');
var app = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('/GET Collisions', function() {
	beforeEach(function() {
		
	});
 
	afterEach(function() {
		chai.request(app)
            .delete('/collisions')
            .end((err, res) => {
                assert(res.body)
            });
	});
 
 
	
	it('create collisions', (done) => {
        chai.request(app)
            .post('/collisions')
            .set('content-type', 'application/json')
            //.send(["(1, 2) (2, 3) (1, 4) (5, 6) (6, 7)\n(1, 2) (2, 3) (1, 4) (5, 6) (6, 7) (1,7)"])
            //.field("data","(1, 2) (2, 3)")
            .send( ["(1, 2) (2, 3) (1, 4) (5, 6) (6, 7)"])
            .end((err, res) => {

                res.should.have.status(200);
                //res.body.should.be.a('array');
                //res.body.length.should.be.eql(0);
                assert.equal(res.body,true)
              done();
            });
      });
 
	
	it('list group collisions', (done) => {
        chai.request(app)
            .get('/collisions')
            .end((err, res) => {
                res.should.have.status(200);
                //res.body.should.be.a('array');
                //res.body.length.should.be.eql(0);
                var list = [{"collision":"(1, 2) (2, 3) (1, 4) (5, 6) (6, 7)","network":[["1","2","3","4"],["5","6","7"]]},{"collision":"(1, 2) (2, 3) (1, 4) (5, 6) (6, 7) (1,7)","network":[["1","2","3","4","7","6","5"]]}]
                //assert.deepEqual(res.body,list)
              done();
            });
      });

 
});


/*var assert = require('assert');







describe('GET /collisions', function() {

  it('should respond with JSON array', function(done) {
    request(collisions)
      .get('/collisions')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
  it('should respond with redirect on post', function(done) {
    // need help here
  });
});

 before(function() {
    // runs before all tests in this block
  });


describe('GET /collisions', function() {
    it('respond with an array of users', function(data) {
    	console.log(data)
    	assert.equal(true, data.data);
      // ...
    });
  });
describe('get', function() {
	describe('#indexOf()', function() {
		it('should return -1 when the value is not present', function() {
			assert.equal(-1, [1, 2, 3].indexOf(4));
		});
	});
});
/*
describe('retries', function() {
  // Retry all tests in this suite up to 4 times
  this.retries(4);

  beforeEach(function () {
    browser.get('http://www.yahoo.com');
  });

  it('should succeed on the 3rd try', function () {
    // Specify this test to only retry up to 2 times
    this.retries(2);
    expect($('.foo').isDisplayed()).to.eventually.be.true;
  });
});
*/