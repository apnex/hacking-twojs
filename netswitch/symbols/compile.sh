#!/bin/bash
if [[ -L $0 ]]; then
	if [[ $(readlink $0) =~ ^(.*)/([^/]+)$ ]]; then
		WORKDIR="${BASH_REMATCH[1]}"
		CALLED="${BASH_REMATCH[2]}"
	fi
else
	if [[ $0 =~ ^(.*)/([^/]+)$ ]]; then
		WORKDIR="${BASH_REMATCH[1]}"
		CALLED="${BASH_REMATCH[2]}"
	fi
fi

command() {
	local ARRAY=""
	rm symbols.js
	for FILE in ${WORKDIR}/*.js; do
		echo "${FILE}"
		ARRAY+=$(cat "${FILE}")
		ARRAY+=$'\n'
	done
	printf "%s\n" "${ARRAY}" > symbols.js
}

command

