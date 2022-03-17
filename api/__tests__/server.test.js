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
      });
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
        let result = await Loot.insert({name: 'longsword +1', value: 1000});
        expect(result.loot_id).toBe(1);
        expect(result.name).toBe('longsword +1');
        expect(result.claimed).toBe(null);
        expect(result.bagged).toBe(0);
        expect(result.sold).toBe(0);
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

describe('test users endpoints', () => {
    describe('[POST] /api/users/register', () => {
        test('responds with correct status and user is added properly', async() => {
            let result = await request(server)
                .post('/api/users/register')
                .send({username: 'test', password: 'pass'});
            expect(result.status).toBe(201);
            result = await Users.findById(1);
            expect(result.user_id).toBe(1);
            expect(result.username).toBe('test');
            expect(result.password).not.toBe('pass');
        });

        test('responds with correct status and message without username', async() => {
            let result = await request(server)
              .post('/api/users/register')
              .send({password: 'foobar'});
            expect(result.status).toBe(400);
            expect(result.body.message).toMatch(/username required/i);
        });

        test('responds with correct status and message without password', async() => {
            let result = await request(server)
              .post('/api/users/register')
              .send({username: 'foobar'});
            expect(result.status).toBe(400);
            expect(result.body.message).toMatch(/password required/i);
        });

        test('responds with correct status and message with duplicate username', async() => {
            await request(server)
                .post('/api/users/register')
                .send({username: 'duplicate', password: 'pass'});
            let result = await request(server)
                .post('/api/users/register')
                .send({username: 'duplicate', password: 'pass'});
            expect(result.status).toBe(400);
            expect(result.body.message).toMatch(/username must be unique/i);
        });

        test('responds with correct status and message valid role testing', async() => {
            let result = await request(server)
                .post('/api/users/register')
                .send({username: 'happy', password: 'role', role: 'dm'});
            expect(result.status).toBe(201);
            result = await Users.findById(1);
            expect(result.role).toBe('dm');
            result = await request(server)
                .post('/api/users/register')
                .send({username: 'path', password: 'test', role: 'admin'});
            expect(result.status).toBe(201);
            result = await Users.findById(2);
            expect(result.role).toBe('admin');
        });

        test('responds with correct status and message invalid role testing', async() => {
            let result = await request(server)
                .post('/api/users/register')
                .send({username: 'unhappy', password: 'role', role: 'test'});
            expect(result.status).toBe(400);
            expect(result.body.message).toMatch(/invalid role/i);
        });
    });

    describe('[POST] /api/users/login', () => {
        test('responds with correct status and message on invalid credentials', async() => {
            let result = await request(server)
                .post('/api/users/login')
                .send({username: 'Captain Marvel', password: 'foobar'});
            expect(result.status).toBe(401);
            expect(result.body.message).toMatch(/invalid user/i);
        });

        test('responds with correct status and message on valid credentials', async() => {
            await request(server)
                .post('/api/users/register')
                .send({username: 'Astro', password: 'foobar'});
            let result = await request(server)
                .post('/api/users/login')
                .send({username: 'Astro', password: 'foobar'});
            expect(result.status).toBe(200);
            expect(result.body.message).toMatch(/welcome Astro/i);
            expect(result.body.token).not.toBeNull();
        });
    });
});

describe('test loot endpoints', () => {
    describe('[GET] /api/loot', () => {
        test('responds with correct status and body', async() => {
            await Loot.insert({name: 'longsword +1', value: 1000});
            await Loot.insert({name: 'ring of protection +1', value: 2000});
            let result = await request(server)
                .get('/api/loot');
            expect(result.status).toBe(200);
            expect(result.body).toHaveLength(2);
        });
    });

    describe('[GET] /api/loot/:id', () => {
        test('responds with correct status and body happy path', async() => {
            await Loot.insert({name: 'longsword +1', value: 1000});
            await Loot.insert({name: 'ring of protection +1', value: 2000});
            let result = await request(server)
                .get('/api/loot/2');
            expect(result.status).toBe(200);
            let item = result.body;
            expect(item.loot_id).toBe(2);
            expect(item.name).toBe('ring of protection +1');
            expect(item.claimed).toBe(null);
            expect(item.bagged).toBe(0);
            expect(item.sold).toBe(0);
        });

        test('responds with correct status and body sad path', async() => {
            let result = await request(server)
                .get('/api/loot/13');
            expect(result.status).toBe(404);
            expect(result.body.message).toMatch(/loot 13 not found/i);
        });
    });

    describe('[POST] /api/loot', () => {
        test('responds with correct status and message no user', async() => {
            let result = await request(server)
                .post('/api/loot')
                .send({name: 'none', value: 0});
            expect(result.status).toBe(401);
            expect(result.body.message).toMatch(/token required/i);
        });

        test('responds with correct status and body happy path', async() => {
            await request(server)
                .post('/api/users/register')
                .send({username: 'bob', password: 'smith', role: 'dm'});
            let login = await request(server)
                .post('/api/users/login')
                .send({username: 'bob', password: 'smith'});
            let result = await request(server)
                .post('/api/loot')
                .set('Authorization', login.body.token)
                .send({name: 'longsword +1', value: 1000});
            expect(result.status).toBe(201);
            let loot = result.body;
            expect(loot.loot_id).toBe(1);
            expect(loot.name).toBe('longsword +1');
            expect(loot.claimed).toBe(null);
            expect(loot.bagged).toBe(0);
            expect(loot.sold).toBe(0);
        });

        test('responds with correct status and body sad path', async() => {
            await request(server)
                .post('/api/users/register')
                .send({username: 'bob', password: 'smith', role: 'dm'});
            let login = await request(server)
                .post('/api/users/login')
                .send({username: 'bob', password: 'smith'});
            let result = await request(server)
                .post('/api/loot')
                .set('Authorization', login.body.token)
                .send({name: '', value: 1000});
            expect(result.status).toBe(400);
            expect(result.body.message).toMatch(/invalid item name/i);
            result = await request(server)
                .post('/api/loot')
                .set('Authorization', login.body.token)
                .send({name: 'longsword +1', value: -1});
            expect(result.status).toBe(400);
            expect(result.body.message).toMatch(/invalid item value/i);
        });
    });

    describe('[PUT] /api/loot/:id', () => {
        test('responds with correct status and message no user', async() => {
            let result = await request(server)
                .put('/api/loot/1')
                .send({name: 'none'});
            expect(result.status).toBe(401);
            expect(result.body.message).toMatch(/token required/i);
        });
    });
});