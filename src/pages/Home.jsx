import { useEffect, useState } from "react";

import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loadingPizza, setLoadingPizza] = useState(true);
  const [categoryState, setCategoryState] = useState(0);
  const [sortState, setSortState] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    setLoadingPizza(true);
    fetch(
      `https://673b4458339a4ce4451b6ca1.mockapi.io/items?${
        categoryState > 0 ? `category=${categoryState}` : ""
      }&sortBy=${sortState.sortProperty.replace("-", "")}&order=${
        sortState.sortProperty.includes("-") ? "asc" : "desc"
      }`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setLoadingPizza(false);
      });
    window.scrollTo(0, 0);
  }, [categoryState, sortState]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoriesValue={categoryState}
          onChangeCategory={(index) => setCategoryState(index)}
        />
        <Sort
          sortValue={sortState}
          onChangeSort={(index) => setSortState(index)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loadingPizza
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
}
