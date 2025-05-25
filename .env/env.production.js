module.exports = {
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    API_COMMON_SCHEMA: 'gw-staging.kdqt.vn',
    API_AUTH_SCHEMA: 'gw-staging.kdqt.vn/ewallet3/client-gateway',
    API_UAA_SCHEMA:
      'gw-staging.kdqt.vn/ewallet3/client-gateway/services/client-uaa-service/ewallet3/client-uaa',
    API_ERROR_SCHEMA: 'gw-staging.kdqt.vn/ewallet3/error-management',
    API_MDM_SCHEMA:
      'gw-staging.kdqt.vn/ewallet3/client-gateway/services/client-mdm-service/ewallet3/client-mdm',
    API_PARTNER_SCHEMA:
      'gw-staging.kdqt.vn/ewallet3/core-gateway/services/core-partner-service/ewallet3/core-partner',
    LOGIN_PATH:
      'http://gw-staging.kdqt.vn/ewallet3/ewallet-client-uaa-cms/login',
    SERVER_UAA_URL:
      'http://staging-ewallet-gateway-api-java.staging:8080/ewallet3/client-gateway/services/client-uaa-service/ewallet3/client-uaa',
    SYSTEM_CODE: 'UAAL',
  },
}
