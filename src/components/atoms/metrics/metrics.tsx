import { Metrics as MetricsType } from '../../../types/enhanced-article';
import './metrics.scss';

export const Metrics = ({ metrics }: { metrics: MetricsType }) => <section>
  <h1 id="metrics" className="metrics__title">Metrics</h1>
  <dl>
    <dd>{metrics.views}</dd>
    <dt>Views</dt>
    <dd>{metrics.downloads}</dd>
    <dt>Downloads</dt>
    <dd>{metrics.citations}</dd>
    <dt>Citations</dt>
  </dl>
</section>;
