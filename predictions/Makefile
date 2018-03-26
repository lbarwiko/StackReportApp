# usage: if this file is named "Makefile", then the commands are:
#	"make" will build the specified executable (PROG)
#	"make clean" will delete all of the .o and .exe files
#
# if this file is named something else, then use the -f option for make:
#	"make -f makefilename clean"

# set the variables below depending on compiler and options

CC = g++
LD = g++

# add -g to the CFLAGS for debugging (or -ggdb if you use gdb). 
# -pedantic-errors attempts to enforce Standard
# -Wall asks for certain warnings of possible errors
# -c is required to specify compile-only (no linking)
# DFLAGS is for debugging
#TODO test CFLAGS with -Ofast
CFLAGS = -std=c++14 -pedantic-errors -Wall -c -O3
DFLAGS = -std=c++14 -pedantic-errors -Wall -c -ggdb -g -O0

#no load flags defined, but -l would be used to include a special library
LFLAGS =

OBJS = *.o
PROG = combexe
DPROG = debug

default: $(PROG)

$(PROG): $(OBJS)
	$(LD) $(LFLAGS) $(OBJS) -o $(PROG)

debug: combinatorial.cpp
	$(CC) $(DFLAGS) combinatorial.cpp
	$(CC) $(LFLAGS) $(OBJS) -o $(DPROG)

combinatorial.o: combinatorial.cpp
	$(CC) $(CFLAGS) combinatorial.cpp

clean:
	rm -f *.o $(PROG) $(DPROG)

valgrind:
	valgrind ./$(PROG) < normal_in.txt > normal.out

