export function ClarityLogo({ size = 32 }: { size?: number }) {
  const logoUrl = new URL("../../assets/logo.jpeg", import.meta.url).href;

  return <img src={logoUrl} alt="Clarity Logo" width={size} height={size} style={{ objectFit: "contain", borderRadius: "50%", overflow: "hidden", display: "block" }} />;
}
