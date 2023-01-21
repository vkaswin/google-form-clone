export const baseURL = "http://localhost:8000";
const userUrl = `${baseURL}/api/user`;
const formUrl = `${baseURL}/api/form`;
const responseUrl = `${baseURL}/api/respose`;
const templateUrl = `${baseURL}/api/template`;

const User = {
  login: `${userUrl}/login`,
  register: `${userUrl}/register`,
};

const Form = {
  getFormById: `${formUrl}`,
  getAllForms: `${formUrl}/all`,
  createForm: `${formUrl}/create`,
};

const Response = {
  submitResponse: `${responseUrl}/submit`,
};

const Template = {
  getAllTemplate: `${templateUrl}/all`,
};

export { User, Form, Response, Template };
