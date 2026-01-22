import React, { useState, useEffect } from "react";
import Layout from "../common/layout.jsx";
import { Link, useParams } from "react-router-dom";
import { getCourse } from "../../src/api/courses.js";
import { checkEnrollment, createOrder, addCourseToOrder, completeOrder } from "../../src/api/orders.js";
import { useAuth } from "../../src/hooks/useAuth.js";

const Details = () => {
    const { id } = useParams();
    const { user, isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sections, setSections] = useState([]);
    const [expandedSections, setExpandedSections] = useState({});
    const [selectedPreview, setSelectedPreview] = useState(null);
    const [enrollmentStatus, setEnrollmentStatus] = useState({ enrolled: false, enrollment: null });
    const [enrolling, setEnrolling] = useState(false);
    const [enrollError, setEnrollError] = useState('');
    const [enrollSuccess, setEnrollSuccess] = useState('');

    useEffect(() => {
        fetchCourse();
    }, [id]);

    const fetchCourse = async () => {
        try {
            const courseData = await getCourse(id);
            setCourse(courseData);
            
            // Check enrollment status if authenticated
            if (isAuthenticated) {
                try {
                    const status = await checkEnrollment(id);
                    setEnrollmentStatus(status);
                } catch (err) {
                    console.log('Enrollment check failed:', err);
                }
            }
            
            // Fetch sections if available
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/courses/${id}/sections`);
                if (response.ok) {
                    const sectionsData = await response.json();
                    console.log('Sections fetched:', sectionsData);
                    setSections(sectionsData);
                }
            } catch (err) {
                console.log('Sections not available:', err);
            }
            
            setLoading(false);
        } catch (err) {
            setError('Failed to load course details');
            setLoading(false);
            console.error('Error fetching course:', err);
        }
    };

    const enrollCourse = async () => {
        if (!user) {
            setEnrollError('Please login first');
            return;
        }

        try {
            setEnrolling(true);
            setEnrollError('');
            setEnrollSuccess('');

            // Step 1: Get user's pending order (cart)
            const ordersRes = await fetch(`http://127.0.0.1:8000/api/users/${user.id}/orders`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (!ordersRes.ok) {
                throw new Error('Failed to fetch cart');
            }

            const ordersData = await ordersRes.json();
            let cartOrderId = null;

            // Find pending order (cart)
            if (ordersData.orders && ordersData.orders.length > 0) {
                const pendingOrder = ordersData.orders.find(o => o.status === 'pending');
                if (pendingOrder) {
                    cartOrderId = pendingOrder.id;
                }
            }

            // Step 2: If no pending order exists, create one
            if (!cartOrderId) {
                const createRes = await fetch('http://127.0.0.1:8000/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({})
                });

                if (!createRes.ok) {
                    throw new Error('Failed to create cart');
                }

                const createData = await createRes.json();
                cartOrderId = createData.order.id;
            }

            // Step 3: Add course to cart (pending order)
            const addRes = await fetch('http://127.0.0.1:8000/api/order-items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    order_id: cartOrderId,
                    course_id: id,
                    price: course.price || 0
                })
            });

            if (!addRes.ok) {
                const errData = await addRes.json();
                throw new Error(errData.message || 'Failed to add course to cart');
            }

            setEnrollSuccess('✅ Course added to your cart!');
            
        } catch (error) {
            setEnrollError(error.message || 'Failed to add to cart');
            console.error('Add to cart error:', error);
        } finally {
            setEnrolling(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <section className="section">
                    <div className="container">
                        <p style={{ textAlign: 'center', padding: '2rem' }}>Loading course details...</p>
                    </div>
                </section>
            </Layout>
        );
    }

    if (error || !course) {
        return (
            <Layout>
                <section className="section">
                    <div className="container">
                        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--danger-color)' }}>{error || 'Course not found'}</p>
                    </div>
                </section>
            </Layout>
        );
    }

    const getThumbnailBackground = () => {
        if (course.thumbnail) {
            return `url(http://127.0.0.1:8000/storage/${course.thumbnail})`;
        }
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    };

    return (
        <Layout>
            {/* Course Header */}
            <section className="hero" style={{ padding: '3rem 0' }}>
                <div className="container">
                    <div className="grid grid-cols-2 gap-3 align-center">
                        <div>
                            <span className={`badge ${course.status === 'published' ? 'badge-success' : 'badge-warning'}`} style={{ marginBottom: '1rem' }}>
                                {course.status === 'published' ? 'Published' : 'Draft'}
                            </span>
                            <h1 style={{ color: 'white', marginBottom: '1rem' }}>{course.title}</h1>
                            <p style={{ fontSize: '1.125rem', opacity: 0.95, marginBottom: '1.5rem' }}>
                                {course.description}
                            </p>
                            <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1.25rem' }}>🎓</span>
                                    <span>{course.level}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1.25rem' }}>⏱️</span>
                                    <span>{course.duration} hours</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1.25rem' }}>📚</span>
                                    <span>{course.category?.name || 'Uncategorized'}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1.25rem' }}>🌐</span>
                                    <span>{course.language}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '2rem' }}>
                                <h2 style={{ color: 'white', fontSize: '2.5rem' }}>${course.price || 0}</h2>
                                {enrollmentStatus.enrolled ? (
                                    <span className="badge badge-success">✅ Already Enrolled</span>
                                ) : (
                                    <button 
                                        className="btn btn-primary"
                                        onClick={enrollCourse}
                                        disabled={enrolling}
                                        style={{ padding: '0.75rem 2rem', fontSize: '1rem', cursor: enrolling ? 'not-allowed' : 'pointer' }}
                                    >
                                        {enrolling ? 'Adding to cart...' : (course.price > 0 ? 'Enroll Now' : 'Enroll for FREE')}
                                    </button>
                                )}
                            </div>
                            {enrollError && (
                                <div className="alert alert-danger" style={{ marginTop: '1rem' }}>
                                    {enrollError}
                                </div>
                            )}
                            {enrollSuccess && (
                                <div className="alert alert-success" style={{ marginTop: '1rem', padding: '1rem', fontSize: '1rem', fontWeight: 600, borderRadius: 'var(--border-radius-md)' }}>
                                    {enrollSuccess}
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="card">
                                <div className="video-player-wrapper">
                                    <div 
                                        className="video-player" 
                                        style={{ 
                                            background: getThumbnailBackground(),
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            color: 'white', 
                                            fontSize: '3rem'
                                        }}
                                    >
                                        ▶️
                                    </div>
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                                        <h4 style={{ marginBottom: '1rem' }}>This course includes:</h4>
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                                                <span>📺</span> {course.duration} hours on-demand video
                                            </li>
                                            <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                                                <span>📄</span> Downloadable resources
                                            </li>
                                            <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                                                <span>♾️</span> Lifetime access
                                            </li>
                                            <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                                                <span>📱</span> Access on mobile and desktop
                                            </li>
                                            <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                                                <span>🏆</span> Certificate of completion
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {/* Tabs */}
                    <div className="tabs">
                        <ul className="tab-list">
                            <li className={`tab-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</li>
                            <li className={`tab-item ${activeTab === 'curriculum' ? 'active' : ''}`} onClick={() => setActiveTab('curriculum')}>Curriculum</li>
                            <li className={`tab-item ${activeTab === 'instructor' ? 'active' : ''}`} onClick={() => setActiveTab('instructor')}>Instructor</li>
                            <li className={`tab-item ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Reviews</li>
                        </ul>
                    </div>

                    {/* Tab Content */}
                    <div className={`tab-content ${activeTab === 'overview' ? 'active' : ''}`}>
                        <div className="card">
                            <h3 className="mb-3">Course Overview</h3>
                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ marginBottom: '1rem' }}>Description</h4>
                                <p>{course.description}</p>
                            </div>
                            <div>
                                <h4 style={{ marginBottom: '1rem' }}>Course Details</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)' }}>
                                        <strong>Level:</strong> {course.level}
                                    </div>
                                    <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)' }}>
                                        <strong>Duration:</strong> {course.duration} hours
                                    </div>
                                    <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)' }}>
                                        <strong>Category:</strong> {course.category?.name || 'Uncategorized'}
                                    </div>
                                    <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)' }}>
                                        <strong>Language:</strong> {course.language}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`tab-content ${activeTab === 'curriculum' ? 'active' : ''}`}>
                        <div className="card">
                            <h3 className="mb-3">Course Curriculum</h3>
                            
                            {sections.length === 0 ? (
                                <div>
                                    <p style={{ color: 'var(--text-secondary)' }}>Curriculum content coming soon...</p>
                                    <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)' }}>
                                        <p style={{ margin: 0 }}>📌 This course is currently in <strong>{course.status}</strong> status. Curriculum details will be available once the course is published.</p>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)' }}>
                                        <strong>{sections.length}</strong> sections • <strong>{sections.reduce((acc, sec) => acc + (sec.lectures?.length || 0), 0)}</strong> lectures
                                    </div>
                                    
                                    {sections.map((section, index) => (
                                        <div key={section.id} style={{ marginBottom: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)' }}>
                                            <div 
                                                style={{ 
                                                    padding: '1rem', 
                                                    background: 'var(--bg-secondary)', 
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}
                                                onClick={() => setExpandedSections(prev => ({ ...prev, [section.id]: !prev[section.id] }))}
                                            >
                                                <div>
                                                    <strong>Section {index + 1}: {section.title}</strong>
                                                    <span style={{ marginLeft: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                                        {section.lectures?.length || 0} lectures
                                                    </span>
                                                </div>
                                                <span>{expandedSections[section.id] ? '▼' : '▶'}</span>
                                            </div>
                                            
                                            {expandedSections[section.id] && section.lectures && (
                                                <div style={{ padding: '1rem' }}>
                                                    {section.lectures.length === 0 ? (
                                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No lectures in this section yet</p>
                                                    ) : (
                                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                                            {section.lectures.map((lecture, lecIndex) => (
                                                                <li 
                                                                    key={lecture.id} 
                                                                    style={{ 
                                                                        padding: '0.75rem', 
                                                                        borderBottom: lecIndex < section.lectures.length - 1 ? '1px solid var(--border-color)' : 'none',
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between',
                                                                        alignItems: 'center'
                                                                    }}
                                                                >
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                                        <span style={{ fontSize: '1.2rem' }}>▶️</span>
                                                                        <div>
                                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                                                <span>{lecture.title}</span>
                                                                                {lecture.is_preview && (
                                                                                    <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>Preview</span>
                                                                                )}
                                                                            </div>
                                                                            {lecture.duration > 0 && (
                                                                                <small style={{ color: 'var(--text-secondary)' }}>{lecture.duration} min</small>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    {lecture.is_preview && lecture.video_url && (
                                                                        <button 
                                                                            className="btn btn-sm btn-outline"
                                                                            onClick={() => setSelectedPreview(lecture)}
                                                                        >
                                                                            👁️ Preview
                                                                        </button>
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        {/* Preview Modal */}
                        {selectedPreview && (
                            <div 
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'rgba(0,0,0,0.8)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 1000,
                                    padding: '2rem'
                                }}
                                onClick={() => setSelectedPreview(null)}
                            >
                                <div 
                                    className="card" 
                                    style={{ maxWidth: '900px', width: '100%' }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ margin: 0 }}>{selectedPreview.title}</h3>
                                        <button 
                                            className="btn btn-sm btn-outline"
                                            onClick={() => setSelectedPreview(null)}
                                        >
                                            ✕ Close
                                        </button>
                                    </div>
                                    <div>
                                        <video 
                                            controls 
                                            autoPlay
                                            style={{ width: '100%', maxHeight: '500px', background: '#000' }}
                                            src={`http://127.0.0.1:8000/storage/${selectedPreview.video_url}`}
                                            onError={(e) => {
                                                console.error('Video load error:', {
                                                    video_url: selectedPreview.video_url,
                                                    constructed_url: `http://127.0.0.1:8000/storage/${selectedPreview.video_url}`,
                                                    error: e
                                                });
                                            }}
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    {selectedPreview.content && (
                                        <div style={{ padding: '1.5rem' }}>
                                            <p>{selectedPreview.content}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={`tab-content ${activeTab === 'instructor' ? 'active' : ''}`}>
                        <div className="card">
                            <h3 className="mb-3">Course Instructor</h3>
                            {course.instructor ? (
                                <div style={{ display: 'flex', gap: '2rem', alignItems: 'start' }}>
                                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '3rem' }}>
                                        👤
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3>{course.instructor.name}</h3>
                                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                            {course.instructor.role || 'Course Instructor'}
                                        </p>
                                        <p style={{ marginBottom: '1rem' }}>
                                            {course.instructor.bio || 'Experienced instructor dedicated to helping students learn and grow.'}
                                        </p>
                                        {course.instructor.email && (
                                            <div style={{ marginTop: '1.5rem' }}>
                                                <a href={`mailto:${course.instructor.email}`} className="btn btn-sm btn-primary">
                                                    Contact Instructor
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p style={{ color: 'var(--text-secondary)' }}>Instructor information not available.</p>
                            )}
                        </div>
                    </div>

                    <div className={`tab-content ${activeTab === 'reviews' ? 'active' : ''}`}>
                        <div className="card">
                            <h3 className="mb-3">Student Reviews</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Reviews will appear here once students enroll in the course.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enroll Section at End */}
            <section className="section" style={{ background: 'var(--bg-secondary)', padding: '3rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center' }}>
                        {enrollmentStatus.enrolled ? (
                            <div>
                                <h2 style={{ marginBottom: '1rem' }}>✅ Already Enrolled</h2>
                                <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>You are enrolled in this course. Start learning now!</p>
                                <Link to={`/course/${id}/lessons`} className="btn btn-success btn-lg">
                                    Go to Course
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <h2 style={{ marginBottom: '1rem' }}>Ready to learn?</h2>
                                <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>Add to cart and start your learning journey</p>
                                <button 
                                    className="btn btn-primary btn-lg"
                                    onClick={enrollCourse}
                                    disabled={enrolling}
                                    style={{ padding: '1rem 3rem', fontSize: '1.1rem', cursor: enrolling ? 'not-allowed' : 'pointer' }}
                                >
                                    {enrolling ? 'Adding to cart...' : (course.price > 0 ? `Enroll Now - $${course.price}` : 'Enroll for FREE')}
                                </button>
                                {enrollError && (
                                    <div className="alert alert-danger" style={{ marginTop: '1rem', maxWidth: '500px', margin: '1rem auto 0' }}>
                                        {enrollError}
                                    </div>
                                )}
                                {enrollSuccess && (
                                    <div className="alert alert-success" style={{ marginTop: '1rem', maxWidth: '500px', margin: '1rem auto 0', padding: '1rem', fontSize: '1rem', fontWeight: 600 }}>
                                        {enrollSuccess}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    )
}   
export default Details