import React, { useState } from 'react';
import PropTypes from 'prop-types';
import photosService from '../../services/photos';

/**
 * DynamicForm - Renderiza campos dinámicos basados en la estructura de una Plantilla
 * 
 * Props:
 * - template: Objeto Template con estructura de campos
 * - formData: Datos actuales del formulario
 * - onChange: Callback cuando cambia un campo
 * - onPhotosChange: Callback cuando cambian las fotos (galleries o imágenes)
 */
export default function DynamicForm({ template, formData, onChange, onPhotosChange, error }) {
  const [uploadingFields, setUploadingFields] = useState({});

  if (!template || !template.structure || template.structure.length === 0) {
    return <div className="text-center py-8 text-slate-500">No hay campos configurados para esta plantilla</div>;
  }

  // Helper para actualizar un campo simple
  const updateField = (key, value) => {
    onChange({
      ...formData,
      [key]: value
    });
  };

  // Helper para subir archivo y actualizar galería
  const handleFileUpload = async (fieldKey, files, isMultiple = false) => {
    if (!files || files.length === 0) return;

    try {
      setUploadingFields(prev => ({ ...prev, [fieldKey]: true }));

      const uploadedUrls = [];

      for (const file of files) {
        const formDataObj = new FormData();
        formDataObj.append('file', file);

        const response = await photosService.upload(formDataObj);
        const uploadedUrl = response.data?.url || response.data?.secure_url;

        if (uploadedUrl) {
          uploadedUrls.push(uploadedUrl);
        }
      }

      if (isMultiple) {
        // Para image_array, concatenar con las existentes
        const currentArray = formData[fieldKey] || [];
        const newArray = [...currentArray, ...uploadedUrls];
        updateField(fieldKey, newArray);
      } else {
        // Para image, solo una URL
        updateField(fieldKey, uploadedUrls[0] || '');
      }

      // Notificar cambios de fotos si existe callback
      if (onPhotosChange) {
        onPhotosChange(fieldKey);
      }
    } catch (err) {
      console.error(`Error al subir archivo para ${fieldKey}:`, err);
    } finally {
      setUploadingFields(prev => ({ ...prev, [fieldKey]: false }));
    }
  };

  // Helper para eliminar una imagen de una galería
  const removeImageFromArray = (fieldKey, index) => {
    const currentArray = formData[fieldKey] || [];
    const newArray = currentArray.filter((_, i) => i !== index);
    updateField(fieldKey, newArray);
  };

  // Renderizar cada campo según su tipo
  const renderField = (field) => {
    const { key, label, type, placeholder, helpText, required, maxItems } = field;
    const value = formData[key] || (type === 'image_array' ? [] : '');
    const isUploading = uploadingFields[key];

    switch (type) {
      case 'text':
        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="text"
              value={value}
              onChange={e => updateField(key, e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-brand-pink focus:border-transparent"
            />
            {helpText && <p className="text-xs text-slate-500 mt-1">{helpText}</p>}
          </div>
        );

      case 'textarea':
        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              value={value}
              onChange={e => updateField(key, e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-md border px-3 py-2 min-h-24 focus:ring-2 focus:ring-brand-pink focus:border-transparent resize-none"
            />
            {helpText && <p className="text-xs text-slate-500 mt-1">{helpText}</p>}
          </div>
        );

      case 'image':
        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex flex-wrap gap-3 items-start">
              {value && (
                <div className="relative w-24 h-24 rounded overflow-hidden border border-slate-200 shadow-sm">
                  <img src={value} alt={`${key}-preview`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => updateField(key, '')}
                    className="absolute top-1 right-1 bg-white/90 hover:bg-white rounded-full p-1 text-red-600 text-lg"
                  >
                    ×
                  </button>
                </div>
              )}

              <label className={`w-24 h-24 flex items-center justify-center border-2 border-dashed rounded cursor-pointer bg-slate-50 hover:bg-slate-100 transition ${
                isUploading ? 'opacity-50 pointer-events-none' : ''
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileUpload(key, e.target.files)}
                  className="hidden"
                  disabled={isUploading}
                />
                <div className="text-center text-xs text-slate-500">
                  {isUploading ? 'Subiendo...' : 'Subir'}
                </div>
              </label>
            </div>
            {helpText && <p className="text-xs text-slate-500 mt-1">{helpText}</p>}
          </div>
        );

      case 'image_array': {
        const maxAllowed = maxItems || 8;
        const imageArray = Array.isArray(value) ? value : [];
        const canAddMore = imageArray.length < maxAllowed;

        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {label} — máximo {maxAllowed}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex flex-wrap gap-3 items-start">
              {imageArray.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 rounded overflow-hidden border border-slate-200 shadow-sm"
                >
                  <img src={imageUrl} alt={`${key}-${index}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImageFromArray(key, index)}
                    className="absolute top-1 right-1 bg-white/90 hover:bg-white rounded-full p-1 text-red-600 text-lg"
                  >
                    ×
                  </button>
                </div>
              ))}

              {canAddMore && (
                <label className={`w-24 h-24 flex items-center justify-center border-2 border-dashed rounded cursor-pointer bg-slate-50 hover:bg-slate-100 transition ${
                  isUploading ? 'opacity-50 pointer-events-none' : ''
                }`}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={e => handleFileUpload(key, e.target.files, true)}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <div className="text-center text-xs text-slate-500">
                    {isUploading ? 'Subiendo...' : 'Añadir'}
                  </div>
                </label>
              )}
            </div>
            {helpText && <p className="text-xs text-slate-500 mt-1">{helpText}</p>}
            <p className="text-xs text-slate-500 mt-1">
              {imageArray.length} / {maxAllowed} fotos
            </p>
          </div>
        );
      }

      case 'youtube_url':
        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="url"
              value={value}
              onChange={e => updateField(key, e.target.value)}
              placeholder={placeholder || 'https://www.youtube.com/watch?v=...'}
              className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-brand-pink focus:border-transparent"
            />
            {helpText && <p className="text-xs text-slate-500 mt-1">{helpText}</p>}
          </div>
        );

      case 'spotify_url':
        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="url"
              value={value}
              onChange={e => updateField(key, e.target.value)}
              placeholder={placeholder || 'https://open.spotify.com/track/...'}
              className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-brand-pink focus:border-transparent"
            />
            {helpText && <p className="text-xs text-slate-500 mt-1">{helpText}</p>}
          </div>
        );

      case 'color':
        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={value || '#000000'}
                onChange={e => updateField(key, e.target.value)}
                className="w-16 h-10 rounded cursor-pointer border border-slate-300"
              />
              <input
                type="text"
                value={value || '#000000'}
                onChange={e => updateField(key, e.target.value)}
                placeholder="#000000"
                className="flex-1 rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-brand-pink focus:border-transparent"
              />
            </div>
            {helpText && <p className="text-xs text-slate-500 mt-1">{helpText}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-1">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      {template.structure.map(field => renderField(field))}
    </div>
  );
}

DynamicForm.propTypes = {
  template: PropTypes.shape({
    structure: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired,
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onPhotosChange: PropTypes.func,
  error: PropTypes.string
};
