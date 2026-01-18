export function parseISODuration(duration: string) {
  const hoursMatch = duration.match(/(\d+)H/);
  const minutesMatch = duration.match(/(\d+)M/);

  const hours = hoursMatch ? Number(hoursMatch[1]) : 0;
  const minutes = minutesMatch ? Number(minutesMatch[1]) : 0;

  return {
    hours,
    minutes,
  };
}
