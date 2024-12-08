import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FullPizza() {
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://673b4458339a4ce4451b6ca1.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPizza();
  }, []);

  return (
    <div className="container">
      <img src="" />
      <h2>{id}</h2>
      <p>gsdgsdg gwegwe gsdg</p>
      <h4>250p</h4>
    </div>
  );
}
