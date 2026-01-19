import React from "react";
import Layout from "../../common/layout.jsx";
import { Link } from "react-router-dom";

const EnrolledCourse = () => {
    return (
        <Layout>
            <section className="section">
                <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
                    <div className="card">
                        <div style={{ padding: '3rem 2rem' }}>
                            <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🎉</div>
                            <h1 className="mb-3">Congratulations!</h1>
                            <h2 style={{ color: 'var(--text-secondary)', fontWeight: 400, marginBottom: '2rem' }}>
                                You've successfully enrolled in<br/>
                                <span style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Complete Web Development Bootcamp</span>
                            </h2>

                            <div className="alert alert-success" style={{ marginBottom: '2rem' }}>
                                ✓ A confirmation email has been sent to your inbox with course details and access information.
                            </div>

                            <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', marginBottom: '2rem' }}>
                                <h3 className="mb-3">What's Next?</h3>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>1️⃣</span>
                                        <div>
                                            <h4 style={{ marginBottom: '0.25rem' }}>Start Learning</h4>
                                            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Access your course content immediately and begin your learning journey</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>2️⃣</span>
                                        <div>
                                            <h4 style={{ marginBottom: '0.25rem' }}>Join the Community</h4>
                                            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Connect with fellow students and instructors in the course discussion forum</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>3️⃣</span>
                                        <div>
                                            <h4 style={{ marginBottom: '0.25rem' }}>Earn Your Certificate</h4>
                                            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Complete all lectures and assignments to receive your certificate of completion</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link to="/account/watchcourse" className="btn btn-primary btn-lg">Start Learning Now</Link>
                                <Link to="/account/mycourses" className="btn btn-outline btn-lg">Go to My Courses</Link>
                            </div>

                            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                                <h4 className="mb-2">Need Help?</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    Check out our <a href="#">Help Center</a> or <a href="#">Contact Support</a> if you have any questions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}   
export default EnrolledCourse