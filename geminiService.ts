
import { GoogleGenAI, Type } from "@google/genai";
import { CompanyStats, NewsItem, StockQuote } from './types';

/**
 * 模拟 pysnowball.quotation.realtime 接口
 * 使用 Gemini 3 Pro 配合搜索工具获取最准确的实时报价
 */
export async function fetchRealTimeQuotes(symbols: string[]): Promise<StockQuote[]> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // 模拟 pysnowball 的调用逻辑：针对每个 symbol 获取当前价格、涨跌幅、最高、最低
  const prompt = `你现在是 pysnowball 实时行情接口的镜像。
  请搜索并提供以下股票代码的【实时报价】数据：${symbols.join(', ')}。
  
  要求数据来源于雪球(xueqiu.com)或新浪财经。
  必须包含：当前价(currentPrice)、涨跌幅(changePercent)、最高价(high)、最低价(low)。
  如果是休市期间，请提供最近一个交易日的收盘数据。`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // 只有 Pro 版支持 googleSearch 工具
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              symbol: { type: Type.STRING },
              name: { type: Type.STRING },
              currentPrice: { type: Type.NUMBER },
              changePercent: { type: Type.NUMBER },
              changeAmount: { type: Type.NUMBER },
              high: { type: Type.NUMBER },
              low: { type: Type.NUMBER },
              lastUpdate: { type: Type.STRING }
            },
            required: ["symbol", "name", "currentPrice", "changePercent"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Snowball Engine Error:", e);
    return [];
  }
}

export async function analyzeCompanyIntelligence(
  companyName: string, 
  relatedNews: NewsItem[]
): Promise<CompanyStats> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const newsContext = relatedNews.map(n => `[${n.source}] ${n.title}: ${n.summary}`).join('\n');
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `分析公司 "${companyName}" 的基本面和近期动态。
    
    参考信息：
    ${newsContext}
    
    返回 JSON 格式分析数据。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          symbol: { type: Type.STRING },
          name: { type: Type.STRING },
          sector: { type: Type.STRING },
          frequency: { type: Type.NUMBER },
          performance: {
            type: Type.OBJECT,
            properties: {
              isProfitable: { type: Type.BOOLEAN },
              isTurningProfit: { type: Type.BOOLEAN },
              trend: { type: Type.STRING }
            }
          },
          valuation: {
            type: Type.OBJECT,
            properties: {
              targetPrice: { type: Type.NUMBER },
              currentPrice: { type: Type.NUMBER },
              confidence: { type: Type.NUMBER },
              rationale: { type: Type.STRING }
            }
          },
          volumePrediction: {
            type: Type.OBJECT,
            properties: {
              trend: { type: Type.STRING },
              supportPoints: { type: Type.STRING },
              confidence: { type: Type.NUMBER }
            }
          }
        },
        required: ["symbol", "name", "sector", "frequency", "performance", "valuation", "volumePrediction"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}

export async function extractWordFrequency(newsItems: NewsItem[]): Promise<{ word: string, count: number }[]> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const text = newsItems.map(n => `${n.title} ${n.summary}`).join(' ');
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `统计以下文本中的金融关键词频次：${text}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING },
            count: { type: Type.NUMBER }
          },
          required: ["word", "count"]
        }
      }
    }
  });

  return JSON.parse(response.text || "[]");
}
