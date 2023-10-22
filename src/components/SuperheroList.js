import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSuperheroContext } from "../middlware/SuperheroContext";

axios.defaults.baseURL = "http://localhost:3000";

function SuperheroList() {
  const { superheroes, pages, fetchSuperheroes, deleteSuperhero } =
    useSuperheroContext();
  const navigate = useNavigate();

  const changePage = (page) => {
    fetchSuperheroes(page);
  };

  useEffect(() => {
    fetchSuperheroes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arrayPages = Array.from({ length: pages }, (_, index) => index + 1);

  return (
    <div>
      <h1>Супергерої</h1>
      <ul>
        {superheroes.map((superhero) => (
          <li key={superhero._id}>
            <a
              href={`/superheroes/${superhero._id}`}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {superhero?.images?.length > 0 && (
                <img
                  src={`http://localhost:3000/public/image/${superhero.images}`}
                  alt={superhero.nickname}
                  width={250}
                  height={250}
                />
              )}
              <span>{superhero.nickname}</span>
            </a>
            <button onClick={() => deleteSuperhero(superhero._id)}>
              Видалити
            </button>
          </li>
        ))}
      </ul>

      <div className="pagination">
        {arrayPages.length >= 2 ? (
          arrayPages.map((page) => {
            return (
              <button key={page} onClick={() => changePage(page)}>
                {page}
              </button>
            );
          })
        ) : (
          <></>
        )}
      </div>

      <button onClick={() => navigate(`/superheroes/add`)}>Додати героя</button>
    </div>
  );
}

export default SuperheroList;
