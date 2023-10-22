import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSuperheroContext } from "../middlware/SuperheroContext";

function EditSuperhero() {
  const { handleFormSubmit, initSuperhero } = useSuperheroContext();

  const [superhero, setSuperhero] = useState(initSuperhero);
  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setSuperhero((prevSuperhero) => ({
      ...prevSuperhero,
      [field]: value,
    }));
  };

  // Додавання/редагування фото
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setSuperhero((prev) => ({ ...prev, images: file }));
  };

  useEffect(() => {
    if (id) {
      axios.get(`/superheroes/${id}`).then((res) => {
        setSuperhero(res.data);
      });
    }
  }, [id]);

  return (
    <div>
      <button
        onClick={() => navigate(id ? `/superheroes/${id}` : `/superheroes`)}
      >
        Назад
      </button>

      {id ? <h1>Редагувати супергероя</h1> : <h1>Додати супергероя</h1>}
      <form
        onSubmit={(e) => handleFormSubmit(e, superhero, id)}
        encType="multipart/form-data"
      >
        <div>
          <label htmlFor="nickname">Псевдонім:</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={superhero.nickname}
            onChange={(e) => handleInputChange("nickname", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="real_name">Ім'я:</label>
          <input
            type="text"
            id="real_name"
            name="real_name"
            value={superhero.real_name}
            onChange={(e) => handleInputChange("real_name", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="origin_description">Походження:</label>
          <input
            type="text"
            id="origin_description"
            name="origin_description"
            value={superhero.origin_description}
            onChange={(e) =>
              handleInputChange("origin_description", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="superpowers">Суперсили:</label>
          <input
            type="text"
            id="superpowers"
            name="superpowers"
            value={superhero.superpowers}
            onChange={(e) => handleInputChange("superpowers", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Фото:</label>
          <input
            type="file"
            id="image"
            name="images"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
        </div>
        <button type="submit">Зберегти зміни</button>
      </form>
    </div>
  );
}

export default EditSuperhero;
