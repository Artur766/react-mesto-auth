import React from "react";

function InfoTooltip(props) {

  const popupRef = React.useRef();

  React.useEffect(() => {
    //закрытие на esc
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        //удаляем открытый попап
        props.onClose();
      }
    }

    function handleOverlayClose(evt) {
      if (evt.target === evt.currentTarget) {
        //удаляем открытый попап
        props.onClose();
      }
    }

    popupRef.current.addEventListener("mousedown", handleOverlayClose);
    document.addEventListener("keydown", handleEscClose);

    return () => {
      popupRef.current.removeEventListener("mousedown", handleOverlayClose);
      document.removeEventListener("keydown", handleEscClose);
    }
  }, [props.onClose]);

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`} ref={popupRef}>
      <div className="popup__container">
        <button className="popup__close-btn " type="button" onClick={props.onClose}></button>
        <img className="popup__union" src={props.link} alt="иконка подтверждения" />
        <h3 className="popup__text">{props.title}</h3>
      </div>
    </div>
  )
}

export default InfoTooltip;