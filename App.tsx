
import React, { useState, useEffect, useMemo } from 'react';
import { PageType, NewsSource, CompanyStats, WordFreq, StockQuote } from './types';
import { MOCK_NEWS, HOLDING_COMPANIES, POTENTIAL_SECTORS } from './mockData';
import { analyzeCompanyIntelligence, extractWordFrequency, fetchRealTimeQuotes } from './geminiService';
import DashboardHeader from './components/DashboardHeader';
import NewsCard from './components/NewsCard';
import CompanyAnalysisCard from './components/CompanyAnalysisCard';
import MarketTicker from './components/MarketTicker';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PageType>(PageType.GLOBAL_EVENTS);
  const [newsSourceFilter, setNewsSourceFilter] = useState<NewsSource | 'ALL'>('ALL');
  const [companyAnalyses, setCompanyAnalyses] = useState<Record<string, CompanyStats>>({});
  const [marketQuotes, setMarketQuotes] = useState<StockQuote[]>([]);
  const [wordFreq, setWordFreq] = useState<WordFreq[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredNews = useMemo(() => {
    let base = MOCK_NEWS.filter(n => n.category === activeTab);
    if (newsSourceFilter !== 'ALL') base = base.filter(n => n.source === newsSourceFilter);
    return base;
  }, [activeTab, newsSourceFilter]);

  /**
   * 更新行情数据的核心函数
   */
  const updateMarketData = async () => {
    setIsRefreshing(true);
    try {
      // 1. 获取实时行情 (配置在 mockData.ts 中的股票)
      const symbols = HOLDING_COMPANIES.map(c => c.symbol);
      const quotes = await fetchRealTimeQuotes(symbols);
      setMarketQuotes(quotes);

      // 2. 更新词频分析
      const freqs = await extractWordFrequency(MOCK_NEWS);
      setWordFreq(freqs);

      // 3. 深度分析前 3 名持仓
      const topStocks = HOLDING_COMPANIES.slice(0, 3);
      const analysisPromises = topStocks.map(comp => 
        analyzeCompanyIntelligence(comp.name, MOCK_NEWS.filter(n => n.relatedCompanies.includes(comp.name)))
      );
      const results = await Promise.all(analysisPromises);
      
      const newMap: Record<string, CompanyStats> = {};
      results.forEach(res => {
        if(res && res.name) {
          const quote = quotes.find(q => q.symbol?.includes(res.symbol) || q.name === res.name);
          newMap[res.name] = { ...res, liveQuote: quote };
        }
      });
      setCompanyAnalyses(newMap);
    } catch (err) {
      console.error("Market update failed", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    updateMarketData();
    // 【频率配置】：目前为 300,000ms (5分钟)
    const interval = setInterval(updateMarketData, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {marketQuotes.length > 0 && <MarketTicker quotes={marketQuotes} />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-bolt text-amber-500 mr-2"></i>
                {activeTab === PageType.GLOBAL_EVENTS ? '实时市场快讯' : 
                 activeTab === PageType.COMPANY_EVENTS ? '持仓实时动态' : '行业政策深度'}
              </h2>
              <button 
                onClick={updateMarketData}
                disabled={isRefreshing}
                className={`p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-blue-600 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
              >
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredNews.map(news => <NewsCard key={news.id} news={news} />)}
            </div>
          </div>

          <div className="w-full lg:w-96 space-y-6">
            <div className="bg-slate-900 rounded-xl shadow-lg p-5 text-white">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                实时行情引擎 (雪球数据源)
              </h3>
              <div className="space-y-4">
                {Object.values(companyAnalyses).map(stats => (
                  <CompanyAnalysisCard key={stats.name} stats={stats} />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">舆情热词</h3>
              <div className="flex flex-wrap gap-2">
                {wordFreq.map(wf => (
                  <div key={wf.word} className="bg-gray-50 px-2 py-1 rounded border border-gray-100 text-xs flex items-center space-x-1">
                    <span className="text-gray-700">{wf.word}</span>
                    <span className="text-blue-600 font-bold">{wf.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
