#!/usr/bin/env bash
set -e

IMAGE="node:18.20.1-slim"

# --- on local machine
TTY="-it"
NPMRC_VOLUME="--volume "${HOME}/.npmrc":/usr/local/etc/npmrc"

# --- on azure pipeline
if [ -n "${AGENTID}" ]; then
    TTY=""
    NPMRC_VOLUME=""
fi

if [[ "${OSTYPE}" == "darwin"* ]]; then
    # Mac OS
    dockerGroupId=$(stat -f "%g" /var/run/docker.sock)
else
    # Linux
    dockerGroupId=$(stat -c "%g" /var/run/docker.sock)
fi

docker volume create --name npm-cache > /dev/null 2>&1
docker volume create --name npm-config > /dev/null 2>&1
docker run --rm --volume npm-cache:/.npm busybox chown -R "$(id -u)":"$(id -g)" /.npm
docker run --rm --volume npm-config:/.config busybox chown -R "$(id -u)":"$(id -g)" /.config

docker run --rm ${TTY} \
    ${NPMRC_VOLUME} \
    --volume "$(pwd)":/app \
    --volume npm-cache:/.npm \
    --volume npm-config:/.config \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --workdir="/app" \
    --group-add="${dockerGroupId}" \
    --user "$(id -u)":"$(id -g)" \
    --entrypoint="npm" \
    ${IMAGE} "$@"
