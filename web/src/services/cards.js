import http from "./base-api";

const getTemplates = () => http.get("/templates");

const getTemplateDetail = (id) => http.get(`/templates/${id}`);

const create = (cardData) => http.post("/cards", cardData);

const getBySlug = (slug) => http.get(`/cards/profile/${slug}`);

const list = () => http.get("/cards");

export default {
  getTemplates,
  getTemplateDetail,
  create,
  getBySlug,
  list,
};
