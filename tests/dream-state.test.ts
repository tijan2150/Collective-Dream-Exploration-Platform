import { describe, it, expect, beforeEach } from 'vitest';

// Mock state
let dreamSessions = {};
let txSender = "SP1"; // Default sender
const CONTRACT_OWNER = "SP1";

describe('Dream State Synchronization Contract', () => {
  beforeEach(() => {
    dreamSessions = {};
    txSender = "SP1";
  });
  
  // Mock functions
  const startSession = (sessionId, startTime) => {
    if (txSender !== CONTRACT_OWNER) return { err: 100 };
    if (dreamSessions[sessionId]) return { err: 106 };
    dreamSessions[sessionId] = { participants: [], startTime, active: true };
    return { ok: true };
  };
  
  const joinSession = (sessionId) => {
    const session = dreamSessions[sessionId];
    if (!session) return { err: 103 };
    if (session.participants.includes(txSender)) return { err: 101 };
    if (!session.active) return { err: 104 };
    session.participants.push(txSender);
    return { ok: true };
  };
  
  const endSession = (sessionId) => {
    const session = dreamSessions[sessionId];
    if (!session) return { err: 103 };
    if (txSender !== CONTRACT_OWNER) return { err: 100 };
    session.active = false;
    return { ok: true };
  };
  
  const getSession = (sessionId) => dreamSessions[sessionId] || null;
  
  it('starts a session as contract owner', () => {
    const result = startSession(1, 1000);
    expect(result).toEqual({ ok: true });
    expect(getSession(1)).toEqual({ participants: [], startTime: 1000, active: true });
  });
  
  it('fails to start session as non-owner', () => {
    txSender = "SP2";
    const result = startSession(1, 1000);
    expect(result).toEqual({ err: 100 });
    expect(getSession(1)).toBeNull();
  });
  
  it('joins an active session', () => {
    startSession(1, 1000);
    txSender = "SP2";
    const result = joinSession(1);
    expect(result).toEqual({ ok: true });
    expect(getSession(1).participants).toContain("SP2");
  });
  
  it('fails to join twice', () => {
    startSession(1, 1000);
    txSender = "SP2";
    joinSession(1);
    const result = joinSession(1);
    expect(result).toEqual({ err: 101 });
  });
  
  it('ends a session as owner', () => {
    startSession(1, 1000);
    const result = endSession(1);
    expect(result).toEqual({ ok: true });
    expect(getSession(1).active).toBe(false);
  });
});
