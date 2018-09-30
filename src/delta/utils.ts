import {TAG_PREFIX} from '../config';

/**
 * @param {string} tag
 * @return {string}
 */
const tagName = (tag: string) => {
    return `${TAG_PREFIX}-${tag}`;
};

/**
 * @param {HTMLElement} element
 * @return {number}
 */
const childIndex = (element: HTMLElement) => (
    Array.prototype.indexOf.call(element.parentElement.children, element)
);

const camel2Dash = (v: string): string => {

    let ret = '';
    let prevLowercase = false;

    for (const s of v) {

        const isUppercase = s.toUpperCase() === s;
        if (isUppercase && prevLowercase) {
            ret += '-';
        }

        ret += s;
        prevLowercase = !isUppercase;
    }

    return ret.replace(/-+/g, '-').toLowerCase();

};

export {tagName, childIndex, camel2Dash};
