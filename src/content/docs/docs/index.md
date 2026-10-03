---
title: Overview
description: What Docudis does, what it is made of, and where the source code lives.
---

Docudis replaces personal details in a document with numbered labels such as `[PERSON_1]` or `[IBAN_1]`, on your own device, so you can give the text to an AI service. When the AI replies, Docudis puts the original values back.

## How it works

1. **Open a document.** Paste text, open a PDF, Word or text file, or take a photo of a paper document.
2. **Docudis finds personal details.** Rules, word lists and an on-device name-recognition model look for names, emails, phone numbers, ID numbers, IBANs, addresses and more.
3. **You review the result.** Every detection is shown. You can add or remove items before anything leaves the app.
4. **Send the protected copy.** Copy the text, share a protected file, or send it straight to an AI app.
5. **Restore the reply.** Paste the AI's answer and Docudis swaps the labels back for the real values. The label list never leaves your device.

## What it can't do

- **It can miss things.** No automatic detection finds every personal detail. Read the protected copy before you send it.
- **It hides identifiers, not meaning.** A diagnosis, a job title or a story can still point to a person.
- **Dates and amounts stay visible by default.** They are detected but only hidden if you choose to hide them.
- **Restoring needs the labels.** It tolerates small formatting changes, but a label the AI rewrites beyond recognition is not restored.

## What Docudis is made of

Everything is open source.

| Part | What it does | License |
|---|---|---|
| [docudis-android](https://github.com/stonetech-pxia/docudis-android) | The Android app | AGPL-3.0 |
| [docudis-desktop](https://github.com/stonetech-pxia/docudis-desktop) | The Windows and macOS app | AGPL-3.0 |
| [docudis-core](https://github.com/stonetech-pxia/docudis-core) | Rules, word lists, merging, replacement and restoration, with a C interface | Apache-2.0 |
| [docudis-ner](https://github.com/stonetech-pxia/docudis-ner) | Running name-recognition models | Apache-2.0 |
| [docudis-ner-xlmr](https://huggingface.co/leonx1995/docudis-ner-xlmr) | The name-recognition model the apps ship | AFL-3.0 |

Dependencies point one way: docudis-ner depends on Core, and the apps depend on both.

## Next steps

- [How your data is handled](privacy/) lists what stays on your phone and what goes online.
- [Docudis Core](core/) explains how to use the detection engine in your own software.
