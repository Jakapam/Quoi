This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Table of Contents

- [Overview](#overview)
- [Usage] (#usage)

## Overview

Quoi is a multilingual chat application that allows users to communicate across language barriers! It leverages the power of Google's Machine translation technology and Socket.io's websocket event-driven management system in order to provide a seamless way to bring people together. 

There is also a feature that makes use of browser's built-in speech recognition API. Currently, this feature is not supported by all browsers, but as support grows-- we hope that the ubiquity of this feature will bring even more people together!

## Usage

1. Fork and clone this repository.
2. Run npm install to load any dependencies
2. Set up an Google Cloud Platform account (https://cloud.google.com/deployment-manager/docs/step-by-step-guide/installation-and-setup) and generate key for use with this app. The application is expecting an environment variable called:
```
GOOGLE_APPLICATION_CREDENTIALS
```
Which is a set of keys you can procure from the Google Cloud Platform.
3. The application loads the static page on HTTPS by default. This is to allow the use of the mobile device's microphone while on Google Chrome for the speech-to-text feature. This can be modified in the app.js file and in the bin/www file.

This application is an open source project under the MIT license.
