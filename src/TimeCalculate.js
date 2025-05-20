/**
 * Converts a time string in MM:SS format to seconds
 * @param {string} mmss - Time string in MM:SS format (e.g., "01:30" or "1:30")
 * @returns {number} - Total seconds
 */
export function convertMinsToSecs(mmss) {
  if (!mmss) return 0;
  
  const parts = mmss.split(':');
  if (parts.length !== 2) return 0;
  
  const mins = parseInt(parts[0], 10) || 0;
  const secs = parseInt(parts[1], 10) || 0;
  
  return mins * 60 + secs;
}

/**
 * Converts a time string in HH:MM:SS format to seconds
 * @param {string} hhmmss - Time string in HH:MM:SS format (e.g., "01:30:45")
 * @returns {number} - Total seconds
 */
export function convertHoursToSecs(hhmmss) {
  if (!hhmmss) return 0;
  
  const parts = hhmmss.split(':');
  if (parts.length !== 3) return 0;
  
  const hours = parseInt(parts[0], 10) || 0;
  const mins = parseInt(parts[1], 10) || 0;
  const secs = parseInt(parts[2], 10) || 0;
  
  return hours * 3600 + mins * 60 + secs;
}

/**
 * Converts seconds to a time string in MM:SS format
 * @param {number} s - Seconds
 * @returns {string} - Time string in MM:SS format
 */
export function convertSecsToMins(s) {
  if (!s && s !== 0) return '00:00';
  
  const totalSecs = parseInt(s, 10);
  const mins = Math.floor(totalSecs / 60);
  const secs = Math.floor(totalSecs % 60);
  
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Converts seconds to a time string in HH:MM:SS format
 * @param {number} s - Seconds
 * @returns {string} - Time string in HH:MM:SS format
 */
export function convertSecsToHours(s) {
  if (!s && s !== 0) return '00:00:00';
  
  const totalSecs = parseInt(s, 10);
  const hours = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = Math.floor(totalSecs % 60);
  
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

