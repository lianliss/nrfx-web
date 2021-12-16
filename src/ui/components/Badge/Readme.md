Button

```js
import Button from "../Button/Button";

<Badge count={15}>
  <Button size="small">Button</Button>
</Badge>;
```

Icon

```js
import SVG from "utils/svg-wrap";
<Badge count={3}>
  <SVG src={require("src/asset/24px/bell.svg")} />
</Badge>;
```

Text

```js
import SVG from "utils/svg-wrap";
<Badge count="new">Text</Badge>;
```
