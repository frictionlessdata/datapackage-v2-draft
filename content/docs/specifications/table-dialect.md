---
title: Table Dialect
sidebar:
  order: 3
---

<table>
  <tr>
    <th>Author(s)</th>
    <td>Rufus Pollock</td>
  </tr>
  <tr>
    <th>Profile</th>
    <td><a href="/profiles/table-dialect.json">table-dialect.json</a></td>
  </tr>
</table>

CSV Dialect defines a simple format to describe the various dialects of CSV files in a language agnostic manner. It aims to deal with a reasonably large subset of the features which differ between dialects, such as terminator strings, quoting rules, escape rules and so on

## Language

The key words `MUST`, `MUST NOT`, `REQUIRED`, `SHALL`, `SHALL NOT`, `SHOULD`, `SHOULD NOT`, `RECOMMENDED`, `MAY`, and `OPTIONAL` in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt)

## Introduction

CSV Dialect defines a simple format to describe the various dialects of CSV files in a language agnostic manner. It aims to deal with a reasonably large subset of the features which differ between dialects, such as terminator strings, quoting rules, escape rules and so on. The specification has been modeled around the union of the csv modules in Python and Ruby, and the bulk load capabilities of MySQL and PostgresQL.

### Excluded

CSV Dialect has nothing to do with the names, contents or types of the headers or data within the CSV file, only how it is formatted. However, CSV Dialect does allow the presence or absence of a header to be specified, similarly to [RFC4180](http://www.ietf.org/rfc/rfc4180.txt).

CSV Dialect is also orthogonal to the character encoding used in the CSV file. Note that it is possible for files in CSV format to contain data in more than one encoding.

### Usage

CSV Dialect is useful for programmes which might have to deal with multiple dialects of CSV file, but which can rely on being told out-of-band which dialect will be used in a given input stream. This reduces the need for heuristic inference of CSV dialects, and simplifies the implementation of CSV readers, which must juggle dialect inference, schema inference, unseekable input streams, character encoding issues, and the lazy reading of very large input streams.

Some related work can be found in [this comparison of csv dialect support](https://docs.google.com/spreadsheet/ccc?key=0AmU3V2vcPKrIdEhoU1NQSWtoQmJwcUNCelJtdkx2bFE&usp=sharing), this [example of similar JSON format](http://panda.readthedocs.org/en/latest/api.html#data-uploads), and in Python's [PEP 305](http://www.python.org/dev/peps/pep-0305/).

## Specification

A CSV Dialect descriptor, `dialect`, `MUST` be a JSON `object` with the following properties:

- `delimiter` - specifies the character sequence which separates fields (aka columns). Default = `,`. Example `\t`. If not present, the default is `,`.
- `lineTerminator` - specifies the character sequence which terminates rows. Default = `\r\n`
- `quoteChar` - specifies a one-character string to use as the quoting character. Default = `"`
- `doubleQuote` - controls the handling of quotes inside fields. If true, two consecutive quotes are interpreted as one. Default = `true`
- `escapeChar` - specifies a one-character string to use for escaping (for example, `\`), mutually exclusive with `quoteChar`. Not set by default
- `nullSequence` - specifies the null sequence (for example `\N`). Not set by default
- `skipInitialSpace` - specifies how to interpret whitespace which immediately follows a delimiter; if `false`, it means that whitespace immediately after a delimiter is treated as part of the following field. Default = `false`
- `header` - indicates whether the file includes a header row. If `true` the first row in the file is a header row, not data. Default = `true`
- `commentChar` - indicates a one-character string to ignore any line whose row begins with this character. Not set by default
- `caseSensitiveHeader` - indicates that case in the header is meaningful. For example, columns `CAT` and `Cat` are not equated. Default = `false`
- `csvddfVersion` - a number, in n.n format, e.g., `1.2`. If not present, default is the latest schema version.

### Example

Here's an example:

```json
{
  "dialect": {
    "csvddfVersion": 1.2,
    "delimiter": ";",
    "doubleQuote": true,
    "lineTerminator": "\r\n",
    "quoteChar": "\"",
    "skipInitialSpace": true,
    "header": true,
    "commentChar": "#"
  }
}
```
