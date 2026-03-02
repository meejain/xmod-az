/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-statement block
 *
 * Source: https://www.astrazeneca.com/
 * Base Block: columns
 *
 * Block Structure:
 * - Row 1: Left column (heading + CTA) | Right column (image/video)
 *
 * Source HTML: .parsys_column.l-two-block--padded
 * Generated: 2026-03-02
 */

export default function parse(element, { document }) {
  // Extract left column content (.l-two-block--padded-c0)
  const leftCol = element.querySelector('.l-two-block--padded-c0')
    || element.querySelector(':scope > div:first-child');

  // Extract right column content (.l-two-block--padded-c1)
  const rightCol = element.querySelector('.l-two-block--padded-c1')
    || element.querySelector(':scope > div:last-child');

  // Build left cell
  const leftCell = document.createElement('div');

  if (leftCol) {
    // Extract heading from .rich-text h2
    const heading = leftCol.querySelector('.rich-text h2')
      || leftCol.querySelector('h2')
      || leftCol.querySelector('h1');

    if (heading) {
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent.trim();
      leftCell.appendChild(h2);
    }

    // Extract CTA button from .callToAction
    const ctaLink = leftCol.querySelector('.callToAction a')
      || leftCol.querySelector('a.button');

    if (ctaLink) {
      const a = document.createElement('a');
      a.href = ctaLink.href;
      a.textContent = ctaLink.textContent.trim();
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.appendChild(a);
      p.appendChild(strong);
      leftCell.appendChild(p);
    }
  }

  // Build right cell
  const rightCell = document.createElement('div');

  if (rightCol) {
    const img = rightCol.querySelector('.responsive-image img')
      || rightCol.querySelector('img');

    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      rightCell.appendChild(imgEl);
    }
  }

  const cells = [
    [leftCell, rightCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Statement', cells });
  element.replaceWith(block);
}
