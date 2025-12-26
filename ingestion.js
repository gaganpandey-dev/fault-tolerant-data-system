const normalizer = require("./normalizer");
const store = require("./store");

module.exports = (req, res) => {
  const simulateFailure = req.query.fail === "true";

  try {
    const rawEvent = req.body;
    const normalized = normalizer(rawEvent);

    if (simulateFailure) throw new Error("Simulated DB failure");

    // Save processed event
    store.processedEvents.push(normalized);

    // Update aggregates
    const type = normalized.type;
    if (!store.aggregates[type]) {
      store.aggregates[type] = { count: 0, totalValue: 0 };
    }
    store.aggregates[type].count += 1;
    store.aggregates[type].totalValue += normalized.value;

    res.json({ success: true, normalized });
  } catch (err) {
    store.failedEvents.push({ event: req.body, error: err.message });
    res.status(400).json({ success: false, error: err.message });
  }
};
