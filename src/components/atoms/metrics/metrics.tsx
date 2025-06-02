import pluralize from 'pluralize';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';
import { Metrics as MetricsType } from '../../../types/enhanced-article';
import './metrics.scss';

export const Metrics = ({ metrics }: { metrics: MetricsType }) => {
  const metricsFormatter = new Intl.NumberFormat('en-GB', { useGrouping: true });

  const searchParams = useSearchParams();
  const displayAltmetrics = searchParams?.get('displayAltmetrics');

  const possibleAltMetrics = () => {
    if (displayAltmetrics) {
      return <div><Script type='text/javascript' src='https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js'></Script><p>Display</p></div>;
    }
    return null;
  };

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
    { possibleAltMetrics() }
  </section>;
};
