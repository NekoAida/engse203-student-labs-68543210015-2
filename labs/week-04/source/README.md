# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

- ชื่อ–นามสกุล: NekoAida
- รหัสนักศึกษา: 68543210015
- Section: SEC2

## URLs

- Repository: https://github.com/NekoAida/engse203-lab04-68543210015-2
- Pull Request:
- GitHub Pages:

## Component Tree

```text
App (Owns requests, statusFilter state)
├── AppHeader
├── SummaryPanel (Receives summary props)
├── RequestForm (Receives onAddRequest callback, owns formData/errors state)
├── FilterBar (Receives value props, onFilterChange callback)
└── RequestList (Receives requests props, onDeleteRequest callback)
    └── RequestCard (Receives request props, onDeleteRequest callback)
```

## Setup และ Run

```bash
nvm use
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## State / Props / Callback Explanation

State ที่เกี่ยวกับข้อมูลรายการ (`requests`) และตัวกรอง (`statusFilter`) ถูกเก็บไว้ที่ `App` ซึ่งเป็น Parent สูงสุด เพื่อให้สามารถส่ง props ไปให้ทั้ง `SummaryPanel`, `FilterBar`, และ `RequestList` ได้ 
`RequestForm` จัดการ state ย่อยของตัวเอง (ฟอร์ม input, errors) และส่ง callback `onAddRequest` ขึ้นไปอัปเดต state ใหญ่ใน `App`
การลบทำผ่าน `onDeleteRequest` ที่ถูกส่งผ่าน `RequestList` ลงไปสู่ `RequestCard`

## Test Evidence

| Test ID | Actual Result | Pass/Fail | Evidence/Screenshot |
|---|---|---|---|
| TC-01 Initial | แสดง initial state ถูกต้อง | Pass | see evidence folder |
| TC-02 Controlled input | ฟิลด์เปลี่ยนค่าตามการพิมพ์ได้ถูกต้อง | Pass | see evidence folder |
| TC-03 Invalid | มี error โชว์ใต้ input เมื่อกรอกผิด | Pass | see evidence folder |
| TC-04 Valid add | กดปุ่มเพิ่มแล้วข้อมูลเข้าระบบ/ฟอร์มถูกล้าง | Pass | see evidence folder |
| TC-05 Filter | ตัวกรองสถานะทำงานตามเงื่อนไขที่เลือก | Pass | see evidence folder |
| TC-06 All | ตัวกรองแสดงทั้งหมดทำงานถูกต้อง | Pass | see evidence folder |
| TC-07 Empty | มีข้อความแจ้งเตือนไม่พบข้อมูล | Pass | see evidence folder |
| TC-08 Delete | ลบข้อมูลที่เลือกออกไปได้สำเร็จ | Pass | see evidence folder |
| TC-09 Mobile | หน้าเว็บตอบสนองกับ 375px อย่างถูกต้อง | Pass | see evidence folder |
| TC-10 Keyboard | ใช้ Tab เลื่อน input ได้ | Pass | see evidence folder |
| TC-11 Build | Build ผ่านโดยไม่มีปัญหา | Pass | see evidence folder |
| TC-12 Pages | ตรวจสอบผ่าน Github Pages พบหน้าเว็บถูกต้อง | Pass | see evidence folder |

## Screenshots

- Desktop: `evidence/desktop-1280.png`
- Mobile 375px: `evidence/mobile-375.png`
- Validation/empty state: `evidence/invalid-state.png`, `evidence/empty-state.png`

## Week 03 → Week 04 Reflection

DOM Mutation ใน Week 03 ต้องมาคอยดักจับ Event แล้วจับคู่กับ element แต่ละตัวใน DOM แล้วจึงแก้ DOM (เช่น querySelector) ซึ่งซับซ้อน แต่ State-driven UI ของ React ใน Week 04 ทำให้เราสนใจแค่ข้อมูล (State) พอ State เปลี่ยน React จะอัปเดต UI ให้เราเองอัตโนมัติ ทำให้เขียนง่ายขึ้น เป็นระเบียบขึ้น

## AI / External Resource Disclosure

ระบุเครื่องมือหรือแหล่งที่ใช้, prompt/คำถามสำคัญ, ส่วนที่นำมาปรับ และวิธีที่ตรวจสอบความถูกต้อง หากไม่ได้ใช้ให้เขียนว่า “ไม่ได้ใช้”

