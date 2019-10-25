```js
<SwitchTabs
  selected="static"
  onChange={console.log}
  tabs={[
    { value: 'static', label: 'Static' },
    { value: 'dynamic', label: 'Dynamic' }
  ]}
/>
```

```js
import { useState } from 'react';
const [value, onChange] = useState('eth');


<SwitchTabs
  currency={value}
  selected={value}
  onChange={onChange}
  tabs={[
    { value: 'btc', label: 'BTH' },
    { value: 'eth', label: 'ETH' },
    { value: 'ltc', label: 'LTC' }
  ]}
/>
```