const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const dbUrl = require('../config/Keys').mongoURI;
const User = require('../models/User');

describe('Database Connection Test',()=>{
    //Before starting the test, create a sandboxed database connection
    //Once a connection is established invoke done()
    before((done)=>{
        mongoose.connect(dbUrl);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open',()=>{
            console.log("We are Connected to the Database Successfully");
            done();
        })
    });
    // Database Schema Testing

    describe('Test User Model Schema',()=>{
        //Check data is save to database 
        it(' New User is Saved to Database for Testing Purpose',(done)=>{
            var user = User({
                name:"Umair",
                email:"umairmalikavan@gmail.com",
                password:"12334456"
            })
            user.save(done);
        })

        it("It Should Save Incorrect Data to database",(done)=>{
            //Attempt to save with wrong info. An error should trigger        
            var wrongUser = new User({
                username:'Umair',
                email:'ksld',
                password:''
            })
            wrongUser.save(err =>{
                if(err){ return done();}
                throw new Error('Should generate error!');
            })
        })

        it('Should Retrieve Data from test Database', (done)=>{
            User.find({name:'Umair'},(err, name) =>{
                if(err) {throw err}
                if(name.length === 0 ){ throw new Error('No data!')}
                done();
            })
        })

    })

    // Database Schema Testing Ends
    
    //After all tests are finished drop database and close connection
    after((done)=>{
        mongoose.connection.db.dropDatabase(()=>{
            mongoose.connection.close(done);
        })
    });
});
