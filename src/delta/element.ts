// @ts-ignore
import cssVars from 'css-vars-ponyfill';

export default class DeltaElement extends HTMLElement {
    public _watchedAttributes: any;
    public _watchedSlots: any;

    constructor() {
        super();

        this._watchedAttributes = {};
        this._watchedSlots = {};

        this.attachShadow({mode: 'open'});
    }

    /**
     * @return {undefined}
     */
    public connectedCallback() {
        const template: HTMLTemplateElement = document.createElement('template');
        template.innerHTML = this.getTemplate();
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const slot = this.getSlot();
        if (slot) {
            this.setAttribute('slot', slot);
        }

        this.render();

        Object.keys(this._watchedAttributes).forEach((key) => {
            this._watchedAttributes[key].apply(this, [undefined, this.getAttribute(key)]);
        });
        cssVars({
            onError(message: any, node: any, xhr: any, url: any) {
                console.log(message); // 1
                console.log(node); // 2
                console.log(xhr.status); // 3
                console.log(xhr.statusText); // 4
                console.log(url); // 5
            }, shadowDOM: true,
        });
    }

    /**
     * @param {string} name
     * @param {string} previous
     * @param {string} current
     */
    public attributeChangedCallback(name: string, previous: string, current: string) {
        if (!this._watchedAttributes[name]) {
            return;
        }

        this._watchedAttributes[name].apply(this, [previous, current]);
    }

    /**
     * @param {string} name
     * @param {Function} fn
     */
    public watchAttribute(name: string, fn: any) {
        this._watchedAttributes[name] = fn;
    }

    /**
     * @param {string} slot
     * @return {Boolean}
     */
    public isSlotLoaded(slot: string): boolean {
        return this._watchedSlots[slot] === true;
    }

    /**
     * @param {string} slot
     * @param {Function} fn
     */
    public watchSlot(slot: string, fn: any): void {
        const slotRef = this.shadowRoot.querySelector(`slot[name=${slot}]`);
        if (!slotRef) {
            console.log(`Slot not found: "${slot}"`);
        }

        slotRef.addEventListener('slotchange', (e) => {
            fn.call(this, e);
            this._watchedSlots[slot] = true;
        });
    }

    /**
     * @return {string}
     */
    public getTemplate(): string {
        throw new Error(`Please implement method "getTemplate()" in class "${this.getClassName()}"`);
    }

    /**
     * @return {string}
     */
    public getSlot(): string {
        return '';
    }

    /**
     * @return {undefined}
     */
    public render() {
        return;
    }

    /**
     * @return {string}
     */
    public getClassName() {
        return this.constructor;
    }
}
