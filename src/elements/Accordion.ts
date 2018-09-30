// @ts-ignore
import {find} from 'lodash/fp';
import DeltaElement from '../delta/element';
import {childIndex, tagName} from '../delta/utils';

class Accordion extends DeltaElement {
    /**
     * @return {undefined}
     */
    public render(): void {
        super.render();

        this.addEventListener('delta-internal.accordion-selected', (event) => {
            const clickedItem = (event.target as HTMLElement).parentElement;

            event.stopPropagation();

            let previousPanel = -1;
            let currentPanel = childIndex(clickedItem);

            if (clickedItem.hasAttribute('active')) {
                clickedItem.removeAttribute('active');
                previousPanel = currentPanel;
                currentPanel = -1;
            } else {
                const prev = find((e: HTMLElement) => {
                    return e.hasAttribute('active');
                })([...this.querySelectorAll(`${tagName('accordion-item')}[active=true]`)]);
                if (prev) {
                    prev.removeAttribute('active');
                    previousPanel = childIndex(prev);
                }

                clickedItem.setAttribute('active', 'true');
            }

            const customEvent = new CustomEvent('change', {
                detail: {previousPanel, currentPanel},
            });

            this.dispatchEvent(customEvent);
        });
    }

    /**
     * @return {string}
     */
    public getTemplate(): string {
        return `      <style>
        .accordion {
          --accordion-padding: var(--GRID-BASE);
          --accordion-border: var(--BORDER-SMALL, 1px) solid var(--BORDER-COLOR);

          --item-border: var(--BORDER-SMALL, 1px) solid var(--BORDER-COLOR);

          --summary-padding: var(--GRID-BASE);
          --summary-font-size: var(--TYPOGRAPHY-BASE-SIZE);
          --summary-line-height: var(--TYPOGRAPHY-BASE-LINE);
          --summary-background-color: var(--COLOR-PRIMARY);

          --details-padding: var(--GRID-BASE, 1em);
          --details-font-size: var(--TYPOGRAPHY-BASE-SIZE);
          --details-line-height: var(--TYPOGRAPHY-BASE-LINE);
          --details-background-color: var(--COLOR-PRIMARY);
          --details-border_top: var(--BORDER-SMALL, 1px) solid var(--BORDER-COLOR);

          --margin-among-items: var(--GRID-BASE, 1em);
        }
        .accordion-list {
          padding: var(--accordion-padding);
          border: var(--accordion-border);
          background-color: var(--COLOR-BACKGROUND);

          /* reset */
          list-style-type: none;
          margin: 0;

          /* layout */
          display: flex;
          flex-direction: column;
        }
      </style>
      <div class="accordion">
        <ul class="accordion-list">
          <slot name="item"></slot>
        </ul>
      </div>
    `;
    }
}

window.customElements.define(tagName('accordion'), Accordion);
