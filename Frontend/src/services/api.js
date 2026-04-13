import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8083/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Global response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ---------------- API METHODS ---------------- //

export const getCategories = () => {
  return Promise.resolve([
    { id: 1, name: "agreements", description: "Legal agreements" },
    { id: 2, name: "deeds", description: "Property deeds" },
    { id: 3, name: "attorney", description: "Power of attorney" },
    { id: 4, name: "affidavits", description: "Affidavit documents" },
  ]);
};

export const getTemplates = async (category) => {
  const res = await api.get(`/category/${category}/templates`);

  // remove .html extension
  return res.data.map((t) => t.replace(".html", ""));
};

export const getFormFields = async (category, template) => {
  const res = await api.get(
    `/category/${category}/template/${template}/fields`
  );

  const data = res.data;

  if (Array.isArray(data) && data.length > 0) {
    return {
      templateName: data[0].templateName,
      category: data[0].category,
      fields: [...new Set(data[0].fields)], // remove duplicates
    };
  }

  return { templateName: template, category, fields: [] };
};

export const submitForm = async (payload) => {
  const res = await api.post("/form", payload);
  return res.data; // HTML string
};

export const generatePdf = async (html) => {
  const res = await api.post("/generatepdf", html, {
    headers: { "Content-Type": "text/plain" },
    responseType: "blob", // 🔥 MUST for PDF
  });

  return res.data;
};