/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-news block
 *
 * Source: https://www.astrazeneca.com/
 * Base Block: cards
 *
 * Block Structure:
 * - Row N: Image | Title + category link
 *
 * Source HTML: section.homepage-hero.homepage-hero--v3
 * Generated: 2026-03-02
 */

export default function parse(element, { document }) {
  const cells = [];

  // Extract trending/feature story (.homepage-hero__feature-story)
  const featureStory = element.querySelector('.homepage-hero__feature-story')
    || element.querySelector('article:first-of-type');

  if (featureStory) {
    const featureImg = featureStory.querySelector('.homepage-hero__feature-img img')
      || featureStory.querySelector('img');
    const featureTitle = featureStory.querySelector('.media-text-link__header a')
      || featureStory.querySelector('p a');
    const featureCategory = featureStory.querySelector('.homepage-hero__feature-link--mulberry')
      || featureStory.querySelector('[class*="feature-link"]');

    const imgCell = document.createElement('div');
    if (featureImg) {
      const img = document.createElement('img');
      img.src = featureImg.src;
      img.alt = featureImg.alt || featureTitle?.textContent?.trim() || '';
      imgCell.appendChild(img);
    }

    const textCell = document.createElement('div');
    if (featureTitle) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      const a = document.createElement('a');
      a.href = featureTitle.href;
      a.textContent = featureTitle.textContent.trim();
      strong.appendChild(a);
      p.appendChild(strong);
      textCell.appendChild(p);
    }
    if (featureCategory) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = featureCategory.href;
      a.textContent = featureCategory.textContent.trim();
      p.appendChild(a);
      textCell.appendChild(p);
    }

    cells.push([imgCell, textCell]);
  }

  // Extract trending stories (.homepage-hero__trending-story)
  const trendingStories = element.querySelectorAll('.homepage-hero__trending-story')
    || element.querySelectorAll('article');

  trendingStories.forEach((story) => {
    const storyImg = story.querySelector('.homepage-hero__trending-img img')
      || story.querySelector('img');
    const storyTitle = story.querySelector('.media-text-link__header a')
      || story.querySelector('.treding-story-content a');
    const storyCategory = story.querySelector('.homepage-hero__trending-link--mulberry')
      || story.querySelector('[class*="trending-link"]');

    const imgCell = document.createElement('div');
    if (storyImg) {
      const img = document.createElement('img');
      img.src = storyImg.src;
      img.alt = storyImg.alt || storyTitle?.textContent?.trim() || '';
      imgCell.appendChild(img);
    }

    const textCell = document.createElement('div');
    if (storyTitle) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      const a = document.createElement('a');
      a.href = storyTitle.href;
      a.textContent = storyTitle.textContent.trim();
      strong.appendChild(a);
      p.appendChild(strong);
      textCell.appendChild(p);
    }
    if (storyCategory) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = storyCategory.href;
      a.textContent = storyCategory.textContent.trim();
      p.appendChild(a);
      textCell.appendChild(p);
    }

    cells.push([imgCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-News', cells });
  element.replaceWith(block);
}
