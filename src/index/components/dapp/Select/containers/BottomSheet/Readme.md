```js
const fiatsOptions = [
  {
    symbol: 'RUB',
    address: '0x0000',
    logoURI: 'https://site.com',
  },
].map((fiat) =>
  BottomSheetSelect.option(fiat.symbol, fiat.address, fiat.logoURI)
);

<BottomSheetSelect
  options={regionsOptions}
  value={regionsOptions[0].value}
  width={164}
  isSearchable
/>;
```
