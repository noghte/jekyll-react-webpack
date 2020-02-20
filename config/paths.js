// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end
"use strict"

const path = require("path")
const fs = require("fs")
const url = require("url")

/**
 * WARNING!
 *
 * THIS FILE IS NOT BEING USED BY STATIC-SCRIPTS YET!
 *
 * IT HAS NOT BEEN MODIFIED FOR THIS PACKAGE
 *
 * WARNING!
 */

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const envPublicUrl = process.env.PUBLIC_URL

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith("/")
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1)
  } else if (!hasSlash && needsSlash) {
    return `${path}/`
  } else {
    return path
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson)
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/")
  return ensureSlash(servedUrl, true)
}

// config after eject: we're in ./config/
let paths = {
  gulpConfig: resolveApp("config/gulp.config.js"),
  staticScriptsConfig: resolveApp("static-scripts.config.js"),
  dotenv: resolveApp(".env"),
  appPath: resolveApp("."),
  appBuild: resolveApp("build"),
  appPublic: resolveApp("public"),
  appHtml: resolveApp("public/index.html"),
  appIndexJs: resolveApp("src/index.js"),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("src"),
  testsSetup: resolveApp("src/setupTests.js"),
  appNodeModules: resolveApp("node_modules"),
  publicUrl: getPublicUrl(resolveApp("package.json")),
  servedPath: getServedPath(resolveApp("package.json")),
}

// @remove-on-eject-begin
const resolveOwn = relativePath => path.resolve(__dirname, "..", relativePath)

// config before eject: we're in ./node_modules/react-scripts/config/
/*
paths = Object.assign({}, paths, {
  gulpConfig: resolveOwn("config/gulp.config.js"),
  // These properties only exist before ejecting:
  ownPath: resolveOwn("."),
  ownNodeModules: resolveOwn("node_modules"), // This is empty on npm 3
})

// detect if template should be used, ie. when cwd is react-scripts itself
const useTemplate = appDirectory === fs.realpathSync(path.join(__dirname, ".."))

if (useTemplate) {
  paths = {
    dotenv: resolveOwn("template/.env"),
    appPath: resolveApp("."),
    appBuild: resolveOwn("../../build"),
    appPublic: resolveOwn("template/public"),
    appHtml: resolveOwn("template/public/index.html"),
    appIndexJs: resolveOwn("template/src/index.js"),
    appPackageJson: resolveOwn("package.json"),
    appSrc: resolveOwn("template/src"),
    testsSetup: resolveOwn("template/src/setupTests.js"),
    appNodeModules: resolveOwn("node_modules"),
    publicUrl: getPublicUrl(resolveOwn("package.json")),
    servedPath: getServedPath(resolveOwn("package.json")),
    // These properties only exist before ejecting:
    ownPath: resolveOwn("."),
    ownNodeModules: resolveOwn("node_modules"),
  }
}*/

// @remove-on-eject-end

module.exports = paths

module.exports.srcPaths = [module.exports.appSrc]

module.exports.useYarn = fs.existsSync(
  path.join(module.exports.appPath, "yarn.lock")
)
