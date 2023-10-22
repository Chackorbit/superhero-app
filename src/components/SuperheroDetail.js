import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function SuperheroDetail() {
  const [superhero, setSuperhero] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/superheroes/${id}`).then((res) => {
      setSuperhero(res.data);
    });
  }, [id]);
  return (
    <div>
      <button onClick={() => navigate("/superheroes")}>Назад</button>
      <h1>{superhero.nickname}</h1>
      {superhero?.images?.length > 0 && (
        <img
          src={`http://localhost:3000/public/image/${superhero.images}`}
          alt={superhero.nickname}
          width={250}
          height={250}
        />
      )}
      <p>Ім'я: {superhero.real_name}</p>
      <p>Походження: {superhero.origin_description}</p>
      <p>Суперсили: {superhero.superpowers}</p>
      <Link to={`/superheroes/${id}/edit`}>
        <button>Редагувати</button>
      </Link>
    </div>
  );
}

export default SuperheroDetail;
