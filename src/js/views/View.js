import icon from 'url:../../img/icon-check.svg';

class View {
  _input = document.querySelector('.todo__input');
  _list = document.querySelector('.todo__list');

  switchTheme(themeClassName) {
    // get the element to change the class on
    const htmlElement = document.querySelector('html');
    // remove all theme classes
    htmlElement.classList = '';

    // add the apropriate theme class
    htmlElement.classList.add(themeClassName);
  }

  switchThemeHandler(handler) {
    // call the handler in the controller when theme change btn is triggered
    document.querySelector('#theme').addEventListener('change', e => {
      handler();
    });
  }

  addItemHandler(handler) {
    this._input.addEventListener('keypress', e => {
      // prevent inputfrom submiting
      e.preventDefault;
      // if any key other than 'Enter' is pressed do NOT do anything
      if (!(e.key === 'Enter')) return;
      // if 'Enter' is pressed then call the handler, and pass to it the input value
      const desc = this._input.value;
      handler(desc);

      // clear the input
      this._input.value = '';
    });
  }

  render(items) {
    // remove all items
    this._clearList();

    // generate markup
    const markup = items
      .map(item => {
        return this._generateItemMarkup(item);
      })
      .join('');
    console.log(markup);
    // const markup = this._generateItemMarkup(item);
    // add markup to the UI
    this._list.insertAdjacentHTML('afterbegin', markup);
  }

  _generateItemMarkup(item) {
    return `
    <li class="todo__item ${item.completed ? 'item--checked' : ''} " id="${
      item.id
    }" data-completed="${item.completed}" >
    <label  class="todo__container--check">
      <input type="checkbox" class="item__check" ${
        item.completed ? 'checked' : ''
      } >
      <span class="item__checkmark item__checkmark--check" >
        <img class="item__checkmark--checked" src="${icon}" alt="cheched icon">
      </span>
    </label>

    <p class="item__desc">${item.desc} </p>
    <button class="todo__remove"><img src="./images/icon-cross.svg" alt="remove btn"></button>
  </li>
    
    `;
  }

  _clearList() {
    this._list.innerHTML = '';
  }

  addCheckHandler(handler) {
    this._list.addEventListener('click', e => {
      e.preventDefault();
      // see if the check btn is clicked
      const check = e.target.closest('.item__checkmark');
      // return if not
      if (!check) return;
      // get the item itself
      const item = e.target.parentElement.parentElement;
      // call andpass the item to thehandler
      handler(item);
    });
  }
}

export default new View();