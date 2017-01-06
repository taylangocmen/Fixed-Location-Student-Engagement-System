SRC_DIR=src/
LIBS_DIR=libs/
LIB_DIR=lib/
BIN_DIR=bin/
BUILD_DIR=build/

CC=gcc
CXX=g++
CCFLAGS=-g -Wall -I$(SRC_DIR) -I$(LIBS_DIR) -I$(LIBS_DIR)sqlite3 -I$(LIBS_DIR)soci/include/ -I$(LIBS_DIR)soci/_$(BUILD_DIR)include/
CXXFLAGS=$(CCFLAGS) -std=c++11

LDLIBS=-lboost_system -lpthread -lssl -lcrypto -ldl

SQLITE3_LIB_OBJS=$(BUILD_DIR)$(LIBS_DIR)sqlite3/sqlite3.o
SQLITE3_SHELL_OBJS=$(SQLITE3_LIB_OBJS) $(BUILD_DIR)$(LIBS_DIR)sqlite3/shell.o

LIBS_OBJS=$(SQLITE3_LIB_OBJS) $(addprefix $(BUILD_DIR)$(LIBS_DIR), )
CLIENT_OBJS=$(addprefix $(BUILD_DIR)$(SRC_DIR), client.o)
SERVER_OBJS=$(addprefix $(BUILD_DIR)$(SRC_DIR), server.o db_connection.o connection.o http_request.o http_response.o main.o)

SQLITE3_STATIC_TARGET=$(addprefix $(BUILD_DIR)$(LIB_DIR), libsqlite3.a libsqlite3_i.a)
SQLITE3_SHELL_TARGET=$(BIN_DIR)sqlite3
SOCI_TARGET=$(addprefix $(LIBS_DIR)soci/_$(BUILD_DIR)$(LIB_DIR), libsoci_core.a libsoci_sqlite3.a)
CLIENT_TARGET=$(BIN_DIR)client
SERVER_TARGET=$(BIN_DIR)server

.PHONY: all clean
all: $(CLIENT_TARGET) $(SERVER_TARGET) $(SQLITE3_STATIC_TARGET) $(SQLITE3_SHARED_TARGET) $(SQLITE3_SHELL_TARGET)

$(CLIENT_TARGET): $(CLIENT_OBJS) $(LIBS_OBJS) $(SOCI_TARGET)
	@mkdir -p $(@D)
	$(CXX) $(CXXFLAGS) $(LDLIBS) $(SOCI_TARGET) $^ -o $@

$(SERVER_TARGET): $(SERVER_OBJS) $(LIBS_OBJS) $(SOCI_TARGET)
	@mkdir -p $(@D)
	$(CXX) $(CXXFLAGS) $(LDLIBS) $(SOCI_TARGET) $^ -o $@

$(SQLITE3_STATIC_TARGET): $(SQLITE3_LIB_OBJS)
	@mkdir -p $(@D)
	ar rcs $@ $^

$(SQLITE3_SHELL_TARGET): $(SQLITE3_SHELL_OBJS)
	@mkdir -p $(@D)
	$(CXX) $(CXXFLAGS) $(LDLIBS) $^ -o $@

$(SOCI_TARGET): $(SQLITE3_STATIC_TARGET)
	@mkdir -p $(LIBS_DIR)soci/_$(BUILD_DIR)
	cd $(LIBS_DIR)soci/_$(BUILD_DIR) && cmake -DSQLITE3_INCLUDE_DIR=../../sqlite3/ -DSQLITE_ROOT_DIR=../../build ..
	cd $(LIBS_DIR)soci/_$(BUILD_DIR) && make

$(BUILD_DIR)%.o: %.cpp
	@mkdir -p $(@D)
	$(CXX) $(CXXFLAGS) -c $? -o $@

$(BUILD_DIR)$(LIBS_DIR)sqlite3/sqlite3.o: $(LIBS_DIR)sqlite3/sqlite3.c
	@mkdir -p $(@D)
	@# Compile sqlite3 with -fpic so that it can be included in a shared object
	$(CC) $(CCFLAGS) -fpic -c $? -o $@

$(BUILD_DIR)%.o: %.c
	@mkdir -p $(@D)
	$(CC) $(CCFLAGS) -c $? -o $@

clean:
	@$(RM) -rf build bin

