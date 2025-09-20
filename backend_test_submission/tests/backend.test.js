const request = require('supertest');
const app = require('../server');

describe('Backend API Tests', () => {
  
  describe('Authentication Tests', () => {
    
    test('POST /api/auth/register - Success', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        validity: 30,
        statusCode: 'abcd1'
      };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);
        
      expect(response.body).toHaveProperty('token');
      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.validity).toBe(30);
      expect(response.body.statusCode).toBe('abcd1');
    });
    
    test('POST /api/auth/register - Invalid Validity', async () => {
      const userData = {
        email: 'test2@example.com',
        password: 'password123',
        validity: 25,
        statusCode: 'abcd1'
      };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);
        
      expect(response.body.error).toBe('Invalid Validity');
      expect(response.body.statusCode).toBe('abcd1');
    });
    
    test('POST /api/auth/register - Invalid Status Code', async () => {
      const userData = {
        email: 'test3@example.com',
        password: 'password123',
        validity: 30,
        statusCode: 'xyz123'
      };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);
        
      expect(response.body.error).toBe('Invalid Status Code');
    });
    
    test('POST /api/auth/login - Success', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        validity: 30,
        statusCode: 'abcd1'
      };
      
      const response = await request(app)
        .post('/api/auth/login')
        .send(userData)
        .expect(200);
        
      expect(response.body).toHaveProperty('token');
      expect(response.body.message).toBe('Login successful');
    });
    
    test('POST /api/auth/login - Invalid Credentials', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'wrongpassword',
        validity: 30,
        statusCode: 'abcd1'
      };
      
      const response = await request(app)
        .post('/api/auth/login')
        .send(userData)
        .expect(400);
        
      expect(response.body.error).toBe('Invalid credentials');
    });
  });
  
  describe('Protected Routes Tests', () => {
    let authToken;
    
    beforeAll(async () => {
      const userData = {
        email: 'testuser@example.com',
        password: 'password123',
        validity: 30,
        statusCode: 'abcd1'
      };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);
        
      authToken = response.body.token;
    });
    
    test('GET /api/profile - Success with Token', async () => {
      const response = await request(app)
        .get('/api/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
        
      expect(response.body).toHaveProperty('user');
    });
    
    test('GET /api/profile - Unauthorized without Token', async () => {
      const response = await request(app)
        .get('/api/profile')
        .expect(401);
        
      expect(response.body.message).toBe('Access denied. No token provided.');
    });
    
    test('GET /api/dashboard - Success with Token', async () => {
      const response = await request(app)
        .get('/api/dashboard')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
        
      expect(response.body.message).toBe('Welcome to dashboard');
    });
  });
  
  describe('Validation Tests', () => {
    
    test('Missing Email Field', async () => {
      const userData = {
        password: 'password123',
        validity: 30,
        statusCode: 'abcd1'
      };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);
        
      expect(response.body.error).toBe('Missing Fields');
    });
    
    test('Invalid Email Format', async () => {
      const userData = {
        email: 'invalidemail',
        password: 'password123',
        validity: 30,
        statusCode: 'abcd1'
      };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);
        
      expect(response.body.error).toBe('Invalid Email');
    });
    
    test('Short Password', async () => {
      const userData = {
        email: 'test@example.com',
        password: '123',
        validity: 30,
        statusCode: 'abcd1'
      };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);
        
      expect(response.body.error).toBe('Invalid Password');
    });
  });
});