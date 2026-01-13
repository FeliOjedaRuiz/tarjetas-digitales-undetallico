import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cardsService from '../services/cards';
import DynamicForm from '../components/DinamicForm/DynamicForm';
import { CATEGORIES_LIST } from '../config/categories.config';

// 1. IMPORTAMOS EL MAPPER CENTRALIZADO
import { getTemplateComponent } from '../utils/designMapper';

export default function AdminCreatePage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado del formulario (aquí viven los datos que escribe el usuario)
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true);
        const response = await cardsService.getTemplates(theme);
        const data = Array.isArray(response) ? response : (response.data || []);
        setTemplates(data);
        if (data.length > 0 && !selectedTemplate) {
          setSelectedTemplate(data[0]);
        }
      } catch (err) {
        console.error("Error fetching templates:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTemplates();
  }, [theme]);

  // 3. CONSTRUCCIÓN DE LA "MOCK CARD" PARA LA PREVIEW
  // Creamos un objeto que tiene la misma forma que lo que espera el MasterTemplate
  const previewCardData = {
    content: form, // Los datos dinámicos del formulario
    recipient: form.recipient || 'Nombre del Destinatario',
    sender: form.sender || 'Tu Nombre',
    templateId: selectedTemplate // Pasamos toda la config de colores/estilos del template
  };

  // Identificamos qué componente renderizar
  const PreviewComponent = selectedTemplate 
    ? getTemplateComponent(selectedTemplate.slug)
    : null;

  // Función para guardar la tarjeta
  const handleSubmit = async () => {
    if (!selectedTemplate) return;

    // Validación básica
    if (!form.recipient || !form.sender) {
      alert("Por favor completa los campos 'Para' (Destinatario) y 'De' (Remitente).");
      return;
    }

    try {
      setIsLoading(true);
      // Separamos los metadatos del contenido visual
      const { recipient, sender, ...contentData } = form;

      const payload = {
        templateId: selectedTemplate.id || selectedTemplate._id,
        recipient,
        sender,
        content: contentData
      };

      await cardsService.create(payload);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error al guardar:", error);
      const errorMsg = error.response?.data?.message || "Hubo un error al guardar la tarjeta. Inténtalo de nuevo.";
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: CONFIGURACIÓN (5/12 de ancho) */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl shadow-sm border h-fit">
          <header>
            <h1 className="text-2xl font-bold text-slate-800">Crea tu Detallico</h1>
            <p className="text-sm text-slate-500">Configura el diseño y el mensaje</p>
          </header>

          {/* Selector de Categorías */}
          <section>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-3">1. Categoría</label>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setTheme(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${theme === null ? 'bg-brand-pink text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                Todas
              </button>
              {CATEGORIES_LIST.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setTheme(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${theme === cat ? 'bg-brand-pink text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* Mini-Catálogo */}
          <section>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-3">2. Diseño</label>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {templates.map(t => (
                <div 
                  key={t.id || t._id}
                  onClick={() => { setSelectedTemplate(t); setForm(prev => ({ recipient: prev.recipient, sender: prev.sender })); }}
                  className={`flex-shrink-0 w-24 cursor-pointer transition-all ${selectedTemplate && (selectedTemplate.id === t.id || selectedTemplate._id === t._id) ? 'ring-2 ring-brand-pink rounded-lg p-1' : 'opacity-60'}`}
                >
                  <img src={t.thumbnailUrl} className="h-16 w-full object-cover rounded-md" alt="" />
                  <p className="text-[10px] font-bold truncate text-center mt-1">{t.name}</p>
                </div>
              ))}
            </div>
          </section>

          <hr />

          {/* Formulario Dinámico */}
          <section>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-4">3. Contenido</label>
            {selectedTemplate && (
              <div className="space-y-4">
                {/* Campos Fijos: Remitente y Destinatario */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-700">
                      Para (Destinatario) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.recipient || ''}
                      onChange={e => setForm({ ...form, recipient: e.target.value })}
                      placeholder="Ej: María"
                      className="w-full rounded-md border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-700">
                      De (Remitente) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.sender || ''}
                      onChange={e => setForm({ ...form, sender: e.target.value })}
                      placeholder="Ej: Juan"
                      className="w-full rounded-md border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <DynamicForm 
                  template={selectedTemplate}
                  formData={form}
                  onChange={setForm}
                />
                <button 
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-brand-pink text-white font-bold py-3 rounded-xl shadow-lg mt-4 hover:bg-pink-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Guardando...' : 'Guardar tarjeta'}
                </button>
              </div>
            )}
          </section>
        </div>

        {/* COLUMNA DERECHA: VISTA PREVIA REAL (7/12 de ancho) */}
        <div className="lg:col-span-7">
          <div className="sticky top-8">
            <label className="block text-xs font-bold uppercase text-slate-400 mb-3 text-center">Vista Previa Real</label>
            
            {/* Contenedor que simula una pantalla de móvil o tablet para la preview */}
            <div className="mx-auto max-w-[400px] h-[750px] border-[12px] border-slate-900 rounded-[3rem] shadow-2xl overflow-y-auto bg-white custom-scrollbar">
              {PreviewComponent ? (
                <PreviewComponent card={previewCardData} />
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 italic">
                  Selecciona una plantilla
                </div>
              )}
            </div>
            
            <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest">
              Lo que ves es exactamente lo que recibirá el destinatario
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}