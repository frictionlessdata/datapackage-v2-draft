---
title: Table Schema
sidebar:
  order: 4
---

<table>
  <tr>
    <th>Author(s)</th>
    <td>Paul Walsh, Rufus Pollock</td>
  </tr>
  <tr>
    <th>Profile</th>
    <td><a href="/profiles/table-schema.json">table-schema.json</a></td>
  </tr>
</table>

A simple format to declare a schema for tabular data. The schema is designed to be expressible in JSON

## Language

The key words `MUST`, `MUST NOT`, `REQUIRED`, `SHALL`, `SHALL NOT`, `SHOULD`, `SHOULD NOT`, `RECOMMENDED`, `MAY`, and `OPTIONAL` in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt)

## Introduction

Table Schema is a simple language- and implementation-agnostic way to declare a schema for tabular data. Table Schema is well suited for use cases around handling and validating tabular data in text formats such as CSV, but its utility extends well beyond this core usage, towards a range of applications where data benefits from a portable schema format.

### Concepts

#### Tabular data

Tabular data consists of a set of rows. Each row has a set of fields (columns). We usually expect that each row has the same set of fields and thus we can talk about _the_ fields for the table as a whole.

In case of tables in spreadsheets or CSV files we often interpret the first row as a header row, giving the names of the fields. By contrast, in other situations, e.g. tables in SQL databases, the field names are explicitly designated.

To illustrate, here's a classic spreadsheet table:

    field     field
      |         |
      |         |
      V         V

     A     |    B    |    C    |    D      <--- Row (Header)
     ------------------------------------
     valA  |   valB  |  valC   |   valD    <--- Row
     ...

In JSON, a table would be:

    [
      { "A": value, "B": value, ... },
      { "A": value, "B": value, ... },
      ...
    ]

#### Physical and logical representation

In order to talk about the representation and processing of tabular data from text-based sources, it is useful to introduce the concepts of the _physical_ and the _logical_ representation of data.

The _physical representation_ of data refers to the representation of data as text on disk, for example, in a CSV or JSON file. This representation can have some _type_ information (JSON, where the primitive types that JSON supports can be used) or not (CSV, where all data is represented in string form).

The _logical representation_ of data refers to the "ideal" representation of the data in terms of primitive types, data structures, and relations, all as defined by the specification. We could say that the specification is about the logical representation of data, as well as about ways in which to handle conversion of a physical representation to a logical one.

In this document, we'll explicitly refer to either the _physical_ or _logical_ representation in places where it prevents ambiguity for those engaging with the specification, especially implementors.

For example, `constraints` `SHOULD` be tested on the logical representation of data, whereas a property like `missingValues` applies to the physical representation of the data.

## Descriptor

A Table Schema is represented by a descriptor. The descriptor `MUST` be a JSON `object` (JSON is defined in [RFC 4627](http://www.ietf.org/rfc/rfc4627.txt)).

It `MUST` contain a property `fields`. `fields` `MUST` be an array where each entry in the array is a field descriptor (as defined below). The order of elements in `fields` array `SHOULD` be the order of fields in the CSV file. The number of elements in `fields` array `SHOULD` be the same as the number of fields in the CSV file.

The descriptor `MAY` have the additional properties set out below and `MAY` contain any number of other properties (not defined in this specification).

The following is an illustration of this structure:

```javascript
{
  // fields is an ordered list of field descriptors
  // one for each field (column) in the table
  "fields": [
    // a field-descriptor
    {
      "name": "name of field (e.g. column name)",
      "title": "A nicer human readable label or title for the field",
      "type": "A string specifying the type",
      "format": "A string specifying a format",
      "example": "An example value for the field",
      "description": "A description for the field"
      ...
    },
    ... more field descriptors
  ],
  // (optional) specification of missing values
  "missingValues": [ ... ],
  // (optional) specification of the primary key
  "primaryKey": ...
  // (optional) specification of the foreign keys
  "foreignKeys": ...
}
```

## Field Descriptors

A field descriptor `MUST` be a JSON `object` that describes a single field. The
descriptor provides additional human-readable documentation for a field, as
well as additional information that can be used to validate the field or create
a user interface for data entry.

Here is an illustration:

```javascript
{
  "name": "name of field (e.g. column name)",
  "title": "A nicer human readable label or title for the field",
  "type": "A string specifying the type",
  "format": "A string specifying a format",
  "example": "An example value for the field",
  "description": "A description for the field",
  "constraints": {
      // a constraints-descriptor
  }
}
```

The field descriptor `object` `MAY` contain any number of other properties. Some specific properties are defined below. Of these, only the `name` property is `REQUIRED`.

### `name`

The field descriptor `MUST` contain a `name` property. This property `SHOULD` correspond to the name of field/column in the data file (if it has a name). As such it `SHOULD` be unique (though it is possible, but very bad practice, for the data file to have multiple columns with the same name). `name` `SHOULD NOT` be considered case sensitive in determining uniqueness. However, since it corresponds to the name of the field in the data file it may be important to preserve case.

### `title`

A human readable label or title for the field

### `description`

A description for this field e.g. "The recipient of the funds"

### `example`

An example value for the field

### `missingValues`

A list of missing values for this field as per [Missing Values](#missing-values) definition. If this property is defined, it takes precedence over the schema-level property and completely replaces it for the field without combining the values.

For example, for the Table Schema below:

```json
"fields": [
  {
    "name": "column1"
  },
  {
    "name": "column2",
    "missingValues": ["-"]
  }
],
"missingValues": ["", "NA"]
```

A data consumer `MUST`:

- interpret `""` and `NA` as missing values for `column1`
- interpret only `-` as a missing value for `column2`

### Types and Formats

`type` and `format` properties are used to give The type of the field (string, number etc) - see below for
more detail. If type is not provided a consumer `SHOULD` assume a type of "string".

A field's `type` property is a string indicating the type of this field.

A field's `format` property is a string, indicating a format for the field type.

Both `type` and `format` are optional: in a field descriptor, the absence of a
`type` property indicates that the field is of the type "string", and the
absence of a `format` property indicates that the field's type `format` is
"default".

Types are based on the [type set of
json-schema](http://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.1)
with some additions and minor modifications (cf other type lists include
those in [Elasticsearch
types](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html)).

The type list with associated formats and other related properties is as
follows.

#### string

The field contains strings, that is, sequences of characters.

`format`:

- **default**: any valid string.
- **email**: A valid email address.
- **uri**: A valid URI.
- **binary**: A base64 encoded string representing binary data.
- **uuid**: A string that is a uuid.

#### number

The field contains numbers of any kind including decimals.

The lexical formatting follows that of decimal in [XMLSchema][xsd-decimal]: a
non-empty finite-length sequence of decimal digits separated by a period as a
decimal indicator. An optional leading sign is allowed. If the sign is omitted,
"+" is assumed. Leading and trailing zeroes are optional. If the fractional
part is zero, the period and following zero(es) can be omitted. For example:
'-1.23', '12678967.543233', '+100000.00', '210'.

The following special string values are permitted (case need not be respected):

- NaN: not a number
- INF: positive infinity
- -INF: negative infinity

A number `MAY` also have a trailing:

- exponent: this `MUST` consist of an E followed by an optional + or - sign
  followed by one or more decimal digits (0-9)

This lexical formatting `MAY` be modified using these additional properties:

- **decimalChar**: A string whose value is used to represent a decimal point
  within the number. The default value is ".".
- **groupChar**: A string whose value is used to group digits within the
  number. This property does not have a default value. A common value is "," e.g. "100,000".
- **bareNumber**: a boolean field with a default of `true`. If `true` the physical contents of this field `MUST` follow the formatting constraints already set out. If `false` the contents of this field may contain leading and/or trailing non-numeric characters (which implementors `MUST` therefore strip). The purpose of `bareNumber` is to allow publishers to publish numeric data that contains trailing characters such as percentages e.g. `95%` or leading characters such as currencies e.g. `€95` or `EUR 95`. Note that it is entirely up to implementors what, if anything, they do with stripped text.

`format`: no options (other than the default).

[xsd-decimal]: https://www.w3.org/TR/xmlschema-2/#decimal

#### integer

The field contains integers - that is whole numbers.

Integer values are indicated in the standard way for any valid integer.

This lexical formatting `MAY` be modified using these additional properties:

- **groupChar**: A string whose value is used to group digits within the
  integer. This property does not have a default value. A common value is "," e.g. "100,000".
- **bareNumber**: a boolean field with a default of `true`. If `true` the physical contents of this field `MUST` follow the formatting constraints already set out. If `false` the contents of this field may contain leading and/or trailing non-numeric characters (which implementors `MUST` therefore strip). The purpose of `bareNumber` is to allow publishers to publish numeric data that contains trailing characters such as percentages e.g. `95%` or leading characters such as currencies e.g. `€95` or `EUR 95`. Note that it is entirely up to implementors what, if anything, they do with stripped text.

`format`: no options (other than the default).

#### boolean

The field contains boolean (true/false) data.

In the physical representations of data where boolean values are represented with strings, the values set in `trueValues` and `falseValues` are to be cast to their logical representation as booleans. `trueValues` and `falseValues` are arrays which can be customised to user need. The default values for these are in the additional properties section below.

The boolean field can be customised with these additional properties:

- **trueValues**: `[ "true", "True", "TRUE", "1" ]`
- **falseValues**: `[ "false", "False", "FALSE", "0" ]`

`format`: no options (other than the default).

#### object

The field contains a valid JSON object.

`format`: no options (other than the default).

#### array

The field contains a valid JSON array.

`format`: no options (other than the default).

#### list

The field contains data that is an ordered one-level depth collection of primitive values with a fixed item type. In the lexical representation, the field `MUST` contain a string with values separated by a delimiter which is `,` (comma) by default e.g. `value1,value2`. In comparison to the `array` type, the `list` type is directly modelled on the concept of SQL typed collections.

`format`: no options (other than the default).

The list field can be customised with these additional properties:

- **delimiter**: specifies the character sequence which separates lexically represented list items. If not present, the default is `,` (comma).
- **itemType**: specifies the list item type in terms of existent Table Schema types. If present, it `MUST` be one of `string`, `integer`, `boolean`, `number`, `datetme`, `date`, and `time`. If not present, the default is `string`. A data consumer `MUST` process list items as it were individual values of the corresponding data type. Note, that on lexical level only default formats are supported, for example, for a list with `itemType` set to `date`, items have to be in default form for dates i.e. `yyyy-mm-dd`.

#### datetime

The field contains a date with a time.

`format`:

- **default**: The lexical representation `MUST` be in a form defined by [XML Schema](https://www.w3.org/TR/xmlschema-2/#dateTime) containing required date and time parts, followed by optional milliseconds and timezone parts, for example, `2024-01-26T15:00:00` or `2024-01-26T15:00:00.300-05:00`.
- **\<PATTERN\>**: values in this field can be parsed according to `<PATTERN>`. `<PATTERN>` `MUST` follow the syntax of [standard Python / C strptime][strptime]. Values in the this field `SHOULD` be parsable by Python / C standard `strptime` using `<PATTERN>`. Example for `"format": ""%d/%m/%Y %H:%M:%S"` which would correspond to a date with time like: `12/11/2018 09:15:32`.
- **any**: Any parsable representation of the value. The implementing library can attempt to parse the datetime via a range of strategies. An example is `dateutil.parser.parse` from the `python-dateutils` library. It is `NOT RECOMMENDED` to use `any` format as it might cause interoperability issues.

#### date

The field contains a date without a time.

`format`:

- **default**: The lexical representation `MUST` be `yyyy-mm-dd` e.g. `2024-01-26`
- **\<PATTERN\>**: The same as for `datetime`
- **any**: The same as for `datetime`

#### time

The field contains a time without a date.

`format`:

- **default**: The lexical representation `MUST` be `hh:mm:ss` e.g. `15:00:00`
- **\<PATTERN\>**: The same as for `datetime`
- **any**: The same as for `datetime`

#### year

A calendar year as per [XMLSchema `gYear`][xsd-gyear].

Usual lexical representation is `YYYY`. There are no format options.

[xsd-gyear]: https://www.w3.org/TR/xmlschema-2/#gYear

#### yearmonth

A specific month in a specific year as per [XMLSchema
`gYearMonth`][xsd-gyearmonth].

Usual lexical representation is: `YYYY-MM`. There are no format options.

[xsd-gyearmonth]: https://www.w3.org/TR/xmlschema-2/#gYearMonth

#### duration

A duration of time.

We follow the definition of [XML Schema duration datatype][xsd-duration] directly
and that definition is implicitly inlined here.

To summarize: the lexical representation for duration is the [ISO 8601][iso8601-duration]
extended format PnYnMnDTnHnMnS, where nY represents the number of years, nM the
number of months, nD the number of days, 'T' is the date/time separator, nH the
number of hours, nM the number of minutes and nS the number of seconds. The
number of seconds can include decimal digits to arbitrary precision. Date and
time elements including their designator `MAY` be omitted if their value is zero,
and lower order elements `MAY` also be omitted for reduced precision.

`format`: no options (other than the default).

#### geopoint

The field contains data describing a geographic point.

`format`:

- **default**: A string of the pattern "lon, lat", where each value is a number, and `lon` is the longitude and `lat` is the latitude (note the space is optional after the `,`). E.g. `"90.50, 45.50"`.
- **array**: A JSON array, or a string parsable as a JSON array, of exactly two items, where each item is a number, and the first item is `lon` and the second
  item is `lat` e.g. `[90.50, 45.50]`
- **object**: A JSON object with exactly two keys, `lat` and `lon` and each value is a number e.g. `{"lon": 90.50, "lat": 45.50}`

#### geojson

The field contains a JSON object according to GeoJSON or TopoJSON spec.

`format`:

- **default**: A geojson object as per the [GeoJSON spec](http://geojson.org/).
- **topojson**: A topojson object as per the [TopoJSON spec](https://github.com/topojson/topojson-specification/blob/master/README.md)

#### any

Any `type` or `format` is accepted. When converting from physical to logical representation, the behaviour `SHOULD` be similar to String field type.

[strptime]: https://docs.python.org/2/library/datetime.html#strftime-strptime-behavior
[iso8601-duration]: https://en.wikipedia.org/wiki/ISO_8601#Durations
[xsd-duration]: http://www.w3.org/TR/xmlschema-2/#duration

### Rich Types

A richer, "semantic", description of the "type" of data in a given column `MAY`
be provided using a `rdfType` property on a field descriptor.

The value of the `rdfType` property `MUST` be the URI of a RDF Class, that is an instance or subclass of [RDF Schema Class object][rdfs-class]

Here is an example using the Schema.org RDF Class `http://schema.org/Country`:

```
| Country | Year Date | Value |
| ------- | --------- | ----- |
| US      | 2010      | ...   |
```

The corresponding Table Schema is:

```javascript
    {
      fields: [
        {
          "name": "Country",
          "type": "string",
          "rdfType": "http://schema.org/Country"
        }
        ...
      }
    }
```

[rdfs-class]: https://www.w3.org/TR/rdf-schema/#ch_class

### Constraints

The `constraints` property on Table Schema Fields can be used by consumers to list constraints for validating field values. For example, validating the data in a [Tabular Data Resource][tdr] against its Table Schema; or as a means to validate data being collected or updated via a data entry interface.

[tdr]: http://specs.frictionlessdata.io/tabular-data-resource/

All constraints `MUST` be tested against the logical representation of data, and the physical representation of constraint values `MAY` be primitive types as possible in JSON, or represented as strings that are castable with the `type` and `format` rules of the field.

A constraints descriptor `MUST` be a JSON `object` and `MAY` contain one or more of the following
properties.

<table>
  <tr>
    <th>
      Property
    </th>
    <th>
      Type
    </th>
    <th>
      Applies to
    </th>
    <th>
      Description
    </th>
  </tr>
  <tr>
    <td>
      <code>required</code>
    </td>
    <td>
      boolean
    </td>
    <td>
      All
    </td>
    <td>
      Indicates whether this field cannot be <code>null</code>. If required is <code>false</code> (the default), then <code>null</code> is allowed. See the section on <code>missingValues</code> for how, in the physical representation of the data, strings can represent <code>null</code> values.
    </td>
  </tr>
  <tr>
    <td>
      <code>unique</code>
    </td>
    <td>
      boolean
    </td>
    <td>
      All
    </td>
    <td>
      If <code>true</code>, then all values for that field `MUST` be unique within the data file in which it is found.
    </td>
  </tr>
  <tr>
    <td>
      <code>minLength</code>
    </td>
    <td>
      integer
    </td>
    <td>
      collections (string, array, object)
    </td>
    <td>
      An integer that specifies the minimum length of a value.
    </td>
  </tr>
  <tr>
    <td>
      <code>maxLength</code>
    </td>
    <td>
      integer
    </td>
    <td>
      collections (string, array, object)
    </td>
    <td>
      An integer that specifies the maximum length of a value.
    </td>
  </tr>
  <tr>
    <td>
      <code>minimum</code>
    </td>
    <td>
      integer, number, date, time, datetime, duration, year, yearmonth
    </td>
    <td>
      <code>integer, number, date, time, datetime, duration, year, yearmonth</code>
    </td>
    <td>
      Specifies a minimum value for a field. This is different to <code>minLength</code> which checks the number of items in the value. A <code>minimum</code> value constraint checks whether a field value is greater than or equal to the specified value. The range checking depends on the <code>type</code> of the field. E.g. an integer field may have a minimum value of 100; a date field might have a minimum date. If a <code>minimum</code> value constraint is specified then the field descriptor <code>MUST</code> contain a <code>type</code> key.
    </td>
  </tr>
  <tr>
    <td>
      <code>maximum</code>
    </td>
    <td>
      integer, number, date, time, datetime, duration, year, yearmonth
    </td>
    <td>
      <code>integer, number, date, time, datetime, duration, year, yearmonth</code>
    </td>
    <td>
      As for <code>minimum</code>, but specifies a maximum value for a field.
    </td>
  </tr>
  <tr>
    <td>
      <code>exclusiveMinimum</code>
    </td>
    <td>
      integer, number, date, time, datetime, duration, year, yearmonth
    </td>
    <td>
      <code>integer, number, date, time, datetime, duration, year, yearmonth</code>
    </td>
    <td>
      As for <code>minimum</code>, but for expressing exclusive range.
    </td>
  </tr>
  <tr>
    <td>
      <code>exclusiveMaximum</code>
    </td>
    <td>
      integer, number, date, time, datetime, duration, year, yearmonth
    </td>
    <td>
      <code>integer, number, date, time, datetime, duration, year, yearmonth</code>
    </td>
    <td>
      As for <code>maximum</code>, but for expressing exclusive range.
    </td>
  </tr>
  <tr>
    <td>
      <code>jsonSchema</code>
    </td>
    <td>
      object
    </td>
    <td>
      <code>array</code>, <code>object</code>
    </td>
    <td>A valid JSON Schema object to validate field values. If a field value conforms to the provided JSON Schema then this field value is valid.
    </td>
  </tr>
  <tr>
    <td>
      <code>pattern</code>
    </td>
    <td>
      string
    </td>
    <td>
      <code>string</code>
    </td>
    <td>
      A regular expression that can be used to test field values. If the regular expression matches then the value is valid. The values of this field <code>MUST</code> conform to the standard <a href="http://www.w3.org/TR/xmlschema-2/#regexs">XML Schema regular expression syntax</a>.
    </td>
  </tr>
  <tr>
    <td>
      <code>enum</code>
    </td>
    <td>
      array
    </td>
    <td>
      All
    </td>
    <td>
      The value of the field `MUST` exactly match a value in the <code>enum</code> array.
    </td>
  </tr>
</table>

**Implementors**:

- Implementations `SHOULD` report an error if an attempt is made to evaluate a value against an unsupported constraint.
- A constraints descriptor `MAY` contain multiple constraints, in which case implementations `MUST` apply all the constraints when determining if a field value is valid.
- Constraints `MUST` be applied on the logical representation of field values and constraint values.

## Other Properties

In additional to field descriptors, there are the following "table level" properties.

### Missing Values

Many datasets arrive with missing data values, either because a value was not collected or it never existed. Missing values may be indicated simply by the value being empty in other cases a special value may have been used e.g. `-`, `NaN`, `0`, `-9999` etc.

`missingValues` dictates which string values `MUST` be treated as `null` values. This conversion to `null` is done before any other attempted type-specific string conversion.
The default value `[ "" ]` means that empty strings will be converted to null before any other processing takes place.
Providing the empty list `[]` means that no conversion to null will be done, on any value.

`missingValues` `MUST` be an `array` where each entry is a `string`.

**Why strings**: `missingValues` are strings rather than being the data type of the particular field. This allows for comparison prior to casting and for fields to have missing value which are not of their type, for example a `number` field to have missing values indicated by `-`.

Examples:

```javascript
"missingValues": [""]
"missingValues": ["-"]
"missingValues": ["NaN", "-"]
```

### Primary Key

A primary key is a field or set of fields that uniquely identifies each row in
the table. Per SQL standards, the fields cannot be `null`, so their use in the
primary key is equivalent to adding `required: true` to their
[`constraints`](#constraints).

The `primaryKey` entry in the schema `object` is optional. If present it specifies
the primary key for this table.

The `primaryKey`, if present, `MUST` be an array of strings with each string corresponding to one of the field `name` values in the `fields` array (denoting that the primary key is made up of those fields). It is acceptable to have an array with a single value (indicating just one field in the primary key). Strictly, order of values in the array does not matter. However, it is `RECOMMENDED` that one follow the order the fields in the `fields` has as client applications `MAY` utilize the order of the primary key list (e.g. in concatenating values together).

Here's an example:

```json
"schema": {
  "fields": [
    {
      "name": "a"
    },
    {
      "name": "b"
    },
    {
      "name": "c"
    },
    ...
  ],
  "primaryKey": ["a", "c"]
}
```

:::note[Backward Compatibility]
Data consumer MUST support the `primaryKey` property in a form of a single string e.g. `primaryKey: a` which was a part of the `v1.0` of the specification.
:::

### Unique Keys

A unique key is a field or a set of fields that are required to have unique logical values in each row in the table. It is directly modeled on the concept of unique constraint in SQL.

The `uniqueKeys` property, if present, `MUST` be a non-empty array. Each entry in the array `MUST` be a `uniqueKey`. A `uniqueKey` `MUST` be an array of strings with each string corresponding to one of the field `name` values in the `fields` array, denoting that the unique key is made up of those fields. It is acceptable to have an array with a single value, indicating just one field in the unique key.

An example of using the `uniqueKeys` property:

```json
"fields": [
  {
    "name": "a"
  },
  {
    "name": "b"
  },
  {
    "name": "c"
  }
],
"uniqueKeys": [
  ["a"],
  ["a", "b"],
  ["a", "c"]
]
```

In the case of the definition above, the data in the table has to be considered valid only if:

- each row has a unique logical value in the field `a`
- each row has a unique set of logical values in the fields `a` and `b`
- each row has a unique set of logical values in the fields `a` and `c`

#### Handling `null` values

All the field values that are on the logical level are considered to be `null` values `MUST` be excluded from the uniqueness check, as the `uniqueKeys` property is modeled on the concept of unique constraint in SQL.

#### Relation to `constraints.unique`

In contrast with `field.constraints.unique`, `uniqueKeys` allows to define uniqueness as a combination of fields. Both properties `SHOULD` be assessed separately.

### Foreign Keys

A foreign key is a reference where values in a field (or fields) on the
table ('resource' in data package terminology) described by this Table Schema
connect to values a field (or fields) on this or a separate table (resource).
They are directly modelled on the concept of foreign keys in SQL.

The `foreignKeys` property, if present, `MUST` be an Array. Each entry in the
array `MUST` be a `foreignKey`. A `foreignKey` `MUST` be a `object` and `MUST` have the following properties:

- `fields` - `fields` is an array of strings specifying the
  field or fields on this resource that form the source part of the foreign
  key. The structure of the array is as per `primaryKey` above.
- `reference` - `reference` `MUST` be a `object`. The `object`
  - `MUST` have a property `resource` which is the name of the resource within
    the current data package (i.e. the data package within which this Table
    Schema is located). For self-referencing foreign keys, i.e. references
    between fields in this Table Schema, the value of `resource` `MUST` be `""`
    (i.e. the empty string).
  - `MUST` have a property `fields` which is an array of strings of the same length as the outer `fields`, describing the field (or fields) references on the destination resource. The structure of the array is as per `primaryKey` above.

Here's an example:

```json
"resources": [
  {
    "name": "state-codes",
    "schema": {
      "fields": [
        {
          "name": "code"
        }
      ]
    }
  },
  {
    "name": "population-by-state",
    "schema": {
      "fields": [
        {
          "name": "state-code"
        }
        ...
      ],
      "foreignKeys": [
        {
          "fields": ["state-code"],
          "reference": {
            "resource": "state-codes",
            "fields": ["code"]
          }
        }
      ]
  ...
```

An example of a self-referencing foreign key:

```json
"resources": [
  {
    "name": "xxx",
    "schema": {
      "fields": [
        {
          "name": "parent"
        },
        {
          "name": "id"
        }
      ],
      "foreignKeys": [
        {
          "fields": ["parent"],
          "reference": {
            "resource": "",
            "fields": ["id"]
          }
        }
      ]
    }
  }
]
```

**Comment**: Foreign Keys create links between one Table Schema and another Table Schema, and implicitly between the data tables described by those Table Schemas. If the foreign key is referring to another Table Schema how is that other Table Schema discovered? The answer is that a Table Schema will usually be embedded inside some larger descriptor for a dataset, in particular as the schema for a resource in the resources array of a [Data Package][dp]. It is the use of Table Schema in this way that permits a meaningful use of a non-empty `resource` property on the foreign key.

[dp]: http://specs.frictionlessdata.io/data-package/

:::note[Backward Compatibility]
Data consumer MUST support the `foreignKey.fields` and `foreignKey.reference.fields` properties in a form of a single string e.g. `fields: a` which was a part of the `v1.0` of the specification.
:::

## Appendix: Related Work

Table Schema draws content and/or inspiration from, among others, the following specifications and implementations:

- [XML Schema][]
- [Google BigQuery][]
- [JSON Schema][]
- [DSPL][]
- [HTML5 Forms][]
- [Elasticsearch][]

[xml schema]: http://www.w3.org/TR/xmlschema-2/#built-in-primitive-datatypes
[google bigquery]: https://developers.google.com/bigquery/docs/import#loading_json_files
[json schema]: http://json-schema.org
[dspl]: https://developers.google.com/public-data/docs/schema/dspl18
[html5 forms]: http://www.whatwg.org/specs/web-apps/current-work/#attr-input-typ
[elasticsearch]: http://www.elasticsearch.org/guide/reference/mapping/
