export const getLogo = (logo) => {
  try {
    return require(`src/asset/logo/partners/${logo}.svg`);
  } catch (error) {
    console.log('[getLogo]', error);

    return null;
  }
};
