import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSync, faEnvelope, faPhone, faUser, faCalendar, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';

function Admin() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://she-can-oxk3.onrender.com/api/submissions');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setSubmissions(data);
    } catch {
      setError('Could not load submissions. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const downloadExcel = () => {
    const data = submissions.map((s) => ({
      Name: s.fullName,
      Email: s.email,
      Phone: s.phone,
      Message: s.message,
      Submitted: new Date(s.createdAt).toLocaleString(),
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Submissions');
    XLSX.writeFile(wb, 'submissions.xlsx');
  };

  return (
    <section className="admin-section section">
      <div className="container">
        <div className="admin-header" data-aos="fade-up">
          <h2 className="section-title">Admin Dashboard</h2>
          <p className="section-subtitle">View all volunteer contact submissions</p>
          <div className="admin-actions">
            <button className="btn btn-outline refresh-btn" onClick={fetchSubmissions}>
              <FontAwesomeIcon icon={faSync} className={loading ? 'spin' : ''} />
              Refresh
            </button>
            <button className="btn btn-primary" onClick={downloadExcel} disabled={submissions.length === 0}>
              <FontAwesomeIcon icon={faFileExcel} /> Download Excel
            </button>
          </div>
        </div>

        {error && (
          <div className="admin-error glass" data-aos="fade-up">
            <p>{error}</p>
          </div>
        )}

        {loading && !error ? (
          <div className="admin-loading" data-aos="fade-up">
            <div className="spinner"></div>
            <p>Loading submissions...</p>
          </div>
        ) : (
          <div className="submissions-grid">
            {submissions.length === 0 && !error ? (
              <div className="admin-empty glass" data-aos="fade-up">
                <p>No submissions yet. Be the first to reach out!</p>
              </div>
            ) : (
              submissions.map((sub, index) => (
                <div
                  key={sub._id}
                  className="submission-card glass"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <div className="submission-avatar">
                    {getInitials(sub.fullName)}
                  </div>
                  <div className="submission-details">
                    <h3>{sub.fullName}</h3>
                    <div className="submission-meta">
                      <span>
                        <FontAwesomeIcon icon={faEnvelope} /> {sub.email}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faPhone} /> {sub.phone}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faCalendar} /> {formatDate(sub.createdAt)}
                      </span>
                    </div>
                    <p className="submission-message">{sub.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Admin;
