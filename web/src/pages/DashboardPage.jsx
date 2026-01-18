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
				const data = Array.isArray(response)
					? response
					: response.data || response.cards || [];
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
		if (
			window.confirm(
				'¿Estás seguro de que quieres eliminar esta tarjeta? Esta acción no se puede deshacer.'
			)
		) {
			try {
				await cardsService.remove(id);
				// Actualizamos el estado local filtrando la tarjeta eliminada
				setCards((currentCards) =>
					currentCards.filter((card) => card.id !== id && card._id !== id)
				);
			} catch (err) {
				console.error(err);
				alert('Hubo un error al eliminar la tarjeta.');
			}
		}
	};

	const handleCopyLink = (slug) => {
		const url = `${window.location.origin}/ver/${slug}`;
		navigator.clipboard.writeText(url);
		alert('¡Enlace copiado al portapapeles!');
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
					<p className="text-slate-500 mt-1">
						Gestiona todas las tarjetas que has creado.
					</p>
				</div>
				<Link
					to="/create"
					className="flex items-center gap-2 bg-brand-pink text-white font-bold py-2 px-4 md:px-5 rounded-lg shadow-md hover:bg-pink-600 transition-colors text-sm md:text-base"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2.5}
						stroke="currentColor"
						className="w-4 h-4 md:w-5 md:h-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 4.5v15m7.5-7.5h-15"
						/>
					</svg>
					<span className="hidden sm:inline">Crear Nuevo</span>
					<span className="sm:hidden">Crear</span>
				</Link>
			</header>

			{cards.length === 0 ? (
				<div className="text-center bg-white p-12 rounded-xl shadow-sm border">
					<h3 className="text-xl font-semibold text-slate-700">
						Aún no has creado ninguna tarjeta
					</h3>
					<p className="text-slate-500 mt-2">
						¡Es un buen momento para empezar!
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
					{cards.map((card) => (
						<div
							key={card.id || card._id}
							className="aspect-square bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col"
						>
							<div className="flex-1 w-full overflow-hidden min-h-0">
								<img
									src={
										card.templateId?.thumbnailUrl ||
										'https://placehold.co/300x300.png'
									}
									alt={`Diseño para ${card.recipient}`}
									className="h-full w-full object-cover"
								/>
							</div>
							<div className="p-3 md:p-4 flex flex-col shrink-0">
								<h3 className="font-bold text-slate-800 truncate text-sm md:text-base">
									Para: {card.recipient || 'Sin destinatario'}
								</h3>
								<p className="text-[10px] md:text-xs text-slate-400 mb-3 md:mb-4">
									Diseño: {card.templateId?.name || 'Desconocido'}
								</p>

								<div className="mt-auto space-y-2">
									<div className="grid grid-cols-1 gap-2">
										<Link
											to={`/ver/${card.urlSlug}`}
											target="_blank"
											className="flex items-center justify-center gap-1.5 w-full bg-slate-100 text-slate-700 text-xs font-semibold py-2 rounded-md hover:bg-slate-200 transition-colors"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={2}
												stroke="currentColor"
												className="w-3.5 h-3.5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
												/>
											</svg>
											Ver
										</Link>
										<div className="grid grid-cols-2 gap-2">
											<Link
												to={`/edit/${card.id || card._id}`}
												className="flex items-center justify-center gap-1 w-full bg-blue-500 text-white text-xs font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													stroke="currentColor"
													className="w-3 h-3"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
													/>
												</svg>
												Editar
											</Link>
											<button
												onClick={() => handleCopyLink(card.urlSlug)}
												className="flex items-center justify-center gap-1 w-full bg-indigo-500 text-white text-xs font-semibold py-2 rounded-md hover:bg-indigo-600 transition-colors"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													stroke="currentColor"
													className="w-3 h-3"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
													/>
												</svg>
												Link
											</button>
										</div>
									</div>
									<button
										onClick={() => handleDelete(card.id || card._id)}
										className="flex items-center justify-center gap-1.5 w-full bg-white border border-red-200 text-red-500 text-xs font-semibold py-2 rounded-md hover:bg-red-50 transition-colors"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={2}
											stroke="currentColor"
											className="w-3.5 h-3.5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
											/>
										</svg>
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
