import { Router } from 'express';
import * as authService from '../services/authService.js';
import { validateLoginInput } from '../validators/requestValidator.js';

// route ให้มาแล้ว — งานหลักอยู่ใน services/authService.js (CP50)
const router = Router();
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILED_LOGINS = 5;
const failedLogins = new Map();

function clientKey(req) {
  return req.ip ?? req.socket.remoteAddress ?? 'unknown';
}

function currentAttempts(key, now = Date.now()) {
  const attempts = (failedLogins.get(key) ?? []).filter((time) => now - time < LOGIN_WINDOW_MS);
  if (attempts.length) failedLogins.set(key, attempts);
  else failedLogins.delete(key);
  return attempts;
}

/** Challenge helper: ทำให้แต่ละ integration test เริ่มจาก limiter ว่างเสมอ */
export function resetLoginLimiter() {
  failedLogins.clear();
}

router.post('/login', (req, res) => {
  const key = clientKey(req);
  if (currentAttempts(key).length >= MAX_FAILED_LOGINS) {
    return res.status(429).json({ error: 'ลองเข้าสู่ระบบใหม่อีกครั้งภายหลัง' });
  }

  const errors = validateLoginInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: 'ข้อมูลเข้าสู่ระบบไม่ถูกต้อง', details: errors });
  }
  const result = authService.login(req.body.email, req.body.password);
  if (!result) {
    failedLogins.set(key, [...currentAttempts(key), Date.now()]);
    return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
  }
  failedLogins.delete(key);
  res.status(200).json(result);
});

export default router;
