import React, { useState, useEffect } from "react";
import Layout from "../common/layout.jsx";
import { Link } from "react-router-dom";

const Courses = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCourses();
        fetchCategories();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/courses");
            const data = await response.json();
            setCourses(data);
            setLoading(false);
        } catch (err) {
            setError("Failed to load courses");
            setLoading(false);
            console.error("Error fetching courses:", err);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/categories");
            const data = await response.json();
            setCategories([{ id: 'all', name: 'All' }, ...data]);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    const filteredCourses = courses.filter(course => {
        const matchCategory = selectedCategory === 'all' || course.category?.id === selectedCategory;
        const matchSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategory && matchSearch;
    });

    const getGradientColor = (index) => {
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        ];
        return gradients[index % gradients.length];
    };

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
                    {error && (
                        <div className="alert alert-danger" style={{ marginBottom: '2rem' }}>
                            {error}
                        </div>
                    )}

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
                                    key={cat.id || cat}
                                    className={`btn ${selectedCategory === (cat.id || cat.toLowerCase()) ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => setSelectedCategory(cat.id || cat.toLowerCase())}
                                >
                                    {cat.name || cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Courses Grid */}
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <p>Loading courses...</p>
                        </div>
                    ) : filteredCourses.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <p>No courses found. Try adjusting your search or category.</p>
                        </div>
                    ) : (
                        <div className="courses-grid">
                            {filteredCourses.map((course, index) => (
                                <div key={course.id} className="course-card">
                                    <div style={{ position: 'relative' }}>
                                        <div 
                                            className="course-image" 
                                            style={{ 
                                                background: course.thumbnail ? `url(http://127.0.0.1:8000/storage/${course.thumbnail})` : getGradientColor(index),
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                        ></div>
                                        {course.status === 'published' && <span className="course-badge">Published</span>}
                                    </div>
                                    <div className="course-content">
                                        <span className="course-category">{course.category?.name || 'Uncategorized'}</span>
                                        <h3 className="course-title">{course.title}</h3>
                                        <p className="course-description">{course.description?.substring(0, 100)}...</p>
                                        <div className="course-meta">
                                            <div className="course-instructor">
                                                <div className="instructor-avatar"></div>
                                                <span>{course.instructor?.name || 'Expert'}</span>
                                            </div>
                                            <div className="course-rating">
                                                ⏱️ {course.duration}h
                                            </div>
                                        </div>
                                    </div>
                                    <div className="course-footer">
                                        <div>
                                            <span className="course-price">${course.price}</span>
                                        </div>
                                        <Link to={`/course/${course.id}`} className="btn btn-primary btn-sm">View Details</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    )
}
export default Courses