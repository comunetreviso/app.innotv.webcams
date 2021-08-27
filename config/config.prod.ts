import * as _ from 'lodash'
import commonConfig from './config.common'

const IS_PRODUCTION = process.env.ENVIRONMENT === "prod";

export default _.defaultsDeep(
    {},
    {
        processEnv: {
            'LOGGING_ENABLED': false,
            'SENTRY_ENABLED': true,
            'API_URL': IS_PRODUCTION ? "https://bo.innotv.it/api" : "http://159.89.108.166:8080/api",
            'SENTRY_DSN_URL': IS_PRODUCTION ? "https://6ee60203dc6948ddb1ed96733c15fa65@o204542.ingest.sentry.io/5893986" : "https://0221e4a19cfc497d93d117bd96c6c132@o204542.ingest.sentry.io/5893976",
            'GOOGLE_MAPS_API_KEY' : IS_PRODUCTION ? "AIzaSyBUC4CP9Bj_qvH9doC_DRNEpv8kn5ge2n0" : "AIzaSyBUC4CP9Bj_qvH9doC_DRNEpv8kn5ge2n0"
        },
        baseHref: IS_PRODUCTION ? "/" : "/"
    },
    commonConfig
);
