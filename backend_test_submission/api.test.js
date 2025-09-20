const request = require('supertest');
const app = require('../server');

describe('Backend API Test Suite', () => {
  
  describe('Authentication Endpoints', () => {
    
    test('Register - Valid Request', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          validity: 30,
          statusCode: 'abcd1'
        })
        .expect(201);
        
      expect(response.body.token).toBeDefined();
      expect(response.body.validity).toBe(30);
      expect(response.body.statusCode).toBe('abcd1');
    });
    
    test('Register - Invalid Validity', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test2@example.com',
          password: 'password123',
          validity: 25,
          statusCode: 'abcd1'
        })
        .expect(400);
        
      expect(response.body.error).toBe('Invalid Validity');
      expect(response.body.statusCode).toBe('abcd1');
    });
    
    test('Register - Invalid Status Code', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test3@example.com',
          password: 'password123',
          validity: 30,
          statusCode: 'wrong'
        })
        .expect(400);
        
      expect(response.body.error).toBe('Invalid Status Code');
    });
    
    test('Login - Valid Credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
          validity: 30,
          statusCode: 'abcd1'
        })
        .expect(200);
        
      expect(response.body.token).toBeDefined();
      expect(response.body.message).toBe('Login successful');
    });
    
    test('Login - Invalid Credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpass',
          validity: 30,
          statusCode: 'abcd1'
        })
        .expect(400);
        
      expect(response.body.error).toBe('Invalid credentials');
    });
  });
  
  describe('Protected Routes', () => {
    let token;
    
    beforeAll(async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'protected@example.com',
          password: 'password123',
          validity: 30,
          statusCode: 'abcd1'
        });
      token = response.body.token;
    });
    
    test('Profile - With Valid Token', async () => {
      const response = await request(app)
        .get('/api/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
        
      expect(response.body.user).toBeDefined();
    });
    
    test('Profile - Without Token', async () => {
      const response = await request(app)
        .get('/api/profile')
        .expect(401);
        
      expect(response.body.message).toBe('Access denied. No token provided.');
    });
    
    test('Dashboard - With Valid Token', async () => {
      const response = await request(app)
        .get('/api/dashboard')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
        
      expect(response.body.message).toBe('Welcome to dashboard');
    });
  });
  
  describe('Validation Tests', () => {
    
    test('Missing Required Fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          validity: 30,
          statusCode: 'abcd1'
        })
        .expect(400);
        
      expect(response.body.error).toBe('Missing Fields');
    });
    
    test('Invalid Email Format', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'invalid-email',
          password: 'password123',
          validity: 30,
          statusCode: 'abcd1'
        })
        .expect(400);
        
      expect(response.body.error).toBe('Invalid Email');
    });
    
    test('Password Too Short', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: '123',
          validity: 30,
          statusCode: 'abcd1'
        })
        .expect(400);
        
      expect(response.body.error).toBe('Invalid Password');
    });
  });
});