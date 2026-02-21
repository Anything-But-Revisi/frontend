import logoJpeg from "../../assets/logo.png";

interface ClarityLogoProps {
  size?: number;
  className?: string;
  rounded?: boolean;
}

export function ClarityLogo({ size = 32, className = "", rounded = true }: ClarityLogoProps) {
  return <img src={logoJpeg} alt="SafeSpace Logo" width={size} height={size} className={`object-contain block ${rounded ? "rounded-full" : ""} ${className}`} style={{ width: size, height: size }} />;
}
