import { useState } from "react";
import "./styles.css";

export default function Categories() {
  const [activeIndex, setActive] = useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  function onClickCategory(index) {
    setActive(index);
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            className={activeIndex === index ? "active" : ""}
            onClick={() => onClickCategory(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
