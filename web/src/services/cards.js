import http from "./base-api";

const getTemplates = (category) => {
  const options = category ? { params: { category } } : {};
  return http.get("/templates", options);
};

const getTemplateDetail = (id) => http.get(`/templates/${id}`);

const create = (cardData) => http.post("/cards", cardData);

const getBySlug = (slug) => http.get(`/cards/profile/${slug}`);

const list = () => http.get("/cards");

const getCards = () => http.get("/cards");

const remove = (id) => http.delete(`/cards/${id}`);

export default {
  getTemplates,
  getTemplateDetail,
  getCards,
  create,
  getBySlug,
  list,
  remove,
};