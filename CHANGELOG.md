# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [2.5.1] - 2026-02-04

### Fixed

- handle quoted property names correctly in the flatKeyHelper

## [2.5.0] - 2026-01-16

### Added

- Added spaceReplacer to flatKeyHelper and flat method (to replace space characters)

## [2.4.0] - 2025-12-11

### Added

- Added delete method (both static and instance)

## [2.3.0] - 2025-05-20

### Fixed

- Decided to don't deal with float-like keys, since it is not possible to clarify parsing strategy for some cases

## [2.2.0] - 2025-05-19

### Fixed

- Fixed parsing keys when using floating numbers [final cut]

## [2.1.2] - 2025-05-19

### Fixed

- Fixed parsing keys when using floating numbers

## [2.1.1] - 2025-05-17

### Fixed

- Fixed flat method (incorrect key concatenation)

## [2.1.0] - 2025-05-17

### Added

- Flat methods to receive flat object

## [2.0.1] - 2025-05-01

### Fixed

- Fixed changelog
- Refactored code

## [2.0.0] - 2025-05-01

### Added

- Re-implemented with TypeScript
- Added path validation
- Added tests

### Fixed

- Refactored code

## [1.0.0] - 2019-06-27

Basic package implementation with ES2015
