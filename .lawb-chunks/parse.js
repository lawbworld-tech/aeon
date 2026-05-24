const fs = require('fs');
const chunks = ['c1','c2','c3','c4','c5'].map(c =>
  JSON.parse(fs.readFileSync(`/home/runner/work/aeon/aeon/.lawb-chunks/${c}.json`,'utf8')));

let allLogs = [];
for (const r of chunks) {
  if (r.error) { console.log('ERROR in chunk:', JSON.stringify(r.error)); process.exit(1); }
  allLogs = allLogs.concat(r.result || []);
}
console.log('Total Redeemed events:', allLogs.length);

const parsed = allLogs.map(l => {
  const user = '0x' + l.topics[1].slice(-40);
  // data: first 32 bytes = amount; rest = nonce (ignore)
  const amountHex = '0x' + l.data.slice(2, 66);
  const amount = BigInt(amountHex);
  const blockNum = parseInt(l.blockNumber, 16);
  const ts = parseInt(l.blockTimestamp, 16); // unix seconds
  return { user, amount, blockNum, ts, tx: l.transactionHash };
});

// Totals
const totalWei = parsed.reduce((s,p) => s + p.amount, 0n);
const totalLawb = Number(totalWei / 10n**18n);
const uniqueUsers = new Set(parsed.map(p => p.user));

// Top redeemer (largest single)
const top = parsed.reduce((a,b) => b.amount > a.amount ? b : a, {amount: 0n});
const topLawb = Number(top.amount / 10n**18n);

// User aggregates (for "top by total")
const byUser = {};
for (const p of parsed) {
  const k = p.user;
  if (!byUser[k]) byUser[k] = { total: 0n, count: 0 };
  byUser[k].total += p.amount;
  byUser[k].count++;
}
const topByTotal = Object.entries(byUser).sort((a,b) => b[1].total > a[1].total ? 1 : -1).slice(0,5);

// 1h activity (last 3600s) — current time approx max event ts; better: use real now
const nowSec = Math.floor(Date.now()/1000);
const cutoff1h = nowSec - 3600;
const last1h = parsed.filter(p => p.ts >= cutoff1h);
const last1hWei = last1h.reduce((s,p) => s + p.amount, 0n);
const last1hLawb = Number(last1hWei / 10n**18n);
const last1hUnique = new Set(last1h.map(p => p.user)).size;
const top1h = last1h.reduce((a,b) => b.amount > a.amount ? b : a, {amount: 0n});

// Time range
const minTs = parsed.length ? Math.min(...parsed.map(p=>p.ts)) : 0;
const maxTs = parsed.length ? Math.max(...parsed.map(p=>p.ts)) : 0;

console.log('Total LAWB redeemed:', totalLawb.toLocaleString());
console.log('Unique redeemers:', uniqueUsers.size);
console.log('Top single redeem:', topLawb.toLocaleString(), 'LAWB by', top.user, 'tx', top.tx);
console.log('Time range:', new Date(minTs*1000).toISOString(), '→', new Date(maxTs*1000).toISOString());
console.log('Span hours:', ((maxTs-minTs)/3600).toFixed(2));
console.log('\nTop 5 by total redeemed:');
for (const [u, v] of topByTotal) {
  console.log(' ', u, '→', Number(v.total/10n**18n).toLocaleString(), 'LAWB across', v.count, 'redeems');
}
console.log('\nLast 1h (since', new Date(cutoff1h*1000).toISOString(), '):');
console.log('  Events:', last1h.length);
console.log('  Total LAWB:', last1hLawb.toLocaleString());
console.log('  Unique wallets:', last1hUnique);
if (last1h.length) {
  console.log('  Top single:', Number(top1h.amount/10n**18n).toLocaleString(), 'LAWB by', top1h.user, 'tx', top1h.tx);
}
