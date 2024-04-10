import { Metrics as MetricsType } from '../../../types/enhanced-article';
import './metrics.scss';

export const Metrics = ({ metrics }: { metrics: MetricsType }) => <section>
  <h1 id="metrics" className="metrics__title">Metrics</h1>
  <div className="metrics__views">{metrics.views}</div>
</section>;
