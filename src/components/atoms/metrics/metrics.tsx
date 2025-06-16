import pluralize from 'pluralize';
import Script from 'next/script';
import { Metrics as MetricsType } from '../../../types/enhanced-article';
import './metrics.scss';

type MetricsProps = {
  metrics: MetricsType;
  doi: string;
};

export const Metrics = ({ metrics, doi }: MetricsProps) => {
  const metricsFormatter = new Intl.NumberFormat('en-GB', { useGrouping: true });

  const altMetrics = (_doi: string) => <div>
    <Script type='text/javascript' src='https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js'></Script>
    <div className='altmetric-embed' data-hide-less-than='1' data-badge-type='medium-donut' data-badge-details='right' data-doi={_doi}></div>
  </div>;

  return <section>
    <h1 id="metrics" className="metrics__title">Metrics</h1>
    <dl className="metricsTable">
      <div className="metricsTable__group">
        <dt className="metricsTable__label">{pluralize('view', metrics.views)}</dt>
        <dd className="metricsTable__value">{metricsFormatter.format(metrics.views)}</dd>
      </div>
      <div className="metricsTable__group">
        <dt className="metricsTable__label">{pluralize('download', metrics.downloads)}</dt>
        <dd className="metricsTable__value">{metricsFormatter.format(metrics.downloads)}</dd>
      </div>
      <div className="metricsTable__group">
        <dt className="metricsTable__label">{pluralize('citation', metrics.citations)}</dt>
        <dd className="metricsTable__value">{metricsFormatter.format(metrics.citations)}</dd>
      </div>
    </dl>
    <p className="metricsTable__description">Views, downloads and citations are aggregated across all versions of this paper published by eLife.</p>
    { altMetrics(doi) }
  </section>;
};
