---
title: WeTrade
---

## Basic Idea

Most stock bots just look at charts. RSI, moving averages, MACD, whatever.  
They ignore the fact that markets move on headlines.

WeTrade was built around one idea: price reacts to sentiment.  
If enough people read something bullish or bearish, that perception shows up in the order flow.

So instead of using only technical data, this system combined:

- News sentiment
- Historical price data
- Technical indicators

The goal wasn't long-term investing. It was short-term edge when narrative momentum and technical momentum aligned.

---

## Architecture

The system was split into three main parts:
```
Yahoo Finance Scraper
│
▼
Article Cleaning + NLP Sentiment
│
▼
Stock-Level Sentiment Index
│
▼
Signal Engine (Sentiment + Technicals)
│
▼
Execution (Alpaca API)
```

Backend was primarily Python for NLP and orchestration, with supporting services for data handling and scheduling.

Data was stored in a relational database:

- Articles
- Cleaned text
- Sentiment scores
- Historical OHLCV data
- Trade logs

Everything ran continuously so sentiment scores updated in near real time.

---

## Gathering Data

News was scraped from Yahoo Finance across a multi-year window to build both:

- Historical training data
- Real-time sentiment feeds

To avoid rate limits, I used a rotating IPv6 subnet while scraping.  
Requests were distributed across the subnet to prevent IP-based throttling, which allowed large-scale collection without getting blocked.

The scraper:

- Pulled article URLs per ticker
- Extracted article body text
- Removed promotional / irrelevant sections
- Normalized timestamps
- Stored structured metadata

This produced a large historical dataset linking article timestamps to subsequent price movement.

---

## Sentiment Modeling

Each article was passed through a sentiment model to generate:

- Polarity score (negative → positive)
- Confidence metric

From there, stock-level sentiment was calculated using:

- Time decay (recent articles weighted higher)
- Rolling window smoothing
- Normalization to prevent high-volume tickers from dominating

This created a dynamic sentiment index per stock that updated continuously.

---

## Signal Engine

Trades were not based on sentiment alone.

A signal triggered only when:

- Sentiment crossed a strong threshold
- Technical indicators confirmed momentum
- Liquidity was sufficient

This reduced noise from random headlines and low-quality articles.

If sentiment reversed or decayed below threshold, the position exited.

---

## Execution

Orders were executed through the Alpaca API.

Risk controls included:

- Volatility-based position sizing
- Stop-loss logic
- Daily exposure caps
- Logging for backtesting

The system tracked every trade for performance analysis and iteration.

---

## Frontend

Built a simple dashboard to display:

- Live sentiment per ticker
- Recent articles driving the score
- Active positions
- Trade history
- PnL

The interface allowed switching between:

- View-only mode
- Automated execution mode

---

## Takeaways

- Raw sentiment is noisy without filtering and decay logic.
- Data infrastructure matters more than model complexity.
- Slippage kills theoretical edge quickly.
- Most of the difficulty was in cleaning and normalizing data, not in writing the model.

WeTrade was an attempt to quantify narrative momentum and integrate it directly into a trading pipeline.
