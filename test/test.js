const assert = require('assert');
const { PropertyAccessor } = require('../dist');

const target = {
  a: [
    {
      b: [
        {
          c: 'd',
          e: 1,
        },
        {
          f: 'g',
          h: 2,
        },
      ],
    },
  ],
};

assert.equal(PropertyAccessor.get('a[0]b[0].c', target), 'd');
assert.equal(PropertyAccessor.get('a[0]b[0].e', target), 1);
assert.equal(PropertyAccessor.get('a[0]b[1].f', target), 'g');
assert.equal(PropertyAccessor.get('a[0]b[2].f', target), undefined);
assert.equal(PropertyAccessor.set('a[0]b[5].f', 3, target), true);
assert.equal(PropertyAccessor.set('a[1]b.c.d.f', 3, target), true);
assert.equal(PropertyAccessor.get('a[0]b.length', target), 6);

const propertyAccessor = new PropertyAccessor({ a: [{ b: 2 }] });

assert.equal(propertyAccessor.get('a[0].b'), 2);
assert.equal(propertyAccessor.set('a[0].c', 3), true);

console.log('tests passed');
