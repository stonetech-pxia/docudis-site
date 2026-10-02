---
title: C interface
description: The docudis_v1 functions, their JSON requests and responses, status codes and memory ownership.
---

Include `crates/docudis-capi/include/docudis.h` and link against `libdocudis_capi`. Every function takes a UTF-8 JSON request with `schema_version: 1` and writes a UTF-8 JSON response.

## Calling convention

```c
#include <stdio.h>
#include <string.h>
#include "docudis.h"

int main(void) {
  const char *req =
    "{\"schema_version\":1,"
    "\"text\":\"Email claire.martin@example.fr\","
    "\"regions\":[\"fr\"]}";

  DocudisV1Buffer out = {0};
  DocudisV1Status status =
    docudis_v1_detect_json((const uint8_t *)req, strlen(req), &out);

  if (status == DOCUDIS_V1_OK) {
    fwrite(out.ptr, 1, out.len, stdout);
  } else {
    fprintf(stderr, "%s\n", docudis_v1_last_error_message());
  }
  docudis_v1_buffer_free(&out);
  return status;
}
```

- You keep ownership of the request bytes.
- Pass an initialized, writable `DocudisV1Buffer`. On success it owns the response, which is **not** NUL-terminated: use `len`. On failure it is reset to empty.
- Release every response with `docudis_v1_buffer_free`, from the same library that allocated it. Passing `NULL` is allowed.
- `docudis_v1_last_error_message()` describes the most recent failure on the current thread. It is valid until the next call on that thread. Never free it.
- All `start`/`end` offsets are half-open UTF-8 byte offsets.

## Status codes

| Code | Name | Meaning |
|---|---|---|
| 0 | `DOCUDIS_V1_OK` | Success |
| 1 | `DOCUDIS_V1_INVALID_ARGUMENT` | A field has an invalid value, such as an unknown type or a bad range |
| 2 | `DOCUDIS_V1_INVALID_UTF8` | The request is not valid UTF-8 |
| 3 | `DOCUDIS_V1_INVALID_JSON` | The request is not valid JSON |
| 4 | `DOCUDIS_V1_CORE_ERROR` | Core could not complete the request |
| 255 | `DOCUDIS_V1_PANIC` | An internal error was caught at the boundary |

## Functions

### Version

| Function | Returns |
|---|---|
| `uint32_t docudis_v1_abi_version(void)` | `1` for this interface |
| `const char *docudis_v1_version(void)` | The library version, for example `"0.2.0"`. Static; never free it |

### Detect, replace and restore

| Function | Request | Response |
|---|---|---|
| `docudis_v1_detect_json` | `text`, `regions`, optional `dictionary`, `never_hide`, `include_bundled_lists`, `detections`, `policy` | `detections` |
| `docudis_v1_anonymize_json` | `text`, `detections`, optional `previous_map` | Replaced `text`, its label list (`mappings`) and `replacements` |
| `docudis_v1_process_json` | Same as detect, plus optional `previous_map` | The anonymize response plus the final `detections` |
| `docudis_v1_restore_json` | `text`, `mappings` | Restored `text` |

`detect` runs the bundled rules and the optional dictionary and lists, then merges the `detections` you pass in, such as spans from an NER model (`"source": "model"`, with the model named in `detector`).

The optional `policy` (version 0.2.0 or later) applies to every source:

```json
{
  "schema_version": 1,
  "text": "...",
  "regions": ["fr"],
  "policy": {
    "types": { "DATE": "hide", "ADDRESS": "keep", "URL": "off" },
    "ranges": [[0, 120]]
  }
}
```

- `types`: `hide` turns a type on; `keep` leaves it visible but still lets it win overlaps; `off` drops it before overlaps are resolved. Dictionary terms and manual spans ignore `types`.
- `ranges`: half-open UTF-8 byte ranges to process. Detections that touch none of them are dropped.

A detection in a response looks like this:

```json
{
  "type": "EMAIL",
  "value": "claire.martin@example.fr",
  "start": 6,
  "end": 30,
  "confidence": 0.95,
  "detector": "regex:universal:email",
  "source": "strongRule",
  "enabled": true
}
```

### Review helpers

| Function | What it does |
|---|---|
| `docudis_v1_chunk_json` | Cuts text into the review page's one-tap chunks without crossing the spans in `taken` |
| `docudis_v1_merge_json` | Resolves overlaps among given detections without detecting anything new, for review edits |
| `docudis_v1_regions_json` | Picks rule-pack regions from BCP-47 language tags, for example `en-GB` → `gb`, `ie`, `us` |
| `docudis_v1_languages_json` | Guesses the languages in a text. Needs a library built with the `language-id` feature; otherwise returns `DOCUDIS_V1_CORE_ERROR` |
| `docudis_v1_reply_check_json` | Checks whether a pasted AI reply belongs to a document, and lists unknown or invented labels |

The header, `docudis.h`, documents the exact request and response of each function.
