import * as _ from 'lodash'
import commonConfig from './config.common'

export default _.defaultsDeep(
    {},
    {
        processEnv: {
            'LOGGING_ENABLED': true,
            'SENTRY_ENABLED': false,
            'API_URL': "http://159.89.108.166:8080/api",
            'SENTRY_DSN_URL': "https://4647e4438ab44201a66fe27395b25ed7@sentry.io/1321890",
            'GOOGLE_MAPS_API_KEY' : ""
        }
    },
    commonConfig
);
