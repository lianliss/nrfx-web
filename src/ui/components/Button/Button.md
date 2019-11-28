Button example:

```js
<Button>Button</Button>
<Button type="secondary">Secondary</Button>
<Button type="outline">Outline</Button>
<Button type="negative">Negative</Button>
<Button type="negative_outline">Negative outline</Button>
<Button type="lite">Button</Button>
```

Rounded

```js
<Button rounded>Button</Button>
<Button rounded type="secondary">Secondary</Button>
<Button rounded type="outline">Outline</Button>
<Button rounded type="negative">Negative</Button>
<Button rounded type="negative_outline">Negative outline</Button>
<Button rounded type="lite">Button</Button>
```

Disabled

```js
<Button disabled>Button</Button>
<Button disabled type="secondary">Secondary</Button>
<Button disabled type="outline">Outline</Button>
<Button disabled type="negative">Negative</Button>
<Button disabled type="negative_outline">Negative outline</Button>
<Button disabled type="lite">Button</Button>
```

state="loading"
```js
<Button state="loading">Button</Button>
<Button state="loading" type="secondary">Secondary</Button>
<Button state="loading" type="outline">Outline</Button>
<Button state="loading" type="negative">Negative</Button>
<Button state="loading" type="negative_outline">Negative outline</Button>
<Button state="loading" type="lite">Button</Button>
```


size="large"
```js
<Button size="large">Button</Button>
<Button size="large" type="secondary">Secondary</Button>
<Button size="large" type="outline">Outline</Button>
<Button size="large" type="negative">Negative</Button>
<Button size="large" type="negative_outline">Negative outline</Button>
<Button size="large" type="lite">Button</Button>
```

size="middle"
```js
<Button size="middle">Button</Button>
<Button size="middle" type="secondary">Secondary</Button>
<Button size="middle" type="outline">Outline</Button>
<Button size="middle" type="negative">Negative</Button>
<Button size="middle" type="negative_outline">Negative outline</Button>
<Button size="middle" type="lite">Button</Button>
```

size="small"
```js
<Button size="small">Button</Button>
<Button size="small" type="secondary">Secondary</Button>
<Button size="small" type="outline">Outline</Button>
<Button size="small" type="negative">Negative</Button>
<Button size="small" type="negative_outline">Negative outline</Button>
<Button size="small" type="lite">Button</Button>
```

size="ultra_small"
```js
<Button size="ultra_small">Button</Button>
<Button size="ultra_small" type="secondary">Secondary</Button>
<Button size="ultra_small" type="outline">Outline</Button>
<Button size="ultra_small" type="negative">Negative</Button>
<Button size="ultra_small" type="negative_outline">Negative outline</Button>
<Button size="ultra_small" type="lite">Button</Button>
```

Currency color
```js
const currency = {
  gradient: ["#896ADF", "#98B1F1"],
  color: '#908EE8',
};

<div>
    <Button currency={currency}>Button</Button>
    <Button currency={currency} type="secondary">Secondary</Button>
    <Button currency={currency} type="outline">Outline</Button>
    <Button currency={currency} type="negative">Negative</Button>
    <Button currency={currency} type="negative_outline">Negative outline</Button>
    <Button currency={currency} type="lite">Button</Button>
</div>
```