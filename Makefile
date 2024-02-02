SERVICE:=flat/cms-mono
VERSION=$(shell cat version)
COMMITID=$(shell git rev-parse --short HEAD)
DOCKER_TAG=honestpro.online:9482/$(SERVICE):${VERSION}

bump: version
	@node -e "fs.writeFileSync('version', fs.readFileSync('version', 'utf8').trim().replace(/(\d+)$$/, val => +val + 1))"
	@echo "Bump version:"
	@cat version
	@echo
	@git add version

build: Dockerfile version
	@echo "Build & push docker image with specified tag version"
	DOCKER_BUILDKIT=1 docker build \
		-f Dockerfile -t ${DOCKER_TAG} .

run: version
	docker run -ti ${DOCKER_TAG}:${VERSION}

public:
	@echo "Push to gitlab with specified tag version"
	$(MAKE) build
	git tag -a v${VERSION} -m "v${VERSION}"
	git push origin refs/tags/v${VERSION}
	docker push ${DOCKER_TAG}

dev-image:
	@echo $(COMMITID)
	DOCKER_BUILDKIT=1 docker build \
		-f Dockerfile -t ${DOCKER_TAG}-${COMMITID} .
	docker push ${DOCKER_TAG}-${COMMITID}
