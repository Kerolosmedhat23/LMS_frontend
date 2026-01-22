import React, { useEffect, useState } from "react";
import Layout from "../../common/layout.jsx";
import { Link } from "react-router-dom";
import { getEnrollments, removeEnrollment } from "../../../src/api/orders.js";

const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [removing, setRemoving] = useState(null);

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await getEnrollments();
            setCourses(data || []);
        } catch (err) {
            console.error(err);
            setError('Failed to load your courses');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveEnrollment = async (enrollmentId, courseTitle) => {
        if (!window.confirm(`Are you sure you want to remove "${courseTitle}" from your courses?`)) {
            return;
        }

        setRemoving(enrollmentId);
        try {
            await removeEnrollment(enrollmentId);
            alert('✅ Course removed from your enrollments');
            await fetchEnrollments();
        } catch (err) {
            console.error('Remove enrollment failed:', err);
            alert('Failed to remove enrollment: ' + (err?.response?.data?.message || err.message));
        } finally {
            setRemoving(null);
        }
    };

    return (
        <Layout>
            <section className="section">
                <div className="container">
                    <div style={{ marginBottom: '3rem' }}>
                        <h1 className="mb-2">My Courses</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>Continue learning and track your progress</p>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    {loading ? (
                        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
                    ) : courses.length === 0 ? (
                        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <p>No enrollments yet.</p>
                            <Link to="/courses" className="btn btn-primary" style={{ marginTop: '1rem' }}>Browse Courses</Link>
                        </div>
                    ) : (
                        <div className="card">
                            <h3 className="mb-3">Your Enrollments</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {courses.map((enrollment) => (
                                    <div key={enrollment.id} style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-lg)' }}>
                                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                                            <div style={{ width: '160px', height: '100px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 'var(--border-radius-md)', backgroundImage: enrollment.course?.thumbnail ? `url(http://127.0.0.1:8000/storage/${enrollment.course.thumbnail})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ marginBottom: '0.5rem' }}>{enrollment.course?.title || 'Course'}</h4>
                                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                                                    {enrollment.course?.category?.name || 'Uncategorized'}
                                                </p>
                                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Status: {enrollment.status}</p>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                <Link to="/account/watchcourse" className="btn btn-primary">Start Learning</Link>
                                                <button 
                                                    className="btn btn-outline btn-sm"
                                                    onClick={() => handleRemoveEnrollment(enrollment.id, enrollment.course?.title)}
                                                    disabled={removing === enrollment.id}
                                                    style={{ cursor: removing === enrollment.id ? 'not-allowed' : 'pointer' }}
                                                >
                                                    {removing === enrollment.id ? 'Removing...' : '🗑️ Remove'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
};  
export default MyCourses