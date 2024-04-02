---
title: Glossary
sidebar:
  order: 6
---

<table>
  <tr>
    <th>Authors</th>
    <td>Rufus Pollock, Paul Walsh, Evgeny Karev, Peter Desmet</td>
  </tr>
</table>

A dictionary of special terms for the Data Package Standard.

## Language

The key words `MUST`, `MUST NOT`, `REQUIRED`, `SHALL`, `SHALL NOT`, `SHOULD`, `SHOULD NOT`, `RECOMMENDED`, `MAY`, and `OPTIONAL` in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt)

## Definitions

### URL or Path

A `URL or Path` is a `string` with the following additional constraints:

- `MUST` either be a URL or a POSIX path
- [URLs](https://en.wikipedia.org/wiki/Uniform_Resource_Locator) `MUST` be fully qualified. `MUST` be using either http or https scheme. (Absence of a scheme indicates `MUST` be a POSIX path)
- [POSIX paths](https://en.wikipedia.org/wiki/Path_%28computing%29#POSIX_pathname_definition) (unix-style with `/` as separator) are supported for referencing local files, with the security restraint that they `MUST` be relative siblings or children of the descriptor. Absolute paths `/`, relative parent paths `../`, hidden folders starting from a dot `.hidden` `MUST` NOT be used.

Example of a fully qualified url:

```json
{
  "path": "http://ex.datapackages.org/big-csv/my-big.csv"
}
```

Example of a relative path that this will work both as a relative path on disk and online:

```json
{
  "path": "my-data-directory/my-csv.csv"
}
```

:::caution[Security]
`/` (absolute path) and `../` (relative parent path) are forbidden to avoid security vulnerabilities when implementing data package software. These limitations on resource `path` ensure that resource paths only point to files within the data package directory and its subdirectories. This prevents data package software being exploited by a malicious user to gain unintended access to sensitive information. For example, suppose a data package hosting service stores packages on disk and allows access via an API. A malicious user uploads a data package with a resource path like `/etc/passwd`. The user then requests the data for that resource and the server naively opens `/etc/passwd` and returns that data to the caller.
:::

### Data Representation

In order to talk about data representation and processing of tabular data from data sources, it is useful to introduce the concepts of the `physical`, `native`, and `logical` representation of data.

#### Physical Representation

The `physical` representation of data refers to the representation of data in any form that is used to store data, for example, in a CSV or JSON serialized file on a disk. Usually, the data stored is some binary format but strictly speaking not limited to it in the context of the Data Package standard.

For example, here is a hexadecimal representation of a CSV file encoded using "UTF-8" encoding and stored on a disk:

```text title=table.csv
69 64 7C 6E 61 6D 65 0A 31 7C 61 70 70 6C 65 0A 32 7C 6F 72 61 6E 67 65
```

For a reference the same file in textual form:

```text
id|name
1|apple
2|orange
```

#### Native Representation

The `native` representation of data refers to the representation of data in a form that is produced by a format-specific driver in some computational environment. The Data Package Standard itself does not define any data formats and relies on existent data formats and corresponding drivers on the implementations level.

Having the Data Resource definition as below:

```json
{
  "path": "table.csv",
  "format": "csv",
  "dialect": {
    "delimiter": "|"
  }
}
```

The data from the exemplar CSV in `native` representation will be:

```javascript
{id: "1", name: "apple"}
{id: "2", name: "orange"}
```

Note that handled by a CSV reader that took into account the dialect information, the data has been transformed from a binary form to a data structure. In real implementation it could be a data stream, a data frame, or other forms.

#### Logical Representation

The `logical` representation of data refers to the "ideal" representation of the data in terms of the Data Package standard types, data structures, and relations, all as defined by the specifications. We could say that the specifications is about the logical representation of data, as well as about ways in which to handle serialization and deserialization between `physical` representation of data and the `logical` representation of data.

Having the Data Resource definition as below:

```json
{
  "path": "table.csv",
  "format": "csv",
  "dialect": {
    "delimiter": "|"
  },
  "schema": {
    "fields": [
      { "name": "id", "type": "integer" },
      { "name": "name", "type": "string" }
    ]
  }
}
```

The data from the exemplar CSV in `logical` representation will be:

```javascript
{id: 1, name: "apple"}
{id: 2, name: "orange"}
```

Note that handled by a post-processor that took into account the schema information, the data has been transformed from a partially typed data structure to the fully typed data structure that is compliant to the provided Table Schema.

:::tip[Data Formats]
The example below uses the CSV format that has only one native data type i.e. `string`. Other popular data formats like JSON or Parquet have more native data types that in many cases make data in `native` and `logical` form closer to each other, or, sometimes, even identical.
:::

:::note[Implementation Note]
Due to diversity of data formats and computational environments, there is no clear boundary between Table Dialect and Table Schema metadata and their roles in `physical-to-native` and `native-to-logical` transformation. It is recommended to maximize the usage of an available data format driver to get `native` data as closer as possible to `logical` data and do post-processing for all unsupported features.
:::
