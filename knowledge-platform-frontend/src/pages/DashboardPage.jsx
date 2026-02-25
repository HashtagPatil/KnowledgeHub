import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Trash2, PlusSquare, LayoutDashboard, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import toast from 'react-hot-toast';

function formatDate(d) {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function DashboardPage() {
    const { user } = useAuth();
    const nav = useNavigate();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => { fetchMyArticles(); }, []);

    const fetchMyArticles = async () => {
        try {
            const res = await API.get('/articles/my');
            setArticles(res.data);
        } catch { toast.error('Failed to load articles'); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this article?')) return;
        setDeletingId(id);
        try {
            await API.delete(`/articles/${id}`);
            setArticles(a => a.filter(x => x.id !== id));
            toast.success('Article deleted');
        } catch (e) {
            toast.error(e.response?.data?.message || 'Delete failed');
        } finally { setDeletingId(null); }
    };

    return (
        <div className="page-wrapper">
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
                    <div>
                        <h1 className="section-title">
                            <LayoutDashboard size={24} style={{ display: 'inline', marginRight: 10 }} />
                            My Articles
                        </h1>
                        <p className="section-sub">Manage your published articles, {user?.username}.</p>
                    </div>
                    <Link to="/articles/new" className="btn btn-primary">
                        <PlusSquare size={16} /> New Article
                    </Link>
                </div>

                {loading ? (
                    <div className="empty-state">
                        <div className="spinner" style={{ width: 36, height: 36, borderWidth: 3, margin: '0 auto' }} />
                    </div>
                ) : articles.length === 0 ? (
                    <div className="empty-state card">
                        <div className="empty-icon">✍️</div>
                        <p style={{ fontSize: '1.1rem', marginBottom: 8 }}>No articles yet</p>
                        <p style={{ marginBottom: 24 }}>Start contributing and sharing your knowledge!</p>
                        <Link to="/articles/new" className="btn btn-primary">Write Your First Article</Link>
                    </div>
                ) : (
                    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Tags</th>
                                    <th>Published</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map(article => (
                                    <tr key={article.id}>
                                        <td>
                                            <Link to={`/articles/${article.id}`}
                                                style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600, '&:hover': { color: 'var(--accent)' } }}>
                                                {article.title.length > 50 ? article.title.substring(0, 50) + '...' : article.title}
                                            </Link>
                                        </td>
                                        <td><span className="badge badge-default">{article.category}</span></td>
                                        <td>
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                                {article.tags || '—'}
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                                <Clock size={12} /> {formatDate(article.createdAt)}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: 8 }}>
                                                <Link to={`/articles/${article.id}/edit`} className="btn btn-sm btn-secondary">
                                                    <Edit size={13} /> Edit
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(article.id)}
                                                    disabled={deletingId === article.id}
                                                >
                                                    <Trash2 size={13} />
                                                    {deletingId === article.id ? '...' : 'Delete'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
