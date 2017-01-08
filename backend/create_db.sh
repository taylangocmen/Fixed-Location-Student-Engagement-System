#!/bin/bash

set -v
cat schema_auth.sql | bin/sqlite3 database.db
cat schema_class.sql | bin/sqlite3 database.db
cat schema_prof.sql | bin/sqlite3 database.db
cat schema_enrol.sql | bin/sqlite3 database.db
