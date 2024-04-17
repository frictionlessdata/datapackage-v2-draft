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

### Data Package

##### Updated property `version`

[`version`](../../specifications/data-package/#version) is now included in the specification, while in Data Package v1 it was erroneously only part of the documentation ([#3](https://github.com/frictionlessdata/datapackage/pull/3)).

##### Updated property `contributor.title`

[`contributor.title`](../../specifications/data-package/#contributors) is no longer required ([#7](https://github.com/frictionlessdata/datapackage/pull/7)).

##### Deprecated property `contributor.role`

`contributor.role` has been deprecated in favour of `contributor.roles`, see further ([#18](https://github.com/frictionlessdata/datapackage/pull/18)).

##### Updated property `source.title`

[`source.title`](../../specifications/data-package/#sources) is no longer required ([#7](https://github.com/frictionlessdata/datapackage/pull/7)).

##### New properties `contributor.givenName` and `contributor.familyName`

[`contributor.givenName`](../../specifications/data-package/#contributors) and [`contributor.familyName`](../../specifications/data-package/#contributors) can be used to specify the given and family name of contributor, if it is a person ([#20](https://github.com/frictionlessdata/datapackage/pull/20)).

##### New property `contributor.roles`

[`contributor.roles`](../../specifications/data-package/#contributors) allows to specify multiple roles per contributor, rather than having to duplicate the contributor. Other changes from the now deprecated `role` are that it recommendeds to follow an established vocabulary and has new suggested values ([#18](https://github.com/frictionlessdata/datapackage/pull/18)).

##### New property `source.version`

[`source.version`](../../specifications/data-package/#sources) allows to specify which version of a source was used ([#10](https://github.com/frictionlessdata/datapackage/pull/10)).

### Data Resource

##### Updated property `name`

[name](../../specifications/data-resource/#name-required) now allows any string. It previously required the name to only consist of lowercase alphanumeric characters plus `.`, `-` and `_`. The property is still required and must be unique among resources ([#27](https://github.com/frictionlessdata/datapackage/pull/27)).

##### Updated property `encoding`

[encoding](../../specifications/data-resource/#encoding)'s definition has been updated to support binary formats like Parquet ([#15](https://github.com/frictionlessdata/datapackage/pull/15)).

##### Updated property `path`

[path](../../specifications/data-resource/#path-or-data-required) now explicitely forbids hidden folders (starting with dot `.`) ([#19](https://github.com/frictionlessdata/datapackage/pull/19)).

### Table Dialect

[Table Dialect](../../specifications/table-dialect) is a new specification that superseeds and extends the CSV Dialect specification. It support other formats like JSON or Excel ([#41](https://github.com/frictionlessdata/datapackage/pull/41)).

### Table Schema

##### Updated property `primaryKey`

[`primaryKey`](../../specifications/table-schema/#primarykey) should now always be an array of strings, not a string ([#28](https://github.com/frictionlessdata/datapackage/pull/28)).

##### Updated property `foreignKeys`

[`foreignKeys`](../../specifications/table-schema/#foreignkeys) should now always be an array of strings, not a string ([#28](https://github.com/frictionlessdata/datapackage/pull/28)).

`foreignKeys.reference.resource` can now be omitted for self-referencing foreign keys. Previously it required setting resource to an empty string ([#29](https://github.com/frictionlessdata/datapackage/pull/29)).

##### New property `fieldsMatch`

[fieldsMatch](../../specifications/table-schema/#fieldsmatch) allows to specify how fields in a Table Schema match the fields in the data source. The default (`exact`) matches the Data Package v1 behaviour, but other values (e.g. `subset`, `superset`) allow to define fewer or more fields and match on field names. This new property extends and makes explicit the `schema_sync` option in Frictionless Framework ([#39](https://github.com/frictionlessdata/datapackage/pull/39)).

##### New property `uniqueKeys`

[`uniqueKeys`](../../specifications/table-schema/#uniquekeys) allows to specify which fields are required to have unique logical values. It is an alternative to `field.contraints.unique` and is modelled after the corresponding SQL feature ([#30](https://github.com/frictionlessdata/datapackage/pull/30)).

##### New field property `missingValues`

[`missingValues`](../../specifications/table-schema/#missingvalues) allows to specify missing values per field, and overwrites `missingValues` specified at a resource level ([#24](https://github.com/frictionlessdata/datapackage/pull/24)).

##### Updated field type `datetime`

The default `format` for [`datetime`](../../specifications/table-schema/#datetime) is now extended to allow optional milliseconds and timezone parts ([#23](https://github.com/frictionlessdata/datapackage/pull/23)).

##### Updated field type `geopoint`

The definition for [`geopoint`](../../specifications/table-schema/#geopoint) now clarifies that floating point numbers can be used for coordinate definitions ([#14](https://github.com/frictionlessdata/datapackage/pull/14)).

##### Updated field type `any`

[`any`](../../specifications/table-schema/#any) is now the default field type and clarifies that the field type should not be inferred if not provided ([#13](https://github.com/frictionlessdata/datapackage/pull/13)).

##### New field type `list`

[`list`](../../specifications/table-schema/#list) allows to specify fields containing collections of primary values separated by a delimiter (e.g. `value1,value2`) ([#38](https://github.com/frictionlessdata/datapackage/pull/38)).

##### Updated constraints `minimum` and `maximum`

[`minimum`](../../specifications/table-schema/#minimum) and [`maximum`](../../specifications/table-schema/#maximum) are now extended to support the `duration` field type ([#8](https://github.com/frictionlessdata/datapackage/pull/8)).

##### New constraint `jsonschema`

[`jsonSchema`](../../specifications/table-schema/#jsonschema) can be used for the `object` and `array` field types ([#32](https://github.com/frictionlessdata/datapackage/pull/32)).

##### New constraints `exclusiveMinimum` and `exclusiveMaximum`

[`exclusiveMinimum`](../../specifications/table-schema/#exclusiveminimum) and [`exclusiveMaximum`](../../specifications/table-schema/#exclusivemaximum) can be used to specify exclusive minimum and maximum values ([#11](https://github.com/frictionlessdata/datapackage/pull/11)).

##### New integer property `groupChar`

[`groupChar`](../../specifications/table-schema/#integer) can now be used for the `integer` field type. It was already available for `number` ([#6](https://github.com/frictionlessdata/datapackage/pull/6)).

## v1.0

> September 5, 2017

Please refer to the the [Data Package (v1) website](https://specs.frictionlessdata.io/).
