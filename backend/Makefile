SRC_DIR=src/
LIBS_DIR=libs/
LIB_DIR=lib/
BIN_DIR=bin/
BUILD_DIR=build/

CC=gcc
CXX=g++
CCFLAGS=-g -Wall -I$(SRC_DIR) -I$(LIBS_DIR) -I$(LIBS_DIR)sqlite3 \
	$(addprefix -I$(LIBS_DIR)poco/, Foundation/include/ Util/include/ Net/include/ NetSSL_OpenSSL/include/ Crypto/include/) \
	-L$(LIBS_DIR)poco/$(LIB_DIR)Linux/x86_64/
CXXFLAGS=$(CCFLAGS) -std=c++11

#-lboost_system -lpthread -lssl -lcrypto -ldl
LDLIBS=-lpthread -lssl -lcrypto

SQLITE3_SHELL_OBJS=$(addprefix $(BUILD_DIR)$(LIBS_DIR), sqlite3/sqlite3.o sqlite3/shell.o)

CLIENT_OBJS=$(addprefix $(BUILD_DIR)$(SRC_DIR), client.o)
SERVER_OBJS=$(addprefix $(BUILD_DIR)$(SRC_DIR), main.o)

SQLITE3_SHELL_TARGET=$(BIN_DIR)sqlite3

POCO_PATH=$(shell cd $(LIBS_DIR)poco/ && pwd -P)
POCO_TARGETS=$(addprefix $(LIBS_DIR)poco/$(LIB_DIR)Linux/x86_64/, \
	libPocoNetSSL.a libPocoCrypto.a libPocoDataSQLite.a libPocoUtil.a libPocoJSON.a libPocoXML.a libPocoNet.a libPocoFoundation.a)

CLIENT_TARGET=$(BIN_DIR)client
SERVER_TARGET=$(BIN_DIR)server

SERVER_FILES=server.properties server.pem 568ca.pem
SERVER_FILES_TARGET=$(addprefix $(BIN_DIR), $(SERVER_FILES))

.PHONY: all clean
all: server $(SQLITE3_SHELL_TARGET)

server: $(SERVER_TARGET) $(SERVER_FILES_TARGET)

$(CLIENT_TARGET): $(CLIENT_OBJS) $(POCO_TARGETS)
	@mkdir -p $(@D)
	$(CXX) $(CXXFLAGS) $(LDLIBS) $^ -o $@

$(SERVER_TARGET): $(SERVER_OBJS) $(POCO_TARGETS)
	@mkdir -p $(@D)
	$(CXX) $(CXXFLAGS) $(LDLIBS) $^ -o $@

$(SQLITE3_SHELL_TARGET): $(SQLITE3_SHELL_OBJS)
	@mkdir -p $(@D)
	$(CXX) $(CXXFLAGS) $(LDLIBS) -ldl $^ -o $@

$(POCO_TARGETS):
	cd $(LIBS_DIR)poco/ && ./configure --typical --static --omit=Data/MySQL,Data/ODBC,Data/PostgreSQL --no-tests --no-samples
	cd $(LIBS_DIR)poco/ && $(MAKE) POCO_BASE=$(POCO_PATH)/

$(SERVER_FILES_TARGET): $(SERVER_FILES)
	cp $(@F) $@

$(BUILD_DIR)%.o: %.cpp
	@mkdir -p $(@D)
	$(CXX) $(CXXFLAGS) -c $? -o $@

$(BUILD_DIR)%.o: %.c
	@mkdir -p $(@D)
	$(CC) $(CCFLAGS) -c $? -o $@

clean:
	@$(RM) -rf build bin

