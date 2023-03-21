```js
   const paymentsOptions = payments.map((payment) => ({
    label: payment.title,
    value: payment.code,
  }));
  const fiatsOptions = fiats.map((fiat) => ({
    label: fiat.symbol,
    value: fiat.symbol,
    icon: fiat.logoURI,
  }));


  <ButtonsSelect
    options={paymentsOptions}
    value={selectedPayment}
    onChange={setPayment}
    title="Payment"
    highlightedOptions={[0]}
  />
  <ButtonsSelect
    options={fiatsOptions}
    value={selectedFiat}
    onChange={setFiat}
    title="Fiat"
  />
```
