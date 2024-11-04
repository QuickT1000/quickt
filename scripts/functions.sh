#!/usr/bin/env bash
set -e

runCommandInService () {
  name=$1
  script=$2
  workinDir="${ROOT}"/${name}/
  cd ${workinDir}
  ${workinDir}${script}
}

installService () {
    name=$1
    echo "Installing ${name} ..."
    runCommandInService ${name} "scripts/npm.sh ${INSTALL_COMMAND}"
    echo "DONE."
}
