CC=gcc
CXX=g++
CCFLAGS=-g -Wall -Isrc -Ilibs
CXXFLAGS=$(CCFLAGS) -std=c++11

LDLIBS=-lboost_system -lpthread -lssl -lcrypto -ldl

SRC_DIR=src/
LIBS_DIR=libs/
BIN_DIR=bin/
BUILD_DIR=build/

LIBS_OBJS=$(addprefix $(BUILD_DIR)$(LIBS_DIR), sqlite3.o)
CLIENT_OBJS=$(addprefix $(BUILD_DIR)$(SRC_DIR), client.o)
SERVER_OBJS=$(addprefix $(BUILD_DIR)$(SRC_DIR), server.o connection.o http_request.o main.o)

CLIENT_TARGET=$(BIN_DIR)client
SERVER_TARGET=$(BIN_DIR)server

.PHONY: all clean
all: $(CLIENT_TARGET) $(SERVER_TARGET)

$(CLIENT_TARGET): $(CLIENT_OBJS) $(LIBS_OBJS)
	@mkdir -p bin
	$(CXX) $(CXXFLAGS) $(LDLIBS) $^ -o $@

$(SERVER_TARGET): $(SERVER_OBJS) $(LIBS_OBJS)
	@mkdir -p bin
	$(CXX) $(CXXFLAGS) $(LDLIBS) $^ -o $@

$(BUILD_DIR)%.o: %.cpp
	@mkdir -p $(BUILD_DIR)$(SRC_DIR)
	@mkdir -p $(BUILD_DIR)$(LIBS_DIR)
	$(CXX) $(CXXFLAGS) -c $? -o $@

$(BUILD_DIR)%.o: %.c
	@mkdir -p $(BUILD_DIR)$(SRC_DIR)
	@mkdir -p $(BUILD_DIR)$(LIBS_DIR)
	$(CC) $(CCFLAGS) -c $? -o $@

clean:
	@$(RM) -rf build bin

