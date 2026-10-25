# Team 2 Machine Simulator Design Notes

## Cache

`Machine_Simulator.html` contains 2048 words of memory and an eight-line,
four-word direct-mapped write-back cache. Address mapping selects a line, tag,
and word offset. Reads fill blocks on misses; writes allocate and mark blocks
dirty; dirty data is written back on replacement. CPU and front-panel memory
accesses use the cache. Init clears its state and counters.

## Project 2 Part 2

`programs/Program1.js` builds the octal image in `programs/Program1.obj.txt`.
Input validation, signed conversion, printing, and nearest-value search execute
on the simulated CPU. Empty input retries without changing the destination
register or advancing the instruction.

## Tests

- `test/CACHE_TEST_HARNESS.html`: 14 cache checks.
- `test/PROGRAM1_TEST_HARNESS.html`: 16 program checks, including 60 deterministic comparisons.
- `USER_GUIDE.md`: launch, controls, object files, and harness commands.