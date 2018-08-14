const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const server = require('../app');

chai.use(chaiHttp); //Connect Http to the server


describe('Get json value',()=>{
    it('it should print the json value',(done)=>{
        chai.request(server)
        .get('/api/current')
        .end((err,res)=>{
            if(err) throw err;
            res.should.have.status(200);
            done();
        })
    })
})

describe('Get json value',()=>{
    it('it should print the json value',(done)=>{
        chai.request(server)
        .get('/api/user')
        .end((err,res)=>{
            if(err) throw err;
            res.should.have.status(200);
            done();
        })
    })
})