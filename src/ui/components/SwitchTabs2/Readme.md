Classic

```js
import { useState } from "react";
const [value, onChange] = useState("static");
<SwitchTabs2
  selected={value}
  onChange={onChange}
  tabs={[
    { value: "static", label: "Static" },
    { value: "dynamic", label: "Dynamic" }
  ]}
/>;
```

More items

```js
import { useState } from "react";
const [value, onChange] = useState("2");
<SwitchTabs2
  selected={value}
  onChange={onChange}
  tabs={[
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" }
  ]}
/>;
```

Disabled

```js
<SwitchTabs2
  disabled
  selected="static"
  onChange={console.log}
  tabs={[
    { value: "static", label: "Static" },
    { value: "dynamic", label: "Dynamic" }
  ]}
/>
```

ultra_small

```js
<div style={{ maxWidth: 300 }}>
  <SwitchTabs2
    selected={50}
    onChange={console.log}
    size="ultra_small"
    tabs={[
      { value: 25, label: "25%" },
      { value: 50, label: "50%" },
      { value: 75, label: "75%" },
      { value: 100, label: "100%" }
    ]}
  />
</div>
```

ultra_small & secondary

```js
<div style={{ maxWidth: 300 }}>
  <SwitchTabs2
    selected={50}
    onChange={console.log}
    size="ultra_small"
    type="secondary"
    tabs={[
      { value: 25, label: "25%" },
      { value: 50, label: "50%" },
      { value: 75, label: "75%" },
      { value: 100, label: "100%" }
    ]}
  />
</div>
```
