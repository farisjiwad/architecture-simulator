# C6461 Machine Simulator User Guide

## Open and Run

Open [Machine_Simulator.html](Machine_Simulator.html) directly in a browser.
Select **Init** to load an octal object file, then set PC to its entry address.
Use **SS** for one instruction or **Run** for continuous execution; **HLT** stops
the machine. **Load Program 1** starts the Project 2 Part 2 program.

## Controls

- Register and PC fields use octal. **LD** loads the current word-switch value.
- **Load/Store** access memory at MAR; **Ld+/St+** also advance MAR.
- The right terminal accepts keyboard input with **Send Line** and displays printer output. **Clear** clears the display only.
- The cache table shows valid state, tag, four words, dirty state, and hit/miss totals.

## Object Files and Tests

Each nonblank object-file line contains an octal address and 16-bit word; `;`
starts a comment. **Init** clears memory and cache state before loading.

- [test/CACHE_TEST_HARNESS.html](test/CACHE_TEST_HARNESS.html): 14 cache tests.
- [test/PROGRAM1_TEST_HARNESS.html](test/PROGRAM1_TEST_HARNESS.html): 16 full-program tests.
