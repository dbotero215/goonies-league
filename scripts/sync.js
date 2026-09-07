const SHEET_ID = '1utmDEQnJHRsRkXnrxskZG2spXVglnrv8oezZyUrmuR8';
const GID = '1919665698';
const fs = require('fs');
const path = require('path');

async function fetchRange(range) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}&range=${range}`;
  const res = await fetch(url);
  const text = await res.text();
  const jsonStr = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
  return JSON.parse(jsonStr);
}

function serialToISO(serial) {
  const ms = Date.UTC(1899, 11, 30) + serial * 86400000;
  return new Date(ms).toISOString().slice(0, 10);
}

async function main() {
  const membersData = await fetchRange('A2:G14');
  const members = membersData.table.rows.map(function(r) {
    const c = r.c;
    function get(i) { return (c[i] && typeof c[i].v === 'number') ? c[i].v : 0; }
    return {
      name: (c[0] && c[0].v) ? String(c[0].v) : '',
      paid: get(1),
      totalDue: get(2),
      status: (c[4] && c[4].v) ? String(c[4].v) : 'N/A',
      pastDue: Math.max(0, get(5)),
      dueNextWeek: Math.max(0, get(6))
    };
  }).filter(function(m) { return m.name; });

  const datesData = await fetchRange('O22:U22');
  const milestones = datesData.table.rows[0].c.map(function(c) { return serialToISO(c.v); });

  const dataJsPath = path.join(__dirname, '..', 'data.js');
  let content = fs.readFileSync(dataJsPath, 'utf8');

  const oldMembersMatch = content.match(/const MEMBERS = \[([\s\S]*?)\];/);
  const oldExtras = {};
  if (oldMembersMatch) {
    const re = /\{name:"([^"]+)",[^}]*aug31:([\d.]+),jan10:([\d.]+)\}/g;
    let m;
    while ((m = re.exec(oldMembersMatch[1]))) {
      oldExtras[m[1]] = { aug31: m[2], jan10: m[3] };
    }
  }

  const membersStr = members.map(function(m) {
    const extra = oldExtras[m.name] || { aug31: '0', jan10: '0' };
    return '{name:"' + m.name + '",paid:' + m.paid + ',totalDue:' + m.totalDue + ',status:"' + m.status + '",pastDue:' + m.pastDue + ',dueNextWeek:' + m.dueNextWeek + ',aug31:' + extra.aug31 + ',jan10:' + extra.jan10 + '}';
  }).join(',\n');

  const now = new Date();
  const stamp = now.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'America/Los_Angeles' }) + ' PT';

  content = content.replace(/const LAST_SYNCED = ".*?";/, 'const LAST_SYNCED = "' + stamp + '";');
  content = content.replace(/const DUE_MILESTONES = \[.*?\];/, 'const DUE_MILESTONES = [' + milestones.map(function(d){return '"'+d+'"';}).join(',') + '];');
  content = content.replace(/const MEMBERS = \[[\s\S]*?\];/, 'const MEMBERS = [\n' + membersStr + '\n];');

  fs.writeFileSync(dataJsPath, content);
  console.log('Synced ' + members.length + ' members. Last synced: ' + stamp);
}

main().catch(function(err) { console.error(err); process.exit(1); });
