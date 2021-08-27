
export default {
    processEnv: {
        'ENVIRONMENT': process.env.ENVIRONMENT,
        'LOGGING_ENABLED': true,
        'SENTRY_ENABLED': false,
        'API_URL': "",
        'SENTRY_DSN_URL': ""
    },
    page: {
        title: 'WebApp Treviso',
        description: 'WebApp Treviso'
    },
    logo: {
        path: './src/assets/logo.png',
        outputPath: 'assets/logos/'
    },
    useDevLocalProxy: true,
    baseHref: '/'
};