import { state } from './model';
import * as model from './model';

import View from './views/View';

// THEME SWITCHER ----------------
const controlTheme = function () {
  const themeHandler = function () {
    // tell model to change the active theme and then return the theme className
    const theme = model.switchTheme();
    // call the View with the appropriate className to change the theme
    View.switchTheme(theme);
    console.log('theme is switched in controller');
  };

  // handlder to know when to chenge the theme(when user changes theme)
  View.switchThemeHandler(themeHandler);
};

// ADD ITEM ----------------
const controlAddItem = function () {
  const addItem = function (desc) {
    // call model and give it description
    // model should create a new item
    model.addTodoItem(desc);
    console.log(state.items[0]);
    // give the new item to the View to be rendered

    View.render(state.items[0]);
  };
  // get handler for when enter is pressed
  // get the item description
  View.addItemHandler(addItem);
};

// ITEM CHECK ----------------
const controlItemCheck = function () {
  const checkHanler = function (target) {
    // get the item that is checked(target)
    const id = +target.id;
    const checked = target.dataset.completed;
    model.toggleCheck(id, checked);

    // mark that item as checked in the model(state)
    // rerender everything
    View.renderToggle(id);
  };

  // have a handler for when the check button is pressed
  View.addCheckHandler(checkHanler);
};

// REMOVE ITEM ----------------
const controlRemoveItem = function () {
  const removeHandler = function (id) {
    // 2) remove from state
    model.removeItem(id);
    // 3) remove from UI
    View.removeItem(id);
    console.log(state.items);
  };

  // handler
  // 1) get the item to remove
  View.removeItemHandler(removeHandler);
};

const init = function () {
  // theme controller
  controlTheme();
  // adding todo controller
  controlAddItem();
  // item checking if complete
  controlItemCheck();
  // removeitem
  controlRemoveItem();
};
init();
