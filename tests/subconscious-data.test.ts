import { describe, it, expect, beforeEach } from 'vitest';

let dreamData = {};
let sessionInsights = {};
let txSender = "SP1";
const CONTRACT_OWNER = "SP1";
let blockHeight = 0;

describe('Subconscious Data Mining Contract', () => {
  beforeEach(() => {
    dreamData = {};
    sessionInsights = {};
    txSender = "SP1";
    blockHeight = 0;
  });
  
  const submitDreamData = (sessionId, contributorId, pattern) => {
    dreamData[`${sessionId}-${contributorId}`] = { pattern, timestamp: blockHeight++ };
    return { ok: true };
  };
  
  const aggregateInsights = (sessionId, insightSummary) => {
    if (txSender !== CONTRACT_OWNER) return { err: 200 };
    const participantCount = Object.keys(dreamData).filter(k => k.startsWith(`${sessionId}-`)).length;
    if (participantCount === 0) return { err: 201 };
    sessionInsights[sessionId] = { insightSummary, participantCount };
    return { ok: true };
  };
  
  const getInsights = (sessionId) => sessionInsights[sessionId] || null;
  
  it('submits dream data', () => {
    const result = submitDreamData(1, 1, "flying");
    expect(result).toEqual({ ok: true });
    expect(dreamData["1-1"]).toEqual({ pattern: "flying", timestamp: 0 });
  });
  
  it('aggregates insights as owner', () => {
    submitDreamData(1, 1, "flying");
    submitDreamData(1, 2, "falling");
    const result = aggregateInsights(1, "flight common");
    expect(result).toEqual({ ok: true });
    expect(getInsights(1)).toEqual({ insightSummary: "flight common", participantCount: 2 });
  });
  
  it('fails to aggregate as non-owner', () => {
    submitDreamData(1, 1, "flying");
    txSender = "SP2";
    const result = aggregateInsights(1, "flight common");
    expect(result).toEqual({ err: 200 });
  });
  
  it('fails to aggregate with no data', () => {
    const result = aggregateInsights(1, "no data");
    expect(result).toEqual({ err: 201 });
  });
});
