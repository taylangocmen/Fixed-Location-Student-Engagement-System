#!/bin/bash

HOST=ece496.cgaqufxgrmkh.us-west-2.rds.amazonaws.com
USER=ece496
PASSWORD=password

MYSQL="mysql --host=$HOST --user=$USER --password=$PASSWORD"

if [ $1 = "create" ]; then
  set -v
  cat schema_users.sql | $MYSQL
  cat schema_class.sql | $MYSQL
  cat schema_enrol.sql | $MYSQL
  cat schema_submissions.sql | $MYSQL
  cat schema_questions.sql | $MYSQL
else
  $MYSQL
fi
