# Project 2 Part 3: Program 2 Delivery

Program 2 is a word search. A paragraph is preloaded into simulated memory, the
user enters one word, and the program prints every exact match with its sentence
number and word number.

## Run

Open [Machine_Simulator.html](Machine_Simulator.html), select **Load Program 2**,
then **Run**. The terminal prints the paragraph and the prompt `Enter a word:`.
Type a word in Line Input and press Enter. The program prints each match, then
stops at HLT. Select **SS** to step instructions.

For manual loading, select **Export Program 2 Object** to save `Program2.obj.txt`,
select **Init**, choose the exported file, set PC to octal `0400`, and select
**Run**. Open the simulator directly; no server or packages are needed.

## Behavior

- Matching is exact and case-sensitive. `the` does not match `The`.
- Enter one word without spaces or punctuation.
- A word matches only as a whole word. Sentence-ending periods are not part of a word.
- Each match prints as `Found <word> in sentence <n>, word <m>`.
- If no match exists, the program prints `Word not found.`
- An empty entry prints `No word entered.` and stops.

## Sample Runs

Paragraph (sentence numbers are in order):

```text
The quick brown fox jumps over the lazy dog.
A computer runs each instruction in order.
Memory stores both data and programs.
The cache keeps recent words close to the processor.
Every instruction moves the program counter forward.
Simple machines teach the basics of architecture.
```

| Entry | Expected output |
| --- | --- |
| `instruction` | `Found instruction in sentence 2, word 5` and `Found instruction in sentence 5, word 2` |
| `program` | `Found program in sentence 5, word 5` |
| `cache` | `Found cache in sentence 4, word 2` |
| `the` | Four lines: sentence 1 word 7, sentence 4 word 8, sentence 5 word 4, sentence 6 word 4 |
| `zebra` | `Word not found.` |
