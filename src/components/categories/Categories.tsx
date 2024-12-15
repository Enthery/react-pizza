import "./styles.css";
import React from "react";

type CategoriesProps = {
  categoriesValue: number;
  onChangeCategory: (index:number) => void;
}
const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];


export default React.memo(function Categories({ categoriesValue, onChangeCategory } : CategoriesProps) {
  

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            key={item}
            className={categoriesValue === index ? "active" : ""}
            onClick={() => onChangeCategory(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
})
