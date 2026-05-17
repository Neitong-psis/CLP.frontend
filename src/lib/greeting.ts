export function greetingForHour(hours: number): string {
  if (hours >= 5 && hours < 12) return "Good morning";
  if (hours >= 12 && hours < 17) return "Good afternoon";
  if (hours >= 17 && hours < 22) return "Good evening";
  return "Good night";
}

export function getServerGreeting(): string {
  return greetingForHour(new Date().getHours());
}
