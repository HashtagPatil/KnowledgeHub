import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import API from '../api/axios';
import ArticleCard from '../components/ArticleCard';

const CATEGORIES = ['All', 'Tech', 'AI', 'Backend', 'Frontend', 'DevOps', 'Database', 'Security', 'Cloud'];

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}

export default function HomePage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [searching, setSearching] = useState(false);

    // Debounced query — fires 400ms after user stops typing
    const debouncedQuery = useDebounce(query, 400);

    const fetchArticles = useCallback(async (q, cat) => {
        setSearching(true);
        try {
            const params = {};
            if (q && q.trim()) params.query = q.trim();
            if (cat && cat.trim()) params.category = cat.trim();
            const res = await API.get('/articles', { params });
            setArticles(res.data);
        } catch {
            setArticles([]);
        } finally {
            setLoading(false);
            setSearching(false);
        }
    }, []);

    // Initial load + live search on query/category change
    useEffect(() => {
        fetchArticles(debouncedQuery, category);
    }, [debouncedQuery, category, fetchArticles]);

    const handleCategoryFilter = (cat) => {
        setCategory(cat === 'All' ? '' : cat);
    };

    const clearSearch = () => {
        setQuery('');
        setCategory('');
    };

    const isFiltered = query || category;

    return (
        <div className="page-wrapper">
            {/* Hero */}
            <div className="hero">
                <h1 className="hero-title">
                    Share &amp; Discover<br />
                    <span className="gradient-text">Technical Knowledge</span>
                </h1>
                <p className="hero-sub">
                    A community platform for developers to write, share, and explore articles
                    powered by AI-assisted writing tools.
                </p>
            </div>

            <div className="container">
                {/* Search Bar */}
                <div className="search-bar">
                    <div className="search-input-wrap" style={{ flex: 1 }}>
                        <Search size={16} />
                        <input
                            type="text"
                            className="form-input search-input"
                            placeholder="Search by title, tags, or author..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            autoComplete="off"
                        />
                        {searching && (
                            <span className="spinner" style={{
                                position: 'absolute', right: 12, top: '50%',
                                transform: 'translateY(-50%)', width: 14, height: 14
                            }} />
                        )}
                    </div>
                    <select
                        className="form-select"
                        style={{ width: 'auto', minWidth: 140 }}
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        {CATEGORIES.map(c => (
                            <option key={c} value={c === 'All' ? '' : c}>{c}</option>
                        ))}
                    </select>
                    {isFiltered && (
                        <button className="btn btn-secondary btn-sm" onClick={clearSearch} title="Clear search">
                            <X size={14} /> Clear
                        </button>
                    )}
                </div>

                {/* Category pills */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryFilter(cat)}
                            className={`btn btn-sm ${(category === (cat === 'All' ? '' : cat)) ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Results */}
                {loading ? (
                    <div className="empty-state">
                        <div className="spinner" style={{ width: 40, height: 40, borderWidth: 3, margin: '0 auto' }} />
                        <p style={{ marginTop: 16 }}>Loading articles...</p>
                    </div>
                ) : articles.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📭</div>
                        <p style={{ fontSize: '1.1rem', marginBottom: 8 }}>
                            {isFiltered ? `No articles match "${query || category}"` : 'No articles yet'}
                        </p>
                        <p>
                            {isFiltered
                                ? <button className="btn btn-secondary btn-sm" onClick={clearSearch}>Clear filters</button>
                                : 'Be the first to write one!'}
                        </p>
                    </div>
                ) : (
                    <>
                        <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: '0.9rem' }}>
                            {articles.length} article{articles.length !== 1 ? 's' : ''} found
                            {isFiltered && <span> for <strong style={{ color: 'var(--text-secondary)' }}>"{query || category}"</strong></span>}
                        </p>
                        <div className="articles-grid">
                            {articles.map((a, i) => (
                                <div key={a.id} className="fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                                    <ArticleCard article={a} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
