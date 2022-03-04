import icon from 'url:./../../img/icon-check.svg';

class View {
  _input = document.querySelector('.todo__input');
  _list = document.querySelector('.todo__list');
  _active = document.querySelector('.todo__sort--active');
  _completed = document.querySelector('.todo__sort--Completed');
  _all = document.querySelector('.todo__sort--all');
  _clear = document.querySelector('.todo__clear');
  _html = document.querySelector('html');

  setTheme(themes, themeClass) {
    this._html.classList.remove(themes[0]);
    this._html.classList.remove(themes[1]);
    console.log(themes);

    this._html.classList.add(themeClass);
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

  render(item) {
    // // remove all items
    // this._clearList();

    // generate markup
    // const markup = item
    //   .map(item => {
    //     return this._generateItemMarkup(item);
    //   })
    //   .join('');
    const markup = this._generateItemMarkup(item);

    this._list.insertAdjacentHTML('afterbegin', markup);
  }

  renderToggle(id, isChecked) {
    // 1) find item with this id
    const allItems = this._list.querySelectorAll('.todo__item');
    allItems.forEach(item => {
      if (id !== +item.id) return;

      // 2) toggle the class 'item--checked'
      item.classList.toggle('item--checked');
      // 3) add checkmark to indicate item is checked
      // done by the css

      // 4) change the completed dataset
      // console.log(item.dataset.completed);
      item.dataset.completed = isChecked;
    });
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
    <button class="todo__remove"><img class="todo__remove--img" src="./images/icon-cross.svg" alt="remove btn"></button>
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

  removeItem(id) {
    // get the item with the id
    const allItems = this._list.querySelectorAll('.todo__item');

    allItems.forEach(item => {
      if (+item.id !== id) return;
      // remove that item from UI
      item.remove();
    });
  }

  removeItemHandler(handler) {
    this._list.addEventListener('click', e => {
      if (!e.target.closest('.todo__remove--img')) return;
      if (e.target.closest('.todo__remove--img')) {
        const itemID = +e.target.closest('.todo__item').id;
        handler(itemID);
      }
    });
  }

  itemsLeftCount(number) {
    document.querySelector('.num-of-items').innerHTML = number;
  }

  showAllHandler(handler) {
    this._all.addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  }

  activeFilterHandler(handler) {
    this._active.addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  }

  completedFilterHandler(handler) {
    this._completed.addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  }

  renderAll(items) {
    const markup = items
      .map(item => {
        return this._generateItemMarkup(item);
      })
      .join(' ');
    this._list.innerHTML = '';
    this._list.insertAdjacentHTML('afterbegin', markup);
  }

  ClearCompletedHandler(handler) {
    this._clear.addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  }

  getLoclaStorageHandler(handler) {
    window.addEventListener('load', handler);
  }
}

export default new View();
