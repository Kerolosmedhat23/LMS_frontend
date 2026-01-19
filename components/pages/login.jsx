import React, { useState } from "react";
import Layout from "../common/layout.jsx";
import { Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login submitted:', formData);
    };

    return (
        <Layout>
            <section className="section">
                <div className="container" style={{ maxWidth: '500px' }}>
                    <div className="card">
                        <div className="text-center mb-4">
                            <h1>Welcome Back</h1>
                            <p style={{ color: 'var(--text-secondary)' }}>Login to continue your learning journey</p>
                        </div>

                        <form onSubmit={handleSubmit}>
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
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    required
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <label className="checkbox-group">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" style={{ fontSize: '0.875rem' }}>Forgot password?</a>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block btn-lg">Login</button>
                        </form>

                        <div style={{ margin: '2rem 0', textAlign: 'center', position: 'relative' }}>
                            <div style={{ borderTop: '1px solid var(--border-color)', position: 'absolute', width: '100%', top: '50%' }}></div>
                            <span style={{ background: 'var(--bg-primary)', padding: '0 1rem', position: 'relative', color: 'var(--text-secondary)' }}>Or continue with</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <button className="btn btn-outline">🔵 Facebook</button>
                            <button className="btn btn-outline">🔴 Google</button>
                        </div>

                        <p className="text-center" style={{ color: 'var(--text-secondary)' }}>
                            Don't have an account? <Link to="/account/register" style={{ fontWeight: 600 }}>Sign up</Link>
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    )
}           
export default Login    