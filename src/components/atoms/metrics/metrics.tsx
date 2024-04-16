import { Metrics as MetricsType } from '../../../types/enhanced-article';
import './metrics.scss';

export const Metrics = ({ metrics }: { metrics: MetricsType }) => {
  const metricsFormatter = new Intl.NumberFormat('en-GB', { useGrouping: true });

  return <section>
    <h1 id="metrics" className="metrics__title">Metrics</h1>
    <dl className="metricsTable">
      <div className="metricsTable__group">
        <dt className="metricsTable__label">{metrics.views === 1 ? 'view' : 'views'}</dt>
        <dd className="metricsTable__value">{metricsFormatter.format(metrics.views)}</dd>
      </div>
      <div className="metricsTable__group">
        <dt className="metricsTable__label">{metrics.views === 1 ? 'download' : 'downloads'}</dt>
        <dd className="metricsTable__value">{metricsFormatter.format(metrics.downloads)}</dd>
      </div>
      <div className="metricsTable__group">
        <dt className="metricsTable__label">{metrics.views === 1 ? 'citation' : 'citations'}</dt>
        <dd className="metricsTable__value">{metricsFormatter.format(metrics.citations)}</dd>
      </div>
    </dl>
    <p className="metricsTable__description">Views, downloads and citations are aggregated across all versions of this paper published by eLife.</p>
  </section>;
};
