import DashboardPage from './pages/DashboardPage.jsx';
import AppLayout from './pages/AppLayout.jsx';

function App() {
  return (
    <>
      {/* TODO 5A-CP01: ย้ายงานของ Dashboard ออกไปที่ DashboardPage.jsx */}
        <AppLayout>
          <DashboardPage />
        </AppLayout>
      {/* TODO 5A-CP02: เปลี่ยนทั้งไฟล์เป็น <Routes> ที่มี AppLayout เป็นกรอบ */}
    </>
  );
}

export default App;
