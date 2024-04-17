---
title: Changelog
sidebar:
  order: 10
---

This document includes all meaningful changes made to the **specifications** consisting the Data Package Standard. It does not track changes made to other documents like recipes or guides.

## v2.0-draft

> April 1, 2024

### Overview

The Data Package (v2) draft release includes a rich set of the specification improvements accepted by the Data Package Working Group during the active phase of the Data Package (v2) work.

### Specifications

##### Added `source.version` property

This change adds a new property to make possible of providing information about source version. Please read more about [`source.version`](../../specifications/data-package/#sources) property.

> [Pull Request -- #10](https://github.com/frictionlessdata/datapackage/pull/10)

##### Made `contributor/source.title` not required

This change allows omitting `title` property for the `contributor` and `source` objects making it more flexible for data producers.

> [Pull Request -- #7](https://github.com/frictionlessdata/datapackage/pull/7)

### Data Package

##### Added `contributor.given/familyName`

This change adds two new properties to the `contributor` object: `givenName` and `familyName`. Please read more about [`package.contributors`](../../specifications/data-package/#contributors) property.

> [Pull Request -- #20](https://github.com/frictionlessdata/datapackage/pull/20)

##### Added `contributor.roles` property

This change adds a new `contributors.roles` property that replaces `contributor.role`. Please read more about [`package.contributors`](../../specifications/data-package/#contributors) property.

> [Pull Request -- #18](https://github.com/frictionlessdata/datapackage/pull/18)

##### Fixed `version` property in Data Package profile

This change adds omitted `version` property to the Data Package profiles.

> [Pull Request -- #3](https://github.com/frictionlessdata/datapackage/pull/3)

### Data Resource

##### Updated property `name`

This change relaxes requirements to `resource.name` allowing it to be any string. This property still needs to present and be unique among resources. Please read more about [`resource.name`](../../specifications/data-resource/#name-required) property.

> [Pull Request -- #27](https://github.com/frictionlessdata/datapackage/pull/27)
##### Updated property `encoding`


This change updates the `resource.encoding` property definition to properly support binary file formats like Parquet. Please read more about [`resource.encoding`](../../specifications/data-resource/#encoding) property.
##### Updated property `path`

> [Pull Request -- #15](https://github.com/frictionlessdata/datapackage/pull/15)


This change fixes definition in the Data Resource specification to explicitly forbid hidden folders.

> [Pull Request -- #19](https://github.com/frictionlessdata/datapackage/pull/19)

### Table Dialect

This change adds a new specification Table Dialect that superseeds and extends the CSV Dialect specification to work with other formats like JSON or Excel. Please refer to the [Table Dialect](../../specifications/table-dialect) specification.

> [Pull Request -- #41](https://github.com/frictionlessdata/datapackage/pull/41)

### Table Schema

##### Updated property `primaryKey`

[`primaryKey`](../../specifications/table-schema/#primarykey) should now always be an array of strings, not a string. ([#28](https://github.com/frictionlessdata/datapackage/pull/28)).

##### Updated property `foreignKeys`

[`foreignKeys`](../../specifications/table-schema/#foreignkeys) should now always be an array of strings, not a string ([#28](https://github.com/frictionlessdata/datapackage/pull/28)).

`foreignKey.resource.reference` can now be omitted for self-referencing foreign keys. Previously it required setting resource to an empty string ([#29](https://github.com/frictionlessdata/datapackage/pull/29).

##### New property `fieldsMatch`

[fieldsMatch](../../specifications/table-schema/#fieldsmatch) clarifies the default field matching behaviour between Table Schema and data source fields (i.e. all fields are defined and in the same order) and adds new modes for matching fields ([#39](https://github.com/frictionlessdata/datapackage/pull/39)).

##### New property `uniqueKeys`

[`uniqueKeys`](../../specifications/table-schema/#uniquekeys) allows to specify which fields are required to have unique logical values. It is an alternative to the `field.contraints.unique` property and is modelled after the corresponding SQL feature ([#30](https://github.com/frictionlessdata/datapackage/pull/30)).

##### New field property `missingValues`

[`missingValues`](../../specifications/table-schema/#missingvalues) allows to specify missing values per field, and overwrites `missingValues` specifified at a resource level ([#24](https://github.com/frictionlessdata/datapackage/pull/24)).

##### Updated field type `datetime`

The default `format` for [`datetime`](../../specifications/table-schema/#datetime) is now extended to allow optional milliseconds and timezone parts ([#23](https://github.com/frictionlessdata/datapackage/pull/23)).

##### Updated field type `geopoint`

The definition for [`geopoint`](../../specifications/table-schema/#geopoint) now clarifies that floating point numbers can be used for coordinate definitions ([#14](https://github.com/frictionlessdata/datapackage/pull/14)).

##### Updated field type `any`

[`any`](../../specifications/table-schema/#any) is now the default field type and ensures that the field type is not inferred if not provided ([#13](https://github.com/frictionlessdata/datapackage/pull/13)).

##### New field type `list`

[`list`](../../specifications/table-schema/#list) allows to specify fields containing collections of primary values, separated by a delimiter (e.g. `value1,value`) ([#38](https://github.com/frictionlessdata/datapackage/pull/38)).

##### Updated constraints `minimum` and `maximum`

[`minimum`](../../specifications/table-schema/#minimum) and [`maximum`](../../specifications/table-schema/#maximum) are now extended to support the `duration` field type ([#8](https://github.com/frictionlessdata/datapackage/pull/8).

##### New constraint `jsonschema`

[`jsonSchema`](../../specifications/table-schema/#jsonschema) can be used for the `object` and `array` field types ([#32](https://github.com/frictionlessdata/datapackage/pull/32)).

##### New constraints `exclusiveMinimum` and `exclusiveMaximum`

[`exclusiveMinimum`](../../specifications/table-schema/#exclusiveminimum) and [`exclusiveMaximum`](../../specifications/table-schema/#exclusivemaximum) can be used to specify exclusive minimum and maximum contraints ([#11](https://github.com/frictionlessdata/datapackage/pull/11)).

##### New integer property `groupChar`

[`groupChar`](../../specifications/table-schema/#integer) can now be used for the `integer` field type. It was already available for `number` ([#6](https://github.com/frictionlessdata/datapackage/pull/6)).

## v1.0

> September 5, 2017

Please refer to the the [Data Package (v1) website](https://specs.frictionlessdata.io/).
