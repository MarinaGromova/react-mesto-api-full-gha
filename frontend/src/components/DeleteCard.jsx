import PopupWithForm from "./PopupWithForm";

const DeleteCard = ({ isOpen, onClose, onCardDelete, cardId }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onCardDelete(cardId);
  };

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Да"}
    />
  );
}

export default DeleteCard;
