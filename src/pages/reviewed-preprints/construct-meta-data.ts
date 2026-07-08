import { config } from '../../config';
import { type EnhancedArticleWithVersions, type VersionHistoryItem } from "../../types";
import { getPdfUrl } from "../../utils/get-pdf-url";
import { isVor } from "../../utils/is-vor";

export const constructMetaData = (
    articleWithVersions: EnhancedArticleWithVersions,
    xmlUrl: string,
    versionHistory: VersionHistoryItem[],
    copyrightYear: number,
    isPreviewUrl: boolean,
    msid: string
) => {
    const previewPdfUrl = isPreviewUrl ? articleWithVersions.article.pdfUrl : undefined;
    const pdfUrl = (config.siteName === 'elife' || articleWithVersions.article.pdfUrl) ? getPdfUrl(msid, isVor(articleWithVersions), config.tenantDomain, previewPdfUrl) : null;

    return {
        ...articleWithVersions.article,
        ...(pdfUrl ? { pdfUrl } : {}),
        xmlUrl,
        ...articleWithVersions.article.article,
        authors: articleWithVersions.article.article.authors || [],
        msas: articleWithVersions.article.subjects || [],
        version: articleWithVersions.article.versionIdentifier,
        versionHistory,
        authorNotes: articleWithVersions.article.article.meta?.authorNotes || [],
        ...(copyrightYear > 0 ? {
            copyrightYear,
        } : {}),
    }
};
