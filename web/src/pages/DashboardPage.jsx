import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cardsService from '../services/cards';

const DashboardPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCards = async () => {
      try {
        setLoading(true);
        // Asumimos que el servicio tiene un método para traer las tarjetas del usuario
        const response = await cardsService.getCards(); 
        // Manejo robusto: verifica si es un array directo o si viene dentro de .data o .cards
        const data = Array.isArray(response) ? response : (response.data || response.cards || []);
        setCards(data);
      } catch (err) {
        setError('No se pudieron cargar tus tarjetas.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarjeta? Esta acción no se puede deshacer.')) {
      try {
        await cardsService.remove(id);
        // Actualizamos el estado local filtrando la tarjeta eliminada
        setCards(currentCards => currentCards.filter(card => card.id !== id && card._id !== id));
      } catch (err) {
        console.error(err);
        alert('Hubo un error al eliminar la tarjeta.');
      }
    }
  };

  if (loading) {
    return <div className="text-center p-10">Cargando tus detallicos...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Mis Detallicos</h1>
          <p className="text-slate-500 mt-1">Gestiona todas las tarjetas que has creado.</p>
        </div>
        <Link 
          to="/create" 
          className="bg-brand-pink text-white font-bold py-2 px-5 rounded-lg shadow-md hover:bg-pink-600 transition-colors"
        >
          Crear Nuevo
        </Link>
      </header>

      {cards.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold text-slate-700">Aún no has creado ninguna tarjeta</h3>
          <p className="text-slate-500 mt-2">¡Es un buen momento para empezar!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map(card => (
            <div key={card.id} className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col">
              <img 
                src={card.templateId?.thumbnailUrl || 'https://via.placeholder.com/300x180.png?text=Sin+Imagen'} 
                alt={`Diseño para ${card.recipient}`}
                className="h-40 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-slate-800 truncate">
                  Para: {card.recipient || 'Sin destinatario'}
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Diseño: {card.templateId?.name || 'Desconocido'}
                </p>
                
                <div className="mt-auto space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Link to={`/ver/${card.urlSlug}`} target="_blank" className="block w-full text-center bg-slate-100 text-slate-700 text-sm font-semibold py-2 rounded-md hover:bg-slate-200 transition-colors">Ver</Link>
                    <button className="w-full bg-blue-500 text-white text-sm font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300" disabled>Editar</button>
                  </div>
                  <button 
                    onClick={() => handleDelete(card.id || card._id)}
                    className="w-full bg-white border border-red-200 text-red-500 text-sm font-semibold py-2 rounded-md hover:bg-red-50 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;