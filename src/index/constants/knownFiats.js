const KNOWN_FIATS = [
  {
    name: "United States Dollar on Narfex",
    symbol: "USD",
    address: "0xc0Bd103de432a939F93E1E2f8Bf1e5C795774F90",
    chainId: 56,
    decimals: 18,
    logoURI: "https://static.narfex.com/img/currencies/dollar.svg"
  },
  {
    name: "Euro on Narfex",
    symbol: "EUR",
    address: "0xa702e05965FEd09FDDFE4ca182b0915CdBa367c8",
    chainId: 56,
    decimals: 18,
    logoURI: "https://static.narfex.com/img/currencies/try.svg"
  },
  {
    name: "Russian Ruble on Narfex",
    symbol: "RUB",
    address: "0xC7b9dA3D064a918B8e04B23AEEdBD64CBa21D37d",
    chainId: 56,
    decimals: 18,
    logoURI: "https://static.narfex.com/img/currencies/rubles.svg"
  },
  {
    name: "Ukrainian Hryvnia on Narfex",
    symbol: "UAH",
    address: "0xcAA5eb94f5339a598580A68f88F1471c36599dDA",
    chainId: 56,
    decimals: 18,
    logoURI: "https://static.narfex.com/img/currencies/uah-gryvnya.svg"
  },
  {
    name: "Chinese Yuan on Narfex",
    symbol: "CNY",
    address: "0xA61Feb03EB111373a84A4b303Ea391140fa3291c",
    chainId: 56,
    decimals: 18,
    logoURI: "https://static.narfex.com/img/currencies/yuan-cny.svg"
  },
  {
    name: "Indonesian Rupiah on Narfex",
    symbol: "IDR",
    address: "0x814b62d5a157498145c59820763430Ce7558bA6e",
    chainId: 56,
    decimals: 18,
    logoURI: "https://static.narfex.com/img/currencies/indonesian-rupiah.svg"
  },
  {
    name: "Polish Zloty on Narfex",
    symbol: "PLN",
    address: "0x815fe8056d867052bde314018166f144c11f6c4c",
    chainId: 56,
    decimals: 18,
    logoURI: "https://static.narfex.com/img/currencies/pln.svg"
  },
  {
    name: "Thai Baht on Narfex",
    symbol: "THB",
    address: "0xf21311db1d6ae2538dc86a0bbc751c53439e0895",
    chainId: 56,
    decimals: 18,
    logoURI: "https://static.narfex.com/img/currencies/thb.svg"
  },
  {
    name: "Vietnamese Dong on Narfex",
    symbol: "VND",
    address: "0x9a630ef70abf193bb24b082d7a10c515c0e847c6",
    chainId: 56,
    decimals: 18,
    logoURI: "https://static.narfex.com/img/currencies/vnd.svg"
  },
  {
    name: "Canadian Dollar on Narfex",
    symbol: "CAD",
    address: "0x1ade4f9b177a42b160cb304ce402f1daabfb2d2d",
    chainId: 56,
    decimals: 18,
    logoURI: "https://static.narfex.com/img/currencies/cad.svg"
  },
  {
    name: "Turkish Lire on Narfex",
    symbol: "TRY",
    address: "0x8845161A0EA235F9e94c815241A0e63AcbaC144B",
    chainId: 56,
    decimals: 18,
    logoURI: "https://static.narfex.com/img/currencies/try.svg"
  },
].map(fiat => ({
  ...fiat,
  isFiat: true,
}));

export default KNOWN_FIATS;
