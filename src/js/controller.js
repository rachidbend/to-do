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
    // give the new item to the View to be rendered

    View.render(state.items[0]);

    // render how many items are left
    controlItemsLeftCount();

    // === PERSIST CHANGES ===
    controlSetLocalStorage();
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
    const isChecked = model.toggleCheck(id, checked);

    // mark that item as checked in the model(state)
    // rerender everything
    View.renderToggle(id, isChecked);

    // render how many items are left
    controlItemsLeftCount();

    // === PERSIST CHANGES ===
    controlSetLocalStorage();
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

    // render how many items are left
    controlItemsLeftCount();

    // === PERSIST CHANGES ===
    controlSetLocalStorage();
  };

  // handler
  // 1) get the item to remove
  View.removeItemHandler(removeHandler);
};

// ITEMS LEFT COUNT ----------------
// this should be done every time an item is added, checked or removed
const controlItemsLeftCount = function () {
  // 1) ask model how many items are not done, aka left
  model.itemsLeftCount();
  // 2) render to the UI the number
  View.itemsLeftCount(state.itemsLeft);
};

// SHOW ALL ITEMS ----------------
const controlAllItems = function () {
  // handler
  const allHandler = function () {
    // render All in the UI
    View.renderAll(state.items);

    // === PERSIST CHANGES ===
    controlSetLocalStorage();
  };

  View.showAllHandler(allHandler);
};

// FILTER ACTIVE ITEMS ----------------
const controlActiveFilter = function () {
  // handler
  const activeHandler = function () {
    // get in the state the active items(not completed)
    model.activeFilter();
    // render them in the UI
    View.renderAll(state.itemsNotCompleted);

    // === PERSIST CHANGES ===
    controlSetLocalStorage();
  };
  View.activeFilterHandler(activeHandler);
};

// FILTER COMPLETED ITEMS ----------------
const controlCompletedFilter = function () {
  // handler
  const completedHandler = function () {
    // get in the state the completed items(not completed)
    model.completedFilter();
    // render them in the UI
    View.renderAll(state.itemsCompleted);

    // === PERSIST CHANGES ===
    controlSetLocalStorage();
  };
  View.completedFilterHandler(completedHandler);
};

// CLEAR COMPLETED ITEMS ----------------
const controlClearCompleted = function () {
  // handler
  const clearCompleted = function () {
    // remove completed items from state (model)
    model.clearCompleted();
    // rerender everything
    View.renderAll(state.items);

    // === PERSIST CHANGES ===
    controlSetLocalStorage();
  };
  View.ClearCompletedHandler(clearCompleted);
};

// persist state in the local storage
const controlSetLocalStorage = function () {
  // tell model set local storage
  model.setLocalStorage();
};

const controlGetLocalStorage = function () {
  const getLoclaStorage = function () {
    const got = model.getLocalStorage();

    if (got) {
      // set theme
      View.renderAll(state.items);
      // render all items
      // leave for later
    }
  };
  View.getLoclaStorageHandler(getLoclaStorage);
};

const init = function () {
  // get the state from local storage
  controlGetLocalStorage();

  // theme controller
  controlTheme();
  // adding todo controller
  controlAddItem();
  // item checking if complete
  controlItemCheck();
  // removeitem
  controlRemoveItem();
  // items left count
  controlItemsLeftCount();
  // filter active items
  controlActiveFilter();
  // filter completed items
  controlCompletedFilter();
  // Show All items
  controlAllItems();
  // Clear completed items
  controlClearCompleted();
};
init();
