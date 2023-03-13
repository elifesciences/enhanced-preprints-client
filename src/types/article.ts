import { MetaData } from './meta-data';

export interface ArticlePoA {
  /**
   * For example:
   * - Ian T Baldwin
   * - Randy Schekman, Mark Patterson
   * - Lee R Berger et al.
   */
  authorLine?: string;
  doi: string;
  elocationId: string;
  id: string;
  image?: Image;
  pdf?: string;
  /**
   * Date and time this article was first published.
   * Not present if 'stage' is 'preview' and version is '1'.
   */
  published?: Date;
  researchOrganisms?: string[];
  stage: Stage;
  /**
   * Date and time this article transitioned to current status.
   * Not present if 'stage' is 'preview' and version is '1'.
   */
  statusDate?: Date;
  subjects?: SubjectSnippet[];
  title: string;
  titlePrefix?: string;
  type: ArticleType;
  version: number;
  /**
   * Date and time this version of the article was published.
   * Only present if 'stage' is 'published'.
   */
  versionDate?: Date;
  volume: number;
  status: Status;
  curationLabels?: string[];
  figuresPdf?: string;
  impactStatement?: string;
  /**
   * date of review
   */
  reviewedDate?: Date;
  abstract?: Abstract;
  additionalFiles?: AssetFile[];
  authors?: Author[];
  copyright: Copyright;
  dataSets?: DataSets;
  ethics?: EthicElement[];
  funding?: Funding;
  issue?: number;
  reviewers?: Reviewer[];
  xml?: string;
  acknowledgements?: AcknowledgementElement[];
  appendices?: Appendix[];
  authorResponse?: AuthorResponse;
  body: BodyElement[];
  decisionLetter?: DecisionLetter;
  digest?: Digest;
  editorEvaluation?: EditorEvaluation;
  elifeAssessment?: ElifeAssessment;
  keywords?: string[];
  publicReviews?: PublicReview[];
  recommendationsForAuthors?: RecommendationsForAuthors;
  references?: Reference[];
  [property: string]: any;
}

interface ArticleVoR {
  /**
   * For example:
   * - Ian T Baldwin
   * - Randy Schekman, Mark Patterson
   * - Lee R Berger et al.
   */
  authorLine?: string;
  doi: string;
  elocationId: string;
  id: string;
  image?: Image;
  pdf?: string;
  /**
   * Date and time this article was first published.
   * Not present if 'stage' is 'preview' and version is '1'.
   */
  published?: Date;
  researchOrganisms?: string[];
  stage: Stage;
  /**
   * Date and time this article transitioned to current status.
   * Not present if 'stage' is 'preview' and version is '1'.
   */
  statusDate?: Date;
  subjects?: SubjectSnippet[];
  title: string;
  titlePrefix?: string;
  type: ArticleType;
  version: number;
  /**
   * Date and time this version of the article was published.
   * Only present if 'stage' is 'published'.
   */
  versionDate?: Date;
  volume: number;
  status: Status;
  curationLabels?: string[];
  figuresPdf?: string;
  impactStatement?: string;
  /**
   * date of review
   */
  reviewedDate?: Date;
  abstract?: Abstract;
  additionalFiles?: AssetFile[];
  authors?: Author[];
  copyright: Copyright;
  dataSets?: DataSets;
  ethics?: EthicElement[];
  funding?: Funding;
  issue?: number;
  reviewers?: Reviewer[];
  xml?: string;
  acknowledgements?: AcknowledgementElement[];
  appendices?: Appendix[];
  authorResponse?: AuthorResponse;
  body: BodyElement[];
  decisionLetter?: DecisionLetter;
  digest?: Digest;
  editorEvaluation?: EditorEvaluation;
  elifeAssessment?: ElifeAssessment;
  keywords?: string[];
  publicReviews?: PublicReview[];
  recommendationsForAuthors?: RecommendationsForAuthors;
  references?: Reference[];
  [property: string]: any;
}

interface Abstract {
  content: Array<any[] | boolean | number | null | Paragraph | string>;
  doi?: string;
  [property: string]: any;
}

interface Paragraph {
  /**
   * Content
   */
  content?: EthicElement[];
  id?: string;
  title?: string;
  type?: PurpleType;
  text?: string;
  [property: string]: any;
}

interface EthicElement {
  text: string;
  type: EthicType;
  [property: string]: any;
}

enum EthicType {
  Paragraph = 'paragraph',
}

enum PurpleType {
  Paragraph = 'paragraph',
  Section = 'section',
}

interface AcknowledgementElement {
  text?: EthicElement[] | string;
  type: AcknowledgementType;
  uri?: string;
  /**
   * Code, contain nessecary indentation and line breaks.
   */
  code?: string;
  /**
   * For example:
   * - Python
   * - Java
   * - PHP
   * - JavaScript
   */
  language?: string;
  cite?: string;
  /**
   * Content
   */
  content?: AcknowledgementContent[];
  height?: number;
  id?: string;
  title?: string;
  width?: number;
  assets?: AssetElement[];
  caption?: Array<any[] | boolean | number | null | MathMl | string>;
  image?: IIIFImage;
  inline?: boolean;
  /**
   * List items
   */
  items?: Array<ItemElement[] | string>;
  prefix?: Prefix;
  label?: string;
  mathml?: string;
  answer?: EthicElement[];
  question?: string;
  attribution?: string[];
  footnotes?: Footnote[];
  tables?: string[];
  accountId?: string;
  accountLabel?: string;
  conversation?: boolean;
  date?: string;
  mediaCard?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  placeholder?: IIIFImage;
  sources?: SourceElement[];
  doi?: string;
  [property: string]: any;
}

interface AssetElement {
  caption?: Array<any[] | boolean | number | null | MathMl | string>;
  title?: string;
  id: string;
  image?: IIIFImage;
  inline?: boolean;
  type: AssetType;
  attribution?: string[];
  footnotes?: Footnote[];
  tables?: string[];
  autoplay?: boolean;
  height?: number;
  loop?: boolean;
  placeholder?: IIIFImage;
  sources?: SourceElement[];
  width?: number;
  doi?: string;
  label: string;
  sourceData?: AssetFile[];
  [property: string]: any;
}

interface MathMl {
  id?: string;
  label?: string;
  mathml?: string;
  type?: MathMLType;
  text?: string;
  tables?: string[];
  [property: string]: any;
}

enum MathMLType {
  Mathml = 'mathml',
  Paragraph = 'paragraph',
  Table = 'table',
}

interface Footnote {
  id?: string;
  label?: string;
  text: FootnoteText[];
  [property: string]: any;
}

interface FootnoteText {
  text?: string;
  type: FluffyType;
  id?: string;
  label?: string;
  mathml?: string;
  [property: string]: any;
}

enum FluffyType {
  Mathml = 'mathml',
  Paragraph = 'paragraph',
}

interface IIIFImage {
  attribution?: string[];
  alt: string;
  /**
   * Point on the image that is considered to be the focal point of the image.
   *
   * If not present, 50 can be used for both `x` and `y`.
   */
  focalPoint?: FocalPoint;
  size: Size;
  source: File;
  uri: string;
  [property: string]: any;
}

/**
* Point on the image that is considered to be the focal point of the image.
*
* If not present, 50 can be used for both `x` and `y`.
*/
interface FocalPoint {
  /**
   * Percentage on the horizontal axis.
   */
  x: number;
  /**
   * Percentage on the vertical axis.
   */
  y: number;
  [property: string]: any;
}

interface Size {
  height: number;
  width: number;
  [property: string]: any;
}

interface File {
  filename: string;
  mediaType: string;
  uri: string;
  [property: string]: any;
}

interface AssetFile {
  caption?: Array<any[] | boolean | number | null | MathMl | string>;
  title?: string;
  attribution?: string[];
  doi?: string;
  id: string;
  label: string;
  filename: string;
  mediaType: string;
  uri: string;
  [property: string]: any;
}

interface SourceElement {
  mediaType: string;
  uri: string;
  [property: string]: any;
}

enum AssetType {
  Image = 'image',
  Table = 'table',
  Video = 'video',
}

interface AcknowledgementContent {
  /**
   * Code, contain nessecary indentation and line breaks.
   */
  code?: string;
  /**
   * For example:
   * - Python
   * - Java
   * - PHP
   * - JavaScript
   */
  language?: string;
  type: AcknowledgementType;
  /**
   * List items
   */
  items?: Array<ItemElement[] | string>;
  prefix?: Prefix;
  id?: string;
  label?: string;
  mathml?: string;
  text?: EthicElement[] | string;
  caption?: Array<any[] | boolean | number | null | MathMl | string>;
  title?: string;
  attribution?: string[];
  footnotes?: Footnote[];
  tables?: string[];
  uri?: string;
  cite?: string;
  /**
   * Content
   */
  content?: PurpleTable[];
  height?: number;
  width?: number;
  assets?: AssetElement[];
  image?: IIIFImage;
  inline?: boolean;
  answer?: EthicElement[];
  question?: string;
  accountId?: string;
  accountLabel?: string;
  conversation?: boolean;
  date?: string;
  mediaCard?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  placeholder?: IIIFImage;
  sources?: SourceElement[];
  doi?: string;
  [property: string]: any;
}

interface PurpleTable {
  /**
   * Code, contain nessecary indentation and line breaks.
   */
  code?: string;
  /**
   * For example:
   * - Python
   * - Java
   * - PHP
   * - JavaScript
   */
  language?: string;
  type: AcknowledgementType;
  /**
   * List items
   */
  items?: Array<ItemElement[] | string>;
  prefix?: Prefix;
  id?: string;
  label?: string;
  mathml?: string;
  text?: EthicElement[] | string;
  caption?: Array<any[] | boolean | number | null | MathMl | string>;
  title?: string;
  attribution?: string[];
  footnotes?: Footnote[];
  tables?: string[];
  uri?: string;
  cite?: string;
  /**
   * Content
   */
  content?: PurpleTable[];
  height?: number;
  width?: number;
  assets?: AssetElement[];
  image?: IIIFImage;
  inline?: boolean;
  answer?: EthicElement[];
  question?: string;
  accountId?: string;
  accountLabel?: string;
  conversation?: boolean;
  date?: string;
  mediaCard?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  placeholder?: IIIFImage;
  sources?: SourceElement[];
  doi?: string;
  [property: string]: any;
}

interface ItemContent {
  /**
   * Code, contain nessecary indentation and line breaks.
   */
  code?: string;
  /**
   * For example:
   * - Python
   * - Java
   * - PHP
   * - JavaScript
   */
  language?: string;
  type: TentacledType;
  /**
   * List items
   */
  items?: Array<ItemElement[] | string>;
  prefix?: Prefix;
  id?: string;
  label?: string;
  mathml?: string;
  text?: string;
  caption?: Array<any[] | boolean | number | null | MathMl | string>;
  title?: string;
  attribution?: string[];
  footnotes?: Footnote[];
  tables?: string[];
  [property: string]: any;
}

interface ItemElement {
  text?: EthicElement[] | string;
  type: ItemType;
  uri?: string;
  /**
   * Code, contain nessecary indentation and line breaks.
   */
  code?: string;
  /**
   * For example:
   * - Python
   * - Java
   * - PHP
   * - JavaScript
   */
  language?: string;
  cite?: string;
  /**
   * Content
   */
  content?: ItemContent[];
  height?: number;
  id?: string;
  title?: string;
  width?: number;
  assets?: AssetElement[];
  caption?: Array<any[] | boolean | number | null | MathMl | string>;
  image?: IIIFImage;
  inline?: boolean;
  /**
   * List items
   */
  items?: Array<ItemElement[] | string>;
  prefix?: Prefix;
  label?: string;
  mathml?: string;
  answer?: EthicElement[];
  question?: string;
  attribution?: string[];
  footnotes?: Footnote[];
  tables?: string[];
  accountId?: string;
  accountLabel?: string;
  conversation?: boolean;
  date?: string;
  mediaCard?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  placeholder?: IIIFImage;
  sources?: SourceElement[];
  [property: string]: any;
}

enum Prefix {
  AlphaLower = 'alpha-lower',
  AlphaUpper = 'alpha-upper',
  Bullet = 'bullet',
  None = 'none',
  Number = 'number',
  RomanLower = 'roman-lower',
  RomanUpper = 'roman-upper',
}

enum TentacledType {
  Code = 'code',
  List = 'list',
  Mathml = 'mathml',
  Paragraph = 'paragraph',
  Table = 'table',
}

enum ItemType {
  Button = 'button',
  Code = 'code',
  Excerpt = 'excerpt',
  Figshare = 'figshare',
  Figure = 'figure',
  GoogleMap = 'google-map',
  Image = 'image',
  List = 'list',
  Mathml = 'mathml',
  Paragraph = 'paragraph',
  Profile = 'profile',
  Question = 'question',
  Quote = 'quote',
  Table = 'table',
  Tweet = 'tweet',
  Video = 'video',
  Youtube = 'youtube',
}

enum AcknowledgementType {
  Box = 'box',
  Button = 'button',
  Code = 'code',
  Excerpt = 'excerpt',
  Figshare = 'figshare',
  Figure = 'figure',
  GoogleMap = 'google-map',
  Image = 'image',
  List = 'list',
  Mathml = 'mathml',
  Paragraph = 'paragraph',
  Profile = 'profile',
  Question = 'question',
  Quote = 'quote',
  Section = 'section',
  Table = 'table',
  Tweet = 'tweet',
  Video = 'video',
  Youtube = 'youtube',
}

interface Appendix {
  content: AcknowledgementElement[];
  doi?: string;
  id: string;
  title: string;
  [property: string]: any;
}

interface AuthorResponse {
  content: AcknowledgementElement[];
  doi?: string;
  id?: string;
  [property: string]: any;
}

interface Author {
  type: AuthorType;
  onBehalfOf?: any;
  additionalInformation?: string[];
  affiliations?: Place[];
  competingInterests?: string;
  contribution?: string;
  emailAddresses?: string[];
  /**
   * Authors that contribute equally are linked together through a generated ID.
   *
   * IDs will only be included if it is shared between two or more authors.
   */
  equalContributionGroups?: number[];
  phoneNumbers?: string[];
  postalAddresses?: Address[];
  name?: Name | string;
  orcid?: string;
  biography?: EthicElement[];
  /**
   * Whether the person was deceased when the article was published.
   */
  deceased?: boolean;
  /**
   * The person's role at eLife
   */
  role?: string;
  [property: string]: any;
}

interface Place {
  address?: Address;
  name: string[];
  [property: string]: any;
}

interface Address {
  components: AddressComponents;
  formatted: string[];
  [property: string]: any;
}

interface AddressComponents {
  area?: string[];
  country?: string;
  locality?: string[];
  postalCode?: string;
  streetAddress?: string[];
  [property: string]: any;
}

interface Name {
  /**
   * This is the name that should be used for indexing people.
   *
   * For example:
   * - Schekman, Randy
   * - VijayRaghavan, Krishnaswamy
   * - Li Wenhui
   */
  index: any;
  /**
   * This is generally the name that is used by the person for English-language publications.
   *
   * For example:
   * - Randy Schekman
   * - K. VijayRaghavan
   * - Li Wenhui
   */
  preferred: string;
  [property: string]: any;
}

enum AuthorType {
  Group = 'group',
  OnBehalfOf = 'on-behalf-of',
  Person = 'person',
}

interface BodyElement {
  /**
   * Content
   */
  content: AcknowledgementElement[];
  id: string;
  title: string;
  type: BodyType;
  [property: string]: any;
}

enum BodyType {
  Section = 'section',
}

interface Copyright {
  statement: string;
  license: License;
  holder?: string;
  [property: string]: any;
}

enum License {
  Cc010 = 'CC0-1.0',
  CcBy10 = 'CC-BY-1.0',
  CcBy20 = 'CC-BY-2.0',
  CcBy25 = 'CC-BY-2.5',
  CcBy30 = 'CC-BY-3.0',
  CcBy40 = 'CC-BY-4.0',
}

interface DataSets {
  availability?: EthicElement[];
  generated?: DataSet[];
  used?: DataSet[];
  [property: string]: any;
}

interface DataSet {
  authors: Author[];
  /**
   * If there are more authors.
   */
  authorsEtAl?: boolean;
  dataId?: string;
  date: string;
  details?: string;
  doi?: string;
  id: string;
  title: string;
  uri?: string;
  [property: string]: any;
}

interface DecisionLetter {
  content: AcknowledgementElement[];
  description: EthicElement[];
  doi?: string;
  id?: string;
  [property: string]: any;
}

interface Digest {
  content: EthicElement[];
  doi?: string;
  [property: string]: any;
}

interface EditorEvaluation {
  content: AcknowledgementElement[];
  doi?: string;
  id?: string;
  scietyUri?: string;
  [property: string]: any;
}

interface ElifeAssessment {
  content: AcknowledgementElement[];
  doi?: string;
  id?: string;
  scietyUri?: string;
  title: string;
  [property: string]: any;
}

interface Funding {
  awards?: Award[];
  statement: string;
  [property: string]: any;
}

interface Award {
  awardId?: string;
  id: string;
  recipients: Recipient[];
  source: AwardSource;
  [property: string]: any;
}

interface Recipient {
  type: RecipientType;
  name: Name | string;
  orcid?: string;
  [property: string]: any;
}

enum RecipientType {
  Group = 'group',
  Person = 'person',
}

interface AwardSource {
  address?: Address;
  name: string[];
  funderId?: string;
  [property: string]: any;
}

interface Image {
  social?: IIIFImage;
  thumbnail?: IIIFImage;
  [property: string]: any;
}

interface PublicReview {
  content: AcknowledgementElement[];
  doi?: string;
  id?: string;
  title: string;
  [property: string]: any;
}

interface RecommendationsForAuthors {
  content: AcknowledgementElement[];
  doi?: string;
  id?: string;
  title: string;
  [property: string]: any;
}

interface Reference {
  /**
   * A date, where the month and/or day may not be known/available.
   *
   * For example:
   * - 2016
   * - 2016-09
   * - 2016-09-16
   */
  date: string;
  /**
   * If the first author of a reference has two or more references published in the same year
   * in the same
   * list, this property will be a letter (starting at 'a') that can be used to distinguish
   * between them.
   *
   * For example, 'John Smith, 2016a' and 'John Smith, 2016b' would refer to two references,
   * one with the
   * year discriminator 'a' and a second with 'b'.
   */
  discriminator?: string;
  id: string;
  type: TypeEnum;
  authors?: Author[];
  editors?: Author[];
  /**
   * If there are more authors.
   */
  authorsEtAl?: boolean;
  bookTitle?: string;
  doi?: string;
  edition?: string;
  /**
   * If there are more editors.
   */
  editorsEtAl?: boolean;
  /**
   * International Standard Book Number.
   */
  isbn?: string;
  /**
   * PubMed identifier.
   */
  pmid?: number;
  publisher?: Place;
  volume?: string;
  chapterTitle?: string;
  pages?: PagesObject | string;
  authorsType?: AuthorsType;
  title?: string;
  uri?: string;
  articleTitle?: string;
  conference?: Place;
  compilers?: Author[];
  /**
   * If there are more compilers.
   */
  compilersEtAl?: boolean;
  curators?: Author[];
  /**
   * If there are more curators.
   */
  curatorsEtAl?: boolean;
  assigningAuthority?: Place;
  dataId?: string;
  source?: string;
  journal?: string;
  assignees?: Author[];
  /**
   * If there are more assignees.
   */
  assigneesEtAl?: boolean;
  country?: string;
  inventors?: Author[];
  /**
   * If there are more inventors.
   */
  inventorsEtAl?: boolean;
  number?: string;
  /**
   * For example:
   * - United States patent
   */
  patentType?: string;
  periodical?: string;
  version?: string;
  author?: Person;
  accessed?: string;
  website?: string;
  details?: string;
  [property: string]: any;
}

interface Person {
  name: Name;
  orcid?: string;
  [property: string]: any;
}

enum AuthorsType {
  Authors = 'authors',
  Collaborators = 'collaborators',
  Sponsors = 'sponsors',
}

interface PagesObject {
  /**
   * Page number on which the work starts.
   *
   * For example:
   * - 8
   * - D760
   * - xii
   */
  first: string;
  /**
   * Page number on which the work ends. If the work is only on one page, this will be the
   * same as `first`.
   *
   * For example:
   * - 8
   * - D714
   * - xiii
   */
  last: string;
  /**
   * Complete page range information for the work. Contains one or more comma-seperated page
   * ranges.
   *
   * `first` contains the first value, `last` the final value.
   *
   * For example:
   * - 8
   * - D706–D714
   * - 8–11, 14–19, 40
   */
  range: string;
  [property: string]: any;
}

enum TypeEnum {
  Book = 'book',
  BookChapter = 'book-chapter',
  ClinicalTrial = 'clinical-trial',
  ConferenceProceeding = 'conference-proceeding',
  Data = 'data',
  Journal = 'journal',
  Patent = 'patent',
  Periodical = 'periodical',
  Preprint = 'preprint',
  Report = 'report',
  Software = 'software',
  Thesis = 'thesis',
  Unknown = 'unknown',
  Web = 'web',
}

interface Reviewer {
  name: Name;
  orcid?: string;
  affiliations?: Place[];
  role: string;
  [property: string]: any;
}

enum Stage {
  Preview = 'preview',
  Published = 'published',
}

enum Status {
  Vor = 'vor',
}

interface SubjectSnippet {
  id: string;
  /**
   * Name
   */
  name: string;
  [property: string]: any;
}

enum ArticleType {
  Correction = 'correction',
  Editorial = 'editorial',
  Feature = 'feature',
  Insight = 'insight',
  RegisteredReport = 'registered-report',
  ReplicationStudy = 'replication-study',
  ResearchAdvance = 'research-advance',
  ResearchArticle = 'research-article',
  ResearchCommunication = 'research-communication',
  Retraction = 'retraction',
  ReviewArticle = 'review-article',
  ScientificCorrespondence = 'scientific-correspondence',
  ShortReport = 'short-report',
  ToolsResources = 'tools-resources',
}

type ArticleData = {
  articleMetaData: MetaData,
};

export const prepareArticleVersion = (articleVersion: ArticleVersion): ArticleData => ({
  articleMetaData: {
    doi: articleVersion.doi,
    msid: articleVersion.id,
    version: articleVersion.version.toString(),
    pdfUrl: articleVersion.pdf || '',
    msas: (articleVersion.subjects ?? [])
      .map((msa) => msa.name),
    title: articleVersion.title,
    publishedYear: articleVersion.published ? (new Date(articleVersion.published)).getFullYear() : 0,
    authors: (articleVersion.authors ?? [])
      .filter((author) => author.name && typeof author.name !== 'string')
      .map((author) => {
        const [familyName, givenName] = author.name && typeof author.name !== 'string' ? author.name.index.split(',') : null;

        return {
          givenNames: [givenName],
          familyNames: [familyName],
          affiliations: (author.affiliations ?? [])
            .map((affiliation) => ({
              name: affiliation.name.join(', '),
              address: affiliation.address && affiliation.address.components.country ? {
                addressCountry: affiliation.address.components.country,
              } : undefined,
            })),
          ...(author.emailAddresses ? {
            emails: author.emailAddresses.map((email) => email),
          } : {}),
        };
      }),
    abstract: articleVersion.abstract ? JSON.stringify(articleVersion.abstract.content) : '',
    headings: [],
    references: [],
  },
});

export type ArticleVersion = ArticlePoA | ArticleVoR;
