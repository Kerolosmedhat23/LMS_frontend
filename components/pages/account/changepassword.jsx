import React, { useState } from "react";
import Layout from "../../common/layout.jsx";

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
    };

    return (
        <Layout>
            <section className="section">
                <div className="container" style={{ maxWidth: '600px' }}>
                    <h1 className="mb-4">Change Password</h1>

                    {showSuccess && (
                        <div className="alert alert-success">
                            ✓ Your password has been changed successfully!
                        </div>
                    )}

                    <div className="card">
                        <h3 className="mb-3">Update Your Password</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Choose a strong password to keep your account secure.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Current Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Enter your current password"
                                    value={formData.currentPassword}
                                    onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">New Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Enter your new password"
                                    value={formData.newPassword}
                                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                                    required
                                />
                                <p className="form-help">Password must be at least 8 characters long</p>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Confirm New Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Confirm your new password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="alert alert-info">
                                <h4 style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>Password Requirements:</h4>
                                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                                    <li>At least 8 characters long</li>
                                    <li>Include at least one uppercase letter</li>
                                    <li>Include at least one lowercase letter</li>
                                    <li>Include at least one number</li>
                                    <li>Include at least one special character</li>
                                </ul>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button type="submit" className="btn btn-primary btn-lg">Update Password</button>
                                <button type="button" className="btn btn-outline btn-lg">Cancel</button>
                            </div>
                        </form>
                    </div>

                    <div className="card mt-4">
                        <h4 className="mb-2">Security Tips</h4>
                        <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem' }}>
                            <li>Never share your password with anyone</li>
                            <li>Use a unique password for each account</li>
                            <li>Consider using a password manager</li>
                            <li>Change your password regularly</li>
                            <li>Enable two-factor authentication for extra security</li>
                        </ul>
                    </div>
                </div>
            </section>
        </Layout>
    )
}   
export default ChangePassword