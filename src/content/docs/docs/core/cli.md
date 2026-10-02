---
title: Command line
description: Options and examples for the docudis command-line tool.
---

The `docudis` tool runs the same pipeline as the C interface. Build it with `cargo build --release --workspace`; it is written to `target/release/docudis`.

## Usage

```text
docudis [OPTIONS] [TEXT]
printf TEXT | docudis [OPTIONS]
```

| Option | What it does |
|---|---|
| `--regions fr,gb` | Load the universal rules plus the listed country rule packs |
| `--dictionary TERM` | Always hide a term (repeatable) |
| `--never-hide TERM` | Keep a public term visible (repeatable) |
| `--bundled-lists` | Enable the bundled company and place lists |
| `--ner-detections FILE` | Merge detections from a model, as JSON with UTF-8 offsets |
| `--type TYPE=ACTION` | `hide`, `keep` (visible) or `off` (ignore) a type (repeatable) |
| `--range START:END` | Only process these UTF-8 byte offsets (repeatable) |
| `--detect-only` | Print detections instead of replacing them |
| `--restore --map FILE` | Restore labels using a label list |
| `--map FILE` | Reuse a previous label list when replacing |
| `--json` | Print schema-versioned JSON |

Without `--ner-detections`, only rules and the requested lists and dictionary run.

## Examples

Replace details in French text:

```sh
docudis --regions fr "Email claire.martin@example.fr or call +33 6 12 34 56 78."
```

```text
Email [EMAIL_1] or call [PHONE_1].
```

Always hide a project name:

```sh
docudis --regions de --dictionary "Project Falcon" \
  "Herr Müller (m.mueller@firma.de) leads Project Falcon, IBAN DE89 3704 0044 0532 0130 00, Tel. +49 30 1234567."
```

```text
Herr Müller ([EMAIL_1]) leads [CUSTOM_1], IBAN [IBAN_1], Tel. [PHONE_1].
```

The name "Müller" stays visible here: names need an NER model, passed with `--ner-detections`.

Restore a reply with a saved label list:

```sh
docudis --restore --map map.json "Thanks, I'll write to [EMAIL_1] today."
```

```text
Thanks, I'll write to claire.martin@example.fr today.
```
