
import React from 'react';
import { CompanyStats } from '../types';

interface CompanyAnalysisCardProps {
  stats: CompanyStats;
}

const CompanyAnalysisCard: React.FC<CompanyAnalysisCardProps> = ({ stats }) => {
  const currentPrice = stats.liveQuote?.currentPrice || stats.valuation.currentPrice;
  const changePercent = stats.liveQuote?.changePercent || 0;
  const upside = (((stats.valuation.targetPrice - currentPrice) / currentPrice) * 100).toFixed(1);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative group">
      {stats.liveQuote && (
        <div className="absolute top-2 right-2 flex items-center space-x-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">Live Quote</span>
        </div>
      )}

      <div className="bg-slate-900 p-4 flex justify-between items-end">
        <div>
          <h3 className="text-white font-bold text-lg">{stats.name}</h3>
          <span className="text-slate-400 text-xs font-mono uppercase">{stats.symbol} | {stats.sector}</span>
        </div>
        <div className="text-right">
          <div className={`text-white font-bold text-xl transition-all duration-300 ${changePercent !== 0 ? 'scale-110' : ''}`}>
            ¥{currentPrice.toFixed(2)}
          </div>
          {stats.liveQuote && (
            <div className={`text-[10px] font-bold ${changePercent >= 0 ? 'text-red-400' : 'text-green-400'}`}>
              {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}% Today
            </div>
          )}
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-500 uppercase font-bold">Valuation Target</div>
          <div className={`text-sm font-bold ${Number(upside) > 0 ? 'text-red-600' : 'text-green-600'}`}>
            ¥{stats.valuation.targetPrice.toFixed(2)} ({Number(upside) > 0 ? '+' : ''}{upside}%)
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider font-bold">Performance</div>
            <div className="flex items-center space-x-2">
              <i className={`fas ${stats.performance.isProfitable ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500'}`}></i>
              <span className="text-xs font-semibold">{stats.performance.isProfitable ? 'Profitable' : 'Loss Making'}</span>
            </div>
          </div>
          
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider font-bold">Vol Forecast</div>
            <div className="flex items-center space-x-2">
              <i className={`fas ${stats.volumePrediction.trend === 'increase' ? 'fa-arrow-trend-up text-red-500' : 'fa-arrow-trend-down text-green-500'}`}></i>
              <span className="text-xs font-semibold capitalize">{stats.volumePrediction.trend}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
           <div className="text-[10px] text-blue-700 font-bold mb-1">AI RATIONALE</div>
           <p className="text-[11px] text-gray-600 leading-relaxed italic">
            "{stats.valuation.rationale}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyAnalysisCard;
