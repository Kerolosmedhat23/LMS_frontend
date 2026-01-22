import React, { useState, useEffect } from "react";
import Layout from "../../common/layout.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../src/hooks/useAuth.js";

const CreateCourse = () => {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category_id: "",
        price: "",
        level: "beginner",
        thumbnail: null,
        language: "English",
        duration: "",
        status: "draft",
    });

    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/categories");
            const data = await response.json();
            setCategories(data);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                thumbnail: file
            }));
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('description', formData.description);
            submitData.append('price', formData.price);
            submitData.append('duration', formData.duration);
            submitData.append('level', formData.level);
            submitData.append('category_id', formData.category_id);
            submitData.append('language', formData.language);
            submitData.append('status', formData.status);
            if (formData.thumbnail) {
                submitData.append('thumbnail', formData.thumbnail);
            }

            const response = await fetch("http://127.0.0.1:8000/api/courses", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
                body: submitData,
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setFormData({
                    title: "",
                    description: "",
                    category_id: "",
                    price: "",
                    level: "beginner",
                    thumbnail: null,
                    language: "English",
                    duration: "",
                    status: "draft",
                });
                setImagePreview(null);
                
                setTimeout(() => {
                    navigate("/account/mycourses");
                }, 2000);
            } else {
                setError(data.message || "Failed to create course");
            }
        } catch (err) {
            setError(err.message || "Error creating course");
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <section className="section">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <Link to="/account/mycourses" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
                            ← Back to My Courses
                        </Link>
                    </div>

                    <div className="card">
                        <div style={{ padding: '2rem' }}>
                            <h1 className="mb-3">Create New Course</h1>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                Fill in the details below to create a new course and start teaching students around the world.
                            </p>

                            {success && (
                                <div className="alert alert-success" style={{ marginBottom: '2rem' }}>
                                    ✓ Course created successfully! Redirecting to your courses...
                                </div>
                            )}

                            {error && (
                                <div className="alert alert-danger" style={{ marginBottom: '2rem' }}>
                                    ✗ {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {/* Course Title */}
                                <div className="form-group mb-4">
                                    <label htmlFor="title" className="form-label">
                                        Course Title <span style={{ color: 'var(--danger-color)' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="form-control"
                                        placeholder="Enter course title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <small style={{ color: 'var(--text-secondary)' }}>
                                        Be specific and descriptive (e.g., Complete Web Development Bootcamp)
                                    </small>
                                </div>

                                {/* Course Description */}
                                <div className="form-group mb-4">
                                    <label htmlFor="description" className="form-label">
                                        Course Description <span style={{ color: 'var(--danger-color)' }}>*</span>
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className="form-control"
                                        placeholder="Describe your course, what students will learn, and course objectives"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="6"
                                        required
                                    />
                                    <small style={{ color: 'var(--text-secondary)' }}>
                                        Minimum 50 characters recommended. Be detailed about course content and learning outcomes.
                                    </small>
                                </div>

                                {/* Course Image */}
                                <div className="form-group mb-4">
                                    <label htmlFor="thumbnail" className="form-label">
                                        Course Thumbnail <span style={{ color: 'var(--danger-color)' }}>*</span>
                                    </label>
                                    <div style={{
                                        border: '2px dashed var(--border-color)',
                                        borderRadius: 'var(--border-radius-lg)',
                                        padding: '2rem',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        backgroundColor: 'var(--bg-secondary)',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        {imagePreview ? (
                                            <div>
                                                <img
                                                    src={imagePreview}
                                                    alt="Course thumbnail preview"
                                                    style={{
                                                        maxWidth: '200px',
                                                        maxHeight: '200px',
                                                        borderRadius: 'var(--border-radius-md)',
                                                        marginBottom: '1rem'
                                                    }}
                                                />
                                                <div>
                                                    <p style={{ marginBottom: '0.5rem' }}>Image selected successfully</p>
                                                    <label htmlFor="thumbnail" className="btn btn-sm btn-outline">
                                                        Change Image
                                                    </label>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📸</div>
                                                <p style={{ marginBottom: '0.5rem' }}>
                                                    Drag and drop your course thumbnail here
                                                </p>
                                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                                    or click to browse (JPG, PNG - Max 5MB)
                                                </p>
                                                <label htmlFor="thumbnail" className="btn btn-sm btn-primary">
                                                    Choose File
                                                </label>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            id="thumbnail"
                                            name="thumbnail"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                </div>

                                {/* Two Column Layout for remaining fields */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                                    {/* Category */}
                                    <div className="form-group">
                                        <label htmlFor="category_id" className="form-label">
                                            Category <span style={{ color: 'var(--danger-color)' }}>*</span>
                                        </label>
                                        <select
                                            id="category_id"
                                            name="category_id"
                                            className="form-control"
                                            value={formData.category_id}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Level */}
                                    <div className="form-group">
                                        <label htmlFor="level" className="form-label">
                                            Course Level <span style={{ color: 'var(--danger-color)' }}>*</span>
                                        </label>
                                        <select
                                            id="level"
                                            name="level"
                                            className="form-control"
                                            value={formData.level}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="advanced">Advanced</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                                    {/* Price */}
                                    <div className="form-group">
                                        <label htmlFor="price" className="form-label">
                                            Course Price <span style={{ color: 'var(--danger-color)' }}>*</span>
                                        </label>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span style={{ marginRight: '0.5rem' }}>$</span>
                                            <input
                                                type="number"
                                                id="price"
                                                name="price"
                                                className="form-control"
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <small style={{ color: 'var(--text-secondary)' }}>
                                            Set to 0 for free course
                                        </small>
                                    </div>

                                    {/* Duration */}
                                    <div className="form-group">
                                        <label htmlFor="duration" className="form-label">
                                            Course Duration (hours) <span style={{ color: 'var(--danger-color)' }}>*</span>
                                        </label>
                                        <input
                                            type="number"
                                            id="duration"
                                            name="duration"
                                            className="form-control"
                                            placeholder="e.g., 40"
                                            min="1"
                                            value={formData.duration}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                                    {/* Language */}
                                    <div className="form-group">
                                        <label htmlFor="language" className="form-label">
                                            Course Language <span style={{ color: 'var(--danger-color)' }}>*</span>
                                        </label>
                                        <select
                                            id="language"
                                            name="language"
                                            className="form-control"
                                            value={formData.language}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="English">English</option>
                                            <option value="Spanish">Spanish</option>
                                            <option value="French">French</option>
                                            <option value="German">German</option>
                                            <option value="Chinese">Chinese</option>
                                            <option value="Japanese">Japanese</option>
                                        </select>
                                    </div>

                                    {/* Status */}
                                    <div className="form-group">
                                        <label htmlFor="status" className="form-label">
                                            Course Status <span style={{ color: 'var(--danger-color)' }}>*</span>
                                        </label>
                                        <select
                                            id="status"
                                            name="status"
                                            className="form-control"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Info Box */}
                                <div className="alert alert-info" style={{ marginBottom: '2rem' }}>
                                    <strong>💡 Tip:</strong> A well-crafted course title and description help attract more students. Make sure your course offers clear learning outcomes and is structured logically.
                                </div>

                                {/* Action Buttons */}
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                    <Link to="/account/mycourses" className="btn btn-outline btn-lg">
                                        Cancel
                                    </Link>
                                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                        {loading ? "Creating..." : "Create Course"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Course Creation Guidelines */}
                    <div style={{ marginTop: '3rem' }}>
                        <h2 className="mb-3">Course Creation Guidelines</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                            <div className="card" style={{ padding: '1.5rem' }}>
                                <h4 style={{ marginBottom: '1rem' }}>📝 Title & Description</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                                    Use clear, descriptive titles and detailed descriptions to help students understand course content and requirements.
                                </p>
                            </div>
                            <div className="card" style={{ padding: '1.5rem' }}>
                                <h4 style={{ marginBottom: '1rem' }}>🎯 Course Structure</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                                    Organize your course into sections and lectures with clear learning objectives for each module.
                                </p>
                            </div>
                            <div className="card" style={{ padding: '1.5rem' }}>
                                <h4 style={{ marginBottom: '1rem' }}>💰 Pricing</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                                    Set competitive prices based on course content, duration, and market demand. You can offer free courses too.
                                </p>
                            </div>
                            <div className="card" style={{ padding: '1.5rem' }}>
                                <h4 style={{ marginBottom: '1rem' }}>🎨 Thumbnail</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                                    Use an attractive, professional thumbnail that represents your course and grabs students' attention.
                                </p>
                            </div>
                            <div className="card" style={{ padding: '1.5rem' }}>
                                <h4 style={{ marginBottom: '1rem' }}>📚 Content Quality</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                                    Provide high-quality video content, materials, and assignments to ensure student satisfaction and success.
                                </p>
                            </div>
                            <div className="card" style={{ padding: '1.5rem' }}>
                                <h4 style={{ marginBottom: '1rem' }}>⭐ Engagement</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                                    Interact with students through discussions, Q&A sections, and provide timely feedback on assignments.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default CreateCourse;
