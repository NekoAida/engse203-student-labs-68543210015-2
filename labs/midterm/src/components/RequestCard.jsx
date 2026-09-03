import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

function RequestCard({ request, onDeleteRequest, onAcknowledge }) {
  return (
    <article className="request-card">
      <div>
        <p className="request-id">{request.id}</p>
        <h3><Link to={`/requests/${request.id}`}>{request.requestType}</Link></h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
        <p><StatusBadge status={request.status} /> · {request.priority} </p>
      </div>
      <div className="request-card-actions">
        {request.status === 'pending' && (
          <button
            className="button primary"
            type="button"
            onClick={() => onAcknowledge(request.id)}
            aria-label={`รับเรื่อง ${request.id}`}
          >
            รับเรื่อง
          </button>
        )}
        <button
          className="button danger"
          type="button"
          onClick={() => onDeleteRequest(request.id)}
          aria-label={`ลบคำร้อง ${request.id}`}
        >
          ลบ
        </button>
      </div>
    </article>
  );
}

export default RequestCard;
