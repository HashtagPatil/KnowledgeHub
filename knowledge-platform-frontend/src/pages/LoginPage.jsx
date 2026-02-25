import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const { login } = useAuth();
    const nav = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(form.email, form.password);
            toast.success('Welcome back!');
            nav('/');
        } catch (e) {
            toast.error(e.response?.data?.message || 'Invalid email or password');
        } finally { setLoading(false); }
    };

    return (
        <div className="auth-container">
            <div className="auth-card card fade-in-up">
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>⚡</div>
                    <h1 className="auth-title gradient-text">Welcome Back</h1>
                    <p className="auth-sub">Sign in to your KnowledgeHub account</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email" className="form-input" placeholder="you@example.com"
                            value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            required autoComplete="email"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPass ? 'text' : 'password'} className="form-input"
                                placeholder="Your password" value={form.password}
                                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                required style={{ paddingRight: 44 }}
                            />
                            <button type="button" onClick={() => setShowPass(!showPass)}
                                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px' }} disabled={loading}>
                        {loading ? <span className="spinner" /> : <LogIn size={16} />}
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Don't have an account?{' '}
                    <Link to="/signup" className="auth-link">Create one free</Link>
                </p>
            </div>
        </div>
    );
}
