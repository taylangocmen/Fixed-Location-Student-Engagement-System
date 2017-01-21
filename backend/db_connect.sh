#!/bin/bash

HOST=ece496.cgaqufxgrmkh.us-west-2.rds.amazonaws.com
USER=ece496
PASSWORD=password

MYSQL="mysql --host=$HOST --user=$USER --password=$PASSWORD"

if [ $1 = "create" ]; then
  cat schema_users.sql | $MYSQL
  cat schema_courses.sql | $MYSQL
  cat schema_enrol.sql | $MYSQL
  cat schema_submissions.sql | $MYSQL
  cat schema_questions.sql | $MYSQL
  cat schema_users_class.sql | $MYSQL
elif [ $1 = "destroy" ]; then
  echo 'drop table ece496.questions' | $MYSQL
  echo 'drop table ece496.submissions' | $MYSQL
  echo 'drop table ece496.enrol' | $MYSQL
  echo 'drop table ece496.courses' | $MYSQL
  echo 'drop table ece496.users' | $MYSQL
else
  $MYSQL
fi
