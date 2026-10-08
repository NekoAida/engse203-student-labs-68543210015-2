import { describe, test, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/app.js';
import { loadSeed } from '../../src/services/requestService.js';
import { STAFF, loginAsStaff, tokenFor } from '../helpers/auth.js';
import { resetLoginLimiter } from '../../src/routes/authRoutes.js';

/**
 * Week 13 — เข้าสู่ระบบและสิทธิ์
 * test 3 ข้อแรกให้มาแล้ว — จะ fail จนกว่าจะทำ CP50–CP51 เสร็จ (เขียน test ก่อน แล้วทำให้ผ่าน)
 */
const app = createApp();
beforeEach(async () => {
  resetLoginLimiter();
  await loadSeed();
});

describe('POST /api/auth/login', () => {
  test('อีเมลและรหัสผ่านถูก → 200 พร้อม token', async () => {
    const r = await request(app).post('/api/auth/login').send(STAFF);
    expect(r.status).toBe(200);
    expect(r.body.token.split('.')).toHaveLength(3);
  });
  test('รหัสผ่านผิด → 401', async () => {
    const r = await request(app).post('/api/auth/login').send({ ...STAFF, password: 'nope1234' });
    expect(r.status).toBe(401);
  });
  test('อีเมลไม่มี → ข้อความเดียวกับรหัสผิด', async () => { const a=await request(app).post('/api/auth/login').send({ ...STAFF,password:'nope1234' }); const b=await request(app).post('/api/auth/login').send({email:'none@example.com',password:'nope1234'}); expect(b.status).toBe(401); expect(b.body.error).toBe(a.body.error); });
  test('ผิดเกิน 5 ครั้งใน 15 นาที → 429', async () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      await request(app).post('/api/auth/login').send({ ...STAFF, password: 'nope1234' }).expect(401);
    }
    await request(app).post('/api/auth/login').send({ ...STAFF, password: 'nope1234' }).expect(429);
  });

  // 🏫 TODO W13-LOGIN (CP50): อีเมลที่ไม่มี ต้องได้ข้อความ error เดียวกับรหัสผ่านผิด
});

describe('สิทธิ์ของ PUT / DELETE', () => {
  test('ไม่มี token → 401', async () => {
    const r = await request(app).put('/api/requests/REQ-001').send({ status: 'completed' });
    expect(r.status).toBe(401);
  });
  test('token requester → 403', async () => expect((await request(app).put('/api/requests/REQ-001').set('Authorization',`Bearer ${tokenFor('requester')}`).send({status:'completed'})).status).toBe(403));
  test('token ปลอม → 401', async () => expect((await request(app).put('/api/requests/REQ-001').set('Authorization',`Bearer ${tokenFor('staff','not-the-real-secret')}`).send({status:'completed'})).status).toBe(401));
  test('staff PUT → 200', async () => { const t=await loginAsStaff(app); expect((await request(app).put('/api/requests/REQ-001').set('Authorization',`Bearer ${t}`).send({status:'completed'})).status).toBe(200); });
  test('staff DELETE → 204', async () => { const t=await loginAsStaff(app); expect((await request(app).delete('/api/requests/REQ-003').set('Authorization',`Bearer ${t}`)).status).toBe(204); });

  // 🏫 TODO W13-AUTH (CP51): เพิ่ม
  //   - token ที่ไม่ใช่เจ้าหน้าที่ → 403      ใช้ tokenFor('requester')
  //   - token ปลอม (secret อื่น) → 401        ใช้ tokenFor('staff', 'not-the-real-secret')
  //   - เจ้าหน้าที่ → PUT 200 และ DELETE 204  ใช้ await loginAsStaff(app)
  //   ⚠ หลังผูก authenticate แล้ว test ของ PUT/DELETE ใน requests.api.test.js จะพัง (401)
  //     — นั่นคือสัญญาณว่า requirement เปลี่ยน: แก้ test ให้เข้าสู่ระบบก่อน
});
