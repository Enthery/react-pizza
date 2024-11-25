import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

export default function Pagination({ onChangePage }) {
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
