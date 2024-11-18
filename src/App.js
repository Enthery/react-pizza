import "./scss/app.scss";

import Categories from "./components/categories/Categories";
import Sort from "./components/sort/Sort";
import Header from "./components/header/Header";
import PizzaBlock from "./components/pizza-block/PizzaBlock";

import db from "./assets/db/pizza.json";
import { useEffect, useState } from "react";

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
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
