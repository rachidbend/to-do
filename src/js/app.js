import icon from 'url:../img/icon-check.svg';

console.log('hi there to-do');

var el = document.getElementById('items');
var sortable = Sortable.create(el, {
  sort: true,
});

// ADD NEW TODO ITEM -----------------
const input = document.querySelector('.todo__input');
const list = document.querySelector('.todo__list');

const addTodo = function () {
  const desc = input.value;
  console.log(desc);
  if (!desc) return;

  const markup = `
  <li class="todo__item " id="1">
    <label  class="todo__container--check">
      <input type="checkbox" class="item__check" >
      <span class="item__checkmark" >
        <img class="item__checkmark--checked" src="${icon}" alt="cheched icon">
      </span>
    </label>

    <p class="item__desc">${desc} </p>
    <button class="todo__remove"><img src="./images/icon-cross.svg" alt="remove btn"></button>
  </li>
`;

  list.insertAdjacentHTML('afterbegin', markup);
};

const addCheck = function (item) {
  console.log(item);
};

input.addEventListener('keypress', e => {
  e.preventDefault;
  if (!(e.key === 'Enter')) return;
  addTodo();
});

list.addEventListener('click', e => {
  e.preventDefault();
  // get the checkbox clicked
  const check = e.target.closest('.item__checkmark');
  if (!check) return;
  console.log(check);
  const checkbox = check.previousElementSibling;
  console.log(checkbox.checked);
  // change the checked state depending on if its checked or not
  if (!checkbox.checked) checkbox.checked = true;
  else if (checkbox.checked) checkbox.checked = false;
  console.log(checkbox.checked);

  // get the item that the checkbox is in
  const item = check.closest('.todo__item');
  item.classList.toggle('item--checked');
});
