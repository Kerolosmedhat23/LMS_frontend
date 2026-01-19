import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>📚 LearnHub</h3>
                        <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
                            Empowering learners worldwide with quality education. 
                            Join thousands of students achieving their goals.
                        </p>
                        <div className="social-links" style={{ justifyContent: 'flex-start', marginTop: '1.5rem' }}>
                            <a href="#" className="social-link" aria-label="Facebook">f</a>
                            <a href="#" className="social-link" aria-label="Twitter">𝕏</a>
                            <a href="#" className="social-link" aria-label="LinkedIn">in</a>
                            <a href="#" className="social-link" aria-label="Instagram">📷</a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/courses">All Courses</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/account/mycourses">My Learning</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Categories</h3>
                        <ul className="footer-links">
                            <li><a href="#">Development</a></li>
                            <li><a href="#">Design</a></li>
                            <li><a href="#">Business</a></li>
                            <li><a href="#">Data Science</a></li>
                            <li><a href="#">Marketing</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Support</h3>
                        <ul className="footer-links">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 LearnHub. All rights reserved. Built with ❤️ for learners worldwide.</p>
                </div>
            </div>
        </footer>
    )
}   

export default Footer