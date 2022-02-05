export const state = {
  items: [],
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
  console.log(completed);
  if (completed === 'false') {
    const item = state.items.find(item => item.id === id);
    item.completed = true;
    console.log(item);
  }
  if (completed === 'true') {
    const item = state.items.find(item => item.id === id);
    item.completed = false;
    console.log(item);
  }
};
