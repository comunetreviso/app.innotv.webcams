export const API_URL = process.env.API_URL.startsWith("http") || process.env.API_URL.startsWith("/") ?
    process.env.API_URL : (window.location.protocol + "//" + process.env.API_URL);
export const LOGGING_ENABLED = process.env.LOGGING_ENABLED;
export const SENTRY_ENABLED = process.env.SENTRY_ENABLED;
export const SENTRY_DSN_URL = process.env.SENTRY_DSN_URL;

export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
export const TREVISO_LATITUDE = 45.668070;
export const TREVISO_LONGITUDE = 12.244179;

export const AUTH_SHARED_SECRET = "DVPqft^}=J4('TuQ";

export const MAP_STYLE = {
    "featureType": "poi",
    "stylers": [
        { "visibility": "off" }
    ]
};

export const MAP_SHOP_SERVICE_ICON = {
    url: "assets/svgicons/geo_pin_orange.svg",
    scaledSize: {
        height: 40,
        width: 40
    },
    anchor: {
        x: 20,
        y: 20
    }
};

export const MAP_PUBLIC_SERVICE_ICON = {
    url: "assets/svgicons/geo_pin_blue.svg",
    scaledSize: {
        height: 40,
        width: 40
    },
    anchor: {
        x: 20,
        y: 20
    }
};

export const MAP_PUBLIC_SERVICE_ICON_OPACITY = {
    url: "assets/svgicons/geo_pin_blue_opacity.svg",
    scaledSize: {
        height: 40,
        width: 40
    },
    anchor: {
        x: 20,
        y: 20
    }
};

export const MAP_SHOP_SERVICE_ICON_OPACITY = {
    url: "assets/svgicons/geo_pin_orange_opacity.svg",
    scaledSize: {
        height: 40,
        width: 40
    },
    anchor: {
        x: 20,
        y: 20
    }
};
