import { describe, expect, it, vi } from 'vitest';
import { upgradeSchema } from './db';

describe('upgradeSchema', () => {
  it('executes an upgrade function if it exists on the changes object', () => {
    const db = null;
    const tx = null;

    const changeV1 = vi.fn();

    const changes = {
      1: changeV1,
    };

    upgradeSchema({
      db,
      tx,
      changes,
      oldVersion: 0,
      newVersion: 1,
    });

    expect(changeV1).toHaveBeenCalled();
  });

  it('does not execute a change if the version number is in the past', () => {
    const db = null;
    const tx = null;

    const changeV1 = vi.fn();
    const changeV3 = vi.fn();

    const changes = {
      1: changeV1,
      2: 'no call',
      3: changeV3,
    };

    upgradeSchema({
      db,
      tx,
      changes,
      oldVersion: 1,
      newVersion: 3,
    });

    expect(changeV1).not.toHaveBeenCalled();
    expect(changeV3).toHaveBeenCalled();
  });
});
