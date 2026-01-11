import React, { useRef, useState } from 'react';

const DynamicInput = ({ field = {}, value, onChange, onImageUpload }) => {
  const { key, type = 'text', label } = field;
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (val) => {
    if (typeof onChange === 'function') onChange(val);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (typeof onImageUpload === 'function') {
      try {
        setUploading(true);
        const result = await onImageUpload(file);
        // onImageUpload puede devolver la URL directamente
        if (result) handleChange(result);
      } catch (err) {
        console.error('Error uploading image', err);
      } finally {
        setUploading(false);
      }
    }
  };

  const triggerFile = () => fileRef.current && fileRef.current.click();

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-bold mb-2 text-gray-700" htmlFor={key}>
          {label}
        </label>
      )}

      {type === 'text' && (
        <input
          id={key}
          type="text"
          value={value || ''}
          onChange={(e) => handleChange(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      )}

      {type === 'textarea' && (
        <textarea
          id={key}
          rows={4}
          value={value || ''}
          onChange={(e) => handleChange(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      )}

      {type === 'color' && (
        <input
          id={key}
          type="color"
          value={value || '#ffffff'}
          onChange={(e) => handleChange(e.target.value)}
          className="w-12 h-10 p-0 border-none"
        />
      )}

      {type === 'image' && (
        <div>
          <input
            id={key}
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {value ? (
            <div className="flex items-center gap-4">
              <img src={value} alt="preview" className="w-24 h-24 object-cover rounded-md" />
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={triggerFile}
                  className="bg-white border border-gray-300 text-sm px-3 py-2 rounded-md hover:bg-gray-50"
                >
                  Cambiar imagen
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('')}
                  className="mt-2 text-sm text-red-600"
                >
                  Quitar
                </button>
                {uploading && <span className="text-sm text-gray-500 mt-2">Subiendo...</span>}
              </div>
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={triggerFile}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Seleccionar imagen
              </button>
              {uploading && <div className="text-sm text-gray-500 mt-2">Subiendo...</div>}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default DynamicInput;
