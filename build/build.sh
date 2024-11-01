#!/usr/bin/env bash
set -e

DIR=${BASH_SOURCE%/*}
ROOT=$(pwd)
source "${DIR}"/functions.sh

INSTALL_COMMAND="install"

if [[ "$1" == --ci ]]; then
  INSTALL_COMMAND="ci"
fi


installService "client"
installService "server"
installService "libraries"