const puppeteer = require('puppeteer');
const { ok } = require('assert');
const Synthetics = require('./Synthetics');
const SyntheticsConfiguration = require('./SyntheticsConfiguration');

module.exports = new Synthetics(puppeteer, new SyntheticsConfiguration());

