/**
 * Utilidades de formateo
 */

// Formatear fecha en formato argentino
export const formatDate = (date, options = {}) => {
  if (!date) return ''
  
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return ''
  
  const defaultOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Argentina/Buenos_Aires'
  }
  
  return dateObj.toLocaleDateString('es-AR', { ...defaultOptions, ...options })
}

// Formatear fecha y hora
export const formatDateTime = (date) => {
  if (!date) return ''
  
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return ''
  
  return dateObj.toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Argentina/Buenos_Aires'
  })
}

// Formatear fecha relativa (hace X tiempo)
export const formatRelativeDate = (date) => {
  if (!date) return ''
  
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return ''
  
  const now = new Date()
  const diffInSeconds = Math.floor((now - dateObj) / 1000)
  
  if (diffInSeconds < 60) return 'Hace unos segundos'
  if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`
  if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`
  if (diffInSeconds < 2592000) return `Hace ${Math.floor(diffInSeconds / 86400)} días`
  
  return formatDate(date)
}

// Formatear DNI con puntos
export const formatDNI = (dni) => {
  if (!dni) return ''
  
  const cleanDNI = dni.toString().replace(/\D/g, '')
  if (cleanDNI.length < 7) return cleanDNI
  
  return cleanDNI.replace(/(\d{1,2})(\d{3})(\d{3})/, '$1.$2.$3')
}

// Formatear teléfono argentino
export const formatPhone = (phone) => {
  if (!phone) return ''
  
  const cleanPhone = phone.toString().replace(/\D/g, '')
  
  if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  
  if (cleanPhone.length === 11 && cleanPhone.startsWith('9')) {
    return cleanPhone.replace(/(\d{1})(\d{2})(\d{4})(\d{4})/, '+54 $1 ($2) $3-$4')
  }
  
  return phone
}

// Formatear moneda argentina
export const formatCurrency = (amount, options = {}) => {
  if (amount === null || amount === undefined) return ''
  
  const defaultOptions = {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }
  
  return new Intl.NumberFormat('es-AR', { ...defaultOptions, ...options }).format(amount)
}

// Formatear número con separadores de miles
export const formatNumber = (number, decimals = 0) => {
  if (number === null || number === undefined) return ''
  
  return new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number)
}

// Formatear porcentaje
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return ''
  
  return new Intl.NumberFormat('es-AR', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value / 100)
}

// Capitalizar primera letra
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Capitalizar cada palabra
export const capitalizeWords = (str) => {
  if (!str) return ''
  return str.split(' ').map(word => capitalize(word)).join(' ')
}

// Truncar texto
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - suffix.length) + suffix
}

// Limpiar espacios extra
export const cleanSpaces = (str) => {
  if (!str) return ''
  return str.replace(/\s+/g, ' ').trim()
}

// Formatear tamaño de archivo
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}