import { t } from "i18next";
import { generateCopyrightYear } from "./generate-copyright-year";
import { generateVersionHistory } from "./generate-version-history";
import { getPdfUrl } from "./get-pdf-url";
import { getXmlUrl } from "./get-xml-url";
import { config } from '../../../config';
import { type VersionHistoryItem, type EnhancedArticleWithVersions } from "../../../types";
import { isVor } from "../../../utils/is-vor";

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
) => {
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
    }
};
