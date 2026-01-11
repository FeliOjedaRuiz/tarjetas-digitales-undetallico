import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cardsService from '../services/cards';
import MasterTemplate from '../components/templates/MasterTemplate';

// Mapeo de templates disponibles
const TEMPLATES = {
  'master-template': MasterTemplate,
  'default': MasterTemplate
};

const CardViewerPage = () => {
  const { slug } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await cardsService.getBySlug(slug);
        // `base-api` interceptor retorna `response.data` directamente,
        // por eso `response` ya es el objeto de la tarjeta.
        setCard(response);
      } catch (err) {
        setError(err.response?.data?.message || 'No se pudo cargar la tarjeta. Verifica el enlace.');
        setCard(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCard();
    }
  }, [slug]);

  // Estado de Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
          <p className="mt-4 text-gray-600 font-sans">Cargando tarjeta...</p>
        </div>
      </div>
    );
  }

  // Estado de Error
  if (error || !card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="text-center bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h1 className="text-2xl md:text-3xl font-brand font-bold text-red-600 mb-4">
            Oops!
          </h1>
          <p className="text-gray-700 font-sans text-base md:text-lg mb-6">
            {error || 'La tarjeta que buscas no existe.'}
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white font-sans font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  // Obtener el slug del template para mapear el componente
  const templateSlug = card.templateId?.slug || 'default';
  const SelectedTemplate = TEMPLATES[templateSlug] || TEMPLATES['default'];

  // Renderizar el template seleccionado
  return <SelectedTemplate card={card} />;
};

export default CardViewerPage;
