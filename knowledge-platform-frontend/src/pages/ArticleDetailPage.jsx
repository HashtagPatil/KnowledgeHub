import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, User, Tag, ArrowLeft, Edit, Trash2, Bot } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import toast from 'react-hot-toast';

function formatDate(d) {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ArticleDetailPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const nav = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => { fetchArticle(); }, [id]);

    const fetchArticle = async () => {
        try {
            const res = await API.get(`/articles/${id}`);
            setArticle(res.data);
        } catch { toast.error('Article not found'); nav('/'); }
        finally { setLoading(false); }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this article?')) return;
        setDeleting(true);
        try {
            await API.delete(`/articles/${id}`);
            toast.success('Article deleted');
            nav('/dashboard');
        } catch (e) { toast.error(e.response?.data?.message || 'Delete failed'); setDeleting(false); }
    };

    const tags = article?.tags ? article.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
    const isAuthor = user && article && user.email === article.authorEmail;

    if (loading) return (
        <div className="page-wrapper" style={{ textAlign: 'center', paddingTop: 160 }}>
            <div className="spinner" style={{ width: 40, height: 40, borderWidth: 3, margin: '0 auto' }} />
        </div>
    );

    if (!article) return null;

    return (
        <div className="page-wrapper">
            <div className="container" style={{ maxWidth: 860 }}>
                <Link to="/" className="btn btn-secondary btn-sm" style={{ marginBottom: 32 }}>
                    <ArrowLeft size={14} /> Back to Home
                </Link>

                <div className="card article-header" style={{ padding: '40px' }}>
                    {/* Category */}
                    <div style={{ marginBottom: 16 }}>
                        <span className="badge badge-default">{article.category}</span>
                    </div>

                    {/* Title */}
                    <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, lineHeight: 1.3, marginBottom: 24 }}>
                        {article.title}
                    </h1>

                    {/* Meta */}
                    <div className="article-meta" style={{ marginBottom: 32 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <User size={14} /> <strong>{article.authorUsername}</strong>
                        </span>
                        <span>·</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Clock size={14} /> {formatDate(article.createdAt)}
                        </span>
                        {article.updatedAt && article.updatedAt !== article.createdAt && (
                            <><span>·</span><span style={{ fontSize: '0.8rem' }}>Updated {formatDate(article.updatedAt)}</span></>
                        )}
                    </div>

                    {/* AI Summary */}
                    {article.summary && (
                        <div className="ai-summary-box">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: '#67e8f9', fontWeight: 600, fontSize: '0.85rem' }}>
                                <Bot size={14} /> AI-Generated Summary
                            </div>
                            {article.summary}
                        </div>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
                            {tags.map(tag => (
                                <span key={tag} className="tag">
                                    <Tag size={10} style={{ marginRight: 4 }} />{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <hr className="divider" />

                    {/* Content */}
                    <div
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Author actions */}
                    {isAuthor && (
                        <div style={{ display: 'flex', gap: 12, marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
                            <Link to={`/articles/${id}/edit`} className="btn btn-secondary">
                                <Edit size={14} /> Edit Article
                            </Link>
                            <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
                                <Trash2 size={14} /> {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
