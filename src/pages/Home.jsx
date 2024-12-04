import { useContext, useEffect, useRef, useState } from "react";
import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/categories/Categories";
import Sort, { list } from "../components/sort/Sort";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch(setCategoryId());
  const isSearch = useRef(false);
  const isMount = useRef(false);
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filterSlice
  );
  const { items } = useSelector((state) => state.pizzas);
  const sortType = sort.sortProperty;

  const [loadingPizza, setLoadingPizza] = useState(true);

  const { searchValue } = useContext(SearchContext);

  function onChangePage(number) {
    dispatch(setCurrentPage(number));
  }

  async function getPizzas() {
    setLoadingPizza(true);

    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    try {
      dispatch(
        fetchPizzas({
          sortBy,
          order,
          category,
          search,
          currentPage,
        })
      );
      setLoadingPizza(false);
    } catch (error) {
      setLoadingPizza(false);
      console.log("ERROR", error);
    }
  }

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => (obj.sortProperty = params.sortProperty));

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMount.current) {
      const queryStr = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryStr}`);
    }
    isMount.current = true;
  }, [categoryId, sortType, currentPage]);

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
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{loadingPizza ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
