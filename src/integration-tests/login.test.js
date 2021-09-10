const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../api/server');
const should = chai.should();
const expect = chai.expect;

describe('POST /login', () => {
  it('return token login', (done) => {
    chai
      .request(app)
      .post('/login')
      .send({
        email: 'erickjacquin@gmail.com',
        password: '12345678',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        res.body.should.have.property('token');
        done();
      });
  });
});

describe('POST /login', () => {
  it('login invalid', (done) => {
    chai
      .request(app)
      .post('/login')
      .send({
        email: 'erickjacquin@gmail.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        res.body.should.have.property('message').eql('All fields must be filled');
        done();
      });
  });
});

describe('POST /login', () => {
  it('login invalid', (done) => {
    chai
      .request(app)
      .post('/login')
      .send({
        email: 'erickjacquin@gmail.com',
        password: '123456',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        res.body.should.have.property('message').eql('Incorrect username or password');
        done();
      });
  });
});

describe('POST /login', () => {
  it('login invalid', (done) => {
    chai
      .request(app)
      .post('/login')
      .send({
        email: 'erickjacquin@gmail.om',
        password: '12345678',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        res.body.should.have.property('message').eql('Incorrect username or password');
        done();
      });
  });
});
