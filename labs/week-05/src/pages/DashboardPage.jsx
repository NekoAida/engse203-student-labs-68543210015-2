import { useMemo, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useManualReload from '../hooks/useManualReload.js';
import FilterBar from '../components/FilterBar.jsx';
import RequestList from '../components/RequestList.jsx';
import SummaryPanel from '../components/SummaryPanel.jsx';
import LoadingState from '../components/LoadingState.jsx';
import ErrorState from '../components/ErrorState.jsx';

import { getRequests, deleteRequest, resetRequests } from '../services/requestService.js';

function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const scenario = searchParams.get('scenario') ?? '';
  const [reloadKey, reload] = useManualReload();

  const [loadState, setLoadState] = useState("idle");

  const [requests, setRequests] = useState([]);  // TODO 5A-2
  const [statusFilter, setStatusFilter] = useState('all');
  const [notice, setNotice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const summary = useMemo(() => ({
    total: requests.length,
    pending: requests.filter((request) => request.status === 'pending').length,
    inProgress: requests.filter((request) => request.status === 'in-progress').length,
    completed: requests.filter((request) => request.status === 'completed').length,
  }), [requests]);

  const filteredRequests = statusFilter === 'all'
    ? requests
    : requests.filter((request) => request.status === statusFilter);

  async function handleAdd(input) {
    setRequests((current) => [...current, { ...input, id: `REQ-W4-${Date.now()}`, status: 'pending' }]);
    setNotice('เพิ่มคำร้องในหน่วยความจำแล้ว — กด refresh แล้วจะหาย นี่คือโจทย์ของคาบ 5B');
  }

  function handleRetry() {
    if (scenario) setSearchParams({});
    else reload();
  }

  async function handleDelete(requestId) {
    const next = await deleteRequest(requestId);
    setRequests(next);
    setNotice(`ลบคำร้อง ${requestId} แล้ว`);
  }

  async function handleReset() {
    if (!window.confirm('คืนค่าข้อมูลตัวอย่างเริ่มต้น และลบคำร้องที่เพิ่มไว้ทั้งหมด?')) return;
    const seedRequests = await resetRequests();
    setRequests(seedRequests);
    setStatusFilter('all');
    setNotice('คืนค่าข้อมูลตัวอย่างเรียบร้อยแล้ว');
  }



  useEffect(() => {
    let ignore = false;
    setLoadState("loading");
    setErrorMessage('');
    setNotice('');

    getRequests({ scenario, onRecovery: setNotice })
      .then((requests) => {
        if (ignore) return;
        setRequests(requests);
        setLoadState("success");
      })
      .catch((error) => {
        if (ignore) return;
        setErrorMessage(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
        setLoadState('error');
      });

    return () => {
      ignore = true;
    };
  }, [scenario, reloadKey]);

  return (
    <section data-testid="page-dashboard">
      <div className="page-heading">
        <p className="eyebrow dark">CP01 · PAGE REFACTOR</p>
        <h1>Campus Service Request</h1>
        <p>ตรวจ add, filter, delete และ validation ว่ายังทำงานเหมือนเดิม</p>
      </div>

      <div>
        <button className="button ghost" data-testid="reset-button" type="button" onClick={handleReset}>
          Reset Demo Data
        </button>
      </div>

      {scenario && <p className="lab-scenario" role="status">LAB test scenario: {scenario}</p>}
      {notice && <p className="notice" role="status">{notice}</p>}

      {loadState === 'loading' && <LoadingState />}
      {loadState === 'error' && <ErrorState message={errorMessage} onRetry={handleRetry} />}

      {loadState === 'success' && requests.length === 0 && (
        <section className="state-card" data-testid="empty-state">
          <h2>ยังไม่มีคำร้อง</h2>
          <p>เริ่มสร้างคำร้องแรกของคุณได้เลย</p>
          <Link className="button primary inline" to="/requests/new">สร้างคำร้องใหม่</Link>
        </section>
      )}

      {loadState === 'success' && requests.length > 0 && (
        <>
          <SummaryPanel summary={summary} />

          <div className="workspace-grid">
            <section className="panel form-panel">
              {/* <RequestForm onAddRequest={handleAdd} /> */}
            </section>
            <section className="panel" aria-labelledby="request-list-title">
              <div className="section-heading">
                <h2 id="request-list-title">รายการคำร้อง</h2>
                <FilterBar value={statusFilter} onFilterChange={setStatusFilter} />
              </div>
              <RequestList requests={filteredRequests} onDeleteRequest={handleDelete} />
            </section>
          </div>
        </>
      )}
    </section>
  );
}

export default DashboardPage;
