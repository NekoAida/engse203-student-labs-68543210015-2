# AI_USAGE — LAB 06

บันทึกการใช้ AI ระหว่างทำงาน · **ใช้ AI ได้ แต่ต้องเป็นเจ้าของโค้ดที่ส่ง**

> ผู้สอนจะสุ่มถามจากโค้ดที่ส่ง — ถ้าอธิบายไม่ได้ คะแนนส่วนนั้นจะถูกทบทวน

---

## ครั้งที่ 1

**ถามอะไร**
วิธีทำ Error Handling รวมศูนย์ (errorHandler, notFound middleware) ใน Express 5 สำหรับ Take-Home (CP07)

**AI ตอบว่าอย่างไร (สรุปสั้น)**
middleware สำหรับ error handler ใน Express ต้องรับ 4 parameters `(err, req, res, next)` เสมอ Express ถึงจะรู้ว่าเป็น error middleware โดยให้ตอบกลับ status 500 พร้อม JSON `{ error: ... }` และ `notFound` เป็น middleware สำหรับจัดการ route ที่ไม่มี ให้ตอบ status 404 โดยทั้งสองต้องนำไปวางไว้ท้ายสุดใน `app.js` หลัง route ทั้งหมด

**ใช้ส่วนไหน / แก้เองตรงไหน**
นำโครงสร้าง errorHandler และ notFound ไปใส่ใน `src/middleware/errorHandler.js` และนำไปเชื่อมใน `src/app.js` ด้วย `app.use(notFound)` และ `app.use(errorHandler)`

**เข้าใจโค้ดที่ได้มาไหม** ☑ เข้าใจทั้งหมด ☐ เข้าใจบางส่วน ☐ ยังไม่เข้าใจ

---

## ครั้งที่ 2

**ถามอะไร**
การทำ Challenge (PUT /api/requests/:id) เพื่ออัปเดตสถานะคำร้อง และการตรวจสอบความถูกต้องของ status

**AI ตอบว่าอย่างไร (สรุปสั้น)**
ใน service ให้ค้นหาคำร้องด้วย id ถ้าพบให้อัปเดตสถานะ ('pending', 'in-progress', 'completed') แล้วคืน structuredClone ถ้าไม่พบคืน null ใน controller ให้ตรวจสอบว่า status อยู่ในรายการที่อนุญาตหรือไม่ ถ้าไม่อยู่ให้ตอบ 400 ถ้าไม่พบคำร้องตอบ 404 ถ้าสำเร็จตอบ 200 พร้อมข้อมูลที่อัปเดต และผูก route ใน router ด้วย `router.put('/:id', ...)`

**ใช้ส่วนไหน / แก้เองตรงไหน**
นำไปเขียนใน `src/services/requestService.js` (ฟังก์ชัน updateStatus), `src/controllers/requestController.js` (ฟังก์ชัน updateRequestStatus) และ `src/routes/requestRoutes.js`

**เข้าใจโค้ดที่ได้มาไหม** ☑ เข้าใจทั้งหมด ☐ เข้าใจบางส่วน ☐ ยังไม่เข้าใจ

---

## สรุป

- ส่วนที่เขียนเองทั้งหมด: CP00 - CP05 ในห้องเรียน (GET, POST, DELETE, logger middleware, express.json)
- ส่วนที่ AI ช่วย: ให้คำแนะนำและโค้ดในส่วน Take-Home CP07 (notFound, errorHandler) และ Challenge (PUT update status)
- ส่วนที่ยังไม่มั่นใจ: ไม่มี มั่นใจและทดสอบผ่าน checker ครบ 28/28 รายการ
