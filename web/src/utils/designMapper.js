import MasterTemplate from '../components/templates/MasterTemplate';
import ValentineTemplate from '../components/templates/ValentineTemplate';

// Registro central de plantillas
export const DESIGN_MAPPER = {
  'master-template': MasterTemplate,
  'valentine-hearts': ValentineTemplate,
};

// Helper para obtener el componente de forma segura
export const getTemplateComponent = (slug) => {
  // Retorna el componente asociado al slug, o MasterTemplate por defecto
  return DESIGN_MAPPER[slug] || MasterTemplate;
};