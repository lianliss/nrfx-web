swagger:
	- rm swagger.yaml
	curl -o swagger.yaml https://bitcoinbot.pro/api/v1/swagger_export
	- rm -r ./src/swagger/*
	swagger-codegen generate -i swagger.yaml -l javascript -o ./src/swagger/ -t swagger_templates/
	rm swagger.yaml
swagger_server:
	- rm swagger.yaml
	curl -o swagger.yaml https://bitcoinbot.pro/api/v1/swagger_export
	- rm -r ./src/swagger/*
	java -jar swagger-codegen-cli.jar generate -i swagger.yaml -l javascript -o ./src/swagger/ -t swagger_templates/
	rm swagger.yaml