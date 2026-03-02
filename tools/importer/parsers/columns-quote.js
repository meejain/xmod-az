/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-quote block
 *
 * Source: https://www.astrazeneca.com/
 * Base Block: columns
 *
 * Block Structure:
 * - Row 1: Image | Quote text + attribution + CTA
 *
 * Source HTML: section.image-panel-feature
 * Generated: 2026-03-02
 */

export default function parse(element, { document }) {
  // Extract background/portrait image
  const bgImage = element.querySelector('.image-panel-feature__content-wrapper img')
    || element.querySelector('.js-responsive-bg img')
    || element.querySelector('img');

  // Extract quote text
  const quoteText = element.querySelector('.image-panel-feature__quote p')
    || element.querySelector('blockquote p');

  // Extract attribution
  const attribution = element.querySelector('.image-panel-feature__quote-cite')
    || element.querySelector('cite');

  // Extract CTA link
  const ctaLink = element.querySelector('.image-panel-feature__links a')
    || element.querySelector('.image-panel-feature__link--tracking')
    || element.querySelector('a.button');

  // Build left cell (image)
  const leftCell = document.createElement('div');
  if (bgImage) {
    const img = document.createElement('img');
    img.src = bgImage.src;
    img.alt = bgImage.alt || attribution?.textContent?.trim() || '';
    leftCell.appendChild(img);
  }

  // Build right cell (quote + attribution + CTA)
  const rightCell = document.createElement('div');

  if (quoteText) {
    const p = document.createElement('p');
    p.textContent = quoteText.textContent.trim();
    rightCell.appendChild(p);
  }

  if (attribution) {
    const p = document.createElement('p');
    const em = document.createElement('em');
    em.textContent = attribution.textContent.trim();
    p.appendChild(em);
    rightCell.appendChild(p);
  }

  if (ctaLink) {
    const a = document.createElement('a');
    a.href = ctaLink.href;
    a.textContent = ctaLink.textContent.trim();
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    strong.appendChild(a);
    p.appendChild(strong);
    rightCell.appendChild(p);
  }

  const cells = [
    [leftCell, rightCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Quote', cells });
  element.replaceWith(block);
}
