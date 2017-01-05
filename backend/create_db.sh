#!/bin/bash

cat schema_auth.sql | bin/sqlite3 auth.db
