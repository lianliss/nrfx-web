
normal

```js
import Button from '../Button/Button';

<div>
    <Input placeholder="Placeholder" />
    <br />
    <Input indicator="USD" />
    <br />
    <Input placeholder="indicator component" indicator={<Button type="ultra_small" onClick={console.log}>component</Button>} />
    <br />
    <Input value="Value" />
    <br />
    <Input placeholder="Placeholder" multiLine />
    <br />
    <Input type="password" placeholder="Password" />
    <br />
    <Input onTextChange={console.log} type="number" placeholder="Number" />
    <br />
    <Input onTextChange={console.log} cell type="number" placeholder="Number call" />
</div>
```
