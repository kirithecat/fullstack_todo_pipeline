class warningBanner extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div id="banner">
        <p>Warning: Your todo list is getting long!</p>
      </div>
    `;
  }
}

customElements.define('warning-banner', warningBanner);
