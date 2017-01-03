CC=g++
CFLAGS=-g -Wall -std=c++11
LDLIBS=-lboost_system -lpthread -lssl -lcrypto

CLIENT_OBJS=client.o
SERVER_OBJS=server.o connection.o

.PHONY: all clean
all: client server

client: $(CLIENT_OBJS)
	$(CC) $(CFLAGS) $(LDLIBS) $^ -o $@ 

server: $(SERVER_OBJS)
	$(CC) $(CFLAGS) $(LDLIBS) $^ -o $@

%.o: %.cpp
	$(CC) $(CFLAGS) -c $(LDLIBS) $? -o $@

clean:
	@$(RM) client server *.o

