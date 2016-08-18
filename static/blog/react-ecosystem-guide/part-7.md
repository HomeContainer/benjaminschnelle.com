# In Depth Beginner's Guide to the React Ecosystem - Part 7

## 10. Immutable.js
If you remember from the last post, I mentioned that with Redux best practice is to never modify existing state, but to always return a new object.  Redux is written under the assumption that the `state` object passed to your `reducer` will never be modified (it is immutable) so if you do modify it you'll likely break something.

Because of this and the fact that immutable data is easier to reason about, introducing a library like Immutable.js is a good idea.  If you haven't surmised what Immutable.js actually is, let me tell you: it's a library of immutable objects!  Some of the syntax can be a little verbose, but the benefits are quite nice once you get into the swing of using it.

```bash
npm install --save immutable
```

```javascript
// plain JS
// --------------------------------------
const person = {
  name: 'Rick',
  age: '45'
}
// create shallow copy of person
const newPerson = Object.assign({}, person);
// update and return new state
newPerson.name = 'Bobby';
return newPerson;

// Immutable.js
// --------------------------------------
import { Map as iMap } from 'immutable';
const person = iMap({
  name: 'Rick',
  age: '45'
})
// update and return new state
return person.set('name', 'Bobby');

```

The benefits become even more apparent when you're mutating deeply nested data as well.

For now, we just want to make Immutable.js available in our project because we'll use it in the future once we begin using Redux more heavily.

Let's commit and close our next GitHub issue.

```bash
git add .
git commit -m 'added Immutable.js...closes #9'
git push origin master
```
