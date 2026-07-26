import { Rule } from "../core/types";
import { readmeExists } from "./readmeExists";
import { readmeHasH1 } from "./readmeHasH1";

export const allRules: Rule[] = [readmeExists, readmeHasH1];
