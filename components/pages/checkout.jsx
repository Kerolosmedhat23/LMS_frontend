import React, { useState } from "react";
import Layout from "../common/layout.jsx";
import { Link } from "react-router-dom";

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('card');

    return (
        <Layout>
            <section className="section">
                <div className="container">
                    <h1 className="mb-4">Checkout</h1>
                    
                    <div className="grid grid-cols-2 gap-3">
                        {/* Billing Information */}
                        <div>
                            <div className="card mb-3">
                                <h3 className="mb-3">Billing Information</h3>
                                <form>
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" className="form-control" placeholder="John Doe" required />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <input type="email" className="form-control" placeholder="john@example.com" required />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Country</label>
                                        <input type="text" className="form-control" placeholder="United States" required />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="form-group">
                                            <label className="form-label">State/Province</label>
                                            <input type="text" className="form-control" placeholder="California" required />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">ZIP Code</label>
                                            <input type="text" className="form-control" placeholder="90210" required />
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="card">
                                <h3 className="mb-3">Payment Method</h3>
                                
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <button 
                                        className={`btn ${paymentMethod === 'card' ? 'btn-primary' : 'btn-outline'}`}
                                        onClick={() => setPaymentMethod('card')}
                                        style={{ flex: 1 }}
                                    >
                                        💳 Credit Card
                                    </button>
                                    <button 
                                        className={`btn ${paymentMethod === 'paypal' ? 'btn-primary' : 'btn-outline'}`}
                                        onClick={() => setPaymentMethod('paypal')}
                                        style={{ flex: 1 }}
                                    >
                                        PayPal
                                    </button>
                                </div>

                                {paymentMethod === 'card' && (
                                    <form>
                                        <div className="form-group">
                                            <label className="form-label">Card Number</label>
                                            <input type="text" className="form-control" placeholder="1234 5678 9012 3456" required />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Cardholder Name</label>
                                            <input type="text" className="form-control" placeholder="John Doe" required />
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="form-group">
                                                <label className="form-label">Expiry Date</label>
                                                <input type="text" className="form-control" placeholder="MM/YY" required />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">CVV</label>
                                                <input type="text" className="form-control" placeholder="123" required />
                                            </div>
                                        </div>
                                    </form>
                                )}

                                {paymentMethod === 'paypal' && (
                                    <div className="alert alert-info">
                                        You will be redirected to PayPal to complete your purchase.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <div className="card" style={{ position: 'sticky', top: '100px' }}>
                                <h3 className="mb-3">Order Summary</h3>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                                        <div style={{ width: '80px', height: '60px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 'var(--border-radius-md)' }}></div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Complete Web Development Bootcamp</h4>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>by John Doe</p>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                        <span>Original Price:</span>
                                        <span>$99.99</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--success-color)' }}>
                                        <span>Discount (50%):</span>
                                        <span>-$50.00</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                        <span>Subtotal:</span>
                                        <span>$49.99</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                        <span>Tax:</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div style={{ borderTop: '2px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700 }}>
                                        <span>Total:</span>
                                        <span style={{ color: 'var(--primary-color)' }}>$49.99</span>
                                    </div>
                                </div>

                                <button className="btn btn-primary btn-block btn-lg">Complete Purchase</button>

                                <div className="alert alert-success" style={{ marginTop: '1.5rem' }}>
                                    🔒 Secure payment - Your information is protected
                                </div>

                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                                    By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}  
export default Checkout 