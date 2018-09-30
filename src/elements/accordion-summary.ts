import DeltaElement from '../delta/element';
import {tagName} from '../delta/utils';

class AccordionSummary extends DeltaElement {
    /**
     * @return {string}
     */
    public getSlot() {
        return 'summary';
    }

    /**
     * @return {string}
     */
    public getTemplate() {
        return `
      <style>
        .accordion-summary {
          font-size: var(--summary-font-size);
          line-height: var(--summary-line-height);
          padding: var(--summary-padding);
          background-color:  var(--COLOR-PRIMARY);
          transition: all .3s ease;
          cursor: pointer;
        }
      </style>
      <div class="accordion-summary">
        <slot></slot>
      </div>
    `;
    }

    /**
     * @return {undefined}
     */
    public render() {
        super.render();

        this.addEventListener('click', (e) => {
            const event = new CustomEvent('delta-internal.accordion-selected', {
                bubbles: true,
                cancelable: true,
            });

            this.dispatchEvent(event);
        });
    }
}
window.customElements.define(tagName('accordion-summary'), AccordionSummary);
