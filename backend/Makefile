CC=g++
CFLAGS=-g -Wall
LDLIBS=-lboost_system -lpthread

OBJs=

.PHONY: all clean
all: client server

client: client.cpp
	$(CC) $(CFLAGS) $(LDLIBS) $< -o client

server: server.cpp
	$(CC) $(CFLAGS) $(LDLIBS) $< -o server 

clean:
	@$(RM) client server

