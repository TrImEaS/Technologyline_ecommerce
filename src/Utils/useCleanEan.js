export default function useCleanEan (name) {
  return name.replace(/EAN(?::\s*|\s+)\d{5,}/gi, '')
}
