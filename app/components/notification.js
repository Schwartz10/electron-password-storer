import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const createNotification = (type, message, title, time, callback = null) =>
  NotificationManager[type](message, title, time, callback);

export default createNotification;

// NotificationManager.info('Info message');
// NotificationManager.success('Success message', 'Title here');
// NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
// NotificationManager.error('Error message', 'Click me!', 5000, () => {})

