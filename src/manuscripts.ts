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
  license?: string,
};

export type FullManuscriptConfig = ReviewedPreprintConfig & ManuscriptConfig;

type ConfigFile = {
  preprints: Record<string, ReviewedPreprintConfig>,
  manuscripts: Record<string, ManuscriptConfig | string>
};

export type Manuscripts = Record<string, FullManuscriptConfig>;

export const getManuscripts = (configFile: string): Manuscripts => {
  const configJson = JSON.parse(readFileSync(configFile).toString());
  if (typeof configJson.preprints !== 'object' || typeof configJson.manuscripts !== 'object') {
    throw Error(`config file ${configFile} does not contain valid JSON with preprints and manuscripts keys`);
  }

  const { manuscripts, preprints } = configJson as ConfigFile;

  const getManuscriptEntry = (entryName: string, existingEntries: string[]): ManuscriptConfig | undefined => {
    const entry = manuscripts[entryName];
    existingEntries.push(entryName);

    if (typeof entry === 'string') {
      if (existingEntries.includes(entry)) {
        // we've visited this key before
        return undefined;
      }
      return getManuscriptEntry(entry, existingEntries);
    }
    return entry;
  };

  const fullManuscriptConfigs: Manuscripts = {};

  Object.keys(manuscripts).forEach((msid) => {
    const manuscriptConfig = getManuscriptEntry(msid, []);

    // handle issues with getting an entry by skipping
    if (manuscriptConfig === undefined) {
      return;
    }

    fullManuscriptConfigs[msid] = {
      ...manuscriptConfig,
      ...preprints[manuscriptConfig.preprintDoi],
    };
  });
  return fullManuscriptConfigs;
};

export const getManuscriptsLatest = (configFile: string): Manuscripts => Object.fromEntries(Object.entries(getManuscripts(configFile)).filter(([msid, manuscript]) => msid === manuscript.msid));

export const getManuscript = (configFile: string, msid: string): FullManuscriptConfig => getManuscripts(configFile)[msid];

export const getRppVersionDoi = (config: Partial<FullManuscriptConfig>): string => (config.msid && config.version ? `10.7554/eLife.${config.msid}.${config.version}` : '');

export const getRppDoi = (config: Partial<FullManuscriptConfig>): string => (config.msid ? `10.7554/eLife.${config.msid}` : '');
