import {type PreprintVersionSummary} from "./preprint-version-summary";
import {type VersionSummary} from "./version-summary";

export const isPreprintVersionSummary = (version: VersionSummary): version is PreprintVersionSummary => Object.hasOwn(version, 'preprintPosted');
