import { LAYOUT, MENU_BEHAVIOUR, NAV_COLOR, MENU_PLACEMENT, RADIUS, THEME_COLOR, USER_ROLE } from 'constants.js';

export const IS_DEMO = false;
export const IS_AUTH_GUARD_ACTIVE = true;
// export const SERVICE_URL = 'https://where-iz-api-v3.onrender.com/api/v1';
//export const SERVICE_URL = 'http://35.180.196.133:5000/api/v1';

export const SERVICE_URL = 'https://where-iz-api-v3.onrender.com/api/v1';

export const USE_MULTI_LANGUAGE = false;
export const AUTH_TOKEN = 'token';

// For detailed information: https://github.com/nfl/react-helmet#reference-guide
export const REACT_HELMET_PROPS = {
  defaultTitle: "Where'iZ",
  titleTemplate: "%s | Where'iZ",
};

export const DEFAULT_REDIRECT_PATH = '/dashboard';

export const DEFAULT_PATHS = {
  APP: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  USER_WELCOME: '/dashboards/default',
  NOTFOUND: '/page-not-found',
  UNAUTHORIZED: '/unauthorized',
  INVALID_ACCESS: '/invalid-access',
};

export const DEFAULT_SETTINGS = {
  MENU_PLACEMENT: MENU_PLACEMENT.Vertical,
  MENU_BEHAVIOUR: MENU_BEHAVIOUR.Pinned,
  LAYOUT: LAYOUT.Boxed,
  RADIUS: RADIUS.Rounded,
  COLOR: THEME_COLOR.LightBlue,
  NAV_COLOR: NAV_COLOR.Default,
  USE_SIDEBAR: false,
};

export const DEFAULT_USER = {
  id: 1,
  name: 'Lisa Jackson',
  thumb: '/img/profile/profile-9.webp',
  role: USER_ROLE.Admin,
  email: 'lisajackson@gmail.com',
};

export const REDUX_PERSIST_KEY = 'starter-project';
