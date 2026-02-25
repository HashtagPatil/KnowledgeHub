import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import toast from 'react-hot-toast';
import { Save, ArrowLeft } from 'lucide-react';
import API from '../api/axios';
import AiAssistPanel from '../components/AiAssistPanel';

const CATEGORIES = ['Tech', 'AI', 'Backend', 'Frontend', 'DevOps', 'Other'];

const QUILL_MODULES = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['clean'],
    ],
};

export default function ArticleFormPage() {
    const { id } = useParams(); // present on edit
    const isEdit = !!id;
    const nav = useNavigate();

    const [form, setForm] = useState({ title: '', content: '', category: 'Tech', tags: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isEdit) {
            API.get(`/articles/${id}`).then(res => {
                const a = res.data;
                setForm({ title: a.title, content: a.content || '', category: a.category, tags: a.tags || '' });
            }).catch(() => { toast.error('Article not found'); nav('/'); });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const plain = form.content.replace(/<[^>]+>/g, '').trim();
        if (!plain) { toast.error('Content cannot be empty'); return; }
        setSaving(true);
        try {
            if (isEdit) {
                await API.put(`/articles/${id}`, form);
                toast.success('Article updated!');
                nav(`/articles/${id}`);
            } else {
                const res = await API.post('/articles', form);
                toast.success('Article published!');
                nav(`/articles/${res.data.id}`);
            }
        } catch (e) {
            toast.error(e.response?.data?.message || 'Failed to save article');
        } finally { setSaving(false); }
    };

    const handleApplyAi = (text) => {
        setForm(f => ({ ...f, content: `<p>${text.replace(/\n/g, '</p><p>')}</p>` }));
        toast.success('AI content applied!');
    };

    const handleApplyTitle = (suggestedTitle) => {
        setForm(f => ({ ...f, title: suggestedTitle }));
    };

    return (
        <div className="page-wrapper">
            <div className="container" style={{ maxWidth: 900 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => nav(-1)}>
                        <ArrowLeft size={14} />
                    </button>
                    <div>
                        <h1 className="section-title" style={{ marginBottom: 0 }}>
                            {isEdit ? 'Edit Article' : 'Create New Article'}
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            {isEdit ? 'Update your article below' : 'Share your knowledge with the community'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="card" style={{ padding: 32, marginBottom: 24 }}>
                        {/* Title */}
                        <div className="form-group">
                            <label className="form-label">Article Title *</label>
                            <input
                                className="form-input"
                                placeholder="e.g. Understanding Spring Boot Auto-configuration"
                                value={form.title}
                                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            {/* Category */}
                            <div className="form-group">
                                <label className="form-label">Category *</label>
                                <select
                                    className="form-select"
                                    value={form.category}
                                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                                >
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            {/* Tags */}
                            <div className="form-group">
                                <label className="form-label">Tags (comma-separated)</label>
                                <input
                                    className="form-input"
                                    placeholder="e.g. java, spring, backend"
                                    value={form.tags}
                                    onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                                />
                            </div>
                        </div>

                        {/* Rich Text Editor */}
                        <div className="form-group">
                            <label className="form-label">Content *</label>
                            <div className="quill-editor">
                                <ReactQuill
                                    theme="snow"
                                    value={form.content}
                                    onChange={val => setForm(f => ({ ...f, content: val }))}
                                    modules={QUILL_MODULES}
                                    placeholder="Write your article here..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* AI Assist Panel */}
                    <AiAssistPanel
                        content={form.content}
                        title={form.title}
                        onApply={handleApplyAi}
                        onTitleSuggest={handleApplyTitle}
                        onTagsSuggest={(tags) => setForm(f => ({ ...f, tags }))}
                    />

                    {/* Submit */}
                    <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                        <button type="submit" className="btn btn-primary" disabled={saving}>
                            {saving ? <span className="spinner" /> : <Save size={16} />}
                            {saving ? 'Saving...' : isEdit ? 'Update Article' : 'Publish Article'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={() => nav(-1)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
