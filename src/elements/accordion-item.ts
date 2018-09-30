import DeltaElement from '../delta/element';
import {tagName} from '../delta/utils';

class AccordionItem extends DeltaElement {
    /**
     * @type {Array}
     */
    static get observedAttributes() {
        return ['active'];
    }

    /**
     * @return {undefined}
     */
    public render() {
        super.render();

        this.watchAttribute('active', (previous: string, current: any) => {
            current = !!current;
            const item = this.shadowRoot.querySelector('li.accordion-item');

            if (!current) {
                item.classList.remove('expanded');
            } else {
                item.classList.add('expanded');
            }

            const details = this.querySelector(tagName('accordion-details'));

            if (details) {
                if (!current) {
                    details.removeAttribute('active');
                } else {
                    details.setAttribute('active', 'true');
                }
            }
        });

        this.watchSlot('details', (e: any) => {
            const current = !!this.getAttribute('active');
            const details = this.querySelector(tagName('accordion-details'));
            if (!current) {
                details.removeAttribute('active');
            } else {
                details.setAttribute('active', 'true');
            }
        });
    }

    /**
     * @return {string}
     */
    public getSlot() {
        return 'item';
    }

    /**
     * @return {string}
     */
    public getTemplate() {
        return `
      <style>
        .accordion-item {
          border: var(--item-border);
          margin-bottom: var(--margin-among-items);
          transition: all .3s ease;
          list-style-type: none;
        }
        .accordion-item:last-of-type {
          margin-bottom: 0;
        }
        .expanded {
          --BORDER-COLOR: var(--COLOR-ACCENT);
          border-color: var(--BORDER-COLOR);
        }
      </style>
      <li class="accordion-item">
        <slot name="summary"></slot>
        <slot name="details"></slot>
      </li>
    `;
    }
}

window.customElements.define(tagName('accordion-item'), AccordionItem);
