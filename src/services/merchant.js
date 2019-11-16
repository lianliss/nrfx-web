export function open(url) {
  const width = 700;
  const height = 600;
  const { screen } = window;
  const left = screen.width / 2 - width / 2;
  const top = screen.height / 2 - height / 2;

  return new Promise((resolve, reject) => {
    const ref = window.open(
      url,
      '_blank',
      [
        ['toolbar', 'yes'],
        ['scrollbars', 'yes'],
        ['resizable', 'yes'],
        ['top', top],
        ['left', left],
        ['width', width],
        ['height', height],
      ].map(i => i.join('=')).join(',')
    );
    const interval = setInterval(() => {
      try {
        if (ref.window.location.origin === window.location.origin) { // TODO check routes
          clearInterval(interval);
          ref.close();
          resolve();
        } else if (ref.closed) {
          clearInterval(interval);
          reject();
        } else {
          // return reject();
        }
      } catch (e) {

      }
    }, 500);
  });
}