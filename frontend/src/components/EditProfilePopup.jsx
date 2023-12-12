import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";

const EditProfilePopup = ({
  isOpen,
  onClose,
  onUpdateUser,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  };

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        id="username"
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        type="text"
        minLength="2"
        maxLength="40"
        required=""
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__input-error username-error" />
      <input
        name="about"
        id="input-job"
        className="popup__input popup__input_type_job"
        placeholder="О себе"
        type="text"
        minLength="2"
        maxLength="200"
        required=""
        value={about || ""}
        onChange={(e) => setAbout(e.target.value)}
      />
      <span className="popup__input-error input-job-error" />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
