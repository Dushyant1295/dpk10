import Scrollbar, { ScrollbarPlugin } from 'smooth-scrollbar';

class DisableScrollPlugin extends ScrollbarPlugin {
  static pluginName = 'disableScroll';

  static defaultOptions = {
    direction: '',
  };

  transformDelta(delta) {
    if (this.options.direction) {
      delta[this.options.direction] = 0;
    }

    return { ...delta };
  }
}

export default DisableScrollPlugin;




/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                Usage 👉 once()        

        scroll = SmoothScrollbar.init(currentScrollContainer, {
          renderByPixels: true,
          damping: 0.08,
          plugins: {
              disableScroll: {
                  direction: 'x',
              },
          },
        });

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/



