/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-corporate block
 *
 * Source: https://www.astrazeneca.com/
 * Base Block: hero
 *
 * Block Structure:
 * - Row 1: Background image
 * - Row 2: Heading + subtitle + CTA
 *
 * Source HTML: section.rich-header.rich-header--hero
 * Generated: 2026-03-02
 */

export default function parse(element, { document }) {
  // Extract background image from .rich-header__asset-wrapper or .responsive-image
  const bgImage = element.querySelector('.rich-header__asset-wrapper .responsive-image img')
    || element.querySelector('.responsive-image img')
    || element.querySelector('img');

  // Extract heading from .rich-header__title
  const heading = element.querySelector('.rich-header__title')
    || element.querySelector('h1')
    || element.querySelector('h2');

  // Extract subtitle/strapline from .rich-header__strapline
  const strapline = element.querySelector('.rich-header__strapline')
    || element.querySelector('[class*="strapline"]');

  // Extract CTA buttons from .rich-header__cta
  const ctaLinks = element.querySelectorAll('.rich-header__cta a, .rich-header__cta-wrapper a');

  // Build content cell
  const contentCell = document.createElement('div');

  if (heading) {
    const h1 = document.createElement('h1');
    h1.textContent = heading.textContent.trim();
    contentCell.appendChild(h1);
  }

  if (strapline) {
    const p = document.createElement('p');
    p.textContent = strapline.textContent.trim();
    contentCell.appendChild(p);
  }

  ctaLinks.forEach((link) => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent.trim();
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    strong.appendChild(a);
    p.appendChild(strong);
    contentCell.appendChild(p);
  });

  // Build cells: row 1 = image, row 2 = content
  const cells = [];

  if (bgImage) {
    const img = document.createElement('img');
    img.src = bgImage.src;
    img.alt = bgImage.alt || '';
    cells.push([img]);
  }

  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Corporate', cells });
  element.replaceWith(block);
}
