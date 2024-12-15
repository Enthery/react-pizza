import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import {  setSort, SortPropertyEnum, SortState } from "../../redux/slices/filterSlice";
import React from "react";

type ListItem = {
  name: string;
  sortProperty: SortPropertyEnum;
}

type SortPopupProps = {
  value: SortState
}

export const list: ListItem[] = [
  { name: "популярности (DESC)", sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: "популярности (ASC)", sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: "цене (DESC)", sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: "цене (ASC)", sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: "алфавиту (DESC)", sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: "алфавиту (ASC)", sortProperty: SortPropertyEnum.TITLE_ASC },
];

export default React.memo(function Sort({value} : SortPopupProps) {

  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  function clickSort(obj:ListItem) {
    dispatch(setSort(obj));
    setOpen((visible) => !visible);
  }
  

  useEffect(() => {
    function handleSlickOutside(event: MouseEvent) {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    }
    document.body.addEventListener("click", handleSlickOutside);

    return () => {
      document.body.removeEventListener("click", handleSlickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      <div className="sort__popup">
        {open ? (
          <ul>
            {list.map((obj, index) => (
              <li
                key={index}
                className={
                  value.sortProperty === obj.sortProperty ? "active" : ""
                }
                onClick={() => clickSort(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
)