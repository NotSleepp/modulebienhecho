/**
 * Funciones de utilidad generales
 */

import { TIME_CONFIG } from './constants.js'

// Debounce - retrasa la ejecución de una función
export const debounce = (func, delay = TIME_CONFIG.DEBOUNCE_DELAY) => {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

// Throttle - limita la frecuencia de ejecución de una función
export const throttle = (func, delay = TIME_CONFIG.THROTTLE_DELAY) => {
  let lastCall = 0
  return function (...args) {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      return func.apply(this, args)
    }
  }
}

// Generar ID único
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Generar UUID v4
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// Clonar objeto profundo
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (typeof obj === 'object') {
    const clonedObj = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
}

// Comparar objetos profundamente
export const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true
  
  if (obj1 == null || obj2 == null) return false
  
  if (typeof obj1 !== typeof obj2) return false
  
  if (typeof obj1 !== 'object') return obj1 === obj2
  
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  
  if (keys1.length !== keys2.length) return false
  
  for (const key of keys1) {
    if (!keys2.includes(key)) return false
    if (!deepEqual(obj1[key], obj2[key])) return false
  }
  
  return true
}

// Obtener valor anidado de un objeto
export const getNestedValue = (obj, path, defaultValue = undefined) => {
  if (!obj || !path) return defaultValue
  
  const keys = path.split('.')
  let result = obj
  
  for (const key of keys) {
    if (result == null || typeof result !== 'object') {
      return defaultValue
    }
    result = result[key]
  }
  
  return result !== undefined ? result : defaultValue
}

// Establecer valor anidado en un objeto
export const setNestedValue = (obj, path, value) => {
  if (!obj || !path) return obj
  
  const keys = path.split('.')
  let current = obj
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }
  
  current[keys[keys.length - 1]] = value
  return obj
}

// Omitir propiedades de un objeto
export const omit = (obj, keys) => {
  if (!obj) return {}
  
  const keysToOmit = Array.isArray(keys) ? keys : [keys]
  const result = {}
  
  for (const [key, value] of Object.entries(obj)) {
    if (!keysToOmit.includes(key)) {
      result[key] = value
    }
  }
  
  return result
}

// Seleccionar propiedades de un objeto
export const pick = (obj, keys) => {
  if (!obj) return {}
  
  const keysToPick = Array.isArray(keys) ? keys : [keys]
  const result = {}
  
  for (const key of keysToPick) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }
  
  return result
}

// Agrupar array por propiedad
export const groupBy = (array, key) => {
  if (!Array.isArray(array)) return {}
  
  return array.reduce((groups, item) => {
    const group = typeof key === 'function' ? key(item) : item[key]
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {})
}

// Ordenar array por múltiples criterios
export const sortBy = (array, ...criteria) => {
  if (!Array.isArray(array)) return []
  
  return [...array].sort((a, b) => {
    for (const criterion of criteria) {
      let aVal, bVal, desc = false
      
      if (typeof criterion === 'string') {
        if (criterion.startsWith('-')) {
          desc = true
          aVal = getNestedValue(a, criterion.slice(1))
          bVal = getNestedValue(b, criterion.slice(1))
        } else {
          aVal = getNestedValue(a, criterion)
          bVal = getNestedValue(b, criterion)
        }
      } else if (typeof criterion === 'function') {
        aVal = criterion(a)
        bVal = criterion(b)
      }
      
      if (aVal < bVal) return desc ? 1 : -1
      if (aVal > bVal) return desc ? -1 : 1
    }
    return 0
  })
}

// Eliminar duplicados de array
export const unique = (array, key) => {
  if (!Array.isArray(array)) return []
  
  if (!key) {
    return [...new Set(array)]
  }
  
  const seen = new Set()
  return array.filter(item => {
    const value = typeof key === 'function' ? key(item) : item[key]
    if (seen.has(value)) {
      return false
    }
    seen.add(value)
    return true
  })
}

// Dividir array en chunks
export const chunk = (array, size) => {
  if (!Array.isArray(array) || size <= 0) return []
  
  const chunks = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

// Esperar un tiempo determinado
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Retry con backoff exponencial
export const retry = async (fn, maxAttempts = 3, baseDelay = 1000) => {
  let lastError
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      
      if (attempt === maxAttempts) {
        throw lastError
      }
      
      const delay = baseDelay * Math.pow(2, attempt - 1)
      await sleep(delay)
    }
  }
}

// Detectar si es dispositivo móvil
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// Detectar si es dispositivo táctil
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

// Copiar texto al portapapeles
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    // Fallback para navegadores que no soportan clipboard API
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    try {
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    } catch (err) {
      document.body.removeChild(textArea)
      return false
    }
  }
}

// Descargar archivo
export const downloadFile = (data, filename, type = 'application/octet-stream') => {
  const blob = new Blob([data], { type })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}