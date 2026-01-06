import React, { useState, useMemo, useEffect } from 'react';
import { TEMPLATES } from '../constants';

const THEMES = ['San Valentín', 'Cumpleaños', 'Aniversario', 'Día de la Madre'];

export default function AdminCreatePage() {
  const [theme, setTheme] = useState(THEMES[0]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [form, setForm] = useState({
    sender: '',
    recipient: '',
    intro: '',
    message: '',
    photos: [], // { file, url }
    youtube: '',
    closing: ''
  });

  const templates = useMemo(() => TEMPLATES.filter(t => t.occasion === theme || (theme === 'Día de la Madre' && t.occasion === 'General')), [theme]);

  function updateField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handlePhotosSelected(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setForm(prev => {
      const available = Math.max(0, 8 - prev.photos.length);
      const toAdd = files.slice(0, available).map(f => ({ file: f, url: URL.createObjectURL(f) }));
      return { ...prev, photos: [...prev.photos, ...toAdd] };
    });
    // allow selecting same file again
    e.target.value = null;
  }

  function removePhoto(i) {
    setForm(prev => {
      const removed = prev.photos[i];
      try { if (removed && removed.url) URL.revokeObjectURL(removed.url); } catch (err) { }
      return { ...prev, photos: prev.photos.filter((_, idx) => idx !== i) };
    });
  }

  useEffect(() => {
    return () => {
      // revoke object URLs on unmount
      form.photos.forEach(p => { try { if (p && p.url) URL.revokeObjectURL(p.url); } catch (e) { } });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6">Panel Admin — Crear Tarjeta</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Catalog + Customization form (catalog first for mobile) */}
          <div className="bg-white rounded-xl shadow p-6 lg:max-h-[80vh] lg:overflow-auto">
            <h2 className="text-xl font-bold mb-4">Personalización</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Tema</label>
              <div className="flex flex-wrap gap-2">
                {THEMES.map(t => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-3 py-1 rounded-md text-sm font-semibold ${theme === t ? 'bg-brand-pink text-white' : 'bg-slate-100 text-slate-700'}`}
                    type="button"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalog moved here so mobile users see it before personalization */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Catálogo — {theme}</h3>
              <div className="max-h-72 overflow-y-auto pr-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {templates.map(t => (
                    <button key={t.id} onClick={() => setSelectedTemplate(t)} className="group border rounded-lg overflow-hidden p-0">
                      <div className="w-full h-28 bg-slate-100 overflow-hidden">
                        <img src={t.previewUrl} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="p-2 text-left">
                        <div className="text-sm font-semibold">{t.name}</div>
                        <div className="text-xs text-slate-500">{t.occasion}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Plantilla seleccionada</label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-32 bg-slate-100 rounded-lg overflow-hidden border">
                  {selectedTemplate ? (
                    <img src={selectedTemplate.previewUrl} alt={selectedTemplate.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">Vacío</div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold">{selectedTemplate ? selectedTemplate.name : 'Ninguna'}</div>
                  <div className="text-xs text-slate-500">Tema: {selectedTemplate ? selectedTemplate.occasion : '-'}</div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Remitente</label>
              <input value={form.sender} onChange={e => updateField('sender', e.target.value)} className="w-full rounded-md border px-3 py-2" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Destinatario</label>
              <input value={form.recipient} onChange={e => updateField('recipient', e.target.value)} className="w-full rounded-md border px-3 py-2" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Intro</label>
              <input value={form.intro} onChange={e => updateField('intro', e.target.value)} className="w-full rounded-md border px-3 py-2" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Mensaje</label>
              <textarea value={form.message} onChange={e => updateField('message', e.target.value)} className="w-full rounded-md border px-3 py-2 min-h-30" />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-2">Fotos (subir) — máximo 8</label>
              <div className="flex flex-wrap gap-3 items-start">
                {form.photos.map((p, i) => (
                  <div key={i} className="relative w-24 h-24 rounded overflow-hidden border">
                    <img src={p.url} alt={`foto-${i}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removePhoto(i)} className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-red-600">×</button>
                  </div>
                ))}

                {form.photos.length < 8 && (
                  <label className="w-24 h-24 flex items-center justify-center border rounded cursor-pointer bg-slate-50">
                    <input type="file" accept="image/*" multiple onChange={handlePhotosSelected} className="hidden" />
                    <div className="text-sm text-slate-500">Añadir</div>
                  </label>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Canción favorita (enlace YouTube)</label>
              <input value={form.youtube} onChange={e => updateField('youtube', e.target.value)} className="w-full rounded-md border px-3 py-2" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Frase final</label>
              <input value={form.closing} onChange={e => updateField('closing', e.target.value)} className="w-full rounded-md border px-3 py-2" />
            </div>

            <div className="flex gap-3">
              <button type="button" className="px-4 py-2 bg-brand-pink text-white rounded-md font-bold">Guardar Tarjeta</button>
              <button type="button" className="px-4 py-2 bg-slate-100 rounded-md">Cancelar</button>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6 lg:sticky lg:top-6">
              <h2 className="text-xl font-bold mb-4">Previsualización</h2>

              <div className="w-full rounded-2xl border overflow-hidden bg-slate-100">
                {/* If no template selected, show instructions */}
                {!selectedTemplate ? (
                  <div className="p-8 text-center text-slate-500">Selecciona una plantilla del catálogo para previsualizar aquí.</div>
                ) : (
                  <div className="relative">
                    <img src={selectedTemplate.previewUrl} alt="preview" className="w-full h-130 object-cover" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                      <div>
                        <div className="text-sm opacity-90">{form.intro}</div>
                        <h3 className="text-2xl font-bold mt-2">{form.recipient}</h3>
                      </div>

                      <div className="bg-black/40 p-4 rounded-md max-h-[36%] overflow-auto">
                        <p className="text-sm">{form.message}</p>
                      </div>

                      {form.photos && form.photos.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto mt-3">
                          {form.photos.map((p, i) => (
                            <img key={i} src={p.url} alt={`pre-${i}`} className="w-20 h-12 object-cover rounded" />
                          ))}
                        </div>
                      )}

                      <div className="text-sm opacity-90 flex items-center justify-between mt-3">
                        <div>{form.closing}</div>
                        <div className="text-xs opacity-80">De: {form.sender}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
