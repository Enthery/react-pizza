import { useContext, useEffect, useState } from "react";

import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

export default function Home() {
  const dispatch = useDispatch(setCategoryId());
  const categoryId = useSelector((state) => state.filterSlice.categoryId);

  console.log("id category", categoryId);

  const [items, setItems] = useState([]);
  const [loadingPizza, setLoadingPizza] = useState(true);
  // const [categoryState, setCategoryState] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortState, setSortState] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  console.log(dispatch);

  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    setLoadingPizza(true);

    const sortBy = sortState.sortProperty.replace("-", "");
    const order = sortState.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://673b4458339a4ce4451b6ca1.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setLoadingPizza(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortState, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoriesValue={categoryId}
          onChangeCategory={(index) => dispatch(setCategoryId(index))}
        />
        <Sort
          sortValue={sortState}
          onChangeSort={(index) => setSortState(index)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{loadingPizza ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}
