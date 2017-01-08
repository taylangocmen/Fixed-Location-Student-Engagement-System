SRC_DIR=src/
LIBS_DIR=libs/
LIB_DIR=lib/
BIN_DIR=bin/
BUILD_DIR=build/

CC=gcc
CXX=g++
CCFLAGS=-g -Wall -I$(SRC_DIR) -I$(LIBS_DIR) -I$(LIBS_DIR)sqlite3 \
	$(addprefix -I$(LIBS_DIR)poco/, Foundation/include/ Util/include/ Net/include/) \
	-L$(LIBS_DIR)poco/$(LIB_DIR)Linux/x86_64/
CXXFLAGS=$(CCFLAGS) -std=c++11

#-lboost_system -lpthread -lssl -lcrypto -ldl
LDLIBS=

SQLITE3_SHELL_OBJS=$(addprefix $(BUILD_DIR)$(LIBS_DIR), sqlite3/sqlite3.o sqlite3/shell.o)

CLIENT_OBJS=$(addprefix $(BUILD_DIR)$(SRC_DIR), client.o)
SERVER_OBJS=$(addprefix $(BUILD_DIR)$(SRC_DIR), server.o main.o)

SQLITE3_SHELL_TARGET=$(BIN_DIR)sqlite3

POCO_PATH=$(shell cd $(LIBS_DIR)poco/ && pwd -P)
POCO_TARGETS=$(addprefix $(LIBS_DIR)poco/$(LIB_DIR)Linux/x86_64/, \
	libPocoFoundation.a libPocoNet.a libPocoNetSSL.a libPocoUtil.a libPocoJSON.a libPocoXML.a libPocoCrypto.a libPocoSQLite.a)

CLIENT_TARGET=$(BIN_DIR)client
SERVER_TARGET=$(BIN_DIR)server

.PHONY: all clean
all: $(CLIENT_TARGET) $(SERVER_TARGET) $(SQLITE3_SHELL_TARGET)

$(CLIENT_TARGET): $(CLIENT_OBJS) $(LIBS_OBJS) $(POCO_TARGETS)
	@mkdir -p $(@D)
	$(CXX) $(CXXFLAGS) $(LDLIBS) $^ -o $@

$(SERVER_TARGET): $(SERVER_OBJS) $(LIBS_OBJS) $(POCO_TARGETS)
	@mkdir -p $(@D)
	$(CXX) $(CXXFLAGS) $(LDLIBS) $^ -o $@

$(SQLITE3_SHELL_TARGET): $(SQLITE3_SHELL_OBJS)
	@mkdir -p $(@D)
	$(CXX) $(CXXFLAGS) $(LDLIBS) $^ -o $@

$(POCO_TARGETS):
	cd $(LIBS_DIR)poco/ && ./configure --typical --static --omit=Data/MySQL,Data/ODBC,Data/PostgreSQL --no-tests --no-samples
	cd $(LIBS_DIR)poco/ && $(MAKE) POCO_BASE=$(POCO_PATH)/

$(BUILD_DIR)%.o: %.cpp
	@mkdir -p $(@D)
	$(CXX) $(CXXFLAGS) -c $? -o $@

$(BUILD_DIR)%.o: %.c
	@mkdir -p $(@D)
	$(CC) $(CCFLAGS) -c $? -o $@

clean:
	@$(RM) -rf build bin

