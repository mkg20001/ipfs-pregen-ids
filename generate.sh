#!/bin/bash

cmd="node --experimental-worker generate.js"

set -ex

$cmd rsa 16384 25  ./src/ids.16384.json
$cmd rsa 8192  50  ./src/ids.8192.json
$cmd rsa 4096  100 ./src/ids.4096.json
$cmd rsa 2048  200 ./src/ids.2048.json
$cmd rsa 1024  200 ./src/ids.1024.json
$cmd rsa 512   200 ./src/ids.512.json
