import { useState } from 'react';
import {
    Sparkles, RefreshCw, Scissors, Type, Tag,
    Loader, Copy, Check, ChevronDown, ChevronUp, Zap
} from 'lucide-react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const ACTIONS = [
    {
        key: 'improve',
        icon: <Sparkles size={13} />,
        label: 'Improve Writing',
        desc: 'Rewrite with professional vocabulary',
        color: '#a78bfa',
        bg: 'rgba(167,139,250,0.08)',
        border: 'rgba(167,139,250,0.25)',
    },
    {
        key: 'grammar',
        icon: <RefreshCw size={13} />,
        label: 'Fix Grammar',
        desc: 'Fix grammar, punctuation & capitalization',
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.08)',
        border: 'rgba(245,158,11,0.25)',
    },
    {
        key: 'concise',
        icon: <Scissors size={13} />,
        label: 'Make Concise',
        desc: 'Keep only the most informative sentences',
        color: '#f87171',
        bg: 'rgba(248,113,113,0.08)',
        border: 'rgba(248,113,113,0.25)',
    },
    {
        key: 'title',
        icon: <Type size={13} />,
        label: 'Suggest Titles',
        desc: 'Generate 5 SEO-friendly title options',
        color: '#60a5fa',
        bg: 'rgba(96,165,250,0.08)',
        border: 'rgba(96,165,250,0.25)',
    },
];

export default function AiAssistPanel({ content, title, onApply, onTitleSuggest, onTagsSuggest }) {
    const [loading, setLoading] = useState(null);
    const [result, setResult] = useState('');
    const [activeAction, setActiveAction] = useState('');
    const [copied, setCopied] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const hasContent = content && content.replace(/<[^>]+>/g, '').trim().length >= 10;

    const runAction = async (action) => {
        if (!hasContent) {
            toast.error('Please write at least 10 characters of content first');
            return;
        }
        setLoading(action);
        setResult('');
        setCopied(false);
        try {
            const res = await API.post('/ai/improve', { content, action, title });
            setResult(res.data.result);
            setActiveAction(action);
            if (collapsed) setCollapsed(false);
            toast.success('✨ AI suggestion ready!');
        } catch (e) {
            toast.error(e.response?.data?.message || 'AI request failed');
        } finally {
            setLoading(null);
        }
    };

    const runSummary = async () => {
        if (!hasContent) {
            toast.error('Please write some content first');
            return;
        }
        setLoading('summary');
        setResult('');
        setCopied(false);
        try {
            const res = await API.post('/ai/summary', { content });
            setResult(res.data.result);
            setActiveAction('summary');
            if (collapsed) setCollapsed(false);
            toast.success('📋 Summary generated!');
        } catch (e) {
            toast.error('Failed to generate summary');
        } finally {
            setLoading(null);
        }
    };

    const runTags = async () => {
        if (!hasContent) {
            toast.error('Please write some content first');
            return;
        }
        setLoading('tags');
        setResult('');
        setCopied(false);
        try {
            const res = await API.post('/ai/tags', { content, title });
            const tagStr = res.data.tags.join(', ');
            setResult(tagStr);
            setActiveAction('tags');
            if (collapsed) setCollapsed(false);
            if (onTagsSuggest) onTagsSuggest(tagStr);
            toast.success('🏷️ Tags applied to form!');
        } catch (e) {
            toast.error('Failed to suggest tags');
        } finally {
            setLoading(null);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    const handleApplyContent = () => {
        if (onApply) {
            onApply(result);
            setResult('');
        }
    };

    const handleApplyTitle = (line) => {
        // Strip leading "1. ", "2. " etc and apply
        const clean = line.replace(/^\d+\.\s*/, '').trim();
        if (onTitleSuggest && clean) {
            onTitleSuggest(clean);
            toast.success('Title applied!');
        }
    };

    const resultLabel = {
        improve: '✨ Improved Version',
        grammar: '📝 Grammar Fixed',
        concise: '✂️ Concise Version',
        title: '💡 Title Suggestions',
        summary: '📋 Generated Summary',
        tags: '🏷️ Suggested Tags',
    }[activeAction] || '';

    return (
        <div className="ai-panel">
            {/* Header */}
            <div className="ai-panel-title" style={{ cursor: 'pointer' }} onClick={() => setCollapsed(c => !c)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Sparkles size={18} color="#a78bfa" style={{ animation: loading ? 'pulse 1s infinite' : 'none' }} />
                    <span className="gradient-text" style={{ fontWeight: 700 }}>AI Writing Assistant</span>
                    <span style={{
                        fontSize: '0.7rem', background: 'rgba(167,139,250,0.15)',
                        color: '#a78bfa', padding: '2px 8px', borderRadius: 99, fontWeight: 600
                    }}>POWERED BY AI</span>
                </div>
                {collapsed ? <ChevronDown size={16} color="var(--text-muted)" /> : <ChevronUp size={16} color="var(--text-muted)" />}
            </div>

            {!collapsed && (
                <>
                    {/* Action buttons */}
                    <div style={{ marginBottom: 12 }}>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 10 }}>
                            Select an AI action to enhance your article content:
                        </p>
                        <div className="ai-actions">
                            {ACTIONS.map(({ key, icon, label, desc, color, bg, border }) => (
                                <button
                                    key={key}
                                    className="ai-btn"
                                    title={desc}
                                    onClick={() => runAction(key)}
                                    disabled={!!loading}
                                    style={{ borderColor: border, background: bg, color }}
                                >
                                    {loading === key
                                        ? <span className="spinner" style={{ width: 12, height: 12, borderColor: color, borderTopColor: 'transparent' }} />
                                        : icon}
                                    {label}
                                </button>
                            ))}

                            {/* Summary */}
                            <button
                                className="ai-btn"
                                title="Auto-generate a short summary for the article card"
                                onClick={runSummary}
                                disabled={!!loading}
                                style={{ borderColor: 'rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.08)', color: '#67e8f9' }}
                            >
                                {loading === 'summary'
                                    ? <span className="spinner" style={{ width: 12, height: 12, borderColor: '#67e8f9', borderTopColor: 'transparent' }} />
                                    : <Loader size={13} />}
                                Generate Summary
                            </button>

                            {/* Tags */}
                            <button
                                className="ai-btn"
                                title="Suggest relevant tags based on article content"
                                onClick={runTags}
                                disabled={!!loading}
                                style={{ borderColor: 'rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.08)', color: '#6ee7b7' }}
                            >
                                {loading === 'tags'
                                    ? <span className="spinner" style={{ width: 12, height: 12, borderColor: '#6ee7b7', borderTopColor: 'transparent' }} />
                                    : <Tag size={13} />}
                                Suggest Tags
                            </button>
                        </div>
                    </div>

                    {/* Result box */}
                    {result && (
                        <div className="ai-result">
                            {/* Result header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <span style={{ fontWeight: 700, color: '#a78bfa', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {resultLabel}
                                </span>
                                <button
                                    onClick={handleCopy}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied ? '#6ee7b7' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem' }}
                                    title="Copy to clipboard"
                                >
                                    {copied ? <Check size={13} /> : <Copy size={13} />}
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>

                            {/* Title suggestions — show as clickable lines */}
                            {activeAction === 'title' ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {result.split('\n').filter(Boolean).map((line, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 8,
                                                padding: '8px 12px', borderRadius: 8,
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid var(--border)',
                                                fontSize: '0.875rem', color: 'var(--text-secondary)',
                                                cursor: 'pointer', transition: 'background 0.15s',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(167,139,250,0.08)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                                            onClick={() => handleApplyTitle(line)}
                                            title="Click to apply this title"
                                        >
                                            <Zap size={12} color="#a78bfa" style={{ flexShrink: 0 }} />
                                            <span>{line.replace(/^\d+\.\s*/, '')}</span>
                                        </div>
                                    ))}
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                                        💡 Click any title above to apply it to your article
                                    </p>
                                </div>
                            ) : (
                                <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                                    {result}
                                </div>
                            )}

                            {/* Action buttons based on type */}
                            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                                {(activeAction === 'improve' || activeAction === 'grammar' || activeAction === 'concise') && onApply && (
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={handleApplyContent}
                                        style={{ fontSize: '0.78rem' }}
                                    >
                                        <Check size={12} /> Apply to Editor
                                    </button>
                                )}
                                {activeAction === 'summary' && (
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={handleCopy}
                                        style={{ fontSize: '0.78rem' }}
                                    >
                                        <Copy size={12} /> Copy Summary
                                    </button>
                                )}
                                <button
                                    className="btn btn-sm btn-secondary"
                                    style={{ fontSize: '0.78rem' }}
                                    onClick={() => { setResult(''); setActiveAction(''); }}
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Info note */}
                    {!result && !loading && (
                        <div style={{
                            padding: '10px 14px', borderRadius: 8,
                            background: 'rgba(167,139,250,0.05)',
                            border: '1px solid rgba(167,139,250,0.15)',
                            fontSize: '0.78rem', color: 'var(--text-muted)',
                            display: 'flex', alignItems: 'center', gap: 8
                        }}>
                            <Sparkles size={12} color="#a78bfa" />
                            Write at least a few sentences, then use AI to improve, fix grammar, or generate a summary &amp; tags.
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
