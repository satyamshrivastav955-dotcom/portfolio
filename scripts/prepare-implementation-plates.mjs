// Reproducible editorial compositions made only from the checked-in project media.
// Source screenshots and their values are never overwritten.
import fs from 'node:fs/promises';
import sharp from 'sharp';

const out = 'public/projects/editorial';
await fs.mkdir(out, {recursive:true});
const ink = '#151613', paper = '#e9e5db', red = '#de3828', muted = '#9a9e90';
const escape = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;');
const text = (value,x,y,size=20,color=paper,display=false) => `<text x="${x}" y="${y}" fill="${color}" font-family="${display ? 'Impact, Arial Narrow, sans-serif' : 'Consolas, monospace'}" font-size="${size}" letter-spacing="${display ? -size*.025 : 2}">${escape(value)}</text>`;
const rect = (x,y,w,h,color) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>`;
const line = (x1,y1,x2,y2,color=muted) => `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="1"/>`;
const svg = (width,height,body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>`);
function registration(w,h) {
  return [[35,35],[w-35,35],[35,h-35],[w-35,h-35]].map(([x,y]) => `<path d="M${x-8} ${y}h16M${x} ${y-8}v16" stroke="${muted}" opacity=".65"/>`).join('');
}
async function sample(name,width,height,extract) {
  let input = sharp(`public/projects/${name}`);
  if (extract) input=input.extract(extract);
  return input.grayscale().tint(paper).resize(width,height,{fit:'contain',background:ink}).png().toBuffer();
}
async function plate(name,width,height,background,layers,overlay='') {
  const input=svg(width,height,background+registration(width,height));
  await sharp(input).composite([...layers,{input:svg(width,height,overlay),left:0,top:0}]).webp({quality:88,effort:6}).toFile(`${out}/${name}.webp`);
}

// CallShield: an editorial cover and a portrait plate for the featured-work column.
const phone = await sample('callshield-insight.webp',343,767);
await plate('callshield',1400,1000,
  rect(0,0,1400,1000,ink)+rect(1000,0,400,1000,paper)+rect(850,124,100,698,red)+
  text('SIGNAL',72,340,156,paper,true)+text('& TRUST.',72,500,148,paper,true)+
  text('CALLSHIELD',75,640,28)+line(75,680,650,680)+
  text('AUDIO / LANGUAGE / IDENTITY',75,730,18,muted)+
  text('REPOSITORY ANDROID DEMONSTRATION',75,766,16,muted),
  [{input:phone,left:893,top:113}],
  text('02',74,114,56,red,true)+text('SHARED PROJECT / SAMPLE DIALOGUE',75,914,15,muted));
await plate('callshield-portrait',960,1260,
  rect(0,0,960,1260,ink)+rect(747,0,213,1260,paper)+rect(760,185,75,950,red)+
  text('CALLSHIELD',54,169,130,paper,true)+text('SIGNAL & TRUST',56,222,20,muted)+
  text('02',58,1060,130,red,true),
  [{input:await sample('callshield-insight.webp',359,802),left:399,top:300}],
  text('REPOSITORY DEMO',56,1166,17,muted)+text('EDITORIAL TREATMENT',56,1198,14,muted));

// NEXUS: the main simulator view and four original phase frames, without fake telemetry.
await plate('nexus',1400,1000,
  rect(0,0,1400,1000,ink)+rect(34,124,1332,600,'#262923')+
  text('NEXUS-1',70,109,78,paper,true)+text('LANGUAGE → ACTION',940,93,19,muted),
  [{input:await sample('nexus-execution.webp',720,540,{left:640,top:0,width:320,height:240}),left:70,top:152},
   {input:await sample('nexus-execution.webp',1250,234),left:75,top:730}],
  rect(903,200,8,330,red)+text('SIMULATE.',936,267,57,paper,true)+text('VERIFY.',936,342,57,paper,true)+
  text('RECOVER.',936,417,57,paper,true)+text('MUJOCO',941,521,20,muted)+text('REPOSITORY RECORDING',941,558,14,muted)+
  line(70,712,1330,712));

// TaskOrbit: the real workspace appears as a large flat print, rather than a floating card.
await plate('taskorbit',1400,1000,
  rect(0,0,1400,1000,paper)+rect(0,0,318,1000,ink)+rect(286,160,32,682,red)+
  text('WORK',44,327,94,paper,true)+text('IN',44,445,94,paper,true)+text('ORBIT.',44,563,94,paper,true)+
  text('07 / TASKORBIT',45,124,20,muted)+text('ROLE-AWARE',45,772,16,muted)+text('PROJECT DELIVERY',45,806,16,muted),
  [{input:await sample('taskorbit-dashboard.webp',1010,567),left:350,top:210}],
  text('BRIEF → ASSIGN → REVIEW → DELIVER',352,144,20,ink)+line(352,172,1356,172,ink)+
  text('REPOSITORY WORKSPACE / DEMONSTRATION RECORDS',352,842,16,'#50564a'));

// Provenance: retain the exact terminal capture and its values, with deliberate surrounding type.
await plate('provenance',1400,1000,
  rect(0,0,1400,1000,ink)+rect(1000,0,400,1000,paper)+
  text('TRACE THE',72,208,106,paper,true)+text('EVIDENCE.',72,335,106,paper,true)+
  text('06 / VISUAL PROVENANCE',1032,125,17,ink)+
  rect(71,420,910,2,red)+text('IMAGE MATCH',1032,511,26,ink,true)+text('↓',1070,570,40,red)+
  text('EVIDENCE DIGEST',1032,628,26,ink,true)+text('↓',1070,686,40,red)+text('TESTNET ANCHOR',1032,744,26,ink,true),
  [{input:await sample('provenance-terminal.webp',875,310),left:72,top:468}],
  text('REPOSITORY TERMINAL CAPTURE',74,847,17,muted)+text('INTEGRITY DOES NOT ESTABLISH IDENTITY.',74,901,16,muted));

// Student analytics: recolor only the blue series. Bar lengths, labels, and values stay identical.
const chart = await sharp('public/projects/student-shap.webp').removeAlpha().raw().toBuffer({resolveWithObject:true});
for(let i=0;i<chart.data.length;i+=chart.info.channels) {
  const r=chart.data[i],g=chart.data[i+1],b=chart.data[i+2];
  if (b>r*1.2 && b>g*1.25 && b>110) {
    const a=Math.min(1,(b-r)/200);
    chart.data[i]=Math.round(211*a+r*(1-a));
    chart.data[i+1]=Math.round(50*a+g*(1-a));
    chart.data[i+2]=Math.round(35*a+b*(1-a));
  }
}
const chartImage=await sharp(chart.data,{raw:chart.info}).resize(938,816).png().toBuffer();
await plate('student',1400,1000,
  rect(0,0,1400,1000,paper)+rect(0,0,386,1000,ink)+rect(354,142,32,727,red)+
  text('BEYOND',43,292,91,paper,true)+text('THE',43,405,91,paper,true)+text('SCORE.',43,518,91,paper,true)+
  text('08 / EXPLAINABILITY',44,111,16,muted)+text('SHAP ATTRIBUTION',44,735,17,muted)+
  text('REPOSITORY ANALYSIS',44,777,15,muted),
  [{input:chartImage,left:421,top:90}],
  text('PALETTE ADJUSTED / VALUES UNCHANGED',423,953,14,'#555c4e'));

const files=await fs.readdir(out);
console.log(await Promise.all(files.map(async name=>({name,bytes:(await fs.stat(`${out}/${name}`)).size}))));
