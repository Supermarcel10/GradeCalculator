const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const cors = require('cors');
const app = express();

app.use(cors());


app.get('/api/table', (req, res) => {
	try {
		const yamlData = fs.readFileSync('data/year1.yaml', 'utf8');
		const parsedData = yaml.load(yamlData);
		res.json(parsedData);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error parsing YAML file');
	}
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
