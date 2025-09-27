import { ScrollbarPlugin } from 'smooth-scrollbar';

class AnchorPlugin extends ScrollbarPlugin {
  static pluginName = 'anchor';

  onHashChange = () => {
    this.jumpToHash(window.location.hash);
  };

  onClick = (event) => {
    const { target } = event;

    if (target.tagName !== 'A') {
      return;
    }

    const hash = target.getAttribute('href');

    if (!hash || hash.charAt(0) !== '#') {
      return;
    }

    this.jumpToHash(hash);
  };

  jumpToHash = (hash) => {
    const { scrollbar } = this;

    if (!hash) {
      return;
    }    

    // reset scrollTop
    scrollbar.containerEl.scrollTop = 0;

    scrollbar.scrollIntoView(document.querySelector(hash));
  };

  onInit() {
    this.jumpToHash(window.location.hash);

    window.addEventListener('hashchange', this.onHashChange);

    this.scrollbar.contentEl.addEventListener('click', this.onClick);
  }

  onDestory() {
    window.removeEventListener('hashchange', this.onHashChange);

    this.scrollbar.contentEl.removeEventListener('click', this.onClick);
  }
}

export default AnchorPlugin;
