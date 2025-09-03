/**
 * Exportaciones centralizadas de utilidades
 */

// Validaciones
export {
  validateDNI,
  validateEmail,
  validatePassword,
  validatePhone,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  createValidator,
  validationRules
} from './validation.js'

// Formateadores
export {
  formatDate,
  formatDateTime,
  formatRelativeDate,
  formatDNI,
  formatPhone,
  formatCurrency,
  formatNumber,
  formatPercentage,
  capitalize,
  capitalizeWords,
  truncateText,
  cleanSpaces,
  formatFileSize
} from './formatters.js'

// Constantes
export {
  APP_STATES,
  AUTH_STATES,
  NOTIFICATION_TYPES,
  MODAL_TYPES,
  THEMES,
  SCREEN_SIZES,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  PAGINATION,
  FILE_CONFIG,
  VALIDATION_CONFIG,
  API_ROUTES,
  STORAGE_KEYS,
  TIME_CONFIG,
  USER_ROLES,
  PERMISSIONS,
  ANIMATION_CONFIG
} from './constants.js'

// Helpers
export {
  debounce,
  throttle,
  generateId,
  generateUUID,
  deepClone,
  deepEqual,
  getNestedValue,
  setNestedValue,
  omit,
  pick,
  groupBy,
  sortBy,
  unique,
  chunk,
  sleep,
  retry,
  isMobile,
  isTouchDevice,
  copyToClipboard,
  downloadFile
} from './helpers.js'