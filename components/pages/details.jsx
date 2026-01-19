import React, { useState } from "react";
import Layout from "../common/layout.jsx";
import { Link } from "react-router-dom";

const Details = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <Layout>
            {/* Course Header */}
            <section className="hero" style={{ padding: '3rem 0' }}>
                <div className="container">
                    <div className="grid grid-cols-2 gap-3 align-center">
                        <div>
                            <span className="badge badge-warning" style={{ marginBottom: '1rem' }}>Bestseller</span>
                            <h1 style={{ color: 'white', marginBottom: '1rem' }}>Complete Web Development Bootcamp</h1>
                            <p style={{ fontSize: '1.125rem', opacity: 0.95, marginBottom: '1.5rem' }}>
                                Master full-stack web development from scratch with HTML, CSS, JavaScript, React, and Node.js
                            </p>
                            <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1.25rem' }}>⭐</span>
                                    <span>4.8 (2,547 ratings)</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1.25rem' }}>👥</span>
                                    <span>12,458 students</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1.25rem' }}>🎓</span>
                                    <span>Certificate included</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '2rem' }}>
                                <h2 style={{ color: 'white', fontSize: '2.5rem' }}>$49.99</h2>
                                <span style={{ fontSize: '1.5rem', textDecoration: 'line-through', opacity: 0.7 }}>$99.99</span>
                                <span className="badge badge-danger">50% OFF</span>
                            </div>
                        </div>
                        <div>
                            <div className="card">
                                <div className="video-player-wrapper">
                                    <div className="video-player" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '3rem' }}>
                                        ▶️
                                    </div>
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <Link to="/account/checkout" className="btn btn-primary btn-block btn-lg">Enroll Now</Link>
                                    <button className="btn btn-outline btn-block" style={{ marginTop: '1rem' }}>Add to Wishlist ❤️</button>
                                    <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                                        <h4 style={{ marginBottom: '1rem' }}>This course includes:</h4>
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                                                <span>📺</span> 52 hours on-demand video
                                            </li>
                                            <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                                                <span>📄</span> 75 downloadable resources
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
                            <h3 className="mb-3">What you'll learn</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <span style={{ color: 'var(--success-color)' }}>✓</span>
                                    <span>Build responsive websites with HTML5 and CSS3</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <span style={{ color: 'var(--success-color)' }}>✓</span>
                                    <span>Master JavaScript and modern ES6+ features</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <span style={{ color: 'var(--success-color)' }}>✓</span>
                                    <span>Create interactive UIs with React.js</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <span style={{ color: 'var(--success-color)' }}>✓</span>
                                    <span>Build RESTful APIs with Node.js and Express</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <span style={{ color: 'var(--success-color)' }}>✓</span>
                                    <span>Work with databases (MongoDB, PostgreSQL)</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <span style={{ color: 'var(--success-color)' }}>✓</span>
                                    <span>Deploy applications to production</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`tab-content ${activeTab === 'curriculum' ? 'active' : ''}`}>
                        <div className="card">
                            <h3 className="mb-3">Course Curriculum</h3>
                            {[1, 2, 3, 4].map(section => (
                                <div key={section} style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <h4>Section {section}: Getting Started</h4>
                                        <span className="badge badge-primary">8 lectures</span>
                                    </div>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {[1, 2, 3].map(lecture => (
                                            <li key={lecture} style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                                                <span>📹 Lecture {lecture}: Introduction to Web Development</span>
                                                <span style={{ color: 'var(--text-secondary)' }}>12:45</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`tab-content ${activeTab === 'instructor' ? 'active' : ''}`}>
                        <div className="card">
                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'start' }}>
                                <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}></div>
                                <div style={{ flex: 1 }}>
                                    <h3>John Doe</h3>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Senior Full-Stack Developer & Instructor</p>
                                    <p>John has over 10 years of experience in web development and has taught more than 100,000 students worldwide. He specializes in modern JavaScript frameworks and backend development.</p>
                                    <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem' }}>
                                        <div>
                                            <strong>4.8</strong>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Instructor Rating</p>
                                        </div>
                                        <div>
                                            <strong>45,892</strong>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Students</p>
                                        </div>
                                        <div>
                                            <strong>12</strong>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Courses</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`tab-content ${activeTab === 'reviews' ? 'active' : ''}`}>
                        <div className="card">
                            <h3 className="mb-3">Student Reviews</h3>
                            {[1, 2, 3].map(review => (
                                <div key={review} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-light)' }}></div>
                                        <div>
                                            <h4 style={{ marginBottom: '0.25rem' }}>Student Name</h4>
                                            <div style={{ color: 'var(--accent-color)' }}>★★★★★ 5.0</div>
                                        </div>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)' }}>This course exceeded my expectations! The instructor explains everything clearly and the hands-on projects really helped solidify my understanding.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}   
export default Details