DOCKER="docker"
IMAGE_NAME="kiansheik/guarana-seha"
TAG_NAME="production"

REPOSITORY=""
FULL_IMAGE_NAME=${IMAGE_NAME}:${TAG_NAME}

lint:
	echo "No linting yet"
push:
	make lint
	git add .
	git commit
	git push origin HEAD