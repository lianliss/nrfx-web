get_schema:
	- rm ./src/services/apiSchema.js
	- echo "export default" > ./src/services/apiSchema.js
	- curl -s https://stageapi.bitcoinbot.pro/api/v1/documentation/schema >> ./src/services/apiSchema.js

