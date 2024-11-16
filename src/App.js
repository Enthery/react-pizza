import "./scss/app.scss";

import Categories from "./components/categories/Categories";
import Sort from "./components/sort/Sort";
import Header from "./components/header/Header";
import PizzaBlock from "./components/pizza-block/PizzaBlock";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            <PizzaBlock name="Мексиканская" rub={500} />
            <PizzaBlock name="Домашняя" rub={350} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
