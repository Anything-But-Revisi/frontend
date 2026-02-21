import navbarImg from "../../assets/navbar.png";

interface ClarityLogoProps {
  size?: number;
  className?: string;
}

export function ClarityLogo({ size = 32, className = "" }: ClarityLogoProps) {
  return <img src={navbarImg} alt="SafeSpace Logo" width={size} height={size} className={`object-contain ${className}`} />;
}
