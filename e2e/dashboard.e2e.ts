import { browser, by, protractor, $, element, ProtractorExpectedConditions } from 'protractor';

describe('basic e2e test with loading', function(): void {
  let EC: ProtractorExpectedConditions = protractor.ExpectedConditions;
  describe('home', function(): void {
    browser.get('/');
    it('should load dashboard', function(): void {
      expect(browser.getTitle()).toBe('Stock Market Demo');
      // Waits for the element 'td-loading' to not be present on the dom.
      browser.wait(EC.not(EC.presenceOf($('td-loading'))), 10000)
      .then(() => {

        // checks if elements were rendered
        expect(element(by.id('market-news')).isPresent()).toBe(true);
      });
    });
  });
});