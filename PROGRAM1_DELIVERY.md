# Project 2 Part 2: Delivery

The revised due date is **October 25, 2026**, eight days after October 16.

## Run

Open [Machine_Simulator.html](Machine_Simulator.html), select **Load Program 1**,
then **Run**. Enter 20 values in Line Input, separated by spaces or lines. At
`Target:`, enter a value. The program prints the input, target, and closest value,
then stops at HLT. Select **SS** to step instructions.

For manual loading, select **Init**, choose
[programs/Program1.obj.txt](programs/Program1.obj.txt), set PC to octal `0400`,
and select **Run**. Open the simulator directly; no server or packages are needed.

## Behavior

- Accepts signed integers from `-32768` through `32767`.
- Checks characters and rejects malformed or out-of-range tokens without counting them toward 20.
- Parsing, printing, and closest-value search execute on the simulated CPU.
- Compares the full possible distance; equal-distance ties keep the first value.

## Sample Runs

Enter these values, then target `-14000`. Expected result: `Closest: -12000`.

```text
-32768 -30000 -25000 -18000 -12000 -5000 -1024 -100 -1 0
1 99 1024 4096 8192 15000 22000 28000 31000 32767
```

![Signed input run](test/evidence/program1-keyboard.png)

Try invalid tokens `abc 12x --2 + - 32768 -32769 999999999999 3.5`; they are
rejected. The target `-14000` still returns `-12000`.

![Input validation run](test/evidence/program1-invalid-input.png)

Enter these all-negative values, then target `32767`. Expected result:
`Closest: -30849` (distance `63616`).

```text
-32768 -32667 -32566 -32465 -32364 -32263 -32162 -32061 -31960 -31859
-31758 -31657 -31556 -31455 -31354 -31253 -31152 -31051 -30950 -30849
```

![Wide-distance run](test/evidence/program1-wide-distance.png)

## Verification

On October 25, 2026, [test/PROGRAM1_TEST_HARNESS.html](test/PROGRAM1_TEST_HARNESS.html)
passed **16/16 tests**, including 60 deterministic full-range comparisons and all
14 cache regression tests.

![Test results](test/evidence/program1-tests.png)

Desktop and mobile layouts were checked; the mobile viewport was 390px wide.

![Mobile layout](test/evidence/program1-mobile.png)

See [GITHUB_SUBMISSION_LOG.md](GITHUB_SUBMISSION_LOG.md) for commit and sync status.