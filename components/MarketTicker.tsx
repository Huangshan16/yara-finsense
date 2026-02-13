
import React from 'react';
import { StockQuote } from '../types';

interface MarketTickerProps {
  quotes: StockQuote[];
}

const MarketTicker: React.FC<MarketTickerProps> = ({ quotes }) => {
  return (
    <div className="bg-slate-900 text-white overflow-hidden py-2 border-b border-slate-800">
      <div className="flex animate-marquee whitespace-nowrap items-center space-x-8">
        {quotes.map((quote) => (
          <div key={quote.symbol} className="flex items-center space-x-2 px-4 border-r border-slate-700 last:border-r-0">
            <span className="text-xs font-bold text-slate-400 uppercase">{quote.name}</span>
            <span className="text-sm font-mono font-bold">
              {quote.currentPrice.toFixed(2)}
            </span>
            <span className={`text-xs flex items-center ${quote.changePercent >= 0 ? 'text-red-400' : 'text-green-400'}`}>
              <i className={`fas fa-caret-${quote.changePercent >= 0 ? 'up' : 'down'} mr-1`}></i>
              {Math.abs(quote.changePercent).toFixed(2)}%
            </span>
          </div>
        ))}
        {/* Duplicate for infinite effect */}
        {quotes.map((quote) => (
          <div key={`${quote.symbol}-dup`} className="flex items-center space-x-2 px-4 border-r border-slate-700 last:border-r-0">
            <span className="text-xs font-bold text-slate-400 uppercase">{quote.name}</span>
            <span className="text-sm font-mono font-bold">
              {quote.currentPrice.toFixed(2)}
            </span>
            <span className={`text-xs flex items-center ${quote.changePercent >= 0 ? 'text-red-400' : 'text-green-400'}`}>
              <i className={`fas fa-caret-${quote.changePercent >= 0 ? 'up' : 'down'} mr-1`}></i>
              {Math.abs(quote.changePercent).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default MarketTicker;
