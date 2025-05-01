# Property Accessor

This utility provides methods to **evaluate and manipulate deeply nested properties** of objects using string-based paths like:

```
"prop1[0].prop2[9]['name']"
```

You can use it to **get** or **set** values dynamically within complex object structures.

---

## Installation

```bash
npm i property-accessor
```

---

## Methods

### `PropertyAccessor.get(key: string, target: any): any`

Retrieves a value from the object using a dot/bracket notation path.

- **Parameters:**
  - `key` (`string`): Property path (e.g. `"prop1.prop2[0]['name']"`)
  - `target` (`object`): The target object to evaluate

---

### `PropertyAccessor.set(key: string, value: any, target: any): boolean`

Sets a value at the given path. Returns `true` on success, `false` otherwise. 
**Automatically creates nested objects and arrays as needed**.

- **Parameters:**
  - `key` (`string`): Property path (e.g. `"prop1.prop2[0]['name']"`)
  - `value` (`any`): Value to set
  - `target` (`object`): The target object to modify

---

## Usage Example

```js
const { PropertyAccessor } = require('property-accessor');

const target = {
  users: [
    { firstName: 'John', surName: 'Doe', age: 25 },
    { firstName: 'Ann', surName: 'Doe', age: 23 }
  ]
};

console.log(PropertyAccessor.get('users[0].firstName', target));
// Output: John

PropertyAccessor.set('users[1].age', 24, target); // true
console.log(PropertyAccessor.get('users[1].age', target));
// Output: 24

PropertyAccessor.set('users[0].children[0]', { name: 'Nick', age: 1 }, target);
console.log(target.users[0].children);
// Output: [ { name: 'Nick', age: 1 } ]
```

---

## Optional: Instance-Based Usage

For backward compatibility, you can also create an instance and bind a specific target via the constructor:

```js
const propertyAccessor = new PropertyAccessor({ a: [{ b: 3 }] });
propertyAccessor.set('a[1].b', 4);
```

---
