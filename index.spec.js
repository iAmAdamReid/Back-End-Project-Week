const server = require('./api/server.js');

const request = require('supertest');

describe('NOTES API', () => {
    describe('GET ALL NOTES @ /api/notes', () => {
        it('should return JSON', async () => {
            const response = await request(server).get('/api/notes');

            expect(response.type).toBe('application/json');
        })

        it('should return status code 401 if not authorized', async () => {
            const response = await request(server).get('/api/notes');
            expect(response.status).toBe(401);
        })
    })
})

    describe('GET NOTE BY ID @ /api/notes/:id', () => {
        it('should return JSON', async () => {
            const response = await request(server).get(`/api/notes/${id}`);
            expect(response.type).toBe('application/json')

        })
    })