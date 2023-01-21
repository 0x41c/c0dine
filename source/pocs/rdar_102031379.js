function main() { // Works as of macOS safari 16.1
  const v24 = new Intl.Locale("trimEnd", { numberingSystem: "foobar" });
  let empty = v24.hourCycles;
  let arr_empty = [empty, empty, empty];
  let thing = empty + 5;
}
main();