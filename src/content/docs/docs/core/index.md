---
title: Getting started with Docudis Core
description: Build Docudis Core and call it from your own software.
---

Docudis Core is the part of Docudis that decides what is hidden and how it is restored: rule packs, word lists, merging of detections, replacement with labels, and restoration. It is a Rust library with a versioned C interface, licensed under Apache-2.0.

Core runs fully offline and makes no network requests. It has no dependency on OCR, PDF processing, ML Kit, ONNX Runtime or model tokenizers. Model inference lives in [docudis-ner](https://github.com/stonetech-pxia/docudis-ner); Core accepts detections from any number of models and merges them with its own.

## What's in the repository

| Path | Contents |
|---|---|
| `crates/docudis-core` | Rules, lists, dictionaries, merging, offsets, replacement and restoration |
| `crates/docudis-capi` | The `docudis_v1_*` C interface and its header, `docudis.h` |
| `crates/docudis-cli` | The `docudis` [command-line tool](cli/) |
| `bindings/dart` | Dart FFI binding with ABI checks and safe buffer ownership |
| `data` | Rule packs for 19 countries plus universal rules, and bundled word lists |
| `conformance` | Shared test fixtures that every binding runs |

## Build

You need a Rust toolchain.

```sh
git clone https://github.com/stonetech-pxia/docudis-core.git
cd docudis-core
cargo build --release --workspace
```

This produces the C library (`libdocudis_capi.dylib` on macOS, `libdocudis_capi.so` on Linux, `docudis_capi.dll` on Windows) and the `docudis` command-line tool in `target/release/`.

### Android

Install the Android NDK, `cargo-ndk` and the Rust Android targets, then run:

```sh
./scripts/build-android.sh release
```

Libraries for `arm64-v8a`, `armeabi-v7a` and `x86_64` are written to `dist/android/release/jniLibs/<abi>/libdocudis_capi.so`.

## Try it

```sh
./target/release/docudis --regions fr "Email claire.martin@example.fr or call +33 6 12 34 56 78."
```

```text
Email [EMAIL_1] or call [PHONE_1].
```

Add `--json` to get the label list you need to restore the reply later:

```json
{
  "schema_version": 1,
  "text": "Email [EMAIL_1] or call [PHONE_1].",
  "mappings": [
    { "original": "claire.martin@example.fr", "placeholder": "[EMAIL_1]", "type": "EMAIL" },
    { "original": "+33 6 12 34 56 78", "placeholder": "[PHONE_1]", "type": "PHONE" }
  ]
}
```

## Compatibility

- `docudis_v1_abi_version()` and JSON `schema_version: 1` are stable. A breaking change gets a new symbol namespace and schema version; v1 behavior does not change in place.
- New optional request fields can be added within v1. Older libraries ignore fields they don't know, so if you rely on one, pin Core or check `docudis_v1_version()`. The detection `policy` field needs 0.2.0 or later.
- All offsets in the C interface are half-open UTF-8 byte offsets. The Dart binding converts them to and from UTF-16 code units.

## Limitations

- Rules and lists find structured values (emails, phone numbers, IDs, IBANs, cards) and known names. Most personal names and free-form addresses need an NER model from docudis-ner; Core alone does not find them unless they are in the user's dictionary.
- Dates and amounts are detected but left visible unless a policy says to hide them.
- Restoration relies on the AI keeping the labels recognizable.

## Next steps

- [Command line](cli/) lists every option of the `docudis` tool.
- [C interface](c-abi/) describes each function, its JSON input and output, and memory ownership.
