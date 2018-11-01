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

                request(server).get('/api/authorize').set('Authorization', token).expect(200).end(function(err, res){
                    if(err) return done(err);
                    done();
                })
            })
        })


        describe('LOGGED IN NOTES CRUD API & USER EDIT/DELETE', () => {
            it('should return a list of notes if logged in', async(done) => {

                request(server).post('/api/users/login').send({username: 'testUser', password: 'password'}).end(function(err, res){
                    // console.log(res.body.user_id);
                    token = res.body.token;

                    request(server).get('/api/notes').set('Authorization', token).expect(200).end(function(err, res){
                        expect(typeof res.body).toBe('object');
                        if(err) return done(err);
                        done();
                    })
                })
            })

            it('should return a note by ID if logged in', async (done) => {
                request(server).post('/api/users/login').send({username: 'testUser', password: 'password'}).end(function(err, res){
                    token = res.body.token;

                    request(server).get('/api/notes').set('Authorization', token).expect(200).end(function(err, res){
                        expect(typeof res.body).toBe('object');
                        if(err) return done(err);
                        done();
                    })
                })
            })


            // initialize the new post ID in broad scope for use in PUT and DELETE functions
            let newPostId;
            it('should allow a logged in user to post a new note', async(done) => {
                request(server).post('/api/users/login').send({username: 'testUser', password: 'password'}).end(function(err, res){
                    token = res.body.token;
                    id = res.body.user_id;

                    request(server).post('/api/notes').send({title: "Test Title", content: "Test content", user_id: id}).set('Authorization', token).expect(201).end(function(err, res){
                        newPostId = res.body.id;
                        if(err) return done(err);
                        done();
                    })
                })
            })

            it('should allow a user to edit a note', async(done) => {
                request(server).post('/api/users/login').send({username: 'testUser', password: 'password'}).end(function(err, res){
                    token = res.body.token;
                    id = res.body.user_id;

                    request(server).put(`/api/notes/${newPostId}`).send({title: 'New Test Title', content: 'New Test Content', tags: 'New Tags', user_id: id}).set('Authorization', token).expect(200).end(function(err, res) {
                        if(err) return done(err);
                        done();
                    })
                })
            })

            it('should allow a user to delete a note', async(done) => {
                request(server).post('/api/users/login').send({username: 'testUser', password: 'password'}).end(function(err, res){
                    token = res.body.token;
                    id = res.body.user_id;

                request(server).delete(`/api/notes/${newPostId}`).set('Authorization', token).expect(200).end(function(err, res){
                    if(err) return done(err);
                    done();
                })
            })
        })

        
        it('should edit the user credentials if user is logged in and authorized', async(done) => {
            request(server).post('/api/users/login').send({username: 'testUser', password: 'password'}).end(function(err, res){
                token = res.body.token;
                id = res.body.user_id;
            
            request(server).put(`/api/users/${id}`).set('Authorization', token).send({username: 'newTestUser', password: 'newpassword'}).end(function(err, res){
                if(err) return done(err);
                done();
            })
            })
        })

        it('should delete the test user using the new credentials as a login', async (done) => {
            request(server).post('/api/users/login').send({username: 'newTestUser', password: 'newpassword'}).end(function(err, res){
                token = res.body.token;
                id = res.body.user_id;
                request(server).delete(`/api/users/${id}`).set('Authorization', token).expect(200).end(function(err, res){
                    if(err) return done(err);
                    done();
                })
             })
        })
    })

        
        describe('LOGGED OUT NOTES API', () => {
            it('should return 401 if not logged in for GET NOTES', async(done) => {
                request(server).get('/api/notes').end(function(err, res){
                    expect(res.status).toBe(401);
                    if(err) return done(err);
                    done();
                })
            })

            it('should return 401 if not logged in for GET NOTE BY ID', async(done) => {
                request(server).get('/api/notes/1').end(function(err, res){
                    expect(res.status).toBe(401);
                    if(err) return done(err);
                    done();
                })
            })

            it('should return 401 if not logged in for POST NOTE', async(done) => {
                request(server).post('/api/notes/').send({title: "Test Title", content: "Test Content", user_id: 0}).end(function(err, res){
                    expect(res.status).toBe(401);
                    if(err) return done(err);
                    done();
                })
            })

            it('should return 401 if not logged in for PUT NOTE', async(done) => {
                request(server).put('/api/notes/1').send({title: "Test Title", content: "Test Content", user_id: 0}).end(function(err, res){
                    expect(res.status).toBe(401);
                    if(err) return done(err);
                    done();
                })
            })

            it('should return 401 if not logged in for DELETE NOTE', async(done) => {
                request(server).delete('/api/notes/1').end(function(err, res){
                    expect(res.status).toBe(401);
                    if(err) return done(err);
                    done();
                })
            })
        })


        describe('LOGGED OUT (Unauthorized) USERS API', () => {

            it('should prevent unauthorized user GET requests', async(done) => {
                request(server).get('/api/users')
                done();
            })
    
            it('should prevent unauthorized user edits', async(done) => {
                done();
            })
    
            it('should prevent unauthorized user deletion', async(done) => {
                done();
            })
    
        })
    })
})