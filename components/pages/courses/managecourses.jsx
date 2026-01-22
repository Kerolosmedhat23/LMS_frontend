import React, { useState, useEffect } from "react";
import Layout from "../../common/layout.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../../../src/hooks/useAuth.js";
import { listCourses, createSection, createLecture, uploadLectureVideo } from "../../../src/api/courses.js";

const ManageCourses = () => {
    const { user, token } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [updating, setUpdating] = useState(null);
    const [editingCourse, setEditingCourse] = useState(null);
    const [expandedCourse, setExpandedCourse] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [newThumbnail, setNewThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    // Content management state
    const [sectionsByCourse, setSectionsByCourse] = useState({}); // { [courseId]: Section[] }
    const [lecturesBySection, setLecturesBySection] = useState({}); // { [sectionId]: Lecture[] }
    const [newSection, setNewSection] = useState({ title: "", position: 0 });
    const [newLecture, setNewLecture] = useState({
        sectionId: "",
        title: "",
        content: "",
        duration: 0,
        is_preview: false,
        position: 0,
        videoFile: null,
    });

    useEffect(() => {
        fetchInstructorCourses();
    }, []);

    const fetchInstructorCourses = async () => {
        try {
            const allCourses = await listCourses();
            
            // Filter courses where instructor_id matches current user
            const instructorCourses = allCourses.filter(course => 
                course.instructor_id === user?.id
            );
            
            setCourses(instructorCourses);
            setLoading(false);
        } catch (err) {
            setError("Failed to load your courses");
            setLoading(false);
            console.error("Error fetching courses:", err);
        }
    };

    const handleEditClick = (course) => {
        setEditingCourse(course.id);
        setEditFormData({
            title: course.title,
            description: course.description,
            price: course.price,
            duration: course.duration,
            level: course.level,
            language: course.language,
            category_id: course.category_id,
            status: course.status
        });
        setThumbnailPreview(course.thumbnail ? `http://127.0.0.1:8000/storage/${course.thumbnail}` : null);
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewThumbnail(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const saveEditedCourse = async (courseId) => {
        setUpdating(courseId);
        try {
            const formData = new FormData();
            formData.append('title', editFormData.title);
            formData.append('description', editFormData.description);
            formData.append('price', editFormData.price);
            formData.append('duration', editFormData.duration);
            formData.append('level', editFormData.level);
            formData.append('language', editFormData.language);
            formData.append('category_id', editFormData.category_id);
            formData.append('status', editFormData.status);
            
            if (newThumbnail) {
                formData.append('thumbnail', newThumbnail);
            }

            const response = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                    "X-HTTP-Method-Override": "PUT",
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                setCourses(courses.map(course => 
                    course.id === courseId ? data.course : course
                ));
                setSuccess('Course updated successfully');
                setEditingCourse(null);
                setNewThumbnail(null);
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError(data.message || 'Failed to update course');
            }
        } catch (err) {
            setError('Failed to update course');
            console.error('Error:', err);
        } finally {
            setUpdating(null);
        }
    };

    // Content: create section
    const handleCreateSection = async (courseId) => {
        setError("");
        setSuccess("");
        try {
            const section = await createSection(courseId, {
                title: newSection.title,
                position: Number(newSection.position) || 0,
            });
            setSectionsByCourse(prev => ({
                ...prev,
                [courseId]: [...(prev[courseId] || []), section]
            }));
            setNewSection({ title: "", position: 0 });
            setSuccess("Section created");
            setTimeout(() => setSuccess(""), 2000);
        } catch (e) {
            console.error(e);
            setError("Failed to create section. Ensure you're authenticated.");
        }
    };

    // Content: create lecture (optionally upload video first)
    const handleCreateLecture = async (courseId) => {
        setError("");
        setSuccess("");
        try {
            const formData = new FormData();
            formData.append('title', newLecture.title);
            formData.append('content', newLecture.content);
            formData.append('duration', newLecture.duration);
            formData.append('is_preview', newLecture.is_preview);
            formData.append('position', newLecture.position);
            
            if (newLecture.videoFile) {
                formData.append('video', newLecture.videoFile);
            }

            const response = await fetch(`http://127.0.0.1:8000/api/sections/${newLecture.sectionId}/lectures`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            const data = await response.json();
            
            if (!response.ok) {
                setError(data.message || 'Failed to add lecture');
                return;
            }

            setLecturesBySection(prev => ({
                ...prev,
                [newLecture.sectionId]: [...(prev[newLecture.sectionId] || []), data.lecture]
            }));
            setNewLecture({ sectionId: "", title: "", content: "", duration: 0, is_preview: false, position: 0, videoFile: null });
            setSuccess("Lecture added");
            setTimeout(() => setSuccess(""), 2000);
        } catch (e) {
            console.error(e);
            setError("Failed to add lecture. Ensure you're authenticated.");
        }
    };

    const filteredCourses = selectedStatus === 'all' 
        ? courses 
        : courses.filter(course => course.status === selectedStatus);

    const getStatusBadgeClass = (status) => {
        switch(status) {
            case 'published':
                return 'badge-success';
            case 'draft':
                return 'badge-warning';
            case 'archived':
                return 'badge-danger';
            default:
                return 'badge-secondary';
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'published':
                return { background: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' };
            case 'draft':
                return { background: '#fff3cd', color: '#856404', border: '1px solid #ffeaa7' };
            case 'archived':
                return { background: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' };
            default:
                return { background: '#e2e3e5', color: '#383d41', border: '1px solid #d6d8db' };
        }
    };

    if (loading) {
        return (
            <Layout>
                <section className="section">
                    <div className="container">
                        <p style={{ textAlign: 'center', padding: '2rem' }}>Loading your courses...</p>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Page Header */}
            <section className="hero" style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1>Manage Your Courses</h1>
                            <p>View, edit, and manage all your courses in one place</p>
                        </div>
                        <Link to="/account/createcourse" className="btn btn-primary btn-lg">
                            + Create New Course
                        </Link>
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

                    {success && (
                        <div className="alert alert-success" style={{ marginBottom: '2rem' }}>
                            {success}
                        </div>
                    )}

                    {/* Filter Tabs */}
                    <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button 
                            className={`btn ${selectedStatus === 'all' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setSelectedStatus('all')}
                        >
                            All Courses ({courses.length})
                        </button>
                        <button 
                            className={`btn ${selectedStatus === 'published' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setSelectedStatus('published')}
                        >
                            Published ({courses.filter(c => c.status === 'published').length})
                        </button>
                        <button 
                            className={`btn ${selectedStatus === 'draft' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setSelectedStatus('draft')}
                        >
                            Draft ({courses.filter(c => c.status === 'draft').length})
                        </button>
                        <button 
                            className={`btn ${selectedStatus === 'archived' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setSelectedStatus('archived')}
                        >
                            Archived ({courses.filter(c => c.status === 'archived').length})
                        </button>
                    </div>

                    {/* Courses List */}
                    {filteredCourses.length === 0 ? (
                        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                {selectedStatus === 'all' ? 'No courses yet.' : `No ${selectedStatus} courses.`}
                            </p>
                            <Link to="/account/createcourse" className="btn btn-primary">
                                Create Your First Course
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {filteredCourses.map(course => (
                                <div key={course.id}>
                                    {/* Course Card */}
                                    <div 
                                        className="card" 
                                        style={{ padding: '2rem', cursor: 'pointer', transition: 'all 0.3s' }}
                                        onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                                    >
                                        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: '2rem', alignItems: 'start' }}>
                                            {/* Thumbnail */}
                                            <div>
                                                {course.thumbnail ? (
                                                    <img 
                                                        src={`http://127.0.0.1:8000/storage/${course.thumbnail}`}
                                                        alt={course.title}
                                                        style={{
                                                            width: '100%',
                                                            height: '100px',
                                                            borderRadius: 'var(--border-radius-md)',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                ) : (
                                                    <div 
                                                        style={{
                                                            width: '100%',
                                                            height: '100px',
                                                            borderRadius: 'var(--border-radius-md)',
                                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            color: 'white',
                                                            fontSize: '2rem'
                                                        }}
                                                    >
                                                        📚
                                                    </div>
                                                )}
                                            </div>

                                            {/* Course Info */}
                                            <div>
                                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                    <h3 style={{ margin: 0 }}>{course.title}</h3>
                                                    <span className={`badge ${getStatusBadgeClass(course.status)}`} style={{ padding: '0.5rem 1rem' }}>
                                                        {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                                                    </span>
                                                </div>
                                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.95rem' }}>
                                                    {course.description?.substring(0, 120)}...
                                                </p>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', fontSize: '0.9rem' }}>
                                                    <div>
                                                        <strong>Category:</strong> {course.category?.name || 'N/A'}
                                                    </div>
                                                    <div>
                                                        <strong>Level:</strong> {course.level}
                                                    </div>
                                                    <div>
                                                        <strong>Duration:</strong> {course.duration}h
                                                    </div>
                                                    <div>
                                                        <strong>Price:</strong> ${course.price}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quick Actions */}
                                            <div style={{ minWidth: '200px' }}>
                                                <div style={{ display: 'grid', gap: '0.75rem' }}>
                                                    <button 
                                                        className="btn btn-sm btn-primary"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEditClick(course);
                                                        }}
                                                    >
                                                        ✏️ Edit Course
                                                    </button>
                                                    <Link 
                                                        to={`/course/${course.id}`}
                                                        className="btn btn-sm btn-outline"
                                                        style={{ textAlign: 'center' }}
                                                    >
                                                        👁️ View
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded Edit Form */}
                                    {editingCourse === course.id && (
                                        <div className="card" style={{ padding: '2rem', marginTop: '1rem', backgroundColor: 'var(--bg-secondary)' }}>
                                            <h3 style={{ marginBottom: '1.5rem' }}>Edit Course Details</h3>
                                            
                                            {/* Thumbnail Section */}
                                            <div style={{ marginBottom: '2rem' }}>
                                                <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>Course Thumbnail</label>
                                                <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2rem', alignItems: 'start' }}>
                                                    <div>
                                                        {thumbnailPreview && (
                                                            <img 
                                                                src={thumbnailPreview}
                                                                alt="Thumbnail preview"
                                                                style={{
                                                                    width: '100%',
                                                                    borderRadius: 'var(--border-radius-md)',
                                                                    objectFit: 'cover'
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Upload New Thumbnail</label>
                                                        <input 
                                                            type="file" 
                                                            accept="image/*"
                                                            onChange={handleThumbnailChange}
                                                            className="form-control"
                                                        />
                                                        <small style={{ color: 'var(--text-secondary)' }}>JPG, PNG - Max 5MB</small>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Course Details Form */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                                                <div>
                                                    <label className="form-label">Course Title</label>
                                                    <input 
                                                        type="text" 
                                                        name="title"
                                                        className="form-control"
                                                        value={editFormData.title || ''}
                                                        onChange={handleEditFormChange}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="form-label">Price ($)</label>
                                                    <input 
                                                        type="number" 
                                                        name="price"
                                                        className="form-control"
                                                        value={editFormData.price || ''}
                                                        onChange={handleEditFormChange}
                                                        min="0"
                                                        step="0.01"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="form-label">Duration (Hours)</label>
                                                    <input 
                                                        type="number" 
                                                        name="duration"
                                                        className="form-control"
                                                        value={editFormData.duration || ''}
                                                        onChange={handleEditFormChange}
                                                        min="1"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="form-label">Level</label>
                                                    <select 
                                                        name="level"
                                                        className="form-control"
                                                        value={editFormData.level || 'beginner'}
                                                        onChange={handleEditFormChange}
                                                    >
                                                        <option value="beginner">Beginner</option>
                                                        <option value="intermediate">Intermediate</option>
                                                        <option value="advanced">Advanced</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="form-label">Language</label>
                                                    <input 
                                                        type="text" 
                                                        name="language"
                                                        className="form-control"
                                                        value={editFormData.language || ''}
                                                        onChange={handleEditFormChange}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="form-label">Status</label>
                                                    <select 
                                                        name="status"
                                                        className="form-control"
                                                        value={editFormData.status || 'draft'}
                                                        onChange={handleEditFormChange}
                                                    >
                                                        <option value="draft">Draft</option>
                                                        <option value="published">Published</option>
                                                        <option value="archived">Archived</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div style={{ marginBottom: '2rem' }}>
                                                <label className="form-label">Description</label>
                                                <textarea 
                                                    name="description"
                                                    className="form-control"
                                                    value={editFormData.description || ''}
                                                    onChange={handleEditFormChange}
                                                    rows="4"
                                                />
                                            </div>

                                            {/* Course Content Management */}
                                            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--border-radius-md)', marginBottom: '2rem' }}>
                                                <h4 style={{ marginBottom: '1rem' }}>📹 Course Content Management</h4>
                                                {/* Sections list */}
                                                <div style={{ marginBottom: '1rem' }}>
                                                    <strong>Sections</strong>
                                                    <ul style={{ marginTop: '0.5rem' }}>
                                                        {(sectionsByCourse[course.id] || []).map(sec => (
                                                            <li key={sec.id}>{sec.title} (pos {sec.position})</li>
                                                        ))}
                                                        {(sectionsByCourse[course.id] || []).length === 0 && (
                                                            <li style={{ color: 'var(--text-secondary)' }}>No sections yet</li>
                                                        )}
                                                    </ul>
                                                </div>

                                                {/* Add Section */}
                                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '0.75rem', alignItems: 'end', marginBottom: '1rem' }}>
                                                    <div>
                                                        <label className="form-label">Section Title</label>
                                                        <input
                                                            className="form-control"
                                                            value={newSection.title}
                                                            onChange={(e) => setNewSection(prev => ({ ...prev, title: e.target.value }))}
                                                            placeholder="e.g., Introduction"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="form-label">Position</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={newSection.position}
                                                            onChange={(e) => setNewSection(prev => ({ ...prev, position: e.target.value }))}
                                                            min="0"
                                                        />
                                                    </div>
                                                    <button className="btn btn-outline" onClick={() => handleCreateSection(course.id)}>+ Add Section</button>
                                                </div>

                                                {/* Add Lecture */}
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', alignItems: 'end' }}>
                                                    <div>
                                                        <label className="form-label">Section</label>
                                                        <select
                                                            className="form-control"
                                                            value={newLecture.sectionId}
                                                            onChange={(e) => setNewLecture(prev => ({ ...prev, sectionId: e.target.value }))}
                                                        >
                                                            <option value="">Select section</option>
                                                            {(sectionsByCourse[course.id] || []).map(sec => (
                                                                <option key={sec.id} value={sec.id}>{sec.title}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="form-label">Lecture Title</label>
                                                        <input className="form-control" value={newLecture.title} onChange={(e) => setNewLecture(prev => ({ ...prev, title: e.target.value }))} />
                                                    </div>
                                                    <div>
                                                        <label className="form-label">Duration (min)</label>
                                                        <input type="number" className="form-control" value={newLecture.duration} onChange={(e) => setNewLecture(prev => ({ ...prev, duration: e.target.value }))} min="0" />
                                                    </div>
                                                    <div>
                                                        <label className="form-label">Position</label>
                                                        <input type="number" className="form-control" value={newLecture.position} onChange={(e) => setNewLecture(prev => ({ ...prev, position: e.target.value }))} min="0" />
                                                    </div>
                                                    <div style={{ gridColumn: '1 / -1' }}>
                                                        <label className="form-label">Content</label>
                                                        <textarea className="form-control" rows="3" value={newLecture.content} onChange={(e) => setNewLecture(prev => ({ ...prev, content: e.target.value }))} />
                                                    </div>
                                                    <div>
                                                        <label className="form-label">Preview</label>
                                                        <select className="form-control" value={newLecture.is_preview ? 'yes' : 'no'} onChange={(e) => setNewLecture(prev => ({ ...prev, is_preview: e.target.value === 'yes' }))}>
                                                            <option value="no">No</option>
                                                            <option value="yes">Yes</option>
                                                        </select>
                                                    </div>
                                                    <div style={{ gridColumn: '1 / -1' }}>
                                                        <label className="form-label">Video File (optional)</label>
                                                        <input type="file" className="form-control" accept="video/*" onChange={(e) => setNewLecture(prev => ({ ...prev, videoFile: e.target.files[0] || null }))} />
                                                        <small style={{ color: 'var(--text-secondary)' }}>MP4, MOV, AVI, WMV - Max 20MB</small>
                                                    </div>
                                                    <div style={{ gridColumn: '1 / -1' }}>
                                                        <button className="btn btn-primary" disabled={!newLecture.sectionId} onClick={() => handleCreateLecture(course.id)}>+ Add Lecture</button>
                                                    </div>
                                                </div>

                                                {/* Lectures list (for selected section) */}
                                                {newLecture.sectionId && (
                                                    <div style={{ marginTop: '1rem' }}>
                                                        <strong>Lectures in selected section</strong>
                                                        <ul style={{ marginTop: '0.5rem' }}>
                                                            {(lecturesBySection[newLecture.sectionId] || []).map(lec => (
                                                                <li key={lec.id}>{lec.title} {lec.video_url ? `(video)` : ''}</li>
                                                            ))}
                                                            {(lecturesBySection[newLecture.sectionId] || []).length === 0 && (
                                                                <li style={{ color: 'var(--text-secondary)' }}>No lectures yet</li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Save/Cancel Buttons */}
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                <button 
                                                    className="btn btn-outline"
                                                    onClick={() => {
                                                        setEditingCourse(null);
                                                        setNewThumbnail(null);
                                                    }}
                                                    disabled={updating === course.id}
                                                >
                                                    Cancel
                                                </button>
                                                <button 
                                                    className="btn btn-primary"
                                                    onClick={() => saveEditedCourse(course.id)}
                                                    disabled={updating === course.id}
                                                >
                                                    {updating === course.id ? 'Saving...' : '💾 Save Changes'}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Statistics */}
            {courses.length > 0 && (
                <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', padding: '3rem 0' }}>
                    <div className="container">
                        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Your Courses Overview</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                                <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>
                                    {courses.length}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Total Courses</p>
                            </div>
                            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                                <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#10b981' }}>
                                    {courses.filter(c => c.status === 'published').length}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Published</p>
                            </div>
                            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                                <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#f59e0b' }}>
                                    {courses.filter(c => c.status === 'draft').length}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Draft</p>
                            </div>
                            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                                <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#ef4444' }}>
                                    {courses.filter(c => c.status === 'archived').length}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Archived</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </Layout>
    );
}
export default ManageCourses;
