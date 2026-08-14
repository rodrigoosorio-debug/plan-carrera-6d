/** El `fbq` global que inyecta el script del pixel de Meta. */
interface Window {
  fbq?: (
    action: "track" | "trackCustom" | "init",
    event: string,
    payload?: Record<string, unknown>,
  ) => void;
}
