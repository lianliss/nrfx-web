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
  selected={value}
  onChange={onChange}
  tabs={[
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
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