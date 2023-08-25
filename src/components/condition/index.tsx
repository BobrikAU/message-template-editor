import { useState } from "react";
import styles from "./index.module.css";
import Span from "../../ui/span";
import Textarea from "../../ui/textarea";
import { ButtonDelete } from "../../ui/button";

interface IConditionProps {
  externalStyles?: string;
}

/**
 * Компонент Condition рендерит виджет блока IF-THEN-ELSE. Для полноцееной реализации виджета с
 * возможностью вставки условлного ветвления в любое место вместо текста, функциональный компонент
 * Condition сделан рекурсивным.
 */

const Condition = ({ externalStyles }: IConditionProps) => {
  const [aaa, setAaa] = useState<"text" | "condition">("text"); // переделать
  return (
    <div className={`${styles.container} ${externalStyles && externalStyles}`}>
      {/*верхняя часть с текстом или блоком IF-THEN-ELSE*/}
      {aaa === "text" ? (
        <Textarea
          name="1_0"
          value=""
          changeHandler={() => {}}
          externalStyles={styles.topPart}
        />
      ) : (
        <Condition externalStyles={styles.topPart} />
      )}

      {/*часть, вычисляющая булевый результат условия, с текстом или блоком IF-THEN-ELSE*/}
      <Span text="IF" externalStyles={styles.condition} />
      <ButtonDelete
        onClick={() => setAaa("condition")} // переделать
        externalStyles={styles.buttonDelete}
      />
      <Textarea
        name="1_1"
        value=""
        changeHandler={() => {}}
        externalStyles={styles.conditionText}
      />

      {/*часть, активная при вычислении в условии true, с текстом или блоком IF-THEN-ELSE*/}
      <Span text="THEN" externalStyles={styles.then} />
      <Textarea
        name="1_2"
        value=""
        changeHandler={() => {}}
        externalStyles={styles.thenPart}
      />

      {/*часть, активная при вычислении в условии false, с текстом или блоком IF-THEN-ELSE*/}
      <Span text="ELSE" externalStyles={styles.else} />
      <Textarea
        name="1_3"
        value=""
        changeHandler={() => {}}
        externalStyles={styles.elsePart}
      />

      {/*нижняя часть с текстом или блоком IF-THEN-ELSE*/}
      <Textarea
        name="1_4"
        value=""
        changeHandler={() => {}}
        externalStyles={styles.downPart}
      />
    </div>
  );
};
export default Condition;
