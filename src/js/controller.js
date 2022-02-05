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
controlTheme();

const controlAddItem = function () {
  // get handler for when enter is pressed
  // get the item description
  // call model and give it description
  // model should create a new item\
  // give the all of the items to the View to be rendered
  const addItem = function (desc) {
    console.log(desc);
    model.addTodoItem(desc);
    console.log(state.items);
  };
  View.addItemHandler(addItem);
};
controlAddItem();
