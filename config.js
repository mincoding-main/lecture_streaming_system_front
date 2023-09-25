const getApiFrontPoint = () => process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_FRONTEND_ADDRESS : process.env.NEXT_PUBLIC_FRONTEND_ADDRESS_DEV;
const getApiBackPoint = () => process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BACKEND_ADDRESS : process.env.NEXT_PUBLIC_BACKEND_ADDRESS_DEV;
const getBaseImageURL = () => process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL : process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL_DEV;

const config = {
    apiFrontpoint: getApiFrontPoint(),
    apiBackPoint: getApiBackPoint(),
    imageBaseURL: getBaseImageURL(),
};

export default config;
