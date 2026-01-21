import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../src/hooks/useAuth";
import UserProfile from "./userprofile.jsx";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated, loading } = useAuth();

    return (
        <header className="header">
            <div className="container">
                <nav className="navbar">
                    <Link to="/" className="logo">
                        <span style={{ fontSize: '2rem' }}>📚</span>
                        <span>LearnHub</span>
                    </Link>

                    <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                        <li><Link to="/" className="nav-link active">Home</Link></li>
                        <li><Link to="/courses" className="nav-link">Courses</Link></li>
                        {isAuthenticated && <li><Link to="/account/mycourses" className="nav-link">My Courses</Link></li>}
                        <li><Link to="/about" className="nav-link">About</Link></li>
                    </ul>

                    <div className="nav-actions">
                        {!loading && !isAuthenticated && (
                            <>
                                <Link to="/account/login" className="btn btn-ghost">Login</Link>
                                <Link to="/account/register" className="btn btn-primary">Sign Up</Link>
                            </>
                        )}
                        {!loading && isAuthenticated && (
                            <UserProfile />
                        )}
                    </div>

                    <button 
                        className="mobile-menu-toggle" 
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? '✕' : '☰'}
                    </button>
                </nav>
            </div>
        </header>
    )
}   

export default Header