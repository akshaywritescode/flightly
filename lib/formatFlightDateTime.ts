export default function formatFlightDateTime(iso?: string) {
  if (!iso) return ""

  const date = new Date(iso)

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date)
}