import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getForms = async () => {
  const response = await axios.get(`${apiUrl}/forms`);
  return response.data;
};

export const createForm = async (form) => {
  const response = await axios.post(`${apiUrl}/forms`, form);
  return response.data;
};

export const updateForm = async (id, form) => {
  const response = await axios.put(`${apiUrl}/forms/${id}`, form);
  return response.data;
};

export const deleteForm = async (id) => {
  const response = await axios.delete(`${apiUrl}/forms/${id}`);
  return response.data;
};

export const getFormById = async (id) => {
  const response = await axios.get(`${apiUrl}/forms/${id}`);
  return response.data;
};

export const submitResponse = async (formId, responses) => {
  try {
    const response = await axios.post(`${apiUrl}/responses`, {
      formId,
      responses: Object.keys(responses).map((inputId) => ({
        inputId,
        value: responses[inputId],
      })),
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting responses:", error);
    throw error;
  }
};
