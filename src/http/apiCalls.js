"use client";
import { BACKEND_URL } from "@/constants/URLS";
import axios from "axios";


const setTokens = (access, refresh) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("access_token", access);
    window.localStorage.setItem("refresh_token", refresh);
    api.defaults.headers["Authorization"] = `Bearer ${access}`;
  
  }
};


const api = axios.create({
  baseURL: `${BACKEND_URL}`,
  headers: {
    "Content-Type": "application/json",
    // Initialize with existing access token
    Authorization: `Bearer ${typeof window !== "undefined" ? window.localStorage.getItem("access_token") : ""}`,
  },
});


const LoginApi = axios.create({
    baseURL: `${BACKEND_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
});


export const loadUserRequest = async () => api.get("/user/me");
export const loginUserRequest = async (formData) => {
  try {
    const response = await LoginApi.post("/user/login", formData);
  
    // Extract and set tokens after login
    if (response.data.status == "success") {
      const { access, refresh } = response.data;
      setTokens(access, refresh);
    }

    return response;
  } catch (error) {
    console.log('error',error.message)
    throw new Error(error.response?.data?.message)
  }
};

export const registerUserRequest = async (formData) => {
    try {
      const response =  await LoginApi.post("/user/signup", formData);
 
      if (response.data.status == "success") {
          console.log(response.data)
          const { access, refresh } = response.data;
          setTokens(access, refresh);
      }
      
      return response;
    } catch (error) {
        throw new Error(error?.response?.data?.data?.email[0] || error.response?.data?.message)
    }
};


// export const getAllBotsRequest = async (formData) => api.put("/bots/all", formData);
export const getAllBotsRequest = async () => api.get("/bots/all");
export const getSingleEmployeeRequest = async (id) => api.get(`/bots/${id}`);

//payments
export const creaetePaymentIntentRequest = async (formData) => api.post("/payments/create-payment", formData);




//onboading api calls
export const getAllConversationRequest = async (formData) => api.get("/user/conversation");
export const onboardRequest = async (formData) => api.post("/user/onboard",formData);
export const uploadOnboardKbRequest = async (formData,setUploadProgressbar) => api.post("/user/upload/kb",formData,{
  headers: {
    "Content-Type": "multmultipart/form-data"
  },
  onUploadProgress: (progressEvent) => {
    const {loaded, total} = progressEvent;
    const percent = Math.floor((loaded * 100) / total)
    if(percent <= 100) {
      setUploadProgressbar(percent)
    }
  }
});

//mails
export const registerProfileRequest = async (formData) => api.post("/user/register",formData);
export const scheduleMailRequest = async (formData) => api.post("/emails/schedule",formData);
export const getAllEmailsRequest = async (formData) => api.post("/emails/get_emails",formData);
export const getEmailContentRequest = async (id) => api.get(`/emails/get_email_content?email_id=${id}`);
export const getEmailOutboxRequest = async () => api.get(`/emails/outbox`);


// Axios response interceptor
api.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

   
    if (
      error.response.status === 401 &&
      !originalRequest._retry 
    ) {
      originalRequest._retry = true; 

      try {
      
        const refreshToken = window.localStorage.getItem("refresh_token");
        const refreshResponse = await axios.post(
          `${BACKEND_URL}/user/token/refresh`,
          { refresh: refreshToken }, 
        );

        const newAccessToken = refreshResponse.data.access;

      
        setTokens(newAccessToken, refreshToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

    
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError.message);
      
      }
    }

    return Promise.reject(error);
  }
);
