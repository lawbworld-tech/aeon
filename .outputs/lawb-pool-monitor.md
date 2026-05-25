🚨 LAWB Pool Monitor — CRITICAL

Pool: 35K LAWB (Δ-8.36M last 2h) — critically depleted
ShopVault: 19M LAWB (8th consecutive check, still stranded)
Paused: false

Burn (24h projected): 42.3M LAWB
Pool runway: effectively zero — pool below MIN_PRICE × 7

Last 2h activity: 7 redeems, 8.36M LAWB out, 3 wallets in a 3-min burst (00:21–00:24Z):
• 0xd8ef61…7901 — 3× 1.6M = 4.8M LAWB
• 0x61e676…ed88 — 3× 1.0M = 3.0M LAWB
• 0x3c569c…ae25 — 1× 560K LAWB

Alerts:
🚨 CRITICAL_LOW_POOL — prizePool 35K LAWB below 1M critical threshold; next redeem above 35K will PoolDeplete
⚠️ LOW_POOL active (on 6h cooldown, last alerted 23:20Z)
⚠️ SHOP_VAULT_NONZERO active (on 6h cooldown, last alerted 23:20Z) — 19M LAWB stranded

Action: operator should fundPool ASAP, or sweep shopVault → prizePool to refill.

https://basescan.org/address/0x48b2db9E89542Baa217bf8dc6269164b7887fE57#events
