const ImagePopup = ({ card, onClose }) => {
  return (
    <div
      className={`popup popup_type_image ${card ? "popup_opened" : ""}`}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="popup__container popup__container_zoom">
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
          className="popup__container-close"
        ></button>
        <figure className="popup__zoom">
          <img
            className="popup__image"
            src={card ? card.link : ""}
            alt={card ? card.name : ""}
          />
          <figcaption className="popup__caption">
            {card ? card.name : ""}
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default ImagePopup;
