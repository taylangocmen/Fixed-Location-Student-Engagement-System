#include "sqlite3.h"
#include <stdio.h>
#include <iostream>
#include <stdlib.h>

using namespace std;

class auth {
private:
  sqlite3 *auth_database;
  static auth *auth_singleton;   
public:
  auth();
  ~auth();
  void authenticate(string);
  
  static int authCallback(void* unused,int argc,char** argv,char** azColName) {
    for(int i=0; i<argc; i++){
      cout<<azColName[i]<<" "<<argv[i]<<endl;
    }
    return 0;
  }
  
  static auth *getAuth() {
    if(auth::auth_singleton == NULL) {
      auth_singleton = new auth();
      cout<<"auth_singleton initialized"<<endl;
    }
    return auth_singleton;
  } 
};
