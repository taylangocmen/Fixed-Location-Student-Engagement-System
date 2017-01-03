CC=g++
CFLAGS=-g -Wall -std=c++11 -Isrc
LDLIBS=-lboost_system -lpthread -lssl -lcrypto

CLIENT_OBJS=client.o
SERVER_OBJS=server.o connection.o main.o

.PHONY: all clean
all: client server

client: $(CLIENT_OBJS)
	@mkdir -p bin
	$(CC) $(CFLAGS) $(LDLIBS) $(addprefix build/, $^) -o bin/$@

server: $(SERVER_OBJS)
	@mkdir -p bin
	$(CC) $(CFLAGS) $(LDLIBS) $(addprefix build/, $^) -o bin/$@

%.o: src/%.cpp
	@mkdir -p build
	$(CC) $(CFLAGS) -c $? -o build/$@

clean:
	@$(RM) -rf build bin

