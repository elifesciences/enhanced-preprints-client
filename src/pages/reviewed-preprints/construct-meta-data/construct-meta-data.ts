import { generateVersionHistory } from "./generate-version-history";
import { getPdfUrl } from "./get-pdf-url";
import { getXmlUrl } from "./get-xml-url";
import { config } from '../../../config';
import { type EnhancedArticleWithVersions } from "../../../types";
import { isVor } from "../../../utils/is-vor";

const buildCopyrightYearProperty = (copyrightYear: number) => {
    if (copyrightYear > 0) {
        return ({
            copyrightYear,
        })
    }
    return {};
};

export const constructMetaData = (
    articleWithVersions: EnhancedArticleWithVersions,
    copyrightYear: number,
    isPreviewUrl: boolean,
    msid: string
) => {
    const previewPdfUrl = isPreviewUrl ? articleWithVersions.article.pdfUrl : undefined;
    const pdfUrl = (config.siteName === 'elife' || articleWithVersions.article.pdfUrl) ? getPdfUrl(msid, isVor(articleWithVersions), config.tenantDomain, previewPdfUrl) : null;
    const xmlUrl = getXmlUrl(msid, isVor(articleWithVersions), config.tenantDomain);
    const versionHistory = generateVersionHistory(Object.values(articleWithVersions.versions));

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
        ...buildCopyrightYearProperty(copyrightYear),
    }
};
