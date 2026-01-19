import React, { useState } from "react";
import Layout from "../../common/layout.jsx";

const WatchCourse = () => {
    const [activeSection, setActiveSection] = useState(1);
    const [activeLecture, setActiveLecture] = useState(1);

    const courseSections = [
        { id: 1, title: 'Getting Started', lectures: ['Introduction to the Course', 'Setting Up Your Environment', 'Your First Project'] },
        { id: 2, title: 'HTML Fundamentals', lectures: ['HTML Basics', 'Forms and Input', 'Semantic HTML'] },
        { id: 3, title: 'CSS Styling', lectures: ['CSS Selectors', 'Flexbox Layout', 'Grid System', 'Responsive Design'] },
        { id: 4, title: 'JavaScript Essentials', lectures: ['Variables and Data Types', 'Functions', 'DOM Manipulation', 'Events'] },
    ];

    return (
        <Layout>
            <div style={{ display: 'flex', minHeight: '80vh' }}>
                {/* Main Content - Video Player */}
                <div style={{ flex: 1, background: '#000', padding: '2rem' }}>
                    <div className="video-player-wrapper" style={{ marginBottom: '2rem' }}>
                        <div className="video-player" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '4rem' }}>
                            ▶️
                        </div>
                    </div>

                    <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: 'var(--border-radius-lg)' }}>
                        <h2 className="mb-3">Section {activeSection}: {courseSections[activeSection - 1].title}</h2>
                        <h3 style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
                            Lecture {activeLecture}: {courseSections[activeSection - 1].lectures[activeLecture - 1]}
                        </h3>

                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                            <button className="btn btn-outline">⏮️ Previous</button>
                            <button className="btn btn-primary" style={{ flex: 1 }}>Mark as Complete & Next ✓</button>
                            <button className="btn btn-outline">Next ⏭️</button>
                        </div>

                        {/* Tabs */}
                        <div className="tabs">
                            <ul className="tab-list">
                                <li className="tab-item active">Overview</li>
                                <li className="tab-item">Resources</li>
                                <li className="tab-item">Q&A</li>
                                <li className="tab-item">Notes</li>
                            </ul>
                        </div>

                        <div className="tab-content active">
                            <h4 className="mb-2">About this lecture</h4>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                                In this lecture, we'll cover the fundamental concepts of web development. 
                                You'll learn about the basics of HTML, CSS, and JavaScript, and how they work together 
                                to create modern web applications. By the end of this section, you'll have a solid 
                                foundation to build upon in the following modules.
                            </p>

                            <h4 className="mb-2 mt-4">Key Takeaways</h4>
                            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                                <li>Understanding the role of HTML in web development</li>
                                <li>How to structure a basic HTML document</li>
                                <li>Best practices for writing clean, semantic HTML</li>
                                <li>Common HTML elements and their uses</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Course Content */}
                <div style={{ width: '400px', background: 'var(--bg-primary)', borderLeft: '1px solid var(--border-color)', overflowY: 'auto', maxHeight: '100vh' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, background: 'var(--bg-primary)', zIndex: 10 }}>
                        <h3>Course Content</h3>
                        <div className="progress-bar mt-2">
                            <div className="progress-fill" style={{ width: '35%' }}></div>
                        </div>
                        <p className="progress-text">35% complete (15 of 43 lectures)</p>
                    </div>

                    <div>
                        {courseSections.map(section => (
                            <div key={section.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <div 
                                    style={{ padding: '1rem 1.5rem', cursor: 'pointer', background: activeSection === section.id ? 'var(--bg-secondary)' : 'transparent', fontWeight: 600 }}
                                    onClick={() => setActiveSection(section.id)}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>Section {section.id}: {section.title}</span>
                                        <span>{activeSection === section.id ? '▼' : '▶'}</span>
                                    </div>
                                </div>
                                {activeSection === section.id && (
                                    <div>
                                        {section.lectures.map((lecture, idx) => (
                                            <div 
                                                key={idx}
                                                style={{ 
                                                    padding: '0.75rem 2rem', 
                                                    cursor: 'pointer', 
                                                    background: activeLecture === idx + 1 ? 'var(--primary-color)' : 'transparent',
                                                    color: activeLecture === idx + 1 ? 'white' : 'var(--text-primary)',
                                                    borderLeft: activeLecture === idx + 1 ? '3px solid white' : '3px solid transparent'
                                                }}
                                                onClick={() => setActiveLecture(idx + 1)}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                                                    <span>📹 {lecture}</span>
                                                    <span style={{ opacity: 0.8 }}>12:30</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}   
export default WatchCourse