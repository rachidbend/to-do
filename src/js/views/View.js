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
    });
  }
}

export default new View();
