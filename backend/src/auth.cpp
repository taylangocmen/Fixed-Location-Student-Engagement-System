#include "auth.h"
#include <cstring>

auth *auth::auth_singleton = NULL;

auth::auth() {
  int success = sqlite3_open("auth.db",&auth_database);
  cout<<"sqlite3_open success: "<<success<<"\n";
  sqlite3_close(auth_database);
}

auth::~auth(){
  sqlite3_close(auth_database);
}

void auth::authenticate(string user) {
  cout<<"hello, world!\n";
  char *errmsg = 0;
  auth *auth_session = auth::getAuth();
  string sql = "SELECT * FROM USERS WHERE name LIKE '" + user + "';";
  cout<<sql.c_str()<<endl;
  
  sqlite3_open("auth.db", &(auth_session->auth_database));
  int rc = sqlite3_exec(auth_session->auth_database, sql.c_str(), authCallback, 0, &errmsg);
  cout<<"result code: "<<rc<<endl;
  sqlite3_free(errmsg);
  sqlite3_close(auth_session->auth_database);
}


int main(){
  auth::getAuth()->authenticate("Zach");
}
