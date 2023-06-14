module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./clickAndHoverHelper')(page, scenario);
  await page.goto(scenario.url, { waitUntil: 'networkidle0' });
  // add more ready handlers here...
};
