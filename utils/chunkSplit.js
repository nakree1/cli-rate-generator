module.exports = function chunkSplit(arr, chunkSize) {
  if (chunkSize === 0 || chunkSize === arr.length) {
    return [arr]
  }

  const step = Math.ceil(arr.length / chunkSize);
  const chunks = [];

  for (let i = 0; i < step; i++) {
    const chunk = arr.slice(i * chunkSize, (i + 1) * chunkSize);

    chunks.push([...chunk]);
  }

  return chunks;
};
