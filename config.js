const getApiFrontPoint = () => process.env.NODE_ENV === 'production' ? process.env.FRONTEND_ADDRESS : process.env.FRONTEND_ADDRESS_DEV;
const getApiBackPoint = () => process.env.NODE_ENV === 'production' ? process.env.BACKEND_ADDRESS : process.env.BACKEND_ADDRESS_DEV;

const config = {
    apiFrontpoint: getApiFrontPoint(),
    apiBackPoint: getApiBackPoint(),
};

export default config;