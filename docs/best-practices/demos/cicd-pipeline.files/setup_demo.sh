#!/usr/bin/env bash
NEXUS_URL="http://10.220.217.82:8002/repository/raw/packages"
NEXUS_CREDENTIALS="admin:admin123"
TEST_ENV=test


function build {
	name=${1}
	version=${2}
	type=${3}
	cd ./marketplace/${type}/${name}
	lmctl project build
	cp ./_lmctl/_build/${name}-${version}.tgz ../../../packages
	cd ../../..
}

function upload {
	name=${1}
	version=${2}
	package=${name}-${version}.tgz
	echo uploading ${package}-${version} package to nexus and push to TNCO environment named ${TEST_ENV}
	curl -v -u ${NEXUS_CREDENTIALS} --upload-file ./packages/${package} ${NEXUS_URL}/${name}/${package}
	
}

function set_up {
	build $1 $2 $3
	upload $1 $2
}

function create_ns_project {
	source="./marketplace/network-services/voice-service"
	target="./voice-service"

	mkdir -p ./packages
	mkdir -p ${target}
	
	cp -r ${source}/Behaviour ${target}
	cp -r ${source}/Descriptor ${target}
	cp ${source}/lmproject.yml ${target}
	cp ${source}/.gitignore ${target}
}

create_ns_project

set_up chaos-monkey 1.0 vnfs
set_up network 1.0 vnfs
set_up ip-pbx 1.0 vnfs
set_up sip-performance 1.0 vnfs
set_up sip-traffic-manager 1.0 vnfs
set_up voice-load-generator 1.0 network-services
set_up voice-overlay-networks 1.0 network-services
set_up voip-gateway 1.0 vnfs
