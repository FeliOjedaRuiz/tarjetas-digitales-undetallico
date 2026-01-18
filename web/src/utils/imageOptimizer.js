/**
 * Optimiza URLs de Cloudinary añadiendo parámetros de formato y calidad automática.
 * @param {string} url - La URL original de la imagen
 * @param {number|string} width - El ancho deseado (opcional)
 */
export const getOptimizedImageUrl = (url, width = 'auto') => {
	if (!url) return '';
	// Si no es de Cloudinary, devolvemos la URL tal cual (ej: Unsplash)
	if (!url.includes('cloudinary.com')) return url;

	const parts = url.split('/upload/');
	if (parts.length < 2) return url;

	const params = ['f_auto', 'q_auto']; // Formato auto (webp/avif) y Calidad auto
	if (width !== 'auto') params.push(`w_${width}`);

	return `${parts[0]}/upload/${params.join(',')}/${parts[1]}`;
};