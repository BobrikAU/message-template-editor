import styles from "./index.module.css";
import Span from "../../ui/span";
import Textarea from "../../ui/textarea";
import { ButtonDelete } from "../../ui/button";

const Condition = () => (
  <div className={styles.container}>
    <Textarea
      name="1_0"
      value=""
      changeHandler={() => {}}
      externalStyles={styles.topText}
    />
    <Span text="IF" externalStyles={styles.condition} />
    <ButtonDelete onClick={() => {}} externalStyles={styles.buttonDelete} />
    <Textarea
      name="1_1"
      value=""
      changeHandler={() => {}}
      externalStyles={styles.conditionText}
    />
    <Span text="THEN" externalStyles={styles.then} />
    <Textarea
      name="1_2"
      value=""
      changeHandler={() => {}}
      externalStyles={styles.thenText}
    />
    <Span text="ELSE" externalStyles={styles.else} />
    <Textarea
      name="1_3"
      value=""
      changeHandler={() => {}}
      externalStyles={styles.elseText}
    />
    <Textarea
      name="1_4"
      value=""
      changeHandler={() => {}}
      externalStyles={styles.downText}
    />
  </div>
);

export default Condition;
