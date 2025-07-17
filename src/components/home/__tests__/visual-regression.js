/**
 * Visual Regression Testing Script
 * 
 * This script is used to perform visual regression testing on the homepage components
 * to ensure that content updates don't break the layout.
 * 
 * Usage:
 * 1. Run this script before making content changes to create baseline snapshots
 * 2. Make content changes
 * 3. Run this script again to compare with baseline snapshots
 * 
 * Requirements:
 * - Jest
 * - jest-image-snapshot
 * - Puppeteer
 */

import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

describe('Visual Regression Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Hero Section visual regression', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.hero-section');
    
    // Take screenshot of hero section
    const heroSection = await page.$('.hero-section');
    const image = await heroSection.screenshot();
    
    // Compare with baseline
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: '__snapshots__/visual-regression',
      customDiffDir: '__snapshots__/visual-regression/diff',
    });
  });

  test('Trust Signals visual regression', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.container-custom');
    
    // Take screenshot of trust signals section (second container)
    const containers = await page.$$('.container-custom');
    const trustSignalsContainer = containers[1];
    const image = await trustSignalsContainer.screenshot();
    
    // Compare with baseline
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: '__snapshots__/visual-regression',
      customDiffDir: '__snapshots__/visual-regression/diff',
    });
  });

  test('Why Choose Us visual regression', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#why-choose-us-section');
    
    // Take screenshot of Why Choose Us section
    const whyChooseUsSection = await page.$('#why-choose-us-section');
    const image = await whyChooseUsSection.screenshot();
    
    // Compare with baseline
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: '__snapshots__/visual-regression',
      customDiffDir: '__snapshots__/visual-regression/diff',
    });
  });

  test('Responsive Hero Section - Mobile', async () => {
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.hero-section');
    
    // Take screenshot of hero section on mobile
    const heroSection = await page.$('.hero-section');
    const image = await heroSection.screenshot();
    
    // Compare with baseline
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: '__snapshots__/visual-regression/mobile',
      customDiffDir: '__snapshots__/visual-regression/mobile/diff',
    });
  });

  test('Responsive Trust Signals - Mobile', async () => {
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.container-custom');
    
    // Take screenshot of trust signals section on mobile
    const containers = await page.$$('.container-custom');
    const trustSignalsContainer = containers[1];
    const image = await trustSignalsContainer.screenshot();
    
    // Compare with baseline
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: '__snapshots__/visual-regression/mobile',
      customDiffDir: '__snapshots__/visual-regression/mobile/diff',
    });
  });

  test('Responsive Why Choose Us - Mobile', async () => {
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#why-choose-us-section');
    
    // Take screenshot of Why Choose Us section on mobile
    const whyChooseUsSection = await page.$('#why-choose-us-section');
    const image = await whyChooseUsSection.screenshot();
    
    // Compare with baseline
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: '__snapshots__/visual-regression/mobile',
      customDiffDir: '__snapshots__/visual-regression/mobile/diff',
    });
  });
});

/**
 * Instructions for running visual regression tests:
 * 
 * 1. Install required dependencies:
 *    npm install --save-dev jest-image-snapshot puppeteer
 * 
 * 2. Create baseline snapshots:
 *    npm run test:visual -- -u
 * 
 * 3. Run comparison tests after making changes:
 *    npm run test:visual
 * 
 * 4. Check the diff directory for visual differences
 */