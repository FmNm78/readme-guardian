import { Rule } from "../core/types";
import { readmeExists } from "./readmeExists";
import { readmeHasH1 } from "./readmeHasH1";
import { licenseExists } from "./licenseExists";
import { contributingExists } from "./contributingExists";
import { securityPolicyExists } from "./securityPolicyExists";
import { codeOfConductExists } from "./codeOfConductExists";
import { codeownersExists } from "./codeownersExists";
import { issueTemplateExists } from "./issueTemplateExists";
import { pullRequestTemplateExists } from "./pullRequestTemplateExists";
import { branchProtectionExists } from "./branchProtectionExists";
import { fundingExists } from "./fundingExists";

export const allRules: Rule[] = [
  readmeExists,
  readmeHasH1,
  licenseExists,
  contributingExists,
  securityPolicyExists,
  codeOfConductExists,
  codeownersExists,
  issueTemplateExists,
  pullRequestTemplateExists,
  branchProtectionExists,
  fundingExists,
];
