export let state = {
  items: [],
  itemsNotCompleted: [],
  itemsCompleted: [],
  themes: ['theme--dark', 'theme--light'],
  activeTheme: 0,
  itemsLeft: 5,
};

export const switchTheme = function () {
  // change the active theme
  const activeTheme = state.activeTheme === 0 ? 1 : 0;
  state.activeTheme = activeTheme;
  // return the active theme className
  return state.themes[activeTheme];
};

export const addTodoItem = function (desc) {
  const date = Date.now().toString().slice(-6);
  const item = {
    id: +date,
    desc: desc,
    completed: false,
  };

  state.items.unshift(item);
};

export const toggleCheck = function (id, completed) {
  if (completed === 'false' || completed === false) {
    const item = state.items.find(item => item.id === id);
    item.completed = true;
    return true;
  } else if (completed === 'true' || completed === true) {
    const item = state.items.find(item => item.id === id);
    item.completed = false;
    return false;
  }
};

export const removeItem = function (id) {
  // remove the item with that id from state
  const itemIndex = state.items.findIndex(i => i.id === id);

  if (itemIndex < 0) return;
  state.items.splice(itemIndex, 1);
};

export const itemsLeftCount = function () {
  // go through the state and find how many items are not completed
  const itemsLeft = state.items.filter(item => {
    return !item.completed;
  });

  // return that number
  state.itemsLeft = itemsLeft.length;
};

export const activeFilter = function () {
  const itemsLeft = state.items.filter(item => {
    return !item.completed;
  });

  state.itemsNotCompleted = itemsLeft;
};

export const completedFilter = function () {
  const itemsDone = state.items.filter(item => {
    return item.completed;
  });

  state.itemsCompleted = itemsDone;
};

export const clearCompleted = function () {
  // get state, check for the items that are completed
  // get list of the items that are not completed
  // meaning without the completed
  const clear = state.items.filter(item => {
    return !item.completed;
  });
  // make the state only havethe incompleted items(don't have completed ones)
  state.items = clear;
};

export const setLocalStorage = function () {
  localStorage.setItem('state', JSON.stringify(state));
};

export const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem('state'));
  if (!data) return false;
  state = data;
  return true;
};
