import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function FullPizza() {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://673b4458339a4ce4451b6ca1.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }
    fetchPizza();
  }, []);
  
  if (!pizza) {
    return "Loading...";
  }
  
  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
}
