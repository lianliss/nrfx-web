get_schema:
	- rm ./src/services/apiSchema.js
	- echo "export default" > ./src/services/apiSchema.js
	- curl -s https://narfex.com/api/v1/documentation/schema >> ./src/services/apiSchema.js

deploy:
	npm run build
	gcloud app deploy
