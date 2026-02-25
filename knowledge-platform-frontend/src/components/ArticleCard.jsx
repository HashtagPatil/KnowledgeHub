import { Link } from 'react-router-dom';
import { Clock, User, Tag } from 'lucide-react';

const CATEGORY_COLORS = {
    tech: 'badge-tech', ai: 'badge-ai', backend: 'badge-backend',
    frontend: 'badge-frontend', devops: 'badge-devops'
};

function getCategoryClass(cat) {
    return CATEGORY_COLORS[(cat || '').toLowerCase()] || 'badge-default';
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function ArticleCard({ article }) {
    const tags = article.tags ? article.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

    return (
        <Link to={`/articles/${article.id}`} style={{ textDecoration: 'none' }}>
            <div className="card fade-in-up" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Category badge */}
                <span className={`badge ${getCategoryClass(article.category)}`}>{article.category}</span>

                {/* Title */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                    {article.title}
                </h3>

                {/* AI-generated summary */}
                {article.summary && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, flex: 1 }}>
                        {article.summary.length > 140 ? article.summary.substring(0, 140) + '...' : article.summary}
                    </p>
                )}

                {/* Tags */}
                {tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {tags.slice(0, 4).map(tag => (
                            <span key={tag} className="tag">#{tag}</span>
                        ))}
                    </div>
                )}

                {/* Meta */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <User size={12} /> {article.authorUsername}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Clock size={12} /> {formatDate(article.createdAt)}
                    </span>
                </div>
            </div>
        </Link>
    );
}
