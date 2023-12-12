const PopupWithForm = (props) => {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onMouseDown={(e) => e.target === e.currentTarget && props.onClose()}
    >
      <div className="popup__container">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__container-close"
        ></button>
        <h2 className="popup__container-title">{props.title}</h2>
        <form
          name="type-form"
          className={`popup__form popup__form_type_${props.name}`}
          noValidate=""
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type="submit"
            className="popup__container-submit"
            onClick={props.onClose}
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
