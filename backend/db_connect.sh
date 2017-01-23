#!/bin/bash

HOST=ece496.cgaqufxgrmkh.us-west-2.rds.amazonaws.com
USER=ece496
PASSWORD=password

MYSQL="mysql --host=$HOST --user=$USER --password=$PASSWORD"

if [ $1 = "create" ]; then
  echo 'Creating users table' && cat schema_users.sql | $MYSQL
  echo 'Creating courses table' && cat schema_courses.sql | $MYSQL
  echo 'Creating users_courses table' && cat schema_users_courses.sql | $MYSQL
  echo 'Creating questions table' && cat schema_questions.sql | $MYSQL
  echo 'Creating submissions table' && cat schema_submissions.sql | $MYSQL
elif [ $1 = "destroy" ]; then
  echo 'drop table ece496.submissions' | $MYSQL
  echo 'drop table ece496.questions' | $MYSQL
  echo 'drop table ece496.users_courses' | $MYSQL
  echo 'drop table ece496.courses' | $MYSQL
  echo 'drop table ece496.users' | $MYSQL    
else
  $MYSQL
fi
