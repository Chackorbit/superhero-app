import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SuperheroContext = createContext();

export function useSuperheroContext() {
  return useContext(SuperheroContext);
}

export function SuperheroProvider({ children }) {
  const [superheroes, setSuperheroes] = useState([]);
  const [pages, setPages] = useState(0);
  const [initSuperhero] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: [],
    catch_phrase: "",
    images: [],
  });

  const navigate = useNavigate();

  // Отримуємо список супергероїв
  const fetchSuperheroes = async (page = 1, limit = 5) => {
    try {
      const response = await axios.get("/superheroes", {
        params: {
          page,
          limit,
        },
      });
      setSuperheroes(response.data.superheroes);
      setPages(response.data.total_pages);

      navigate(`/superheroes?page=${page}&limit=${limit}`);
    } catch (error) {
      console.error(
        "Помилка при отриманні списку супергероїв: " + error.message
      );
    }
  };

  // Видаляємо супергероя
  const deleteSuperhero = async (id) => {
    if (window.confirm("Ви впевнені, що хочете видалити цього супергероя?")) {
      await axios.delete(`/superheroes/${id}`);
      // Після видалення оновити список супергероїв
      fetchSuperheroes();
    }
  };

  // Додавання/редагування супергероя
  const handleFormSubmit = async (e, superhero, id) => {
    e.preventDefault();
    const url = id ? `/superheroes/${id}/edit` : "/superheroes/add";

    const formData = new FormData();
    formData.append("nickname", superhero.nickname);
    formData.append("real_name", superhero.real_name);
    formData.append("origin_description", superhero.origin_description);
    formData.append("superpowers", superhero.superpowers);
    formData.append("catch_phrase", superhero.catch_phrase);
    formData.append("images", superhero.images);

    try {
      // Використовуємо axios для відправлення FormData
      const response = await axios({
        method: id ? "put" : "post",
        url: url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201 || response.status === 200) {
        alert(id ? "Зміни збережено!!!" : "Супергероя додано!!!");
        navigate(id ? `/superheroes/${id}` : `/superheroes`);
      }
    } catch (error) {
      console.error("Помилка: " + error.message);
    }
  };

  return (
    <SuperheroContext.Provider
      value={{
        superheroes,
        pages,
        fetchSuperheroes,
        deleteSuperhero,
        handleFormSubmit,

        initSuperhero,
        navigate,
      }}
    >
      {children}
    </SuperheroContext.Provider>
  );
}
