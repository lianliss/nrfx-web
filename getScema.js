const fetch = require('node-fetch');
const fs = require('fs');

const domain = process.argv.pop() === '--stage' ? 'api.narfex.com' : 'stage.bitcoinbot.pro';
fetch(`https://${domain}/api/v1/documentation/schema`)
  .then(res => res.json())
  .then(schema => {
    const content = '// Файл был сгенерирован автоматически командой npm run getSchema\n// eslint-disable-next-line\nexport default ' + JSON.stringify(schema, null, 2);
    fs.writeFileSync("./src/services/apiSchema.js", content);
  });
