---
title: How your data is handled
description: What stays on your phone, what goes online, and how to delete your data.
---

This page describes what the Docudis Android app does today. The [privacy policy](../../privacy/) is the legal version of the same information. You can check every point against the [source code](https://github.com/stonetech-pxia/docudis-android). The iPhone app works the same way; see [its privacy policy](../../privacy/ios/). The desktop app for Windows and macOS never connects to the internet and has [its own privacy policy](../../privacy/desktop/).

## Your documents

Text you paste, files you open and photos you take are processed on your phone. Text recognition, language detection and the detection of personal details all run on the device. Docudis has no server that receives your documents.

A document leaves your phone only when you send it yourself: when you copy the protected text, share a file, or send it to another app such as an AI assistant. That app then receives what you sent, and its own privacy policy applies.

## Detection

Three kinds of detection run on the device:

- **Docudis rules and word lists** from [docudis-core](https://github.com/stonetech-pxia/docudis-core): emails, phone numbers, IBANs, card numbers and national ID numbers for 19 countries.
- **A name-recognition model** that ships inside the app.
- **Google ML Kit entity extraction**, provided through Google Play services.

## Network

The Docudis app makes no network requests of its own. Google ML Kit does:

- On first use, Google Play services downloads the entity-extraction model.
- ML Kit sends Google diagnostic and usage information, such as device model, OS version, app package and version, performance metrics, input size, event types, error codes and a per-installation identifier.
- ML Kit does not send the text or images you process.

See Google's [ML Kit data disclosure](https://developers.google.com/ml-kit/android-data-disclosure).

## Storage on your phone

- The app keeps your latest 100 documents in its private storage: the extracted text, the protected copy and the list of detected items. Older ones are deleted automatically.
- Temporary copies of files and photos you picked may stay in the app's cache until you clear them or Android removes them.
- History, word lists and models are excluded from Android cloud backup and device-to-device transfer.
- **Clear data on this device** on the Account tab deletes all of it. Uninstalling the app also deletes it.

## What Docudis does not do

- No account or sign-in.
- No ads and no advertising identifiers.
- No analytics of our own.
- Your content is never sold and never used to train models.

## This website

docudis.com is a static site hosted on GitHub Pages. It sets no cookies and runs no analytics, and it loads nothing from other companies' servers: fonts and search are served by the site itself. GitHub, as the host, receives your IP address with each request; see the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). If you switch between light and dark mode, your browser remembers the choice in its local storage.

## Contact

Docudis is published by Pengda Xia (stonetech), France. Contact: stonetechdigital@gmail.com
