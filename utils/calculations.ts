/**
 * Converte string de hora HH:MM para minutos totais
 */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Converte minutos totais para string HH:MM
 */
export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

/**
 * Calcula a diferença entre hora de saída e entrada
 * Suporta eventos noturnos (quando endTime < startTime)
 */
export function calculateOvertimeHours(startTime: string, endTime: string): number {
  const startMinutes = timeToMinutes(startTime);
  let endMinutes = timeToMinutes(endTime);

  // Se hora de saída for menor que entrada, adiciona 24h (evento noturno)
  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60;
  }

  const diffMinutes = endMinutes - startMinutes;
  return diffMinutes / 60; // Retorna em horas decimais
}

/**
 * Formata horas decimais para string HH:MM
 */
export function formatHours(hours: number): string {
  const totalMinutes = Math.round(hours * 60);
  return minutesToTime(totalMinutes);
}

/**
 * Calcula o total de horas de múltiplas entradas
 */
export function calculateTotalHours(entries: { hours: number }[]): number {
  return entries.reduce((total, entry) => total + entry.hours, 0);
}

/**
 * Valida se o formato de hora está correto (HH:MM)
 */
export function isValidTimeFormat(time: string): boolean {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

/**
 * Verifica se as horas extras excedem o limite
 */
export function exceedsHourLimit(hours: number, limit: number = 4): boolean {
  return hours > limit;
}
