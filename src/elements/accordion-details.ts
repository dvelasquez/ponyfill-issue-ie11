import DeltaElement from '../delta/element';
import {tagName} from '../delta/utils';

class AccordionDetails extends DeltaElement {
    /**
     * @type {Array}
     */
    static get observedAttributes() {
        return ['active'];
    }

    public render() {
        this.watchAttribute('active', (previous: string, current: boolean) => {
            current = !!current;

            const details = this.shadowRoot.querySelector('.accordion-details');

            if (!current) {
                details.classList.add('hidden');
            } else {
                details.classList.remove('hidden');
            }
        });
    }

    /**
     * @return {string}
     */
    public getSlot(): string {
        return 'details';
    }

    /**
     * @return {string}
     */
    public getTemplate(): string {
        return `
      <style>
        .accordion-details {
          font-size: var(--details-font-size);
          line-height: var(--details-line-height);
          padding: var(--details-padding);
          border-top: var(--details-border);
          background-color:  var(--COLOR-SECONDARY);
          transition: all .3s ease;
        }
        .hidden {
          display: none;
        }
      </style>
      <div class="accordion-details">
        <slot></slot>
      </div>
    `;
    }
}

window.customElements.define(tagName('accordion-details'), AccordionDetails);
