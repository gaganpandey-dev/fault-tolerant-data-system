module.exports = (raw) => {
  if (!raw.type || !raw.userId || raw.value == null) {
    throw new Error("Missing required fields");
  }

  return {
    type: raw.type,
    userId: raw.userId,
    value: Number(raw.value),
    timestamp: Date.now(),
  };
};
