normal

```js
import Button from "../Button/Button";

<div>
  <Input placeholder="Placeholder" />
  <br />
  <Input indicator="USD" />
  <br />
  <Input
    placeholder="indicator component"
    indicator={
      <Button type="ultra_small" onClick={console.log}>
        component
      </Button>
    }
  />
  <br />
  <Input value="Value" />
  <br />
  <Input placeholder="Placeholder" multiLine />
  <br />
  <Input type="password" placeholder="Password" />
  <br />
  <Input
    onTextChange={console.log}
    cell
    type="number"
    placeholder="Number call"
  />
</div>;
```

Number

```js
import { useState } from "react";
const [value, setValue] = useState("0.00");

<Input
  onTextChange={setValue}
  value={value}
  type="number"
  placeholder="0.00"
/>;
```

Indicator & description

```js
<Input description="Fee: 0.1%" indicator="USD" />
```

small

```js
<Input size="small" description="Fee: 0.1%" indicator="USD" />
```

reliability

```js
<Input reliability type="password" />
```

pattern

```js
import { useState } from "react";
const [value, setValue] = useState("");

<Input
  pattern={/[A-Za-z ,.'-]/g}
  value={value}
  onTextChange={setValue}
  indicator="A-Z"
/>;
```
