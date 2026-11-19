'use client';
import { useState } from 'react';

const RATINGS = ['G', 'PG', 'PG-13', 'R', 'TV-MA'];
const MEDIA = [
  { kind: 'poster', label: 'Poster', accept: 'image/*' },
  { kind: 'backdrop', label: 'Backdrop', accept: 'image/*' },
  { kind: 'video', label: 'Video (MP4 / WebM)', accept: 'video/mp4,video/webm' },
];

export default function MovieForm({ initial = {}, submitLabel, onSubmit, allowMedia = false }) {
  const [form, setForm] = useState({
    title: initial.title ?? '',
    description: initial.description ?? '',
    genres: (initial.genres ?? []).join(', '),
    year: initial.year ?? new Date().getFullYear(),
    maturityRating: initial.maturityRating ?? 'PG-13',
    durationMinutes: initial.durationMinutes ?? 90,
    featured: initial.featured ?? false,
  });
  const [files, setFiles] = useState({});
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    setProgress(allowMedia ? { label: 'Creating title…', pct: 0 } : null);
    try {
      await onSubmit(
        { ...form, year: Number(form.year), durationMinutes: Number(form.durationMinutes) },
        files,
        (label, pct) => setProgress({ label, pct })
      );
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setBusy(false);
      setProgress(null);
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <label>Title<input value={form.title} onChange={set('title')} required disabled={busy} /></label>
      <label className="full">Description<textarea rows={3} value={form.description} onChange={set('description')} disabled={busy} /></label>
      <label>Genres (comma separated)<input value={form.genres} onChange={set('genres')} placeholder="Drama, Sci-Fi" disabled={busy} /></label>
      <label>Year<input type="number" value={form.year} onChange={set('year')} disabled={busy} /></label>
      <label>Rating
        <select value={form.maturityRating} onChange={set('maturityRating')} disabled={busy}>
          {RATINGS.map((r) => <option key={r}>{r}</option>)}
        </select>
      </label>
      <label>Duration (min)<input type="number" value={form.durationMinutes} onChange={set('durationMinutes')} disabled={busy} /></label>
      <label className="check"><input type="checkbox" checked={form.featured} onChange={set('featured')} disabled={busy} /> Featured on home page</label>
      {allowMedia && (
        <div className="full">
          <h2>Media <span className="muted small">optional — upload now or edit later</span></h2>
          <div className="new-media">
            {MEDIA.map(({ kind, label, accept }) => (
              <label key={kind}>{label}
                <input type="file" accept={accept} disabled={busy} onChange={(e) => setFiles((current) => ({ ...current, [kind]: e.target.files?.[0] || null }))} />
                {files[kind] && <span className="muted small">{files[kind].name}</span>}
              </label>
            ))}
          </div>
        </div>
      )}
      {progress && (
        <div className="full" role="status" aria-live="polite">
          <p className="muted small">{progress.label} {progress.pct > 0 ? `${progress.pct}%` : ''}</p>
          <div className="bar"><div style={{ width: `${progress.pct}%` }} /></div>
        </div>
      )}
      {error && <div className="err full" role="alert">{error}</div>}
      <div className="full"><button className="btn" disabled={busy}>{busy ? 'Saving…' : submitLabel}</button></div>
    </form>
  );
}
