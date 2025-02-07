const config = {
    apiUrl: process.env.REACT_APP_API_URL,
    stripe: {
        publicKey: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
    },
    google: {
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    }
};

export default config;
