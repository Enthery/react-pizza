import { useEffect, useState } from "react";
import "./scss/app.scss";

import Categories from "./components/categories/Categories";
import Sort from "./components/sort/Sort";
import Header from "./components/header/Header";
import PizzaBlock from "./components/PizzaBlock";
import Skeleton from "./components/PizzaBlock/Skeleton";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://673b4458339a4ce4451b6ca1.mockapi.io/items")
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            {/* <Categories /> */}
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj) => (
              <Skeleton key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
