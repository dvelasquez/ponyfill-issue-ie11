// @ts-ignore
import cssVars from 'css-vars-ponyfill';

class TestShadow extends HTMLElement {
    constructor() {
        super();
    }

    public render(): string {
        return `
        ${this.cssStyle}
        ${this.template}`;
    }

    public connectedCallback() {
        this.initShadowDom();
    }

    public initShadowDom() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = this.render();
    }

    get template(): string {
        return `
            <div>
                <h1 class="shadowDomTest"><slot name="content"></slot></h1>
            </div>        
        `;
    }

    get cssStyle(): string {
        return `
            <style>
                .shadowDomTest {
                    color: var(--test-color);
                }            
            </style>        
        `;
    }
}

window.customElements.define('test-shadow', TestShadow);
