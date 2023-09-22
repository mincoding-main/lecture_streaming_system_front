const getApiFrontPoint = () => process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_FRONTEND_ADDRESS : process.env.NEXT_PUBLIC_FRONTEND_ADDRESS_DEV;
const getApiBackPoint = () => process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BACKEND_ADDRESS : process.env.NEXT_PUBLIC_BACKEND_ADDRESS_DEV;

const config = {
    apiFrontpoint: getApiFrontPoint(),
    apiBackPoint: getApiBackPoint(),
};

export default config;
