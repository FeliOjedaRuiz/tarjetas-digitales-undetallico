import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cardsService from '../services/cards';
import DynamicForm from '../components/DinamicForm/DynamicForm';
import { CATEGORIES_LIST } from '../config/categories.config';

// 1. IMPORTAMOS EL MAPPER CENTRALIZADO
import { getTemplateComponent } from '../utils/designMapper';

// Componente para la preview con escala que simula un viewport móvil
const MOBILE_WIDTH = 375; // iPhone standard width

const PhonePreviewFrame = ({ children }) => {
	const containerRef = useRef(null);
	const contentRef = useRef(null);
	const [scale, setScale] = useState(1);
	const [contentHeight, setContentHeight] = useState('100%');

	const updateScale = useCallback(() => {
		if (containerRef.current) {
			const containerWidth = containerRef.current.clientWidth;
			const containerHeight = containerRef.current.clientHeight;
			const newScale = containerWidth / MOBILE_WIDTH;
			setScale(newScale);
			// Ajustamos la altura del contenido para que ocupe todo el espacio disponible escalado
			setContentHeight(`${containerHeight / newScale}px`);
		}
	}, []);

	useEffect(() => {
		updateScale();
		const resizeObserver = new ResizeObserver(updateScale);
		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}
		return () => resizeObserver.disconnect();
	}, [updateScale]);

	return (
		<div className="relative h-[90%] w-auto aspect-[9/16] max-w-full border-8 md:border-10 border-slate-900 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl overflow-hidden bg-white">
			<div ref={containerRef} className="absolute inset-0 overflow-hidden">
				<div
					ref={contentRef}
					className="origin-top-left overflow-y-auto custom-scrollbar"
					style={{
						width: `${MOBILE_WIDTH}px`,
						height: contentHeight,
						transform: `scale(${scale})`,
					}}
				>
					{children}
				</div>
			</div>
			{/* Speaker / Camera Notch Mockup */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-4 md:h-6 bg-slate-900 rounded-b-2xl md:rounded-b-3xl z-40" />
		</div>
	);
};

// Definición de todos los pasos posibles
const ALL_STEPS = [
	{ id: 1, title: 'Diseño', key: 'design' },
	{ id: 2, title: 'Para', key: 'recipient' },
	{ id: 3, title: 'Mensaje', key: 'texts' },
	{ id: 4, title: 'Fotos', key: 'images' },
	{ id: 5, title: 'Multimedia', key: 'links' },
	{ id: 6, title: 'Revisión', key: 'review' },
];

// Función para calcular qué pasos aplican según el template
const getStepsForTemplate = (template) => {
	if (!template) return ALL_STEPS.slice(0, 1); // Si no hay template, solo muestra Diseño

	const steps = [ALL_STEPS[0], ALL_STEPS[1]]; // Diseño y Para siempre van

	// Verificar Mensajes (Texts)
	const hasTexts = template.structure.some(
		(f) => f.type === 'text' || f.type === 'textarea'
	);
	if (hasTexts) steps.push(ALL_STEPS[2]);

	// Verificar Fotos (Images)
	const hasImages = template.structure.some(
		(f) => f.type === 'image' || f.type === 'image_array'
	);
	if (hasImages) steps.push(ALL_STEPS[3]);

	// Verificar Multimedia (Links/Videos)
	const hasLinks = template.structure.some(
		(f) =>
			f.type === 'youtube_url' ||
			f.type === 'spotify_url' ||
			f.type === 'video_caption'
	);
	if (hasLinks) steps.push(ALL_STEPS[4]);

	// Revisión siempre va
	steps.push(ALL_STEPS[5]);

	return steps;
};

export default function AdminCreatePage() {
	const navigate = useNavigate();
	const [theme, setTheme] = useState(null);
	const [templates, setTemplates] = useState([]);
	const [selectedTemplate, setSelectedTemplate] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	// Estado del formulario (aquí viven los datos que escribe el usuario)
	const [form, setForm] = useState({});
	const [showPreviewMobile, setShowPreviewMobile] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);

	const [steps, setSteps] = useState(ALL_STEPS);

	const { id } = useParams();
	const isEditing = Boolean(id);

	useEffect(() => {
		// 1. Cargamos layouts
		const fetchTemplates = async () => {
			try {
				setIsLoading(true);
				const response = await cardsService.getTemplates(theme);
				// ... (resto del fetch logic)
				const data = Array.isArray(response) ? response : response.data || [];
				setTemplates(data);

				if (data.length > 0 && !selectedTemplate && !id) {
					setSelectedTemplate(data[0]);
				}
			} catch (err) {
				console.error('Error fetching templates:', err);
			} finally {
				if (!id) setIsLoading(false);
			}
		};
		fetchTemplates();
	}, [theme, id]);

	// Efecto para actualizar los pasos dinámicamente
	useEffect(() => {
		const newSteps = getStepsForTemplate(selectedTemplate);
		setSteps(newSteps);

		// Si el paso actual desaparece (ej: quitamos multimedia), resetear a 1
		if (!newSteps.find((s) => s.id === currentStep)) {
			setCurrentStep(1);
		}
	}, [selectedTemplate]);

	// Cargar datos de la tarjeta si estamos editando
	useEffect(() => {
		if (id) {
			const fetchCard = async () => {
				try {
					setIsLoading(true);
					const card = await cardsService.getDetail(id);

					// Pre-llenamos el formulario
					setForm({
						recipient: card.recipient,
						sender: card.sender,
						...card.content,
					});

					// Seleccionamos la plantilla de la tarjeta
					setSelectedTemplate(card.templateId);
				} catch (err) {
					console.error('Error fetching card detail:', err);
					alert('No se pudo cargar la información de la tarjeta.');
					navigate('/dashboard');
				} finally {
					setIsLoading(false);
				}
			};
			fetchCard();
		}
	}, [id, navigate]);

	// Manejo del botón "Atrás" en móviles cuando el preview está abierto
	useEffect(() => {
		if (showPreviewMobile) {
			// Añadimos un estado al historial para que el botón atrás lo capture
			window.history.pushState({ preview: true }, '', window.location.href);

			const handlePopState = () => {
				// Al detectar "Atrás", cerramos el modal
				setShowPreviewMobile(false);
			};

			window.addEventListener('popstate', handlePopState);

			return () => {
				window.removeEventListener('popstate', handlePopState);
			};
		}
	}, [showPreviewMobile]);

	// 3. CONSTRUCCIÓN DE LA "MOCK CARD" PARA LA PREVIEW
	// Creamos un objeto que tiene la misma forma que lo que espera el MasterTemplate
	const previewCardData = {
		content: form, // Los datos dinámicos del formulario
		recipient: form.recipient || 'Nombre del Destinatario',
		sender: form.sender || 'Tu Nombre',
		templateId: selectedTemplate, // Pasamos toda la config de colores/estilos del template
	};

	// Identificamos qué componente renderizar
	const PreviewComponent = selectedTemplate
		? getTemplateComponent(selectedTemplate.slug)
		: null;

	const isStepComplete = (stepId) => {
		if (stepId === 1) return !!selectedTemplate;
		if (stepId === 2) return !!form.recipient && !!form.sender;

		if (stepId === 3 && selectedTemplate) {
			// Verificar si hay algún texto lleno
			const textFields = selectedTemplate.structure.filter(
				(f) => f.type === 'text' || f.type === 'textarea'
			);
			return textFields.some((f) => !!form[f.key]);
		}

		if (stepId === 4 && selectedTemplate) {
			// Verificar si hay alguna imagen subida
			const imageFields = selectedTemplate.structure.filter(
				(f) => f.type === 'image'
			);
			return imageFields.some((f) => {
				const val = form[f.key];
				return Array.isArray(val) ? val.length > 0 : !!val;
			});
		}

		if (stepId === 5) return !!form.song || !!form.video;
		return true;
	};

	// Función para avanzar
	const handleNext = () => {
		const stepWarnings = {
			1: 'No has seleccionado un diseño aún.',
			2: 'Faltan los nombres del destinatario o remitente.',
			3: 'Aún no has escrito ningún mensaje.',
			4: 'No has subido ninguna foto todavía.',
			5: 'No has añadido música ni vídeo.',
		};

		if (!isStepComplete(currentStep)) {
			if (
				!window.confirm(
					`${stepWarnings[currentStep]} ¿Seguro que quieres continuar?`
				)
			) {
				return;
			}
		}

		// Avanzar usando el índice del array de pasos visibles
		const currentIndex = steps.findIndex((s) => s.id === currentStep);
		if (currentIndex !== -1 && currentIndex < steps.length - 1) {
			setCurrentStep(steps[currentIndex + 1].id);
		}
	};

	// Función para llenar el formulario con sugerencias de la plantilla
	const hydrateFormWithDefaults = (template, currentForm) => {
		if (!template || !template.structure) return currentForm;

		const newForm = { ...currentForm };
		template.structure.forEach((field) => {
			// Solo hidratamos textos y áreas de texto que estén vacíos
			if (
				(field.type === 'text' || field.type === 'textarea') &&
				!newForm[field.key]
			) {
				// Usamos el placeholder como valor sugerido si existe
				if (field.placeholder) {
					newForm[field.key] = field.placeholder;
				}
			}
		});
		return newForm;
	};

	const handleBack = () => {
		const currentIndex = steps.findIndex((s) => s.id === currentStep);
		if (currentIndex > 0) {
			setCurrentStep(steps[currentIndex - 1].id);
		}
	};

	// Función para guardar la tarjeta
	const handleSubmit = async () => {
		if (!selectedTemplate) return;

		try {
			setIsLoading(true);
			// Separamos los metadatos del contenido visual
			const { recipient, sender, ...contentData } = form;

			const payload = {
				templateId: selectedTemplate.id || selectedTemplate._id,
				recipient,
				sender,
				content: contentData,
			};

			if (isEditing) {
				await cardsService.update(id, payload);
			} else {
				await cardsService.create(payload);
			}

			navigate('/dashboard');
		} catch (error) {
			console.error('Error al guardar:', error);
			const errorMsg =
				error.response?.data?.message ||
				'Hubo un error al guardar la tarjeta. Inténtalo de nuevo.';
			alert(errorMsg);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex-1 bg-slate-50 overflow-hidden flex flex-col">
			<div className="flex-1 overflow-hidden px-4 md:px-6 lg:px-8 py-4">
				<div className="max-w-[1400px] mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
					{/* COLUMNA IZQUIERDA: CONFIGURACIÓN (5/12 de ancho) */}
					<div
						className={`lg:col-span-5 flex flex-col h-full min-h-0 bg-white rounded-3xl shadow-sm border overflow-hidden ${showPreviewMobile ? 'hidden lg:flex' : 'flex'}`}
					>
						{/* Stepper Integrado (Barra de progreso delgada) */}
						<div className="p-6 pb-2 shrink-0">
							<div className="relative flex justify-between px-2">
								{/* Línea de fondo */}
								<div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full" />
								{/* Línea de progreso activa */}
								<div
									className="absolute top-1/2 left-0 h-1 bg-brand-pink -translate-y-1/2 rounded-full transition-all duration-500"
									style={{
										width: `${(steps.findIndex((s) => s.id === currentStep) / (steps.length - 1)) * 100}%`,
									}}
								/>

								{steps.map((step) => (
									<div
										key={step.id}
										onClick={() => setCurrentStep(step.id)}
										className="relative flex flex-col items-center group cursor-pointer"
									>
										<div
											className={`w-3 h-3 rounded-full border-2 transition-all duration-300 z-10 ${step.id <= currentStep ? 'bg-brand-pink border-brand-pink scale-125' : 'bg-white border-slate-200'}`}
										/>

										{/* Indicador de advertencia si no está completo */}
										{!isStepComplete(step.id) &&
											step.id <= currentStep &&
											step.id !== 6 && (
												<span
													className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-pulse border border-white"
													title="Incompleto"
												/>
											)}

										<span
											className={`absolute -bottom-6 text-[9px] font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${step.id === currentStep ? 'text-brand-pink' : 'text-slate-300'}`}
										>
											{step.title}
										</span>
									</div>
								))}
							</div>
						</div>

						{/* Contenedor del Contenido (con scroll interno y centrado modular) */}
						<div className="flex-1 overflow-y-auto px-6 md:px-8 py-4 custom-scrollbar flex flex-col min-h-0">
							<div className="animate-in fade-in duration-500 space-y-6 my-auto">
								{/* PASO 1: ESTILO */}
								{currentStep === 1 && (
									<div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
										<section className="sticky top-0 bg-white z-10 py-2 -mx-2 px-2 shadow-sm mb-4">
											<label className="block text-xs font-bold uppercase text-slate-400 mb-3 text-center lg:text-left">
												Filtrar por categoría
											</label>
											<div className="flex flex-wrap gap-2 justify-center lg:justify-start">
												<button
													onClick={() => setTheme(null)}
													className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${theme === null ? 'bg-brand-pink text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
												>
													Todas
												</button>
												{CATEGORIES_LIST.map((cat) => (
													<button
														key={cat}
														onClick={() => setTheme(cat)}
														className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${theme === cat ? 'bg-brand-pink text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
													>
														{cat}
													</button>
												))}
											</div>
										</section>

										<section>
											<label className="block text-xs font-bold uppercase text-slate-400 mb-3 text-center lg:text-left">
												Elige un diseño base
											</label>
											<div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-3">
												{templates.map((t) => {
													const isSelected =
														selectedTemplate &&
														((t.id && selectedTemplate.id === t.id) ||
															(t._id && selectedTemplate._id === t._id) ||
															(t.slug && selectedTemplate.slug === t.slug));

													return (
														<div
															key={t.id || t._id || t.slug}
															onClick={() => {
																setSelectedTemplate(t);
																setForm((prev) =>
																	hydrateFormWithDefaults(t, {
																		recipient: prev.recipient,
																		sender: prev.sender,
																	})
																);
															}}
															className={`flex flex-col items-center cursor-pointer transition-all relative group h-full ${isSelected ? 'scale-105 z-10' : 'opacity-60 hover:opacity-100 hover:scale-102'}`}
														>
															<div
																className={`w-full h-16 rounded-xl overflow-hidden border-2 transition-all ${isSelected ? 'border-brand-pink ring-2 ring-brand-pink/20 shadow-lg' : 'border-slate-100'}`}
															>
																<img
																	src={t.thumbnailUrl}
																	className="h-full w-full object-cover"
																	alt=""
																/>

																{isSelected && (
																	<div className="absolute top-1.5 right-1.5 bg-brand-pink text-white rounded-full p-1 shadow-md animate-in zoom-in duration-300">
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			className="h-2.5 w-2.5"
																			viewBox="0 0 20 20"
																			fill="currentColor"
																		>
																			<path
																				fillRule="evenodd"
																				d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
																				clipRule="evenodd"
																			/>
																		</svg>
																	</div>
																)}
															</div>
															<p
																className={`text-[10px] font-bold truncate w-full text-center mt-1.5 transition-colors ${isSelected ? 'text-brand-pink' : 'text-slate-500'}`}
															>
																{t.name}
															</p>
														</div>
													);
												})}
											</div>
										</section>
									</div>
								)}

								{/* PASO 2: GENTE */}
								{currentStep === 2 && (
									<div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
										<div className="grid grid-cols-1 gap-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
											<div>
												<label className="block text-sm font-bold mb-2 text-slate-700">
													¿Para quién es?
												</label>
												<input
													type="text"
													value={form.recipient || ''}
													onChange={(e) =>
														setForm({ ...form, recipient: e.target.value })
													}
													placeholder="Ej: María José"
													className="w-full rounded-xl border-slate-200 border px-4 py-3 text-base focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none transition-all"
												/>
											</div>
											<div>
												<label className="block text-sm font-bold mb-2 text-slate-700">
													De parte de quién
												</label>
												<input
													type="text"
													value={form.sender || ''}
													onChange={(e) =>
														setForm({ ...form, sender: e.target.value })
													}
													placeholder="Ej: David García"
													className="w-full rounded-xl border-slate-200 border px-4 py-3 text-base focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none transition-all"
												/>
											</div>
										</div>
									</div>
								)}

								{/* PASO 3: MENSAJES */}
								{currentStep === 3 && (
									<div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
										<p className="text-xs text-slate-400 italic mb-2 text-center">
											Escribe las palabras perfectas para tu detallico.
										</p>
										<div className="p-1">
											<DynamicForm
												template={selectedTemplate}
												formData={form}
												onChange={setForm}
												filterType="texts"
											/>
										</div>
									</div>
								)}

								{/* PASO 4: FOTOS */}
								{currentStep === 4 && (
									<div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
										<p className="text-xs text-slate-400 italic mb-2 text-center">
											Sube vuestros mejores momentos.
										</p>
										<div className="p-1">
											<DynamicForm
												template={selectedTemplate}
												formData={form}
												onChange={setForm}
												filterType="images"
											/>
										</div>
									</div>
								)}

								{/* PASO 5: EXTRAS */}
								{currentStep === 5 && (
									<div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
										<p className="text-xs text-slate-400 italic mb-2 text-center">
											Añade música o un vídeo para hacerlo inolvidable.
										</p>
										<div className="p-1">
											<DynamicForm
												template={selectedTemplate}
												formData={form}
												onChange={setForm}
												filterType="links"
											/>
										</div>
									</div>
								)}

								{/* PASO 6: REVISIÓN */}
								{currentStep === 6 && (
									<div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 text-center">
										<div className="py-8">
											<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 text-4xl">
												✅
											</div>
											<h3 className="text-xl font-bold text-slate-800">
												¡Todo listo!
											</h3>
											<p className="text-slate-500 mt-2">
												Revisa la previsualización a la derecha. Si estás
												conforme, pulsa el botón para guardar.
											</p>
										</div>

										<div className="bg-slate-50 p-4 rounded-xl border text-left text-sm space-y-2">
											<p>
												<strong>Destinatario:</strong> {form.recipient}
											</p>
											<p>
												<strong>Remitente:</strong> {form.sender}
											</p>
											<p>
												<strong>Diseño:</strong> {selectedTemplate?.name}
											</p>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* NAVEGACIÓN FIJA AL FINAL */}
						<div className="p-6 bg-white border-t flex flex-col gap-3 shrink-0">
							<button
								onClick={() => setShowPreviewMobile(true)}
								className="w-full lg:hidden flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all text-sm shadow-md active:scale-[0.98]"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={2}
									stroke="currentColor"
									className="w-4 h-4"
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
								Ver Previsualización
							</button>

							<div className="flex gap-4">
								{currentStep > 1 && (
									<button
										onClick={handleBack}
										className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-600 font-bold py-3 md:py-4 rounded-xl hover:bg-slate-200 transition-colors text-sm"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={2.5}
											stroke="currentColor"
											className="w-4 h-4"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15.75 19.5L8.25 12l7.5-7.5"
											/>
										</svg>
										Atrás
									</button>
								)}
								{currentStep < 6 ? (
									<button
										onClick={handleNext}
										className="grow flex items-center justify-center gap-2 bg-brand-pink text-white font-bold py-3 md:py-4 rounded-xl shadow-lg hover:opacity-90 transition-all text-sm md:text-base active:scale-[0.98]"
									>
										Continuar
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={2.5}
											stroke="currentColor"
											className="w-4 h-4"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M8.25 4.5l7.5 7.5-7.5 7.5"
											/>
										</svg>
									</button>
								) : (
									<button
										onClick={handleSubmit}
										disabled={isLoading}
										className="grow flex items-center justify-center gap-2 bg-brand-pink text-white font-bold py-3 md:py-4 rounded-xl shadow-lg hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-base active:scale-[0.98]"
									>
										{isLoading ? (
											<>
												<svg
													className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													></circle>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													></path>
												</svg>
												Guardando...
											</>
										) : (
											<>
												{isEditing ? 'Guardar Cambios' : 'Crear mi Detallico'}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2.5}
													stroke="currentColor"
													className="w-4 h-4"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M4.5 12.75l6 6 9-13.5"
													/>
												</svg>
											</>
										)}
									</button>
								)}
							</div>
						</div>
					</div>

					{/* COLUMNA DERECHA: VISTA PREVIA REAL (7/12 de ancho) */}
					<div
						className={`lg:col-span-7 h-full min-h-0 ${showPreviewMobile ? 'fixed inset-0 z-50 bg-white overflow-y-auto' : 'hidden lg:flex lg:items-center lg:justify-center'}`}
					>
						<div
							className={`w-full flex justify-center ${showPreviewMobile ? 'min-h-screen' : 'h-full items-center'}`}
						>
							{/* Solo botón de cerrar en mobile */}
							{showPreviewMobile && (
								<button
									onClick={() => window.history.back()}
									className="fixed top-4 right-4 z-[100] w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2.5}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							)}

							{/* Contenedor de la Preview */}
							{showPreviewMobile ? (
								/* En móvil, renderizado directo - Aseguramos altura total */
								<div className="w-full flex-1 flex flex-col min-h-0">
									{PreviewComponent ? (
										<PreviewComponent card={previewCardData} />
									) : (
										<div className="flex-1 flex items-center justify-center text-slate-400 italic bg-slate-50">
											Selecciona una plantilla
										</div>
									)}
								</div>
							) : (
								/* En escritorio, marco de smartphone realista que se ajusta al alto disponible */
								/* El contenido se renderiza a 375px de ancho (iPhone standard) y se escala para caber */
								<PhonePreviewFrame>
									{PreviewComponent ? (
										<PreviewComponent card={previewCardData} />
									) : (
										<div className="h-full flex items-center justify-center text-slate-400 italic bg-slate-50">
											Selecciona una plantilla
										</div>
									)}
								</PhonePreviewFrame>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
