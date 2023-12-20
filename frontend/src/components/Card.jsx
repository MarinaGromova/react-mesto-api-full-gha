import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.owner === currentUser._id;
  const isLiked = props.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = `elements__group ${
    isLiked && "elements__group_active"
  }`;

  const handleClick = () => {
    props.onCardClick(props);
  };

  const handleDeleteClick = () => {
    props.onDeleteCard(props);
  };

  const handleCardLike = () => {
    props.onCardLike(props);
  };

  return (
    <>
      {isOwn && (
        <button
          type="button"
          aria-label="Закрыть"
          className="elements__basket"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        onClick={handleClick}
        src={props.link}
        alt={props.name}
        className="elements__img"
      />
      <div className="elements__flex">
        <h2 className="elements__title">{props.name}</h2>
        <div className="elements__likes">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
          ></button>
          <p className="elements__likes-number">{props.likes.length}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
