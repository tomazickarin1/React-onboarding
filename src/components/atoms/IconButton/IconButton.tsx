import styles from "./IconButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type IconButtonProps = {icon: IconDefinition}

export default function IconButton({icon}: IconButtonProps) {
  return  <button className={styles.iconButton}><FontAwesomeIcon icon={icon} /></button>
}
