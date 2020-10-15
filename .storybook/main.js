const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],

  webpackFinal: (config) => {
    config.resolve.modules.push(path.resolve(__dirname, "../src"));
    config.resolve.modules.push(path.resolve(__dirname, "../__generated__"));
    return config;
  },
};
