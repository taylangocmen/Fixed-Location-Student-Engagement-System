#!/bin/bash

# Must be run as root

nohup node src/index.js </dev/null >/dev/null 2>&1 &
echo $! >> /capstone/server.pid
