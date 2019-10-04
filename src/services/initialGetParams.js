const initGetParams = ((location) => {
  let params = {}, search = location.search.slice(1).split('&');
  if (search[0] !== "") {
    search.forEach((param) => {
      param = param.split("=");
      params[param[0]] = param[1];
    });
  }

  return {
    params,
    hash: location.hash.slice(1)
  };
})(window.location);

export default initGetParams;