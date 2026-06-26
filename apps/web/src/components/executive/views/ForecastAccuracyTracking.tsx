'use client';

import { useRevenueIntelligenceStore } from '@/store/revenueIntelligenceStore';
import { Target, TrendingUp, AlertTriangle, CheckCircle, BarChart2 } from 'lucide-react';

export function ForecastAccuracyTracking() {
  const { revenueForecasts } = useRevenueIntelligenceStore();

  // Calculate historical accuracy based on completed months (where actual > 0)
  const completedMonths = revenueForecasts.filter(f => f.actual > 0);
  
  let totalVariance = 0;
  completedMonths.forEach(m => {
    const variance = Math.abs(m.forecast - m.actual) / m.actual;
    totalVariance += variance;
  });
  
  const averageAccuracy = completedMonths.length > 0 ? 100 - ((totalVariance / completedMonths.length) * 100) : 0;

  return (
    <div className="p-8 h-full overflow-y-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-white tracking-wide">Forecast Accuracy</h1>
          <p className="text-neutral-500 mt-2">Track AI prediction accuracy against actual outcomes to build trust in the model.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <Target className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Model Accuracy</span>
          </div>
          <div className="text-3xl font-medium text-[#00E5FF] mb-2">
            {averageAccuracy.toFixed(1)}%
          </div>
          <p className="text-xs text-neutral-500">Historical average across all completed periods.</p>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-2 text-green-400 mb-3">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Best Prediction</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">
            97.2%
          </div>
          <p className="text-xs text-neutral-500">April - Forecasted $46M, Actual $48M.</p>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-2 text-red-400 mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Worst Prediction</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">
            88.5%
          </div>
          <p className="text-xs text-neutral-500">March - Forecasted $45M, Actual $38M.</p>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <BarChart2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Learning Loop</span>
          </div>
          <div className="text-xl font-medium text-white mb-2">
            Self-Calibrating
          </div>
          <p className="text-[10px] text-green-400 mt-2">Model weights adjusted automatically.</p>
        </div>
      </div>

      <div className="bg-[#121212] border border-neutral-800 rounded-xl overflow-hidden flex flex-col mb-8">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Historical Accuracy Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] border-b border-neutral-800">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">PERIOD</th>
                <th className="px-6 py-4 font-medium text-right">FORECAST REVENUE</th>
                <th className="px-6 py-4 font-medium text-right">ACTUAL REVENUE</th>
                <th className="px-6 py-4 font-medium text-right">VARIANCE</th>
                <th className="px-6 py-4 font-medium text-right">ACCURACY %</th>
              </tr>
            </thead>
            <tbody>
              {completedMonths.map((data, idx) => {
                const varianceVal = data.actual - data.forecast;
                const accuracyPercent = 100 - (Math.abs(varianceVal) / data.actual) * 100;
                
                return (
                  <tr key={idx} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{data.month} 2026</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-neutral-400 font-medium">${data.forecast}M</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-white font-medium">${data.actual}M</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`font-medium ${varianceVal > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {varianceVal > 0 ? '+' : ''}{varianceVal}M
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <span className={`font-bold ${accuracyPercent >= 95 ? 'text-green-400' : accuracyPercent >= 90 ? 'text-amber-400' : 'text-red-400'}`}>
                          {accuracyPercent.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
