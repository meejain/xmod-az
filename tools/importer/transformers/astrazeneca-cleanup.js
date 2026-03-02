/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for AstraZeneca site-wide page cleanup
 * Purpose: Remove non-content elements common across all AstraZeneca pages
 * Applies to: All pages from www.astrazeneca.com
 * Generated: 2026-03-02
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent banner
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#onetrust-banner-sdk',
      '.optanon-alert-box-wrapper',
    ]);

    // Remove navigation header (handled by dedicated nav skill)
    WebImporter.DOMUtils.remove(element, [
      '.navigation',
      '.header-component',
      '#header',
    ]);

    // Remove footer (handled separately)
    WebImporter.DOMUtils.remove(element, [
      '.footer-component',
      'footer.footer',
      '#footer',
    ]);

    // Remove chat widgets and tracking elements
    WebImporter.DOMUtils.remove(element, [
      '.chat-widget',
      '[data-tracking]',
      '.js-data-layer',
    ]);

    // Remove spacer elements used for layout in original site
    WebImporter.DOMUtils.remove(element, [
      'hr.spacer--med',
      'hr.spacer--lrg',
      'hr.spacer--sml',
      'hr.hr--mulberry',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove remaining non-content elements
    WebImporter.DOMUtils.remove(element, [
      'iframe',
      'link',
      'noscript',
    ]);

    // Clean up empty wrapper divs
    element.querySelectorAll('.parsys, .wrapperPar, .contentWrapper').forEach((wrapper) => {
      if (wrapper.children.length === 0) {
        wrapper.remove();
      }
    });
  }
}
