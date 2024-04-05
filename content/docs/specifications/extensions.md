---
title: Extensions
sidebar:
  order: 5
---

<table>
  <tr>
    <th>Authors</th>
    <td>Rufus Pollock, Paul Walsh, Adam Kariv, Evgeny Karev, Peter Desmet</td>
  </tr>
</table>

Data Package Standard provides rich extensibility features for domain-specific needs.

## Language

The key words `MUST`, `MUST NOT`, `REQUIRED`, `SHALL`, `SHALL NOT`, `SHOULD`, `SHOULD NOT`, `RECOMMENDED`, `MAY`, and `OPTIONAL` in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt)

## Introduction

Data Package Standard provides a rich set of metadata and data features for general applications. At the same time, Data Package Standard at its core is domain-agnostic and does not provide any built-in features to describe metadata in specific knowledge areas such as biology or medicine.

A domain-specific extension is the way to enrich Data Package's metadata to meet specific needs of a knowledge domain. For example, there are some prominent Data Package extensions:

- [Camera Trap Data Package](https://camtrap-dp.tdwg.org/)
- [Fiscal Data Package](https://fiscal.datapackage.org)

## Extension

Data Package Standard has a simple yet powerful extension mechanism based on the [Profile](../glossary/#profile) concept.

A custom profile can be provided as a `$schema` property in a descriptor for each of the core specifications: Data Package, Data Resource, Table Dialect, and Table Schema. Having a profile instructs implementation to validate a descriptor using JSON Schema rules from the profile. This system empowers rich metadata extensibility features that can be used in many domain-specific applications.

Usually,
