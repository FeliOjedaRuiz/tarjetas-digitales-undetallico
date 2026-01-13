import React, { useState } from 'react';
import api from '../../services/base-api'; // Asegúrate de que esta ruta apunte a tu configuración de Axios

const ImageUploadField = ({ label, value, onChange, multiple = false }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Validaciones básicas
    const invalidFile = files.find(file => !file.type.startsWith('image/'));
    if (invalidFile) {
      setError('Por favor selecciona solo archivos de imagen válidos.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Subimos todos los archivos en paralelo
      const uploadPromises = files.map(file => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      });

      const responses = await Promise.all(uploadPromises);
      
      // Extraemos las URLs de todas las respuestas
      const urls = responses.map(res => res.url || res.secure_url || res.data?.url).filter(Boolean);
      
      if (urls.length > 0) {
        // Si es múltiple devolvemos el array, si no, la primera URL (string)
        if (multiple) {
          onChange(urls);
        } else {
          onChange(urls[0]);
        }
      } else {
        throw new Error('No se recibieron las URLs de las imágenes');
      }

    } catch (err) {
      console.error('Error subiendo imagen:', err);
      // Intentamos mostrar el mensaje específico del backend si existe
      setError(err.response?.data?.message || 'Error al subir las imágenes. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
        {label}
      </label>
      
      <div className="flex items-start gap-4">
        {/* Previsualización (Solo si no es múltiple o si tiene valor único) */}
        <div className="relative w-24 h-24 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex-shrink-0">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
              <div className="w-6 h-6 border-2 border-brand-pink border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : value && !multiple ? (
            <img 
              src={value} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
          )}
        </div>

        {/* Input y Errores */}
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleFileChange}
            disabled={loading}
            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-xs file:font-semibold
              file:bg-brand-pink file:text-white
              hover:file:bg-pink-600
              cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <p className="mt-2 text-[10px] text-slate-400">
            {multiple ? 'Sube una o varias imágenes' : 'Sube una imagen'} (JPG, PNG). Máximo 5MB.
          </p>
          {error && (
            <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadField;