import React from "react"
import Layout from "../common/layout.jsx"

const Home = () => {
    return (
    <Layout>   
        {/* Hero Section */}
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <h1>Transform Your Learning Journey</h1>
                    <p>Access world-class courses, learn at your own pace, and achieve your educational goals with our comprehensive learning management system.</p>
                    <div className="hero-actions">
                        <button className="btn btn-primary btn-lg">Get Started</button>
                        <button className="btn btn-outline btn-lg">Browse Courses</button>
                    </div>
                </div>
            </div>
        </section>

        {/* Features Section with Student Image */}
        <section className="section">
            <div className="container">
                <div className="grid grid-cols-2 gap-3 align-center">
                    <div>
                        <img 
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" 
                            alt="Students learning together" 
                            className="rounded-lg shadow-lg"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                    <div>
                        <h2 className="mb-3">Learn From Anywhere, Anytime</h2>
                        <p className="mb-3" style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
                            Join thousands of students who are already transforming their careers with our interactive online courses.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: 'var(--success-color)', fontSize: '1.5rem' }}>✓</span>
                                <span>Expert instructors from top universities</span>
                            </li>
                            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: 'var(--success-color)', fontSize: '1.5rem' }}>✓</span>
                                <span>Flexible learning schedules</span>
                            </li>
                            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: 'var(--success-color)', fontSize: '1.5rem' }}>✓</span>
                                <span>Lifetime access to course materials</span>
                            </li>
                            <li className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: 'var(--success-color)', fontSize: '1.5rem' }}>✓</span>
                                <span>Certificate of completion</span>
                            </li>
                        </ul>
                        <button className="btn btn-primary mt-3">Explore Courses</button>
                    </div>
                </div>
            </div>
        </section>

        {/* Stats Section */}
        <section className="section" style={{ background: 'var(--bg-primary)' }}>
            <div className="container">
                <div className="grid grid-cols-4 gap-3 text-center">
                    <div>
                        <h3 style={{ color: 'var(--primary-color)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>10K+</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Active Students</p>
                    </div>
                    <div>
                        <h3 style={{ color: 'var(--primary-color)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>500+</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Online Courses</p>
                    </div>
                    <div>
                        <h3 style={{ color: 'var(--primary-color)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>100+</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Expert Instructors</p>
                    </div>
                    <div>
                        <h3 style={{ color: 'var(--primary-color)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>95%</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Success Rate</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Featured Courses Section */}
        <section className="section">
            <div className="container">
                <div className="section-title">
                    <h2>Featured Courses</h2>
                    <p>Discover our most popular courses and start learning today</p>
                </div>
                <div className="courses-grid">
                    {/* Course Card 1 */}
                    <div className="course-card">
                        <div style={{ position: 'relative' }}>
                            <div className="course-image" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}></div>
                            <span className="course-badge">Bestseller</span>
                        </div>
                        <div className="course-content">
                            <span className="course-category">Development</span>
                            <h3 className="course-title">Complete Web Development Bootcamp</h3>
                            <p className="course-description">Master full-stack web development from scratch with HTML, CSS, JavaScript, React, and Node.js</p>
                            <div className="course-meta">
                                <div className="course-instructor">
                                    <div className="instructor-avatar"></div>
                                    <span>John Doe</span>
                                </div>
                                <div className="course-rating">
                                    ★ 4.8 (2.5k)
                                </div>
                            </div>
                        </div>
                        <div className="course-footer">
                            <div>
                                <span className="course-price">$49.99</span>
                                <span className="course-price-old">$99.99</span>
                            </div>
                            <button className="btn btn-primary btn-sm">Enroll Now</button>
                        </div>
                    </div>

                    {/* Course Card 2 */}
                    <div className="course-card">
                        <div style={{ position: 'relative' }}>
                            <div className="course-image" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}></div>
                            <span className="course-badge">New</span>
                        </div>
                        <div className="course-content">
                            <span className="course-category">Design</span>
                            <h3 className="course-title">UI/UX Design Masterclass</h3>
                            <p className="course-description">Learn to create beautiful and user-friendly interfaces with modern design principles</p>
                            <div className="course-meta">
                                <div className="course-instructor">
                                    <div className="instructor-avatar" style={{ background: '#f093fb' }}></div>
                                    <span>Jane Smith</span>
                                </div>
                                <div className="course-rating">
                                    ★ 4.9 (1.8k)
                                </div>
                            </div>
                        </div>
                        <div className="course-footer">
                            <div>
                                <span className="course-price">$39.99</span>
                                <span className="course-price-old">$79.99</span>
                            </div>
                            <button className="btn btn-primary btn-sm">Enroll Now</button>
                        </div>
                    </div>

                    {/* Course Card 3 */}
                    <div className="course-card">
                        <div style={{ position: 'relative' }}>
                            <div className="course-image" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}></div>
                        </div>
                        <div className="course-content">
                            <span className="course-category">Data Science</span>
                            <h3 className="course-title">Python for Data Analysis</h3>
                            <p className="course-description">Master data analysis with Python, Pandas, NumPy, and data visualization libraries</p>
                            <div className="course-meta">
                                <div className="course-instructor">
                                    <div className="instructor-avatar" style={{ background: '#4facfe' }}></div>
                                    <span>Mike Johnson</span>
                                </div>
                                <div className="course-rating">
                                    ★ 4.7 (3.2k)
                                </div>
                            </div>
                        </div>
                        <div className="course-footer">
                            <div>
                                <span className="course-price">$59.99</span>
                                <span className="course-price-old">$119.99</span>
                            </div>
                            <button className="btn btn-primary btn-sm">Enroll Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
    )
}

export default Home