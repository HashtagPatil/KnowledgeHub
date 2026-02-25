import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, PlusSquare, LayoutDashboard, LogIn, LogOut, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const nav = useNavigate();

    const handleLogout = async () => {
        await logout();
        toast.success('Logged out');
        nav('/');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-inner">
                <Link to="/" className="navbar-logo">
                    <span className="gradient-text">⚡ KnowledgeHub</span>
                </Link>
                <div className="navbar-nav">
                    <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                        <Home size={16} /><span className="nav-text">Home</span>
                    </NavLink>
                    {isAuthenticated && (
                        <>
                            <NavLink to="/articles/new" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                                <PlusSquare size={16} /><span className="nav-text">New Article</span>
                            </NavLink>
                            <NavLink to="/dashboard" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                                <LayoutDashboard size={16} /><span className="nav-text">My Articles</span>
                            </NavLink>
                        </>
                    )}
                    {isAuthenticated ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', padding: '0 8px' }}>
                                👋 {user?.username}
                            </span>
                            <button className="btn btn-sm btn-secondary" onClick={handleLogout}>
                                <LogOut size={14} /> Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-sm btn-primary">
                            <LogIn size={14} /> Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
