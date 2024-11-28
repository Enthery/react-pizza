import { SearchContext } from "../../App";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import React, { useCallback, useContext, useRef, useState } from "react";

export default function Search() {
  const [value, setValue] = useState("");
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  function onClickClear() {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  }

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    []
  );

  function onChangeInput(event) {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </svg>

      <input
        ref={inputRef}
        value={value}
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы..."
        onChange={onChangeInput}
      />
      {searchValue && (
        <svg
          onClick={() => {
            onClickClear();
          }}
          className={styles.clearIcon}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
}
