import React from "react";

function ImagePopup(props) {

  const popupRef = React.useRef();

  React.useEffect(() => {
    function handleOverlayClose(evt) {
      if (evt.target === evt.currentTarget) {
        props.onClose();
      }
    }
    popupRef.current.addEventListener("mousedown", handleOverlayClose);

    return () => {
      popupRef.current.removeEventListener("mousedown", handleOverlayClose)
    }
  }, [props.onClose]);

  return (
    <div ref={popupRef} className={`popup popup_type_increase ${props.card.link ? 'popup_opened' : ''}`} >
      <div className="popup__wrapper">
        <button className="popup__close-btn" type="button" onClick={props.onClose} />
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <p className="popup__description">{props.card.name}</p>
      </div>
    </div >
  )
}

export default ImagePopup;