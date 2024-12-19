import { useCallback, useEffect, useRef } from "react";
import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/categories/Categories";
import Sort, { list } from "../components/sort/Sort";
import Pagination from "../components/Pagination";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import NotFound from "./NotFound";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import { setCategoryId, setCurrentPage } from "../redux/filter/slice";
import { selectPizzas } from "../redux/pizza/selectors";
import { fetchPizzas } from "../redux/pizza/asyncActions";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMount = useRef(false);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzas);
  const sortType = sort.sortProperty;

  function onChangePage(page: number) {
    dispatch(setCurrentPage(page));
  }

  const onChangeCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  async function getPizzas() {
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
    window.scrollTo(0, 0);
  }

  // Парсим параметры при первом рендере.
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzasParams;

  //     const sort = list.find((obj) => (obj.sortProperty == params.sortBy));

  //     dispatch(setFilters({
  //       searchValue: params.search,
  //       categoryId: Number(params.category),
  //       currentPage: Number(params.currentPage),
  //       sort: sort || list[0],
  //     })
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  // Если изменили параметры и был первый рендер
  // useEffect(() => {
  //   if(isMount.current) {
  //     const params = {
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sort.sortProperty,
  //       currentPage,
  //     }
  //     const queryString = qs.stringify(params, {skipNulls: true})
  //     navigate(`/?${queryString}`)
  //   }
  //   if(!window.location.search) {
  //   dispatch(fetchPizzas({} as SearchPizzasParams))
  //   }
  // },[categoryId, sort.sortProperty, searchValue, currentPage])

  //   if (isMount.current) {
  //     const queryStr = qs.stringify({
  //       sortProperty: sortType,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryStr}`);
  //   }
  //   isMount.current = true;
  // }, [categoryId, sortType, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoriesValue={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div>
          <NotFound />
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
