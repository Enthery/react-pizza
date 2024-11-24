import { useEffect, useState } from "react";

import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";

export default function Home({ searchValue }) {
  const [items, setItems] = useState([]);
  const [loadingPizza, setLoadingPizza] = useState(true);
  const [categoryState, setCategoryState] = useState(0);
  const [sortState, setSortState] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    setLoadingPizza(true);

    const sortBy = sortState.sortProperty.replace("-", "");
    const order = sortState.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryState > 0 ? `category=${categoryState}` : "";

    fetch(
      `https://673b4458339a4ce4451b6ca1.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setLoadingPizza(false);
      });
    window.scrollTo(0, 0);
  }, [categoryState, sortState]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue)) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

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
      <div className="content__items">{loadingPizza ? skeletons : pizzas}</div>
    </div>
  );
}
