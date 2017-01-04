NOTES ON USAGE:
-compile sqlite3 libraries as such:
gcc -c sqlite3.c -lpthread -ldl

-run as such:
g++ auth.cpp sqlite3.o -o [output file name]

You might need to inform the linker of pthread and dl somewhere else, too.

-insert into sqlite3 shell as such:
INSERT INTO [table] (parameters...)
VALES([parameter 1 value], [parameter 2 value]...);
e.g.
INSERT INTO USERS (id, name)
VALUES(2, 'Zach');

-the tables and their parameters are decided by us, obviously. this is just the format i was using during testing.