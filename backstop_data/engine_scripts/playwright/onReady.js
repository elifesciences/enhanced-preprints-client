module.exports = async (page, scenario, viewport, isReference, browserContext) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./clickAndHoverHelper')(page, scenario);

  const elementAfterBody = await page.getByText('Find us on GitHub');
  await elementAfterBody.scrollIntoViewIfNeeded();
  // add more ready handlers here...
  await page.waitForLoadState();
  const logoElement = await page.getByAltText('eLife logo');
  await logoElement.scrollIntoViewIfNeeded();
};
