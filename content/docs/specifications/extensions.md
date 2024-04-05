---
title: Extensions
sidebar:
  hidden: true
  order: 5
---

<table>
  <tr>
    <th>Authors</th>
    <td>Rufus Pollock, Paul Walsh, Evgeny Karev, Peter Desmet</td>
  </tr>
</table>

For example, a descriptor for a data package extension might have the property `$schema` set to `https://raw.githubusercontent.com/organization/project/main/automotive-datapackage-2.3.json`.

If the `$schema` property indicates an extension, a data consumer `MUST` retrieve a Data Package version from the extension JSON Schema according the rules described in the [Extensions](../extensions) specification.
