
export enum NewsSource {
  GELONGHUI = '格隆汇',
  FLUSH = '同花顺',
  XUEQIU = '雪球',
  WECHAT = '公众号',
  XHS = '小红书'
}

export enum PageType {
  GLOBAL_EVENTS = 'GLOBAL_EVENTS',
  COMPANY_EVENTS = 'COMPANY_EVENTS',
  INDUSTRY_POLICY = 'INDUSTRY_POLICY'
}

export interface StockQuote {
  symbol: string;
  name: string;
  currentPrice: number;
  changePercent: number;
  changeAmount: number;
  high: number;
  low: number;
  lastUpdate: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: NewsSource;
  timestamp: string;
  category: PageType;
  sector: string;
  relatedCompanies: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface CompanyStats {
  symbol: string;
  name: string;
  sector: string;
  frequency: number;
  performance: {
    isProfitable: boolean;
    isTurningProfit: boolean;
    trend: string;
  };
  valuation: {
    targetPrice: number;
    currentPrice: number;
    confidence: number;
    rationale: string;
  };
  volumePrediction: {
    trend: 'increase' | 'decrease' | 'stable';
    supportPoints: string;
    confidence: number;
  };
  liveQuote?: StockQuote;
}

export interface WordFreq {
  word: string;
  count: number;
}
