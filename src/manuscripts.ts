import { readFileSync } from 'fs';
import { ArticleStatusProps } from './components/pages/article/article-page';

type ReviewedPreprintConfig = {
  preprintDoi: string,
  status: ArticleStatusProps
  pdfUrl: string,
  msas: string[],
};

type ManuscriptConfig = {
  msid: string
  version: string,
  preprintDoi: string
};

export type FullManuscriptConfig = ReviewedPreprintConfig & {
  msid: string
  version: string,
};

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

export const getManuscriptsLatest = (configFile: string): FullManuscriptConfig[] => Object.values(getManuscripts(configFile)).filter((manuscript) => manuscript.msid.match(/^[a-z0-9-]+$/));

export const getManuscript = (configFile: string, msid: string): FullManuscriptConfig => getManuscripts(configFile)[msid];
