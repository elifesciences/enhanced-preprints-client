import { Metrics as MetricsType } from '../../../types/enhanced-article';

export const Metrics = ({ metrics }: { metrics: MetricsType }) => <section id="metrics">
  <div className="metrics__views">{metrics.views}</div>
</section>;
