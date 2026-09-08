const fs=require('node:fs'),path=require('node:path');
const {existing}=require('./env.cjs');
const sharp=existing('sharp');
const root='source/extracted/sato-clinic-reqkit';
const raw=fs.readFileSync(root+'/requirements/掲載原稿.html','utf8');
const section=(start,end)=>raw.split(start)[1].split(end)[0].trim();
const strip=s=>s.replace(/<[^>]*>/g,'').trim();
const paras=s=>[...s.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(m=>m[1]);
const numbered=s=>paras(s).filter(x=>x.startsWith('<strong>')).map((x,i)=>({id:'source-'+(i+1),title:strip(x.split('</strong>')[0]).replace(/^\d+\. /,''),body:x.split('<br>')[1],status:'published',source:true}));
const about=section('<h2>2. 当院についてページ</h2>','<h2>3. 診療時間・所在地ページ</h2>');
const data={provenance:'SOURCE: 掲載原稿.html / SATO-WEB-2025-002',
 basic:section('<h2>0. 基本情報マスタ</h2>','<h2>1. トップページ</h2>'),
 hours:section('<h3>診療時間</h3>','<h3>診療科目</h3>'),
 departments:section('<h3>診療科目</h3>','<hr>'),
 news:numbered(section('<h3>お知らせ（タイトルはリンクのみ。詳細はお知らせページに掲載）</h3>','<h3>院長挨拶</h3>')),
 greeting:section('<h3>院長挨拶</h3>','<h3>診療内容（'),
 medical:numbered(section('<h3>診療内容（トップページには4項目まで掲載。残りは別ページ）</h3>','<h2>2. 当院についてページ</h2>')),
 medicalLead:paras(section('<h3>診療内容（トップページには4項目まで掲載。残りは別ページ）</h3>','<h2>2. 当院についてページ</h2>'))[0],
 about:about.replace(/<blockquote>[\s\S]*?<\/blockquote>|<hr>/g,''),
 aboutIntro:paras(about)[0],
 access:section('<h2>3. 診療時間・所在地ページ</h2>','<h2>4. よくあるご質問ページ</h2>').replace(/<hr>/g,''),
 faq:[...section('<h2>4. よくあるご質問ページ</h2>','<h2>原稿利用ルール</h2>').matchAll(/<p><strong>Q\. (.*?)<\/strong><br>A\. (.*?)<\/p>/g)].map(m=>({q:m[1],a:m[2]}))};
fs.mkdirSync('src/content',{recursive:true});fs.writeFileSync('src/content/source.json',JSON.stringify(data,null,2));
fs.writeFileSync('src/content/news.js','export const sourceNews = '+JSON.stringify(data.news)+';\n');
(async()=>{fs.mkdirSync('src/assets/images',{recursive:true});
for(const [dir,name] of [['Doctor_Image','firstView'],['Doctor_Image','sato_taro'],['Doctor_Image','suzuki_mari'],['Doctor_Image','takahashi_yumi'],['Medical_Image','medical_1'],['Medical_Image','medical_3'],['Patient_Image','patient_1'],['','map']]){
 await sharp(`${root}/img/${dir}/${name}.jpg`).resize({width:name==='firstView'?1600:1000,withoutEnlargement:true}).webp({quality:90}).toFile(`src/assets/images/${name}.webp`);
 if(name==='firstView')await sharp(`${root}/img/${dir}/${name}.jpg`).resize(800).webp({quality:90}).toFile('src/assets/images/firstView-800.webp');
}fs.copyFileSync(root+'/img/Logo/logo.png','src/assets/images/logo.png');})();
