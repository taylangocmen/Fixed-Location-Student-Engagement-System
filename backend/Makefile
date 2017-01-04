CC=g++
CFLAGS=-g -Wall -std=c++11 -Isrc
LDLIBS=-lboost_system -lpthread -lssl -lcrypto

SRC_DIR=src
BIN_DIR=bin
BUILD_DIR=build

CLIENT_OBJS=client.o
SERVER_OBJS=server.o connection.o http_request.o main.o

CLIENT_TARGET=client
SERVER_TARGET=server

.PHONY: all clean
all: $(BIN_DIR)/$(CLIENT_TARGET) $(BIN_DIR)/$(SERVER_TARGET)

$(BIN_DIR)/$(CLIENT_TARGET): $(addprefix build/, $(CLIENT_OBJS))
	@mkdir -p bin
	$(CC) $(CFLAGS) $(LDLIBS) $^ -o $@

$(BIN_DIR)/$(SERVER_TARGET): $(addprefix build/, $(SERVER_OBJS))
	@mkdir -p bin
	$(CC) $(CFLAGS) $(LDLIBS) $^ -o $@

$(BUILD_DIR)/%.o: $(SRC_DIR)/%.cpp
	@mkdir -p build
	$(CC) $(CFLAGS) -c $? -o $@

clean:
	@$(RM) -rf build bin

