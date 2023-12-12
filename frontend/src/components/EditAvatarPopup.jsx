import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";

const EditAvatarPopup = (props) => {
  const avatarRef = useRef(null);

  useEffect(() => {
    if (props.isOpen) {
      avatarRef.current.value = "";
    }
  }, [props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name="avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      buttonText="Сохранить"
    >
      <input
        name="avatar"
        id="avatar"
        className="popup__input popup__input_type_url popup__container-title_margin"
        placeholder="Ссылка на картинку"
        type="url"
        required=""
        ref={avatarRef}
      />
      <span className="popup__input-error input-link-error popup__container-margin" />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
