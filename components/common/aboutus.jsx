import React from "react";
import Layout from "./layout.jsx";

const AboutUs = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="hero" style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div className="hero-content">
                        <h1>About LearnHub</h1>
                        <p>Empowering learners worldwide with accessible, high-quality education</p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-2 gap-3 align-center">
                        <div>
                            <img 
                                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80" 
                                alt="Students collaborating" 
                                className="rounded-lg shadow-lg"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                        <div>
                            <span className="badge badge-primary mb-2">Our Mission</span>
                            <h2 className="mb-3">Making Education Accessible to Everyone</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                                At LearnHub, we believe that quality education should be accessible to everyone, 
                                regardless of their location, background, or financial situation. Our platform brings 
                                together expert instructors and passionate learners from around the world.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: '1.8' }}>
                                We're committed to providing a comprehensive learning experience that combines 
                                cutting-edge technology with proven educational methodologies to help you achieve 
                                your personal and professional goals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section" style={{ background: 'var(--bg-primary)' }}>
                <div className="container">
                    <div className="section-title">
                        <h2>Our Impact in Numbers</h2>
                        <p>Growing every day, making a difference worldwide</p>
                    </div>
                    <div className="grid grid-cols-4 gap-3 text-center">
                        <div className="card">
                            <h3 style={{ color: 'var(--primary-color)', fontSize: '3rem', marginBottom: '0.5rem' }}>50K+</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>Active Students</p>
                            <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginTop: '0.5rem' }}>From 150+ countries</p>
                        </div>
                        <div className="card">
                            <h3 style={{ color: 'var(--success-color)', fontSize: '3rem', marginBottom: '0.5rem' }}>1,000+</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>Online Courses</p>
                            <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Across 50+ categories</p>
                        </div>
                        <div className="card">
                            <h3 style={{ color: 'var(--accent-color)', fontSize: '3rem', marginBottom: '0.5rem' }}>500+</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>Expert Instructors</p>
                            <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Industry professionals</p>
                        </div>
                        <div className="card">
                            <h3 style={{ color: 'var(--primary-color)', fontSize: '3rem', marginBottom: '0.5rem' }}>95%</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>Success Rate</p>
                            <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Course completion</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section">
                <div className="container">
                    <div className="section-title">
                        <h2>Our Core Values</h2>
                        <p>The principles that guide everything we do</p>
                    </div>
                    <div className="courses-grid">
                        <div className="card">
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                            <h3 className="mb-2">Excellence</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                We're committed to providing the highest quality courses, taught by industry experts 
                                with real-world experience.
                            </p>
                        </div>
                        <div className="card">
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
                            <h3 className="mb-2">Accessibility</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Education should be available to everyone. We offer affordable courses with flexible 
                                learning schedules.
                            </p>
                        </div>
                        <div className="card">
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤝</div>
                            <h3 className="mb-2">Community</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Learning is better together. We foster a supportive community where students and 
                                instructors connect and grow.
                            </p>
                        </div>
                        <div className="card">
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💡</div>
                            <h3 className="mb-2">Innovation</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                We continuously improve our platform with cutting-edge technology to enhance 
                                your learning experience.
                            </p>
                        </div>
                        <div className="card">
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
                            <h3 className="mb-2">Flexibility</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Learn at your own pace, on your own schedule. Our courses are designed to fit 
                                your busy lifestyle.
                            </p>
                        </div>
                        <div className="card">
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
                            <h3 className="mb-2">Results</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                We measure our success by your success. Every course is designed to deliver 
                                practical, career-advancing skills.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section" style={{ background: 'var(--bg-primary)' }}>
                <div className="container">
                    <div className="section-title">
                        <h2>Why Choose LearnHub?</h2>
                        <p>Features that set us apart from other learning platforms</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="card">
                            <div style={{ display: 'flex', alignItems: 'start', gap: '1.5rem' }}>
                                <div style={{ fontSize: '2.5rem' }}>📚</div>
                                <div>
                                    <h4 className="mb-2">Comprehensive Curriculum</h4>
                                    <p style={{ color: 'var(--text-secondary)' }}>
                                        From beginner to advanced, our courses cover every skill level with 
                                        structured learning paths and hands-on projects.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div style={{ display: 'flex', alignItems: 'start', gap: '1.5rem' }}>
                                <div style={{ fontSize: '2.5rem' }}>👨‍🏫</div>
                                <div>
                                    <h4 className="mb-2">Expert Instructors</h4>
                                    <p style={{ color: 'var(--text-secondary)' }}>
                                        Learn from industry professionals with years of real-world experience 
                                        and a passion for teaching.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div style={{ display: 'flex', alignItems: 'start', gap: '1.5rem' }}>
                                <div style={{ fontSize: '2.5rem' }}>🎓</div>
                                <div>
                                    <h4 className="mb-2">Certificates</h4>
                                    <p style={{ color: 'var(--text-secondary)' }}>
                                        Earn recognized certificates upon course completion to showcase your 
                                        new skills to employers.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div style={{ display: 'flex', alignItems: 'start', gap: '1.5rem' }}>
                                <div style={{ fontSize: '2.5rem' }}>💬</div>
                                <div>
                                    <h4 className="mb-2">24/7 Support</h4>
                                    <p style={{ color: 'var(--text-secondary)' }}>
                                        Get help whenever you need it with our dedicated support team and 
                                        active community forums.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div style={{ display: 'flex', alignItems: 'start', gap: '1.5rem' }}>
                                <div style={{ fontSize: '2.5rem' }}>📱</div>
                                <div>
                                    <h4 className="mb-2">Mobile Learning</h4>
                                    <p style={{ color: 'var(--text-secondary)' }}>
                                        Access your courses anytime, anywhere on any device - desktop, tablet, 
                                        or mobile.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div style={{ display: 'flex', alignItems: 'start', gap: '1.5rem' }}>
                                <div style={{ fontSize: '2.5rem' }}>♾️</div>
                                <div>
                                    <h4 className="mb-2">Lifetime Access</h4>
                                    <p style={{ color: 'var(--text-secondary)' }}>
                                        Once enrolled, you have lifetime access to course materials, including 
                                        all future updates.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="section">
                <div className="container">
                    <div className="section-title">
                        <h2>Meet Our Leadership Team</h2>
                        <p>Dedicated professionals passionate about education</p>
                    </div>
                    <div className="courses-grid">
                        <div className="card text-center">
                            <div style={{ width: '120px', height: '120px', margin: '0 auto 1.5rem', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}></div>
                            <h4>Sarah Johnson</h4>
                            <p style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>CEO & Co-Founder</p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                Former educator with 15+ years of experience in online learning and educational technology.
                            </p>
                        </div>
                        <div className="card text-center">
                            <div style={{ width: '120px', height: '120px', margin: '0 auto 1.5rem', borderRadius: '50%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}></div>
                            <h4>Michael Chen</h4>
                            <p style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>CTO & Co-Founder</p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                Tech visionary with expertise in building scalable platforms and innovative learning tools.
                            </p>
                        </div>
                        <div className="card text-center">
                            <div style={{ width: '120px', height: '120px', margin: '0 auto 1.5rem', borderRadius: '50%', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}></div>
                            <h4>Emily Rodriguez</h4>
                            <p style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Head of Content</p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                Curriculum designer ensuring every course meets the highest educational standards.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="section" style={{ background: 'var(--bg-primary)' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div className="card">
                        <span className="badge badge-secondary mb-2">Our Story</span>
                        <h2 className="mb-3">How LearnHub Started</h2>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: '1.8' }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                LearnHub was founded in 2020 by a group of educators and technologists who saw 
                                the need for accessible, high-quality online education. What started as a small 
                                platform with just 10 courses has grown into a global learning community serving 
                                thousands of students worldwide.
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                During the pandemic, we witnessed firsthand how crucial online education became 
                                for people looking to advance their careers, learn new skills, or simply pursue 
                                their passions. This motivated us to expand our offerings and improve our platform 
                                to serve learners better.
                            </p>
                            <p>
                                Today, LearnHub partners with industry experts and leading institutions to provide 
                                courses in technology, business, design, data science, and many other fields. We're 
                                proud to have helped thousands of students achieve their learning goals and advance 
                                their careers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section">
                <div className="container">
                    <div className="card" style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)', color: 'white', textAlign: 'center', padding: '4rem 2rem' }}>
                        <h2 style={{ color: 'white', marginBottom: '1rem' }}>Ready to Start Learning?</h2>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.95 }}>
                            Join our community of learners and start your journey today
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button className="btn btn-lg" style={{ background: 'white', color: 'var(--primary-color)' }}>Browse Courses</button>
                            <button className="btn btn-outline btn-lg" style={{ borderColor: 'white', color: 'white' }}>Contact Us</button>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default AboutUs
