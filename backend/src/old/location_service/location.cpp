#include <iostream>
#include "location.h"

using namespace std;

int Location::db_connect() {
	
	int status = sqlite3_open("./bin/sqlite3/database.db", *Location.handle);
	
	if (status == SQLITE_OK)
		Location.conn_stat = 1;
		return 0;
	else {
		cout << "Error: Unable to connect to database in file: location.cpp, status = " << status << ".\n";
		return 1;
	}

  return 0;
}

int Location::db_close(sqlite * handle) {
	
	int status = sqlite3_close(handle);
	
	if (status == SQLITE_OK)
		Location.conn_stat = 0;
		return 0;
	else {
		cout << "Error: Unable to connect to database in file: location.cpp, status = " << status << ".\n";
		return 1;
	}
	
}

int add_loc (double lat, double lon, int user) {
	
	if (Location.conn_stat == 0) { //connect to the db
		int status = db_connect();
		if (status != 0) 
			return 1;
	}
	
	sqlite_stmt * add_user;
	char ** tail;
	
	//check to see if the user has a location 
	
	int status = sqlite_prepare(Location.handle, "UPDATE users SET latitude = " + lat + ", longitude = " + lon + ", time_loc = NOW() WHERE id = " 
		+ user + ";\0", -1,*add_user, tail);
		
	if (status != SQLITE_OK) {
		
		cout << "Error: Unable to prepare SQL statement in location.cpp, status = " << status << ".\n";
		return 1;
		
	}
		
	status = sqlite3_step(add_user);
	
	if (status != SQLITE_OK) {
		
		cout << "Error: Unable to execute SQL statement in location.cpp, status = " << status << ".\n";
		return 1;
		
	}
	
	if (Location.conn_stat == 1) { //close connection to the db
		int status = db_close(Location.handle);
		if (status != 0) 
			return 1;
	}
	
	return 0;
}

int add_bounds(double radius, double lat, double lon, int prof, int class_id) {
	
	if (Location.conn_stat == 0) { //connect to the db
		int status = db_connect();
		if (status != 0) 
			return 1;
	}
	
	sqlite_stmt * add_user;
	char ** tail;
	
	//check to see if the user has a location 
	
	int status = sqlite_prepare(Location.handle, "UPDATE class_id SET latitude = " + lat + ", longitude = " + lon + ", time_loc = NOW(), raduis = "
		+ radius + " WHERE id = " + class_id + ";\0", -1,*add_user, tail);
		
	if (status != SQLITE_OK) {
		
		cout << "Error: Unable to prepare SQL statement in location.cpp, status = " << status << ".\n";
		return 1;
		
	}
		
	status = sqlite3_step(add_user);
	
	if (status != SQLITE_OK) {
		
		cout << "Error: Unable to execute SQL statement in location.cpp, status = " << status << ".\n";
		return 1;
		
	}
	
	if (Location.conn_stat == 1) { //close connection to the db
		int status = db_close(Location.handle);
		if (status != 0) 
			return 1;
	}
	
	return 0;
}