import React, { useState } from "react";
import Layout from "../common/layout.jsx";
import { Link } from "react-router-dom";

const Courses = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['All', 'Development', 'Design', 'Business', 'Data Science', 'Marketing'];
    
    const courses = [
        { id: 1, title: 'Complete Web Development Bootcamp', category: 'Development', price: 49.99, oldPrice: 99.99, rating: 4.8, students: 2500, image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', badge: 'Bestseller' },
        { id: 2, title: 'UI/UX Design Masterclass', category: 'Design', price: 39.99, oldPrice: 79.99, rating: 4.9, students: 1800, image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', badge: 'New' },
        { id: 3, title: 'Python for Data Analysis', category: 'Data Science', price: 59.99, oldPrice: 119.99, rating: 4.7, students: 3200, image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
        { id: 4, title: 'Digital Marketing Mastery', category: 'Marketing', price: 44.99, oldPrice: 89.99, rating: 4.6, students: 1500, image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
        { id: 5, title: 'React & Redux Complete Guide', category: 'Development', price: 54.99, oldPrice: 109.99, rating: 4.9, students: 2800, image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', badge: 'Popular' },
        { id: 6, title: 'Business Strategy Fundamentals', category: 'Business', price: 49.99, oldPrice: 99.99, rating: 4.5, students: 1200, image: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
    ];

    return (
        <Layout>
            {/* Page Header */}
            <section className="hero" style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div className="hero-content">
                        <h1>Explore Our Courses</h1>
                        <p>Discover the perfect course to advance your career and achieve your goals</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {/* Search Bar */}
                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search courses..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ flex: 1, minWidth: '250px' }}
                            />
                            <button className="btn btn-primary">🔍 Search</button>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {categories.map(cat => (
                                <button 
                                    key={cat}
                                    className={`btn ${selectedCategory === cat.toLowerCase() ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => setSelectedCategory(cat.toLowerCase())}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Courses Grid */}
                    <div className="courses-grid">
                        {courses.map(course => (
                            <div key={course.id} className="course-card">
                                <div style={{ position: 'relative' }}>
                                    <div className="course-image" style={{ background: course.image }}></div>
                                    {course.badge && <span className="course-badge">{course.badge}</span>}
                                </div>
                                <div className="course-content">
                                    <span className="course-category">{course.category}</span>
                                    <h3 className="course-title">{course.title}</h3>
                                    <p className="course-description">Learn from industry experts and master the skills you need to succeed in your career.</p>
                                    <div className="course-meta">
                                        <div className="course-instructor">
                                            <div className="instructor-avatar"></div>
                                            <span>Expert</span>
                                        </div>
                                        <div className="course-rating">
                                            ★ {course.rating} ({course.students})
                                        </div>
                                    </div>
                                </div>
                                <div className="course-footer">
                                    <div>
                                        <span className="course-price">${course.price}</span>
                                        <span className="course-price-old">${course.oldPrice}</span>
                                    </div>
                                    <Link to={`/course/${course.id}`} className="btn btn-primary btn-sm">View Details</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    )
}
export default Courses