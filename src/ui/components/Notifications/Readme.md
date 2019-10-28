```js
import Notifications, { Notification } from './Notifications';

<div style={{background: '#eee', padding: '1em'}}>
<Notification
    icon="https://unsplash.it/200/200"
    unread={true}
    actions={[]}
    onAction={console.log}
    message="Message"
    date="12 Apr 2030"
/>
</div>
```