import React from "react";
import Layout from "../../common/layout.jsx";
import { Link } from "react-router-dom";

const MyCourses = () => {
    const enrolledCourses = [
        { id: 1, title: 'Complete Web Development Bootcamp', progress: 65, totalLectures: 250, completedLectures: 163, timeLeft: '12 hours left', image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        { id: 2, title: 'UI/UX Design Masterclass', progress: 30, totalLectures: 180, completedLectures: 54, timeLeft: '20 hours left', image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
        { id: 3, title: 'Python for Data Analysis', progress: 85, totalLectures: 200, completedLectures: 170, timeLeft: '5 hours left', image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    ];

    return (
        <Layout>
            <section className="section">
                <div className="container">
                    <div style={{ marginBottom: '3rem' }}>
                        <h1 className="mb-2">My Courses</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>Continue learning and track your progress</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        <div className="card text-center">
                            <h3 style={{ color: 'var(--primary-color)', fontSize: '2rem' }}>3</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Enrolled Courses</p>
                        </div>
                        <div className="card text-center">
                            <h3 style={{ color: 'var(--success-color)', fontSize: '2rem' }}>1</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Completed</p>
                        </div>
                        <div className="card text-center">
                            <h3 style={{ color: 'var(--accent-color)', fontSize: '2rem' }}>60%</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Avg Progress</p>
                        </div>
                        <div className="card text-center">
                            <h3 style={{ color: 'var(--primary-color)', fontSize: '2rem' }}>37h</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Total Time</p>
                        </div>
                    </div>

                    {/* Course List */}
                    <div className="card">
                        <h3 className="mb-3">Continue Learning</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {enrolledCourses.map(course => (
                                <div key={course.id} style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-lg)' }}>
                                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                                        <div style={{ width: '160px', height: '100px', background: course.image, borderRadius: 'var(--border-radius-md)' }}></div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ marginBottom: '0.5rem' }}>{course.title}</h4>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                                                {course.completedLectures} of {course.totalLectures} lectures completed • {course.timeLeft}
                                            </p>
                                            <div className="progress-bar" style={{ marginBottom: '0.5rem' }}>
                                                <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                                            </div>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{course.progress}% complete</p>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <Link to="/account/watchcourse" className="btn btn-primary">Continue Learning</Link>
                                            <button className="btn btn-outline">View Certificate</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <Link to="/courses" className="btn btn-outline btn-lg">Browse More Courses</Link>
                    </div>
                </div>
            </section>
        </Layout>
    )
}   
export default MyCourses