---
title: PredictionEdge
---

## Basic Idea:

Prediction markets on different exchanges can have price disparities on the same event. If you are fast enough to buy on both sites, you can profit on the gap between the two.

## Architecture

The core is a Go service that holds persistent WebSocket connections to multiple exchanges. When an order book update comes in, it gets normalized into a common format so equivalent markets across platforms can be compared directly.

```
Exchange A: "Will X happen?" → Yes @ $0.42
Exchange B: "Will X happen?" → No  @ $0.51
                                      ↑ gap = $0.07
```

Canonicalization was the hardest part, where different platforms worded markets differently, and possibly had slight changes from each other. The bot had to make sure each market was perfectly identical, otherwise money could be lost.

## Filtering

In addition, not every spread is worth taking. The pipeline filters by:

- **Liquidity**: Is there enough volume on both sides to actually fill?
- **Slippage**: The quoted price isn't always the fill price, which can result in lost money

<br>

Only edges that survives those two major filters, and a couple minor ones, get executed.

## Frontend

Wrapped everything into a dashboard giving automation over simply viewing arbitrage opportunities or acting on them. Displayed events concisely.

![Example view of dashboard](/projects/prediction-edge/dashboard.png)
