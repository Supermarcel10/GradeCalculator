const fs = require('fs');
const yaml = require('js-yaml');

try {
  const fileContents = fs.readFileSync('data/year2.yaml', 'utf8');
  const data = yaml.load(fileContents);
  console.log(data);
} catch (e) {
  console.error(e);
}
