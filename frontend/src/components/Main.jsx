import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = (props) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="container">
      <section className="profile">
        <button onClick={props.onEditAvatar} className="profile__image">
          <img
            src={currentUser.avatar}
            alt="аватарка страницы"
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            onClick={props.onEditProfile}
            className="profile__edit-button"
            type="button"
          ></button>
          <p className="profile__text">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__plus-button"
          type="button"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__grid">
          {props.cards.map((card) => (
            <li key={card._id} className="elements__card">
              <Card
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onDeleteCard={props.onDeleteCard}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
