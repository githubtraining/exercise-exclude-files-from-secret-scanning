function arrayCompare(a, b) {
  const sortedA = a.sort();
  const sortedB = b.sort();

  return (
    sortedA.length === sortedB.length &&
    sortedA.every((value, index) => value === sortedB[index])
  );
}

module.exports = arrayCompare;
