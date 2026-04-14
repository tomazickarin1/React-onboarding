import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface IconProps {
  icon: IconDefinition;
  className?: string;
}

export default function Icon({ icon, className }: IconProps) {
  return <FontAwesomeIcon icon={icon} aria-hidden="true" className={className} />;
}
