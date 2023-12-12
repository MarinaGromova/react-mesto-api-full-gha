import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = useState("");
  const [link, setlink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({ name, link });
  }

 const handlePlaceName = (e) => {
    setName(e.target.value);
  }

  const handlePlaceLink = (e) => {
    setlink(e.target.value);
  }

  //сброс текста при открытии
  useEffect(() => {
    setName("");
    setlink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="profile"
      title="Новое место"
      buttonText="Создать"
    >
      <input
        name="name"
        id="input-new"
        className="popup__input popup__input_type_card"
        placeholder="Название избражения"
        type="text"
        minLength="2"
        maxLength="30"
        required=""
        value={name || ""}
        onChange={handlePlaceName}
      />
      <span className="popup__input-error input-new-error" />
      <input
        name="link"
        id="input-link"
        className="popup__input popup__input_type_url"
        placeholder="Ссылка на картинку"
        type="url"
        required=""
        value={link || ""}
        onChange={handlePlaceLink}
      />
      <span className="popup__input-error input-link-error" />
    </PopupWithForm>
  );
};

export default AddPlacePopup;
