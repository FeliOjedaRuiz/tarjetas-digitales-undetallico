import MasterTemplate from '../components/templates/MasterTemplate';

// Registro central de plantillas
export const DESIGN_MAPPER = {
  'master-template': MasterTemplate,
};

// Helper para obtener el componente de forma segura
export const getTemplateComponent = (slug) => {
  // Retorna el componente asociado al slug, o MasterTemplate por defecto
  return DESIGN_MAPPER[slug] || MasterTemplate;
};