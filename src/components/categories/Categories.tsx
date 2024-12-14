import { useWhyDidYouUpdate } from "ahooks";
import "./styles.css";

type CategoriesProps = {
  categoriesValue: number;
  onChangeCategory: (index:number) => void;
}

export default function Categories({ categoriesValue, onChangeCategory } : CategoriesProps) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  useWhyDidYouUpdate('Categories', {categoriesValue, onChangeCategory})

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
}
