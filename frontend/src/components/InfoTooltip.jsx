const InfoTooltip = (props) => {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container popup__container_infotooltip">
        <button
          onClick={props.onClose}
          type="button"
          aria-label="Закрыть"
          className="popup__container-close"
        >
        </button>
        <img className="popup__container_image" src={props.image}/>
        <h2 className="popup__container_link">{props.title}</h2>
      </div>
    </div>
  );
};

export default InfoTooltip;
