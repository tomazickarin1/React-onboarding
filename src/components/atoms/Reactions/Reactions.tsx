import styles from "./Reactions.module.scss";
import emoji1 from "../../../assets/emoji1.svg";
import emoji2 from "../../../assets/emoji2.svg";
import emoji3 from "../../../assets/emoji3.svg";

export default function Reactions() {
  return (
    <div className={styles.reactions}>
      <div>
        <img src={emoji1} alt="" />
      </div>
      <div>
        <img src={emoji2} alt="" />
      </div>
      <div>
        <img src={emoji3} alt="" />
      </div>
    </div>
  );
}
