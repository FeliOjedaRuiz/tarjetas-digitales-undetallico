import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cardsService from '../services/cards';
import DynamicForm from '../components/DinamicForm/DynamicForm';

const THEMES = ['San Valentín', 'Cumpleaños', 'Aniversario', 'Día de la Madre'];

export default function AdminCreatePage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(THEMES[0]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await cardsService.getTemplates();
        
        // El backend retorna directamente el array, no { data: ... }
        const templatesData = Array.isArray(response.data) ? response.data : response;
        
        // Mapear datos del backend para que encajen con la UI
        const mappedTemplates = templatesData.map(t => ({
          ...t,
          id: t._id,
          previewUrl: t.thumbnailUrl,
          primaryColor: t.defaultStyles?.colors?.primary,
          secondaryColor: t.defaultStyles?.colors?.text,
        }));
        
        setTemplates(mappedTemplates);
        
        // Seleccionar la primera plantilla por defecto
        if (mappedTemplates.length > 0) {
          setSelectedTemplate(mappedTemplates[0]);
        }
      } catch (err) {
        setError(err.message || 'Error al cargar las plantillas');
        console.error('Error fetching templates:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTemplates();
  }, []);

  // Filtrar plantillas por tema cuando el tema cambia
  useEffect(() => {
    const filteredTemplates = templates.filter(t => 
      t.occasion === theme || (theme === 'Día de la Madre' && t.occasion === 'General')
    );
    
    if (filteredTemplates.length > 0 && !selectedTemplate?.occasion?.includes(theme)) {
      setSelectedTemplate(filteredTemplates[0]);
    }
  }, [theme, templates, selectedTemplate]);

  function updateField(newFormData) {
    setForm(newFormData);
  }

  async function handleSubmit() {
    if (!selectedTemplate) {
      setError('Por favor selecciona una plantilla');
      return;
    }
    
    if (!form.recipient) {
      setError('Por favor ingresa el nombre del destinatario');
      return;
    }
    
    try {
      setError(null);
      
      // Construir el objeto content basándose en la estructura de campos de la plantilla
      const content = {};
      selectedTemplate.structure.forEach(field => {
        const value = form[field.key];
        if (value !== undefined && value !== null && value !== '') {
          content[field.key] = value;
        }
      });

      const payload = {
        templateId: selectedTemplate._id,
        recipient: form.recipient,
        sender: form.sender || '',
        content
      };
      
      await cardsService.create(payload);
      alert('¡Tarjeta creada exitosamente!');
      navigate('/'); // Redirigir a página de éxito
    } catch (err) {
      setError('Error al crear la tarjeta: ' + (err.message || 'Error desconocido'));
      console.error('Error creating card:', err);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6">Panel Admin — Crear Tarjeta</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="text-center py-12 text-slate-500">Cargando plantillas...</div>
        )}

        {!isLoading && (
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

            {/* Campos de Remitente y Destinatario (siempre visibles) */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Remitente</label>
              <input 
                value={form.sender || ''} 
                onChange={e => updateField({ ...form, sender: e.target.value })} 
                className="w-full rounded-md border px-3 py-2" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Destinatario <span className="text-red-500">*</span></label>
              <input 
                value={form.recipient || ''} 
                onChange={e => updateField({ ...form, recipient: e.target.value })} 
                className="w-full rounded-md border px-3 py-2" 
                required
              />
            </div>

            {/* Formulario dinámico basado en la estructura de la plantilla */}
            {selectedTemplate && (
              <DynamicForm
                template={selectedTemplate}
                formData={form}
                onChange={updateField}
                error={error}
              />
            )}


            <div className="flex gap-3">
              <button type="button" onClick={handleSubmit} className="px-4 py-2 bg-brand-pink text-white rounded-md font-bold hover:bg-pink-600 disabled:opacity-50" disabled={isLoading}>Guardar Tarjeta</button>
              <button type="button" onClick={() => navigate('/')} className="px-4 py-2 bg-slate-100 rounded-md hover:bg-slate-200">Cancelar</button>
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
        )}
      </div>
    </div>
  );
}
