const request = require('supertest');
const server = require('../server');
const db = require('./../data/db-config');
const Users = require('./../users/user-model');
const Loot = require('./../loot/loot-model');

beforeAll(async() => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async() => {
    await db('loot').truncate();
    await db('users').truncate();
});

afterAll(async() => {
    await db.destroy();
});

describe('server.js', () => {
    it('is the correct testing environment', async () => {
      expect(process.env.NODE_ENV).toBe('testing');
    });
});

describe('test User model', () => {
    test('can find a user by username', async() => {
        await db('users').insert({username: 'test', password: 'abc'});
        await db('users').insert({username: 'bob', password: '123'});
        await db('users').insert({username: 'bloom', password: 'tech'});
        let result = await Users.findBy({username: 'bob'});
        expect(result.username).toBe('bob');
      });
    
      test('can insert a new user and find it', async() => {
        const newUser = {username: 'lana', password: 'llama'};
        const result = await Users.insert(newUser);
        expect(result.user_id).toBe(1);
        expect(result.username).toBe('lana');
      });
});