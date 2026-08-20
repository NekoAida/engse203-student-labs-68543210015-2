# Week 05 — React Campus Service Request

## เริ่มงาน

```bash
git switch main
git pull origin main
git switch -c lab/week-05
```

คัดลอก LAB 5 starter จาก Course Repository มาไว้ใน `source/` แล้วรัน:

```bash
npm --prefix labs/week-05/source install
npm --prefix labs/week-05/source run check
npm --prefix labs/week-05/source run build
npm run import:publish -- week-05 labs/week-05/source/dist
```

ใส่ผล TC-01–TC-24 และภาพ desktop/mobile ใน `evidence/` จากนั้นแก้ metadata, รัน `npm run build:pages` และ `npm run verify:lab -- week-05`

Submission tag: `lab-05-submission-v1`
