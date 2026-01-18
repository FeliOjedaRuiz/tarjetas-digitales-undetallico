import React from 'react';
import PropTypes from 'prop-types';
import ImageUploadField from './ImageUploadField';
import api from '../../services/base-api';

/**
 * DynamicForm - Renderiza campos dinámicos basados en la estructura de una Plantilla
 *
 * Props:
 * - template: Objeto Template con estructura de campos
 * - formData: Datos actuales del formulario
 * - onChange: Callback cuando cambia un campo
 * - onPhotosChange: Callback cuando cambian las fotos (galleries o imágenes)
 * - filterType: (opcional) 'texts' | 'images' | 'links' para mostrar solo ciertos campos
 */
export default function DynamicForm({
	template,
	formData,
	onChange,
	onPhotosChange,
	error,
	filterType,
}) {
	if (!template || !template.structure || template.structure.length === 0) {
		return (
			<div className="text-center py-8 text-slate-500">
				No hay campos configurados para esta plantilla
			</div>
		);
	}

	// Helper para actualizar un campo simple
	const updateField = (key, value) => {
		onChange({
			...formData,
			[key]: value,
		});
	};

	// Helper para borrar imagen de Cloudinary (Limpieza)
	const deleteImageFromCloud = async (url) => {
		if (!url) return;
		try {
			await api.delete('/upload', { data: { url } });
		} catch (error) {
			console.error('No se pudo borrar la imagen antigua:', error);
		}
	};

	// Helper para eliminar una imagen de una galería
	const removeImageFromArray = (fieldKey, index) => {
		const currentArray = formData[fieldKey] || [];
		const imageToDelete = currentArray[index]; // Capturamos la URL antes de borrar
		const newArray = currentArray.filter((_, i) => i !== index);
		updateField(fieldKey, newArray);

		// Borramos de Cloudinary
		deleteImageFromCloud(imageToDelete);
	};

	// Renderizar cada campo según su tipo
	const renderField = (field) => {
		const { key, label, type, placeholder, helpText, required, maxItems } =
			field;

		let value = formData[key];

		// Lógica robusta: Si es booleano y es undefined, usamos el default visualmente
		if (type === 'boolean') {
			if (value === undefined && field.default !== undefined) value = field.default;
		} else {
			value = value || (type === 'image_array' ? [] : '');
		}

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
							onChange={(e) => updateField(key, e.target.value)}
							placeholder={placeholder}
							className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-brand-pink focus:border-transparent"
						/>
						{helpText && (
							<p className="text-xs text-slate-500 mt-1">{helpText}</p>
						)}
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
							onChange={(e) => updateField(key, e.target.value)}
							placeholder={placeholder}
							className="w-full rounded-md border px-3 py-2 min-h-24 focus:ring-2 focus:ring-brand-pink focus:border-transparent resize-none"
						/>
						{helpText && (
							<p className="text-xs text-slate-500 mt-1">{helpText}</p>
						)}
					</div>
				);

			case 'image':
				return (
					<ImageUploadField
						key={key}
						label={label}
						value={value}
						onChange={(newUrl) => {
							// Si ya había una imagen y es diferente, borramos la vieja
							if (value && value !== newUrl) {
								deleteImageFromCloud(value);
							}
							updateField(key, newUrl);
						}}
					/>
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
						<div className="flex flex-wrap gap-3 items-start mb-3">
							{imageArray.map((imageUrl, index) => (
								<div
									key={index}
									className="relative w-24 h-24 rounded overflow-hidden border border-slate-200 shadow-sm"
								>
									<img
										src={imageUrl}
										alt={`${key}-${index}`}
										className="w-full h-full object-cover"
									/>
									<button
										type="button"
										onClick={() => removeImageFromArray(key, index)}
										className="absolute top-1 right-1 bg-white/90 hover:bg-white rounded-full p-1 text-red-600 text-lg"
									>
										×
									</button>
								</div>
							))}
						</div>

						{canAddMore && (
							<ImageUploadField
								label={
									imageArray.length > 0
										? 'Añadir más imágenes'
										: 'Subir imágenes'
								}
								value=""
								multiple={true}
								onChange={(urls) => {
									// Aseguramos que sea array (por si acaso devuelve string)
									const newUrls = Array.isArray(urls) ? urls : [urls];
									// Concatenamos con lo que ya había
									const newArray = [...imageArray, ...newUrls];
									// Opcional: Podrías recortar el array si excede maxAllowed aquí
									updateField(key, newArray.slice(0, maxAllowed));
									if (onPhotosChange) onPhotosChange(key);
								}}
							/>
						)}

						{helpText && (
							<p className="text-xs text-slate-500 mt-1">{helpText}</p>
						)}
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
							onChange={(e) => updateField(key, e.target.value)}
							placeholder={placeholder || 'https://www.youtube.com/watch?v=...'}
							className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-brand-pink focus:border-transparent"
						/>
						{helpText && (
							<p className="text-xs text-slate-500 mt-1">{helpText}</p>
						)}
					</div>
				);

			case 'boolean':
				return (
					<div key={key} className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
						<label className="block text-sm font-medium text-slate-700 mb-2">
							{label}
						</label>
						<div className="flex items-center gap-3">
							<div
								onClick={() => updateField(key, !value)}
								className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
									value ? 'bg-brand-pink' : 'bg-slate-300'
								}`}
							>
								<div
									className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
										value ? 'translate-x-6' : 'translate-x-0'
									}`}
								/>
							</div>
							<span
								className={`text-sm font-medium cursor-pointer select-none ${
									value ? 'text-brand-pink' : 'text-slate-400'
								}`}
								onClick={() => updateField(key, !value)}
							>
								{value ? 'Activado' : 'Desactivado'}
							</span>
						</div>
					</div>
				);

			case 'video_caption':
				// Condición: Si existe el campo showVideo y es falso, ocultamos este campo
				if (formData.showVideo === false) return null;

				return (
					<div key={key} className="mb-4">
						<label className="block text-sm font-medium mb-1">
							{label}
							{required && <span className="text-red-500 ml-1">*</span>}
						</label>
						<input
							type="text"
							value={value}
							onChange={(e) => updateField(key, e.target.value)}
							placeholder={placeholder}
							className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-brand-pink focus:border-transparent"
						/>
						{helpText && (
							<p className="text-xs text-slate-500 mt-1">{helpText}</p>
						)}
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
								onChange={(e) => updateField(key, e.target.value)}
								className="w-16 h-10 rounded cursor-pointer border border-slate-300"
							/>
							<input
								type="text"
								value={value || '#000000'}
								onChange={(e) => updateField(key, e.target.value)}
								placeholder="#000000"
								className="flex-1 rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-brand-pink focus:border-transparent"
							/>
						</div>
						{helpText && (
							<p className="text-xs text-slate-500 mt-1">{helpText}</p>
						)}
					</div>
				);
		}
	};

	// Filtrado de campos basado en filterType
	const filteredFields = template.structure.filter((field) => {
		if (!filterType) return true;

		const { type } = field;
		if (filterType === 'texts') {
			return type === 'text' || type === 'textarea';
		}
		if (filterType === 'images') {
			return type === 'image' || type === 'image_array';
		}
		if (filterType === 'links') {
			return (
				type === 'youtube_url' ||
				type === 'video_caption' ||
				type === 'boolean'
			);
		}
		return true;
	});

	// Renderizado con agrupación inteligente
	const renderFields = () => {
		const fieldsToRender = [];

		for (let i = 0; i < filteredFields.length; i++) {
			const field = filteredFields[i];
			fieldsToRender.push(renderField(field));
		}
		return fieldsToRender;
	};

	return (
		<div className="space-y-1">
			{error && (
				<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
					{error}
				</div>
			)}
			{filteredFields.length > 0 ? (
				renderFields()
			) : (
				<div className="text-center py-4 text-slate-400 italic text-sm">
					No hay campos de este tipo en esta plantilla
				</div>
			)}
		</div>
	);
}

DynamicForm.propTypes = {
	template: PropTypes.shape({
		structure: PropTypes.arrayOf(PropTypes.object).isRequired,
	}).isRequired,
	formData: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	onPhotosChange: PropTypes.func,
	error: PropTypes.string,
	filterType: PropTypes.oneOf(['texts', 'images', 'links']),
};
