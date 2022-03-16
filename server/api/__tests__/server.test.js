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
        let [result] = await Users.findBy({username: 'bob'});
        expect(result.username).toBe('bob');
      });
    
      test('can insert a new user and find it', async() => {
        const newUser = {username: 'lana', password: 'llama'};
        const result = await Users.insert(newUser);
        expect(result.user_id).toBe(1);
        expect(result.username).toBe('lana');
      });

      test('can insert an admin user and find it', async() => {
        await db('users').insert({username: 'thor', password: 'banhammer', role: 'admin'});
        let [result] = await Users.findBy({role: 'admin'});
        expect(result.username).toBe('thor');
        expect(result.user_id).toBe(1);
        expect(result.role).toBe('admin');
      })
});

describe('test Loot model', () => {
    test('can get loot', async() => {
        await db('loot').insert({name: 'longsword +1', value: 1000});
        await db('loot').insert({name: 'ring of protection +1', value: 2000});
        await db('loot').insert({name: 'cloak of resistance +2', value: 4000});
        let result = await Loot.get();
        expect(result.length).toBe(3);
    });

    test('can get loot by id', async() => {
        await db('loot').insert({name: 'longsword +1', value: 1000});
        let result = await Loot.getById(1);
        expect(result.name).toBe('longsword +1');
        expect(result.claimed).toBe(null);
        expect(result.bagged).toBe(0);
        expect(result.sold).toBe(0);
    });

    test('can insert loot', async() => {
        let toInsert = [{name: 'longsword +1', value: 1000, count: 1}, {name: 'ring of protection +1', value: 2000, count: 1}];
        let result = await Loot.insert(toInsert);
        expect(result.length).toBe(2);
    });

    test('can update loot', async() => {
        await db('loot').insert({name: 'longsword +1', value: 1000});
        let result = await Loot.update(1, {name: 'cloak of resistance +2', value: 4000});
        expect(result.name).toBe('cloak of resistance +2');
        expect(result.loot_id).toBe(1);
    });

    test('can delete loot', async() => {
        await db('loot').insert({name: 'longsword +1', value: 1000});
        let result = await Loot.remove(1);
        expect(result.name).toBe('longsword +1');
        expect(result.claimed).toBe(null);
        expect(result.bagged).toBe(0);
        expect(result.sold).toBe(0);
    });
});