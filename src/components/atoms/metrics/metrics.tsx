import { Metrics as MetricsType } from '../../../types/enhanced-article';
import './metrics.scss';

export const Metrics = ({ metrics }: { metrics: MetricsType }) => <section>
  <h1 id="metrics" className="metrics__title">Metrics</h1>
  <dl className="metricsTable">
    <div className="metricsTable__group">
      <dt className="metricsTable__label">Views</dt>
      <dd className="metricsTable__value">{metrics.views}</dd>
    </div>
    <div className="metricsTable__group">
      <dt className="metricsTable__label">Downloads</dt>
      <dd className="metricsTable__value">{metrics.downloads}</dd>
    </div>
    <div className="metricsTable__group">
      <dt className="metricsTable__label">Citations</dt>
      <dd className="metricsTable__value">{metrics.citations}</dd>
    </div>
  </dl>
</section>;
