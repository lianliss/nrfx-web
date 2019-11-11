Default icon
```js
<ActionSheet items={[
  { title: 'Create', onClick: console.log },
  { title: 'Edit', onClick: console.log },
  { title: 'Delete', type: 'destructive', onClick: console.log }
]} />
```

Left position
```js
<ActionSheet position="left" items={[
  { title: 'Create', onClick: console.log },
  { title: 'Edit', onClick: console.log },
  { title: 'Delete', type: 'destructive', onClick: console.log },
]} />
```

Custom
```js
import Button from '../Button/Button';

<ActionSheet items={[
  { title: 'Create', onClick: console.log },
  { title: 'Edit', onClick: console.log },
  { title: 'Delete', type: 'destructive', onClick: console.log },
]}>
  <Button>Action sheet</Button>
</ActionSheet>
```