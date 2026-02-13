
import React from 'react';
import { NewsItem, NewsSource } from '../types';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const sourceColors: Record<NewsSource, string> = {
    [NewsSource.GELONGHUI]: 'bg-indigo-100 text-indigo-700',
    [NewsSource.FLUSH]: 'bg-red-100 text-red-700',
    [NewsSource.XUEQIU]: 'bg-blue-100 text-blue-700',
    [NewsSource.WECHAT]: 'bg-green-100 text-green-700',
    [NewsSource.XHS]: 'bg-pink-100 text-pink-700',
  };

  const sentimentIcon = {
    positive: <i className="fas fa-caret-up text-green-500 mr-1"></i>,
    negative: <i className="fas fa-caret-down text-red-500 mr-1"></i>,
    neutral: <i className="fas fa-minus text-gray-400 mr-1"></i>
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${sourceColors[news.source]}`}>
          {news.source}
        </span>
        <span className="text-xs text-gray-400 font-medium">{news.timestamp}</span>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
        {news.title}
      </h3>
      
      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
        {news.summary}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex items-center">
          <span className="text-xs text-gray-500 uppercase font-bold mr-2">Sentiment:</span>
          <div className="flex items-center text-xs font-semibold capitalize">
            {sentimentIcon[news.sentiment]}
            <span className={news.sentiment === 'positive' ? 'text-green-600' : news.sentiment === 'negative' ? 'text-red-600' : 'text-gray-500'}>
              {news.sentiment}
            </span>
          </div>
        </div>
        
        {news.sector && (
          <span className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded border border-gray-200">
            {news.sector}
          </span>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
