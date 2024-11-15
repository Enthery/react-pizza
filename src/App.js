import "./scss/app.scss";

import Categories from "./components/categories/Categories";
import Sort from "./components/sort/Sort";
import Header from "./components/header/Header";
import PizzaBlock from "./components/pizza-block/PizzaBlock";

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaBlock title="Мексиканская" rub={500} />
            <PizzaBlock title="Домашняя" rub={350} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
