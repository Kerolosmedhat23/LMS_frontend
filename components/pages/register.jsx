import React, { useState } from "react";
import Layout from "../common/layout.jsx";
import { Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registration submitted:', formData);
    };

    return (
        <Layout>
            <section className="section">
                <div className="container" style={{ maxWidth: '500px' }}>
                    <div className="card">
                        <div className="text-center mb-4">
                            <h1>Create Account</h1>
                            <p style={{ color: 'var(--text-secondary)' }}>Join thousands of learners worldwide</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    required
                                />
                                <p className="form-help">Password must be at least 8 characters</p>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Confirm Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="checkbox-group">
                                    <input 
                                        type="checkbox" 
                                        checked={formData.agreeToTerms}
                                        onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                                        required
                                    />
                                    <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block btn-lg">Create Account</button>
                        </form>

                        <div style={{ margin: '2rem 0', textAlign: 'center', position: 'relative' }}>
                            <div style={{ borderTop: '1px solid var(--border-color)', position: 'absolute', width: '100%', top: '50%' }}></div>
                            <span style={{ background: 'var(--bg-primary)', padding: '0 1rem', position: 'relative', color: 'var(--text-secondary)' }}>Or sign up with</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <button className="btn btn-outline">🔵 Facebook</button>
                            <button className="btn btn-outline">🔴 Google</button>
                        </div>

                        <p className="text-center" style={{ color: 'var(--text-secondary)' }}>
                            Already have an account? <Link to="/account/login" style={{ fontWeight: 600 }}>Login</Link>
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    )
}   
export default Register