import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));
  }

  // Публичный метод, добавляющий слушатель submit к форме с полями и при клике на кнопку submit применяющий функцию (переданную в конструктор) обработки данных, введённых в поля,
  // принимающую на вход собранный объект с введёнными в поля данными.
  setEventListeners() {
    this._popupElement.querySelector('.popup__form').addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
    super.setEventListeners();
  }

  // Публичный метод, сбрасывающий введённые значения в поля ввода при закрытии попапа
  close() {
    this._popupForm.reset();
    super.close();
  }

  // Приватный метод, собирающий данные, введённые в поля в объект
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(inputElement => formValues[inputElement.name] = inputElement.value);
    return formValues;
  }
}
