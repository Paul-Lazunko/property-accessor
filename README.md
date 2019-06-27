#Property Accessor

Install package:
```
yarn add property-accessor
```

Usage example:

```
const PropertyAccessor = require('property-accessor');

let target = {
  users: [
    {
      firstName: 'John',
      surName: 'Doe',
      age: 25
    },
    {
      firstName: 'Ann',
      surName: 'Doe',
      age: 23
    }
  ]
};

let proxy = new PropertyAccessor(target);

console.log(proxy.get('users[0].firstName'));
// John

proxy.set('users[1].age', 24);
console.log(proxy.get('users[1].age'));
// 24

target.users[0].age = 26;
console.log(proxy.get('users[0].age'));
// 26

proxy.set('users[0].children[0]', { name: 'Nick', age: 1 });
console.log(target.users[0].children);
//  [ { name: 'Nick', age: 1 } ]
```
