---
title: Changelog
sidebar:
  order: 10
---

It is a full changelog for Data Package Standard.

## v2.0.0-draft.1

> April 1, 2024

### Overview

### Changes

#### Specifications

- **Forbade hidden folders in the spec (already forbidden in JSON Schema)** ([#19](https://github.com/frictionlessdata/datapackage/pull/19))
- **Added `source.version` property** ([#10](https://github.com/frictionlessdata/datapackage/pull/10))
- **Made `contributor.title` and `source.title` not required** ([#7](https://github.com/frictionlessdata/datapackage/pull/7))

#### Data Package

- **Added `contributor.roles` property** ([#18](https://github.com/frictionlessdata/datapackage/pull/18))
- **Added `contributor.given/familyName`** ([#20](https://github.com/frictionlessdata/datapackage/pull/20))
- **Fixed `version` property in Data Package profile** ([#3](https://github.com/frictionlessdata/datapackage/pull/3))

#### Data Resource

##### Relaxed `resource.name` rules but keep it required and unique

This change relaxes requirements to `resource.name` allowing it to be any string. This property still needs to present and be unique among resources.

> [Pull Request -- #27](https://github.com/frictionlessdata/datapackage/pull/27)

##### Clarified `resource.encoding` property

This change updates the `resource.encoding` property definition to properly support binary file formats like Parquet.

> [Pull Request -- #15](https://github.com/frictionlessdata/datapackage/pull/15)

#### Table Schema

##### Added `schema.fieldsMatch` property

This change clarifies the default field matching behaviour and adds new modes for matching data source and Table Schema fields. Please read more about [`schema.fieldsMatch`](../../specifications/table-schema/#fieldsmatch) property.

> [Pull Request -- #39](https://github.com/frictionlessdata/datapackage/pull/39)

##### Changed default field type to be `any`

This change makes field type to be `any` by default and ensures that the field type is not inferred if not provided. Please read more about [`any`](../../specifications/table-schema/#any) type.

> [Pull Request -- #13](https://github.com/frictionlessdata/datapackage/pull/13)

##### Added `uniqueKeys` property

> [Pull Request -- #30](https://github.com/frictionlessdata/datapackage/pull/30)

This change adds `uniqueKeys` property directly modelled after corresponding SQL feature. Please read more about [`schema.uniqueKeys`](../../specifications/table-schema/#uniquekeys) property.

##### Added `field.missingValues`

This change adds a property that allows to specify missing values individually per field. Please read more about [`field.missingValues`](../../specifications/table-schema/#missingvalues) property.

> [Pull Request -- #24](https://github.com/frictionlessdata/datapackage/pull/24)

##### Added new `list` field type for typed collections, lexically delimiter-based

> [Pull Request -- #38](https://github.com/frictionlessdata/datapackage/pull/38)

This change adds a new field type `list`. Please read more about [`list`](../../specifications/table-schema/#list) type.

- **Allowed omitting `foreignKey.reference.resource` for self-referencing** ([#29](https://github.com/frictionlessdata/datapackage/pull/29))
- **Discouraged usage of unnecessary union types** ([#28](https://github.com/frictionlessdata/datapackage/pull/28))
- **Added `jsonSchema` constraint to object and array fields** ([#32](https://github.com/frictionlessdata/datapackage/pull/32))
- **Updated date/time definitions** ([#23](https://github.com/frictionlessdata/datapackage/pull/23))
- **Support groupChar for integer field type** ([#6](https://github.com/frictionlessdata/datapackage/pull/6))
- **Supported exclusive constraints** ([#11](https://github.com/frictionlessdata/datapackage/pull/11))
- **Clarified that `geopoint` is number-based** ([#14](https://github.com/frictionlessdata/datapackage/pull/14))
- **Fixed duration constraint** ([#8](https://github.com/frictionlessdata/datapackage/pull/8))

## v1.0.0

> September 5, 2017

Please refer to the the [Data Package (v1) website](https://specs.frictionlessdata.io/).
