# Utills

Utills includes function that must be pure and maximum universal.
By universal, I mean an availability to make Ctrl + C and Ctrl + V and function will be work even in another project without any additional settings.
So far, the exception is only for TypeScript imports.

They can't get access to outside of the utills folder.

Example 1

```javascript
import NAME from '../constants';

const someFunction = () => `Welcome and hi from ${NAME}`; // ❌
```

```javascript
const someFunction = (name) => `Welcome and hi from ${name}`; // ✅
```

Example 2

```javascript
import { doubleCalc } from '../libs';

const someFunction = (a, b) => doubleCalc(a + b); // ❌
```

```javascript
import { calc } from '..';

const someFunction = (a, b) => calc(a, b) * 2; // ✅
```

