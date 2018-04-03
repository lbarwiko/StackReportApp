# set the variables below depending on compiler and options
CC = g++

# add -g to the CFLAGS for debugging (or -ggdb if you use gdb). 
# -pedantic-errors attempts to enforce Standard
# -Wall asks for certain warnings of possible errors
# -c is required to specify compile-only (no linking)
# DFLAGS is for debugging
#TODO test CFLAGS with -Ofast
CFLAGS = -std=c++14 -pedantic-errors -Wall -c -O3
DFLAGS = -std=c++14 -pedantic-errors -Wall -c -ggdb -g -O0

OBJS = *.o
PROG = combexe
DPROG = debug

default: combinatorial.cpp
	$(CC) $(CFLAGS) combinatorial.cpp
	$(CC) $(OBJS) -o $(PROG)


debug: combinatorial.cpp
	$(CC) $(DFLAGS) combinatorial.cpp
	$(CC) $(OBJS) -o $(DPROG)

combinatorial.o: combinatorial.cpp
	$(CC) $(CFLAGS) combinatorial.cpp

clean:
	rm -f *.o $(PROG) $(DPROG)

valgrind:
	valgrind ./$(PROG) < normal_in.txt > normal.out

