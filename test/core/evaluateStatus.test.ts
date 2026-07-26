import { describe, it, expect } from "vitest";
import { evaluateStatus } from "../../src/core/evaluateStatus";
import { RuleResult } from "../../src/core/types";

const passingError: RuleResult = {
  ruleId: "a",
  ruleName: "A",
  passed: true,
  severity: "error",
  message: "ok",
};

const failingWarning: RuleResult = {
  ruleId: "b",
  ruleName: "B",
  passed: false,
  severity: "warning",
  message: "not ok",
};

const failingError: RuleResult = {
  ruleId: "c",
  ruleName: "C",
  passed: false,
  severity: "error",
  message: "not ok",
};

describe("evaluateStatus", () => {
  it("default mode: a failing warning alone does not cause fail", () => {
    expect(evaluateStatus([passingError, failingWarning], false)).toBe("pass");
  });

  it("default mode: a failing error causes fail", () => {
    expect(evaluateStatus([passingError, failingError], false)).toBe("fail");
  });

  it("strict mode: a failing warning also causes fail", () => {
    expect(evaluateStatus([passingError, failingWarning], true)).toBe("fail");
  });
});
