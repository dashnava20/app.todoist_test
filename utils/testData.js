export function uniqueTaskName(baseName = 'E2E Task') {
  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, '-');

  return `${baseName} - ${timestamp}`;
}
