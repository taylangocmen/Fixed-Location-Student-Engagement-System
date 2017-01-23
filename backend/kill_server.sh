#!/bin/bash

# Must be run as root

PIDS="$(cat /capstone/server.pid)"

for PID in $PIDS; do
	kill $PID
done

rm /capstone/server.pid
