import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSync, faEnvelope, faPhone, faUser, faCalendar, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';

function Admin() {
  const [submissions, setSubmissions] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [subRes, subSCR] = await Promise.all([
        fetch('https://she-can-oxk3.onrender.com/api/submissions'),
        fetch('https://she-can-oxk3.onrender.com/api/newsletter'),
      ]);
      if (!subRes.ok || !subSCR.ok) throw new Error('Failed to fetch');
      setSubmissions(await subRes.json());
      setSubscribers(await subSCR.json());
    } catch {
      setError('Could not load data. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
    const wb = XLSX.utils.book_new();

    const subData = submissions.map((s) => ({
      Name: s.fullName,
      Email: s.email,
      Phone: s.phone,
      Message: s.message,
      Submitted: new Date(s.createdAt).toLocaleString(),
    }));
    const ws1 = XLSX.utils.json_to_sheet(subData);
    XLSX.utils.book_append_sheet(wb, ws1, 'Contact Submissions');

    const subSCRData = subscribers.map((s) => ({
      Email: s.email,
      Subscribed: new Date(s.subscribedAt).toLocaleString(),
    }));
    const ws2 = XLSX.utils.json_to_sheet(subSCRData);
    XLSX.utils.book_append_sheet(wb, ws2, 'Newsletter Subscribers');

    XLSX.writeFile(wb, 'she-can-data.xlsx');
  };

  return (
    <section className="admin-section section">
      <div className="container">
        <div className="admin-header" data-aos="fade-up">
          <h2 className="section-title">Admin Dashboard</h2>
          <p className="section-subtitle">{submissions.length} submissions & {subscribers.length} newsletter subscribers</p>
          <div className="admin-actions">
            <button className="btn btn-outline refresh-btn" onClick={fetchData}>
              <FontAwesomeIcon icon={faSync} className={loading ? 'spin' : ''} />
              Refresh
            </button>
            <button className="btn btn-primary" onClick={downloadExcel} disabled={submissions.length === 0 && subscribers.length === 0}>
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
            <p>Loading data...</p>
          </div>
        ) : (
          <>
            <h3 className="admin-section-heading">Contact Submissions</h3>
            <div className="submissions-grid">
              {submissions.length === 0 && !error ? (
                <div className="admin-empty glass" data-aos="fade-up">
                  <p>No submissions yet.</p>
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

            <h3 className="admin-section-heading" style={{ marginTop: 48 }}>Newsletter Subscribers</h3>
            <div className="submissions-grid">
              {subscribers.length === 0 && !error ? (
                <div className="admin-empty glass" data-aos="fade-up">
                  <p>No subscribers yet.</p>
                </div>
              ) : (
                subscribers.map((sub, index) => (
                  <div
                    key={sub._id}
                    className="submission-card glass"
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                  >
                    <div className="submission-avatar" style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' }}>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div className="submission-details">
                      <h3>{sub.email}</h3>
                      <div className="submission-meta">
                        <span>
                          <FontAwesomeIcon icon={faCalendar} /> Subscribed: {formatDate(sub.subscribedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Admin;
