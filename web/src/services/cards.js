import http from "./base-api";

const getTemplates = (category) => {
  const options = category ? { params: { category } } : {};
  return http.get("/templates", options);
};

const getTemplateDetail = (id) => http.get(`/templates/${id}`);

const create = (cardData) => http.post("/cards", cardData);

const getBySlug = (slug) => http.get(`/cards/profile/${slug}`);

const list = () => http.get("/cards");

const getCards = (page = 1, limit = 9) => http.get("/cards", { params: { page, limit } });
const getDetail = (id) => http.get(`/cards/${id}`);
const update = (id, data) => http.put(`/cards/${id}`, data);
const remove = (id) => http.delete(`/cards/${id}`);

export default {
  getTemplates,
  getTemplateDetail,
  getCards,
  getDetail,
  create,
  update,
  getBySlug,
  list,
  remove,
};