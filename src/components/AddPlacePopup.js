import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../utils/useFormValidation"

function AddPlacePopup(props) {

  const { values, errors, isValid, handleChange, reset } = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: values["name"],
      link: values["link"]
    });
    reset();
  }

  function errorClassName(name) {
    return `popup__input ${errors[name] && "popup__input_type_error"}`
  }

  function onClosePopup() {
    props.onClose();
    reset();
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title="Новое место"
      name="add"
      buttonName={props.buttonName}
      isOpen={props.isOpen}
      onClose={onClosePopup}
      isValid={isValid}
    >
      <input
        value={values["name"] ?? ""}
        onChange={handleChange}
        className={errorClassName("name")}
        id="title-picture"
        name="name"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="popup__error popup__error_visable title-picture-error">{errors["name"]}</span>
      <input
        value={values["link"] ?? ""}
        onChange={handleChange}
        className={errorClassName("link")}
        id="link-picture"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error popup__error_visable link-picture-error ">{errors["link"]}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;

