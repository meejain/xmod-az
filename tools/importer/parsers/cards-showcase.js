/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-showcase block
 *
 * Source: https://www.astrazeneca.com/
 * Base Block: cards
 *
 * Block Structure:
 * - Row N: Image | Title/description + CTA link
 *
 * Source HTML: section.homepage-content-set.homepage-content-set--layout-four
 * Generated: 2026-03-02
 */

export default function parse(element, { document }) {
  const cells = [];

  // Process content items from .single-content-item articles
  const contentItems = element.querySelectorAll('article.single-content-item');

  contentItems.forEach((item) => {
    const img = item.querySelector('.single-content-item__img img')
      || item.querySelector('img');
    const titleLink = item.querySelector('.single-content-item__title a')
      || item.querySelector('.single-content-item__title--tracking');
    const ctaLink = item.querySelector('.single-content-item__cta')
      || item.querySelector('.single-content-item__cta--tracking');

    const imgCell = document.createElement('div');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || ctaLink?.textContent?.trim() || '';
      imgCell.appendChild(imgEl);
    }

    const textCell = document.createElement('div');

    // Some items have overlay titles
    if (titleLink) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = titleLink.textContent.trim();
      p.appendChild(strong);
      textCell.appendChild(p);
    }

    if (ctaLink) {
      const a = document.createElement('a');
      a.href = ctaLink.href;
      a.textContent = ctaLink.textContent.trim();
      const p = document.createElement('p');
      if (!titleLink) {
        // If no separate title, make the CTA the strong title
        const strong = document.createElement('strong');
        strong.appendChild(a);
        p.appendChild(strong);
      } else {
        p.appendChild(a);
      }
      textCell.appendChild(p);
    }

    cells.push([imgCell, textCell]);
  });

  // Process stat blocks (.text-action-block--stats)
  const statBlocks = element.querySelectorAll('.text-action-block--stats');

  statBlocks.forEach((stat) => {
    const titleTop = stat.querySelector('.text-action-block__title--top');
    const number = stat.querySelector('.text-action-block__number span')
      || stat.querySelector('.text-action-block__number');
    const titleBottom = stat.querySelector('.text-action-block__title--bottom');
    const statCta = stat.querySelector('.text-action-block__cta');

    const imgCell = document.createElement('div');

    const textCell = document.createElement('div');
    const titleText = [
      titleTop?.textContent?.trim(),
      number?.textContent?.trim(),
      titleBottom?.textContent?.trim(),
    ].filter(Boolean).join(' ');

    if (titleText) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = titleText;
      p.appendChild(strong);
      textCell.appendChild(p);
    }

    if (statCta) {
      const a = document.createElement('a');
      a.href = statCta.href;
      a.textContent = statCta.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(a);
      textCell.appendChild(p);
    }

    cells.push([imgCell, textCell]);
  });

  // Process link image panels (.link-image-panel-v2)
  const linkPanels = element.querySelectorAll('.link-image-panel-v2');

  linkPanels.forEach((panel) => {
    const img = panel.querySelector('.link-image-panel-v2__image')
      || panel.querySelector('img');
    const title = panel.querySelector('.link-image-panel-v2__title-decoration')
      || panel.querySelector('.link-image-panel-v2__title');
    const link = panel.querySelector('.link-image-panel-v2__slider');

    const imgCell = document.createElement('div');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || title?.textContent?.trim() || '';
      imgCell.appendChild(imgEl);
    }

    const textCell = document.createElement('div');
    if (title && link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = title.textContent.trim();
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.appendChild(a);
      p.appendChild(strong);
      textCell.appendChild(p);
    }

    cells.push([imgCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Showcase', cells });
  element.replaceWith(block);
}
