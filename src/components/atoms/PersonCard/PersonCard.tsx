import styles from "./PersonCard.module.scss";
import profileIcon from "../../../assets/profile.svg";

type PersonCardProps = {
  name: string;
  department: string;
  profileImg: string;
};

export default function PersonCard({
  name,
  department,
  profileImg,
}: PersonCardProps) {
  return (
    <div className={styles.personCard}>
      <div className={profileImg ? styles.image : styles.placeholder}>
        {profileImg ? (
          <img src={profileImg} alt={name} />
        ) : (
          <img src={profileIcon} alt="" />
        )}
      </div>
      <div className={styles.info}>
        <h3>{name}</h3>
        <p>{department}</p>
      </div>
    </div>
  );
}
