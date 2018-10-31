const server = require('./api/server.js');

const request = require('supertest');

describe('SERVER', () => {
    describe('USERS API', () => {
        it('should create a new user', async (done) => {
            request(server).post('/api/users/register').send({username: 'testUser', password: 'password'}).end(function(err, res){
                token = res.body.token;

                request(server).get('/api/notes').set('Authorization', token).expect(200).end(function(err, res){
                    expect(typeof token).toBe('string')
                    if(err) return done(err);
                    done();
                })
            })
        })

        it('should login the new user', async(done) => {
            request(server).post('/api/users/login').send({username: 'testUser', password: 'password'}).end(function(err, res){
                token = res.body.token;

                request(server).get('/api/notes').set('Authorization', token).expect(200).end(function(err, res){
                    if(err) return done(err);
                    done();
                })
            })
        })


        describe('LOGGED IN NOTES API', () => {
            it('should return a list of notes if logged in', async(done) => {
                // TODO
                done();
            })

            it('should return a note by ID if logged in', async (done) => {
                // TODO
                done();
            })

            it('should allow a logged in user to post a new note', async(done) => {
                // TODO
                done();
            })

            it('should allow a user to edit a note', async(done) => {
                // TODO
                done();
            })

            it('should allow a user to delete a note', async(done) => {
                // TODO
                done();
            })
        })


        it('should edit the user credentials', async(done) => {
            // check for user edit
            // TODO
            done();
        })

        it('should delete the test user', async (done) => {
            // check for user deletion
            // TODO
            done();
        })

        describe('LOGGED OUT NOTES API', () => {
            it('should return 401 if not logged in for GET', async(done) => {
                // TODO
                done();
            })

            it('should return 401 if not logged in for GET BY ID', async(done) => {
                // TODO
                done();
            })

            it('should return 401 if not logged in for POST', async(done) => {
                // TODO
                done();
            })

            it('should return 401 if not logged in for PUT', async(done) => {
                // TODO
                done();
            })

            it('should return 401 if not logged in for DELETE', async(done) => {
                // TODO
                done();
            })
        })

    })

})