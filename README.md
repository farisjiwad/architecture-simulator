# Architecture Simulator

Standalone machine simulator, cache, and Project 2 Part 2 signed-integer program.

## Project 1: Cache

The simulator has an eight-line, four-word, direct-mapped write-back cache.
Open [test/CACHE_TEST_HARNESS.html](test/CACHE_TEST_HARNESS.html) and select
**Run All Tests** to run the 14 cache checks.

## Project 2 Part 2: Closest Integer

The program reads and prints 20 signed integers, asks for a target, then prints
the target and closest entered value. Input parsing, validation, printing, and
search run as simulated machine instructions.

1. Open [Machine_Simulator.html](Machine_Simulator.html).
2. Select **Load Program 1**, then **Run**.
3. Enter 20 integers from `-32768` through `32767`, separated by spaces or lines.
4. Enter a target in the same range when prompted.

Invalid tokens are rejected. Equal-distance ties keep the first value. Select
**SS** to step instructions.

## Submission Files

- [PROGRAM1_DELIVERY.md](PROGRAM1_DELIVERY.md): run instructions, samples, screenshots.
- [test/PROGRAM1_TEST_HARNESS.html](test/PROGRAM1_TEST_HARNESS.html): full-program tests; 16/16 pass.
- [programs/Program1.js](programs/Program1.js): assembly builder.
- [programs/Program1.obj.txt](programs/Program1.obj.txt): object file; load with **Init**, then set PC to octal `0400`.
- [GITHUB_SUBMISSION_LOG.md](GITHUB_SUBMISSION_LOG.md): commit and submission history.