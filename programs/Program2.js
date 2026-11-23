(function(root){
"use strict";
// Program 2 (word search). The paragraph is preloaded from the object file; the user enters a word,
// and every exact occurrence is printed with its sentence number and word number.
const paragraphText = [
  "The quick brown fox jumps over the lazy dog.",
  "A computer runs each instruction in order.",
  "Memory stores both data and programs.",
  "The cache keeps recent words close to the processor.",
  "Every instruction moves the program counter forward.",
  "Simple machines teach the basics of architecture."
].join("\n") + "\n";

function buildProgram2(){
  const dataBase = 64;
  const entry = 256;
  const paragraphBase = 1024;
  const inputBase = 1600;
  const variables = {
    zero: 0, one: 1, ten: 10, asciiZero: 48, space: 32, newline: 10, period: 46,
    paragraphStart: paragraphBase, inputStart: inputBase,
    cursor: 0, probe: 0, inProbe: 0, ch: 0, sentence: 0, wordNo: 0, prev: 0,
    found: 0, num: 0, tens: 0, ones: 0
  };
  const slots = Object.fromEntries(Object.keys(variables).map((name, index) => [name, index]));
  const labels = {};
  const instructions = [];
  const targets = [];
  const opcodes = {HLT:0o00,LDR:0o01,STR:0o02,LDA:0o03,AMR:0o04,SMR:0o05,
    AIR:0o06,SIR:0o07,JZ:0o10,JNE:0o11,JCC:0o12,JMA:0o13,JSR:0o14,
    RFS:0o15,SOB:0o16,JGE:0o17,LDX:0o41,IN:0o61,OUT:0o62,MLT:0o70,DVD:0o71};
  function mark(name){
    if(name in labels) throw new Error("Duplicate label: " + name);
    labels[name] = entry + instructions.length;
  }
  function emit(opcode, register=0, address=0, index=0, indirect=0){
    instructions.push({opcode, register, address, index, indirect});
  }
  function data(opcode, register, name, indirect=0){
    if(!(name in slots)) throw new Error("Unknown variable: " + name);
    emit(opcode, register, slots[name], 1, indirect);
  }
  function jump(opcode, register, name){
    let slot = targets.indexOf(name);
    if(slot < 0){ slot = targets.length; targets.push(name); }
    if(slot >= 64) throw new Error("Branch table exhausted");
    emit(opcode, register, slot % 32, slot < 32 ? 2 : 3, 1);
  }
  function increment(name){ data("LDR", 0, name); emit("AIR", 0, 1); data("STR", 0, name); }
  function text(value){
    for(const character of value){
      let code = character.charCodeAt(0);
      emit("LDA", 0, Math.min(code, 31));
      code -= Math.min(code, 31);
      while(code > 0){ emit("AIR", 0, Math.min(code, 31)); code -= Math.min(code, 31); }
      emit("OUT", 0, 1);
    }
  }

  // Load index registers: X1 = data bank, X2/X3 = branch tables.
  emit("LDX", 0, 6, 1);
  emit("LDX", 0, 7, 2);
  emit("LDX", 0, 8, 3);

  // Print the paragraph that was loaded from the object file.
  text("Paragraph:\n");
  data("LDR", 0, "paragraphStart"); data("STR", 0, "cursor");
  mark("printParagraph");
  data("LDR", 0, "cursor", 1); jump("JZ", 0, "paragraphDone");
  emit("OUT", 0, 1); increment("cursor"); jump("JMA", 0, "printParagraph");
  mark("paragraphDone");

  // Read the word from the keyboard into the input buffer, terminated by 0.
  text("Enter a word:\n");
  data("LDR", 0, "inputStart"); data("STR", 0, "inProbe");
  mark("readWord");
  emit("IN"); data("STR", 0, "ch"); data("SMR", 0, "newline"); jump("JZ", 0, "wordRead");
  data("LDR", 0, "ch"); data("STR", 0, "inProbe", 1); increment("inProbe"); jump("JMA", 0, "readWord");
  mark("wordRead");
  data("LDR", 0, "zero"); data("STR", 0, "inProbe", 1);
  data("LDR", 0, "inputStart", 1); jump("JNE", 0, "wordReady");
  text("No word entered.\n"); emit("HLT");
  mark("wordReady");

  // Scan the paragraph. A word starts at a non-delimiter that follows a delimiter.
  data("LDR", 0, "paragraphStart"); data("STR", 0, "cursor");
  data("LDR", 0, "one"); data("STR", 0, "sentence");
  data("LDR", 0, "zero"); data("STR", 0, "wordNo"); data("STR", 0, "found");
  data("LDR", 0, "one"); data("STR", 0, "prev");
  mark("scan");
  data("LDR", 0, "cursor", 1); jump("JZ", 0, "searchDone"); data("STR", 0, "ch");
  data("SMR", 0, "period"); jump("JZ", 0, "sentenceEnd");
  data("LDR", 0, "ch"); data("SMR", 0, "newline"); jump("JZ", 0, "delimiter");
  data("LDR", 0, "ch"); data("SMR", 0, "space"); jump("JZ", 0, "delimiter");
  data("LDR", 0, "prev"); jump("JNE", 0, "wordStart");
  jump("JMA", 0, "advance");

  mark("wordStart");
  increment("wordNo"); data("LDR", 0, "zero"); data("STR", 0, "prev");
  jump("JSR", 0, "matchWord"); jump("JNE", 0, "recordMatch"); jump("JMA", 0, "advance");

  mark("delimiter");
  data("LDR", 0, "one"); data("STR", 0, "prev"); jump("JMA", 0, "advance");

  mark("sentenceEnd");
  increment("sentence"); data("LDR", 0, "zero"); data("STR", 0, "wordNo");
  data("LDR", 0, "one"); data("STR", 0, "prev"); jump("JMA", 0, "advance");

  mark("recordMatch");
  data("LDR", 0, "one"); data("STR", 0, "found");
  text("Found ");
  data("LDR", 0, "inputStart"); data("STR", 0, "inProbe");
  mark("printWord");
  data("LDR", 0, "inProbe", 1); jump("JZ", 0, "printWordDone");
  emit("OUT", 0, 1); increment("inProbe"); jump("JMA", 0, "printWord");
  mark("printWordDone");
  text(" in sentence ");
  data("LDR", 0, "sentence"); data("STR", 0, "num"); jump("JSR", 0, "printNumber");
  text(", word ");
  data("LDR", 0, "wordNo"); data("STR", 0, "num"); jump("JSR", 0, "printNumber");
  text("\n"); jump("JMA", 0, "advance");

  mark("advance");
  increment("cursor"); jump("JMA", 0, "scan");

  mark("searchDone");
  data("LDR", 0, "found"); jump("JNE", 0, "programEnd");
  text("Word not found.\n");
  mark("programEnd"); emit("HLT");

  // Print num (0-99) in decimal. Returns through R3.
  mark("printNumber");
  data("LDR", 0, "num"); data("LDR", 2, "ten"); emit("DVD", 0, 0, 2);
  data("STR", 1, "ones"); data("STR", 0, "tens");
  jump("JZ", 0, "printOnes");
  data("LDR", 0, "tens"); data("AMR", 0, "asciiZero"); emit("OUT", 0, 1);
  mark("printOnes");
  data("LDR", 0, "ones"); data("AMR", 0, "asciiZero"); emit("OUT", 0, 1);
  emit("RFS", 0, 0);

  // Compare the word at cursor with the input word. Returns R0 = 1 on match, 0 otherwise.
  mark("matchWord");
  data("LDR", 0, "cursor"); data("STR", 0, "probe");
  data("LDR", 0, "inputStart"); data("STR", 0, "inProbe");
  mark("compareChar");
  data("LDR", 0, "inProbe", 1); jump("JZ", 0, "inputEnded"); data("STR", 0, "ch");
  data("LDR", 0, "probe", 1); data("SMR", 0, "ch"); jump("JNE", 0, "noMatch");
  increment("probe"); increment("inProbe"); jump("JMA", 0, "compareChar");
  mark("inputEnded");
  data("LDR", 0, "probe", 1); jump("JZ", 0, "matched");
  data("SMR", 0, "space"); jump("JZ", 0, "matched");
  data("LDR", 0, "probe", 1); data("SMR", 0, "newline"); jump("JZ", 0, "matched");
  data("LDR", 0, "probe", 1); data("SMR", 0, "period"); jump("JZ", 0, "matched");
  mark("noMatch"); emit("RFS", 0, 0);
  mark("matched"); emit("RFS", 0, 1);

  if(entry + instructions.length > paragraphBase) throw new Error("Program overlaps paragraph");
  if(paragraphText.length > inputBase - paragraphBase) throw new Error("Paragraph overlaps input buffer");
  if(Object.keys(variables).length > 32) throw new Error("Data bank exhausted");

  const image = [[6, dataBase], [7, 128], [8, 160]];
  Object.entries(variables).forEach(([name, value]) => image.push([dataBase + slots[name], value & 0xFFFF]));
  [...paragraphText].forEach((character, offset) => image.push([paragraphBase + offset, character.charCodeAt(0) & 0xFF]));
  targets.forEach((name, index) => {
    if(!(name in labels)) throw new Error("Undefined label: " + name);
    image.push([128 + index, labels[name]]);
  });
  const listing = instructions.map((instruction, offset) => {
    const {opcode, register, address, index, indirect} = instruction;
    const word = (opcodes[opcode] << 10) | (register << 8) | (index << 6) | (indirect << 5) | address;
    const location = entry + offset;
    image.push([location, word]);
    return {address: location, word, instruction: `${opcode} ${register},${index},${indirect},${address}`};
  });
  const octal = (value, width) => value.toString(8).padStart(width, "0");
  const objectText = image.map(([address, word]) => `${octal(address, 4)} ${octal(word, 6)}`).join("\n") + "\n";
  return {entry, image, listing, labels, objectText, paragraphBase, inputBase, dataBase, slots};
}

// Reference result for checking the simulator output: sentence and word number of each exact match.
function expectedMatches(word){
  const matches = [];
  paragraphText.split("\n").filter(Boolean).forEach((line, sentence) => {
    line.replace(/\.$/, "").split(" ").forEach((token, index) => {
      if(token === word) matches.push({sentence: sentence + 1, word: index + 1});
    });
  });
  return matches;
}

const api = {build: buildProgram2, paragraphText, expectedMatches};
if(typeof module !== "undefined" && module.exports) module.exports = api;
else root.Program2 = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
