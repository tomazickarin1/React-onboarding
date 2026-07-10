import styles from "./PersonCard.module.scss";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PersonCardProps = {
  name: string;
  department: string;
  profileImg: string;
};

export default function PersonCard({
  name,
  department,
  profileImg
}: PersonCardProps) {
  return (
    <div className={styles.personCard}>
      <div className={profileImg ? styles.image : styles.placeholder}>
        {profileImg ? (
          <img src={profileImg} alt={name} />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </div>
      <div className={styles.info}>
        <h3>{name}</h3>
        <p>{department}</p>
      </div>
    </div>
  );
}
