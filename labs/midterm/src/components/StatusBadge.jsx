function StatusBadge({ status }) {
    switch (status) {
        case 'pending':
            return <span className="status-badge status-pending">รอดำเนินการ</span>;
        case 'in-progress':
            return <span className="status-badge status-in-progress">กำลังดำเนินการ</span>;
        case 'completed':
            return <span className="status-badge status-completed">เสร็จสิ้น</span>;
        default:
            return <span className="status-badge status-unknown">ไม่ทราบสถานะ</span>;
    }
}

export default StatusBadge;