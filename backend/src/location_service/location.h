#ifndef LOC_H
#define LOC_H

#include "../libs/sqlite/sqlite3.h"
#include "../libs/sqlite/sqlite3ext.h"

using namespace std;

class Location {
	
public:
  
  Location(void) { handle = NULL; conn_stat = 0;};
  
  /*Add the location of a student to the db*/
  int add_loc(double lat, double lon, int user);
  
  /* Add the boundaries of a classroom as defined by a professor.
   * The radius shall be in meters, the location of the class
   * shall be defined by the location of the professor.
   */
  int add_bounds(double radius, double lat, double lon, int prof, int class_id);

  ~Location(void) {if (conn_stat) db_close(handle);};
  
private:
  
  sqlite3 * handle; // the database connection handle
  int conn_stat; // database connection status, 0 = disconnected, 1 = connected.
  
  /*connects to the db*/
  int * db_connect(void);
  
  /*close the connection to the db*/
  int db_close(sqlite * handle);
  
};

#endif

