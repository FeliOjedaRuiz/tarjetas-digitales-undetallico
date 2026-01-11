import http from "./base-api";

const upload = (file) => http.post("/upload", file)

export default {
  upload,
};