🎣 LAWB Pool Monitor — 🚨 CRITICAL

Pool: 5,000 LAWB (Δ-59.29M since 01:33Z — drained to MIN_PRICE)
ShopVault: 0 LAWB (still swept) ✓
Paused: false ✓
Burn (24h): 91.9M LAWB

Activity (4h16m since last run, all clustered in a 19m window 05:01:35Z → 05:20:27Z):
• 18 redeems · 55.35M LAWB out · 13 unique wallets
• 11 wallets each pulled exactly 5,000,000 LAWB in a 32-second burst (blocks 46491174–46491190, 05:01:35Z → 05:02:07Z) — looks like MAX_PRICE; bots swarmed the moment liquidity allowed
• Followed by 2 more 5M redeems at 05:05Z, then 6 small 43.75K redeems by 0xc34cb3…4804 at 05:17Z and one 89,999.998K LAWB redeem by 0x32815a…3d91 at 05:20Z
• After the burst, pool sits at exactly MIN_PRICE (5,000 LAWB) — next redeem will revert PoolDeplete

Alerts:
🚨 CRITICAL_LOW_POOL — prizePool 5K LAWB < 1M threshold (fresh)
⚠️ LOW_POOL — prizePool 5K LAWB < 10M threshold (fresh)

Operator action: fundPool to restore prize liquidity. shopVault is already 0, so no sweep available.

https://basescan.org/address/0x48b2db9E89542Baa217bf8dc6269164b7887fE57#events
