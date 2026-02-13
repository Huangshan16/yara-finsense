
import { NewsItem, NewsSource, PageType } from './types';

/**
 * 【配置中心】
 * 在此添加或修改你关注的股票。
 * 格式建议：沪市 SHxxxxxx, 深市 SZxxxxxx, 港市 HKxxxxx
 */
export const HOLDING_COMPANIES = [
  { name: '长江电力', symbol: 'SH600900', sector: '电力' },
  { name: '宁德时代', symbol: 'SZ300750', sector: '能源' },
  { name: '科大讯飞', symbol: 'SZ002230', sector: 'AI' },
  { name: '中国平安', symbol: 'SH601318', sector: '证券' },
  { name: '海康威视', symbol: 'SZ002415', sector: 'AI' },
  { name: '万华化学', symbol: 'SH600309', sector: '化工' }
];

export const POTENTIAL_SECTORS = ['化工', '创新药'];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: '美联储会议纪要释放鸽派信号，全球资本市场应声上涨',
    summary: '最新会议纪要显示，多数官员支持放缓加息步伐。隔夜美股三大股指集体走高，纳指涨超2%。',
    source: NewsSource.GELONGHUI,
    timestamp: '2024-05-20 08:30',
    category: PageType.GLOBAL_EVENTS,
    sector: 'Global Macro',
    relatedCompanies: [],
    sentiment: 'positive'
  },
  {
    id: '2',
    title: '长江电力发布Q1财报：营收净利双增长，水电利用率创新高',
    summary: '受益于来水情况好于预期，公司单季度利润增长15%，分红预案维持高比例。',
    source: NewsSource.FLUSH,
    timestamp: '2024-05-20 09:15',
    category: PageType.COMPANY_EVENTS,
    sector: '电力',
    relatedCompanies: ['长江电力'],
    sentiment: 'positive'
  },
  {
    id: '3',
    title: '工信部：加速AI大模型在工业机器人领域的深度应用',
    summary: '新政策旨在推动制造业数字化转型，给予相关研发企业税收减免与专项补贴支持。',
    source: NewsSource.GELONGHUI,
    timestamp: '2024-05-20 10:00',
    category: PageType.INDUSTRY_POLICY,
    sector: 'AI',
    relatedCompanies: ['科大讯飞', '海康威视'],
    sentiment: 'positive'
  }
];
