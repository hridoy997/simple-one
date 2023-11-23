import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_DEV_URL,
    headers: {
        Authorization: "bearer " + process.env.REACT_APP_STRIPE_APP_KEY
    }
});

export const fetchDataFromApi = async (url) => {
    try {
        const data = await axiosInstance.get(url);
        // console.log(data.data);
        return data.data;
    } catch (error) {
        // console.error("Error fetching data from API:", error);
        return error; 
    }
};

export const makePaymentRequest = axios.create({
    baseURL: process.env.REACT_APP_DEV_URL,
    headers: {
        Authorization: "bearer " + process.env.REACT_APP_STRIPE_APP_KEY
    }
})

