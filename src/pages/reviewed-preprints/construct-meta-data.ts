import { type EnhancedArticleWithVersions, type VersionHistoryItem } from "../../types";

export const constructMetaData = (
    articleWithVersions: EnhancedArticleWithVersions,
    pdfUrl: string | null,
    xmlUrl: string,
    versionHistory: VersionHistoryItem[],
    copyrightYear: number,
) => ({
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
});
