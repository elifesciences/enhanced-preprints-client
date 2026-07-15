import { t } from "i18next";
import { generateCopyrightYear } from "./generate-copyright-year";
import { generateVersionHistory } from "./generate-version-history";
import { getPdfUrl } from "./get-pdf-url";
import { getXmlUrl } from "./get-xml-url";
import { config } from '../../../config';
import { type VersionHistoryItem, type EnhancedArticleWithVersions, type Content, type Author, type Reference } from "../../../types";
import { isVor } from "../../../utils/is-vor";
import { type TimelineEvent } from "../construct-timeline";
import { constructTimeline, translateTimeline } from "../construct-timeline/construct-timeline";

type AuthorNotesData = {
  type: string,
  text: string,
  id?: string,
  label?: string,
}[];

export type MetaData = {
    abstract: Content,
    authors: Author[],
    doi: string,
    umbrellaDoi?: string,
    msas: string[],
    msid: string,
    pdfUrl?: string,
    xmlUrl: string,
    references: Reference[],
    title: Content,
    version: string,
    publishedYear?: number,
    copyrightYear?: number,
    volume?: string,
    eLocationId?: string,
    license?: string,
    versionHistory: VersionHistoryItem[],
    authorNotes: AuthorNotesData,
    publicationDate?: string,
};

const getPublishedDate = (events: TimelineEvent[], currentVersion: number): string | undefined => {
    const publishedEvent = events.find(({ version }) => version === currentVersion);

    if (publishedEvent) {
        const date = new Date(publishedEvent.date);
        return `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
    }

    return undefined;
};

const buildCopyrightYearProperty = (copyrightYear: number) => {
    if (copyrightYear > 0) {
        return ({
            copyrightYear,
        })
    }
    return {};
};

const constructVersionHistory = (history: VersionHistoryItem[]) => {
    return history.map(({ label, version, ...other }) => ({
        ...other,
        label: t(label, {
            version,
        }),
    }));
};

export const constructMetaData = (
    articleWithVersions: EnhancedArticleWithVersions,
    isPreviewUrl: boolean,
    msid: string
): MetaData => {
    const previewPdfUrl = isPreviewUrl ? articleWithVersions.article.pdfUrl : undefined;
    const pdfUrl = (config.siteName === 'elife' || articleWithVersions.article.pdfUrl) ? getPdfUrl(msid, isVor(articleWithVersions), config.tenantDomain, previewPdfUrl) : null;
    const xmlUrl = getXmlUrl(msid, isVor(articleWithVersions), config.tenantDomain);
    const versionHistory = generateVersionHistory(Object.values(articleWithVersions.versions));
    const copyrightYear = generateCopyrightYear(Object.values(articleWithVersions.versions));

    return {
        ...articleWithVersions.article,
        ...(pdfUrl ? { pdfUrl } : {}),
        xmlUrl,
        ...articleWithVersions.article.article,
        authors: articleWithVersions.article.article.authors || [],
        msas: articleWithVersions.article.subjects || [],
        version: articleWithVersions.article.versionIdentifier,
        versionHistory: constructVersionHistory(versionHistory),
        authorNotes: articleWithVersions.article.article.meta?.authorNotes || [],
        ...buildCopyrightYearProperty(copyrightYear),
        publicationDate: getPublishedDate(translateTimeline(constructTimeline(Object.values(articleWithVersions.versions))), +articleWithVersions.article.versionIdentifier),
    }
};
