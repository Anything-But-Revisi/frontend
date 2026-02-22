import type { MouseEventHandler } from "react";
import navbarImg from "../../assets/navbar.png";

interface ClarityLogoProps {
  size?: number;
  className?: string;
  onClick?: MouseEventHandler<HTMLImageElement>;
}

export function ClarityLogo({ size = 32, className = "", onClick }: ClarityLogoProps) {
  return <img src={navbarImg} alt="SafeSpace Logo" width={size} height={size} className={`object-contain ${className}`} onClick={onClick} />;
}
