/**
 * Utilidades de validación
 */

// Validación de DNI argentino
export const validateDNI = (dni) => {
  if (!dni) return false
  const cleanDNI = dni.toString().replace(/\D/g, '')
  return cleanDNI.length >= 7 && cleanDNI.length <= 8
}

// Validación de email
export const validateEmail = (email) => {
  if (!email) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validación de contraseña
export const validatePassword = (password) => {
  if (!password) return false
  return password.length >= 6
}

// Validación de teléfono argentino
export const validatePhone = (phone) => {
  if (!phone) return false
  const cleanPhone = phone.toString().replace(/\D/g, '')
  return cleanPhone.length >= 10 && cleanPhone.length <= 13
}

// Validación de campos requeridos
export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return value !== null && value !== undefined
}

// Validación de longitud mínima
export const validateMinLength = (value, minLength) => {
  if (!value) return false
  return value.toString().length >= minLength
}

// Validación de longitud máxima
export const validateMaxLength = (value, maxLength) => {
  if (!value) return true
  return value.toString().length <= maxLength
}

// Validador genérico para formularios
export const createValidator = (rules) => {
  return (data) => {
    const errors = {}
    
    for (const [field, fieldRules] of Object.entries(rules)) {
      const value = data[field]
      
      for (const rule of fieldRules) {
        if (!rule.validator(value)) {
          errors[field] = rule.message
          break
        }
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
}

// Reglas de validación predefinidas
export const validationRules = {
  required: (message = 'Este campo es requerido') => ({
    validator: validateRequired,
    message
  }),
  
  email: (message = 'Ingrese un email válido') => ({
    validator: validateEmail,
    message
  }),
  
  dni: (message = 'Ingrese un DNI válido') => ({
    validator: validateDNI,
    message
  }),
  
  password: (message = 'La contraseña debe tener al menos 6 caracteres') => ({
    validator: validatePassword,
    message
  }),
  
  phone: (message = 'Ingrese un teléfono válido') => ({
    validator: validatePhone,
    message
  }),
  
  minLength: (length, message) => ({
    validator: (value) => validateMinLength(value, length),
    message: message || `Debe tener al menos ${length} caracteres`
  }),
  
  maxLength: (length, message) => ({
    validator: (value) => validateMaxLength(value, length),
    message: message || `No puede tener más de ${length} caracteres`
  })
}