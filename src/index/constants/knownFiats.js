const ETHER_FIATS = [
  {
    name: "United States Dollar on Narfex",
    symbol: "USD",
    address: "0x26F80c0107070a8522ecdfae3a201719B1AFd4f8",
    chainId: 1,
    decimals: 6,
    logoURI: "https://static.narfex.com/img/currencies/dollar.svg"
  },
  {
    name: "Euro on Narfex",
    symbol: "EUR",
    address: "0x3095c04ca3C9c78CD0F9Ea2a3Fa0511998585Df9",
    chainId: 1,
    decimals: 6,
    logoURI: "https://static.narfex.com/img/currencies/euro.svg"
  },
  {
    name: "Russian Ruble on Narfex",
    symbol: "RUB",
    address: "0x5E11E947e69e8e6267e28C3db9425acd3AA4B489",
    chainId: 1,
    decimals: 6,
    logoURI: "https://static.narfex.com/img/currencies/rubles.svg"
  },
  {
    name: "Indonesian Rupiah on Narfex",
    symbol: "IDR",
    address: "0x5624e3A00DdfC29765b4e164cD0dC38bFf0FC3a6",
    chainId: 1,
    decimals: 6,
    logoURI: "https://static.narfex.com/img/currencies/indonesian-rupiah.svg"
  },
  {
    name: "Ukrainian Hryvnia on Narfex",
    symbol: "UAH",
    address: "0x4f272815fb641082b0291025016aebEBBC6Cf0D7",
    chainId: 1,
    decimals: 6,
    logoURI: "https://static.narfex.com/img/currencies/uah-gryvnya.svg"
  },
  {
    name: "Chinese Yuan on Narfex",
    symbol: "CNY",
    address: "0x0E6e3EbE8a1b34E30CE903fd82105FacdFB7965E",
    chainId: 1,
    decimals: 6,
    logoURI: "https://static.narfex.com/img/currencies/yuan-cny.svg"
  },
  {
    name: "Polish Zloty on Narfex",
    symbol: "PLN",
    address: "0x52a7bdBE5E7F285f34D2598cc5629Bc3279870Cb",
    chainId: 1,
    decimals: 6,
    logoURI: "https://static.narfex.com/img/currencies/pln.svg"
  },
  {
    name: "Thai Baht on Narfex",
    symbol: "THB",
    address: "0x109F210b62ee8fF19Fd847936338Bc51d22dc7E7",
    chainId: 1,
    decimals: 6,
    logoURI: "https://static.narfex.com/img/currencies/thb.svg"
  },
  {
    name: "Vietnamese Dong on Narfex",
    symbol: "VND",
    address: "0xE2f2D206fDB9FC6ddfbaEcA7D916493c5d76987F",
    chainId: 1,
    decimals: 6,
    logoURI: "https://static.narfex.com/img/currencies/vnd.svg"
  },
  {
    name: "Turkish Lire on Narfex",
    symbol: "TRY",
    address: "0x5542E28DccF582192c36C41C1c9Aad4e9Dd85e20",
    chainId: 1,
    decimals: 6,
    logoURI: "https://static.narfex.com/img/currencies/try.svg"
  },
  {
    name: "British Pound on Narfex",
    symbol: "GBP",
    address: "0xf90250932472961DC80a0a0654A074D3e37188bB",
    chainId: 1,
    decimals: 6,
    logoURI: "https://static.narfex.com/img/currencies/gbp-pound.svg"
  },
  {
    name: "Canadian Dollar on Narfex",
    symbol: "CAD",
    address: "0x7099f572f039E44ACc2D8E4e024FB5507bCFE252",
    chainId: 1,
    decimals: 6,
    logoURI: "https://static.narfex.com/img/currencies/cad.svg"
  },
];

const POLYGON_FIATS = [
  {
    name: "Russian Ruble on Narfex",
    symbol: "RUB",
    address: "0xA4b698FF2DA1fFc2eE02c2A2433E2AFF396c9e6d",
    chainId: 137,
    decimals: 6,
    logoURI: "https://static.narfex.com/img/currencies/rubles.svg"
  },
];

const ARBITRUM_FIATS = [
  {
    name: "Russian Ruble on Narfex",
    symbol: "RUB",
    address: "0xf9A45bbcf419A0660dac64517fe9625203415CFE",
    chainId: 42161,
    decimals: 6,
    logoURI: "https://static.narfex.com/img/currencies/rubles.svg"
  },
];

const TESTNET_FIATS = [
  {
    name: "Testnet United States Dollar",
    symbol: "USD",
    address: "0x6dBB65750a6BBE8A0CBD28257008C464bAbe4de6",
    chainId: 97,
    decimals: 18,
    logoURI: "https://static.narfex.com/img/currencies/dollar.svg"
  },
  {
    name: "Testnet Russian Ruble",
    symbol: "RUB",
    address: "0x93e9fefdb37431882D1A27bB794E73a191ebD945",
    chainId: 97,
    decimals: 18,
    logoURI: "https://static.narfex.com/img/currencies/rubles.svg"
  },
  {
    name: "Testnet Ukrainian Hryvnia",
    symbol: "UAH",
    address: "0xbD6a27FF04405F0111D8d811951b53B7cbb1bf95",
    chainId: 97,
    decimals: 18,
    logoURI: "https://static.narfex.com/img/currencies/uah-gryvnya.svg"
  },
];

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
    logoURI: "https://static.narfex.com/img/currencies/euro.svg"
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
  {
    name: "British Pound on Narfex",
    symbol: "GBP",
    address: "0xC00565016486b345BefdD38c6BEA3A4E497F7633",
    chainId: 56,
    decimals: 18,
    logoURI: "https://static.narfex.com/img/currencies/gbp-pound.svg"
  },
  ...TESTNET_FIATS,
  ...ETHER_FIATS,
  ...POLYGON_FIATS,
  ...ARBITRUM_FIATS,
].map(fiat => ({
  ...fiat,
  isFiat: true,
}));

export default KNOWN_FIATS;
