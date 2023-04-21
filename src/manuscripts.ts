import { readFileSync } from 'fs';
import { ArticleStatusProps } from './components/pages/article/article-page';

type ReviewedPreprintConfig = {
  preprintDoi: string,
  status: ArticleStatusProps,
  msas: string[],
};

type ManuscriptConfig = {
  msid: string,
  version: string,
  preprintDoi: string,
  publishedYear: number,
  pdfUrl?: string,
};

export type FullManuscriptConfig = ReviewedPreprintConfig & ManuscriptConfig;

type ConfigFile = {
  preprints: Record<string, ReviewedPreprintConfig>,
  manuscripts: Record<string, ManuscriptConfig>
};

export type Manuscripts = Record<string, FullManuscriptConfig>;

export const getManuscripts = (configFile: string): Manuscripts => {
  const configJson = JSON.parse(readFileSync(configFile).toString());
  if (typeof configJson.preprints !== 'object' || typeof configJson.manuscripts !== 'object') {
    throw Error(`config file ${configFile} does not contain valid JSON with preprints and manuscripts keys`);
  }

  const { manuscripts, preprints } = configJson as ConfigFile;

  const fullManuscriptConfigs: Manuscripts = {};

  Object.entries(manuscripts).forEach(([msid, manuscriptConfig]) => {
    fullManuscriptConfigs[msid] = {
      ...manuscriptConfig,
      ...preprints[manuscriptConfig.preprintDoi],
    };
  });
  return fullManuscriptConfigs;
};

export const getManuscriptsLatest = (configFile: string): Manuscripts => Object.fromEntries(Object.entries(getManuscripts(configFile)).filter(([msid, manuscript]) => msid === manuscript.msid));

export const getManuscript = (configFile: string, msid: string): FullManuscriptConfig => getManuscripts(configFile)[msid];

export const getRppDoi = (config: Partial<FullManuscriptConfig>): string => (config.msid && config.version ? `10.7554/eLife.${config.msid}.${config.version}` : '');
