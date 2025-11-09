import horizontalLogoSrc from "figma:asset/a1ed921ab7c950ea4498e87c01b00c8bc86e0d8d.png";
import verticalLogoSrc from "figma:asset/4e0df436947f5a1d4ef2d66b83ddf2c55a05687f.png";

interface PetScopeLogoProps {
  variant: "horizontal" | "vertical";
  className?: string;
}

export function PetScopeLogo({ variant, className = "" }: PetScopeLogoProps) {
  const logoSrc = variant === "horizontal" ? horizontalLogoSrc : verticalLogoSrc;
  const defaultClassName = variant === "horizontal" 
    ? "h-10 w-auto" // Horizontal: fixed height, auto width (2500×1500 aspect ratio)
    : "h-32 w-auto mx-auto"; // Vertical: larger, centered (2500×2500 aspect ratio)

  return (
    <img
      src={logoSrc}
      alt="PetScope"
      className={className || defaultClassName}
      style={{ 
        minHeight: variant === "vertical" ? "120px" : "40px",
        padding: "0", // Maintain 32px padding from parent containers
      }}
    />
  );
}
