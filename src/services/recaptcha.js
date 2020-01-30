export default (token) => {
  return new Promise((resolve, reject) => {
    window.grecaptcha.execute(token).then(token => {
      resolve(token);
    })
  });
}
