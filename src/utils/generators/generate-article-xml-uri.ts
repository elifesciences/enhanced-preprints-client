import { config } from '../../config';

export const generateArticleXmlUri = (msid: string, versionIdentifier: string) => `${config.apiServer}/api/files/${msid}/v${versionIdentifier}/article-transformed.xml`;
