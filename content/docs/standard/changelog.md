---
title: Changelog
sidebar:
  order: 10
---

It is a full changelog for Data Package Standard.

## v2.0.0-draft.1

> April 1, 2024

- **Added `contributor.roles` property** ([#18](https://github.com/frictionlessdata/datapackage/pull/18))
- **Changed default field type to be `any`** ([#13](https://github.com/frictionlessdata/datapackage/pull/13))
- **Add `schema.fieldsMatch` property; clarified extra/non-specified fields in Table Schema** ([#39](https://github.com/frictionlessdata/datapackage/pull/39))
- **Not require `foreignKey.reference.resource` for self-referencing** ([#29](https://github.com/frictionlessdata/datapackage/pull/29))
- **Added `contributor.given/familyName`** ([#20](https://github.com/frictionlessdata/datapackage/pull/20))
- **Discourage usage of unnecessary union types in Table Schema** ([#28](https://github.com/frictionlessdata/datapackage/pull/28))
- **Added new `list` field type for typed collections, lexically delimiter-based** ([#38](https://github.com/frictionlessdata/datapackage/pull/38))
- **Added `jsonSchema` constraint to object and array fields** ([#32](https://github.com/frictionlessdata/datapackage/pull/32))
- **Relax `resource.name` rules but keep it required and unique** ([#27](https://github.com/frictionlessdata/datapackage/pull/27))
- **Added `uniqueKeys` property to Table Schema** ([#30](https://github.com/frictionlessdata/datapackage/pull/30))
- **Updated date/time definitions** ([#23](https://github.com/frictionlessdata/datapackage/pull/23))
- **Forbid hidden folders in the spec (already forbidden in JSON Schema)** ([#19](https://github.com/frictionlessdata/datapackage/pull/19))
- **Support groupChar for integer field type** ([#6](https://github.com/frictionlessdata/datapackage/pull/6))
- **Added field.missingValues** ([#24](https://github.com/frictionlessdata/datapackage/pull/24))
- **Added version property to `source`** ([#10](https://github.com/frictionlessdata/datapackage/pull/10))
- **Clarified `resource.encoding` property** ([#15](https://github.com/frictionlessdata/datapackage/pull/15))
- **Made `contributor.title` and `source.title` not required** ([#7](https://github.com/frictionlessdata/datapackage/pull/7))
- **Support exclusive constraints in Table Schema** ([#11](https://github.com/frictionlessdata/datapackage/pull/11))
- **Clarified that `geopoint` is number-based** ([#14](https://github.com/frictionlessdata/datapackage/pull/14))
- **Fixed duration constraint** ([#8](https://github.com/frictionlessdata/datapackage/pull/8))
- **Fixed `version` property in Data Package profile** ([#3](https://github.com/frictionlessdata/datapackage/pull/3))

## v1.0.0

> September 5, 2017

Please refer to the the [Data Package (v1) website](https://specs.frictionlessdata.io/).
