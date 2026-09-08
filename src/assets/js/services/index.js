import {repository,session} from '../repositories/local-storage.js';
export {repository,session};
export const id=prefix=>prefix+'-'+crypto.randomUUID();
const active=r=>['confirmed','pending'].includes(r.status);
export const AuthService={
 current(){const id=session.get('member');return repository.read().members.find(m=>m.id===id&&m.status==='active')||null},
 login(email,password){if(password.length<8)throw Error('デモ用パスワードは8文字以上で入力してください。');const m=repository.read().members.find(m=>m.email.toLowerCase()===email.toLowerCase());if(!m)throw Error('登録されたメールがありません。会員登録するか、デモ用メールをお使いください。');if(m.status!=='active')throw Error('このデモ会員は利用停止中です。');session.set('member',m.id);return m},
 register(values){return repository.update(d=>{if(d.members.some(m=>m.email.toLowerCase()===values.email.toLowerCase()))throw Error('このメールアドレスは登録済みです。ログインしてください。');const m={id:id('member'),name:values.name,email:values.email,phone:values.phone,status:'active'};d.members.push(m);session.set('member',m.id);return m})},
 logout(){session.remove('member')},adminLogin(password){if(password.length<8)throw Error('デモ用パスワードは8文字以上です。');session.set('admin',true)},admin(){return session.get('admin')===true}
};
export const ReservationService={
 slots(){const d=repository.read();return d.slots.map(s=>this.describe(s,d))},
 describe(s,d){const booked=d.reservations.filter(r=>r.slotId===s.id&&active(r)).length;const expired=new Date(s.date+'T'+s.time)<=new Date();const remaining=Math.max(0,s.capacity-booked);return {...s,booked,remaining,state:expired?'past':!s.open?'closed':remaining===0?'full':remaining===1?'low':'open'}},
 book(draft){const m=AuthService.current();if(!m)throw Error('ログイン状態を確認してください。');return repository.update(d=>{const s=d.slots.find(s=>s.id===draft.slotId);if(!s||!['open','low'].includes(this.describe(s,d).state))throw Error('選択した枠は満枠または受付停止になりました。入力内容を保持しています。別の日時を選んでください。');const r={id:id('reservation'),memberId:m.id,slotId:s.id,date:s.date,time:s.time,patient:draft.patient,phone:draft.phone,visit:draft.visit,status:'confirmed'};d.reservations.push(r);return r})},
 cancel(resId){const m=AuthService.current();return repository.update(d=>{const r=d.reservations.find(r=>r.id===resId&&r.memberId===m?.id);if(!r||!active(r))throw Error('この予約は取消できません。');r.status='cancelled'})},
 change(resId,slotId){const m=AuthService.current();return repository.update(d=>{const r=d.reservations.find(r=>r.id===resId&&r.memberId===m?.id),s=d.slots.find(s=>s.id===slotId);if(!r||!active(r)||!s||!['open','low'].includes(this.describe(s,d).state))throw Error('日時を変更できません。最新の空き状況をご確認ください。');Object.assign(r,{slotId:s.id,date:s.date,time:s.time})})}
};
export const MemberService={reservations(){const m=AuthService.current();return repository.read().reservations.filter(r=>r.memberId===m?.id).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time))},get(id){return this.reservations().find(r=>r.id===id)}};
export const NewsService={published(){return repository.read().news.filter(n=>n.status==='published').sort((a,b)=>(b.created||'').localeCompare(a.created||''))},get(id){return this.published().find(n=>n.id===id)}};
function adminGuard(){if(!AuthService.admin())throw Error('管理者デモにログインしてください。')}
export const AdminService={
 data(){adminGuard();return repository.read()},
 status(resId,status){adminGuard();if(!['pending','confirmed','visited','cancelled'].includes(status))throw Error('状態が不正です。');repository.update(d=>{const r=d.reservations.find(x=>x.id===resId);if(!r)throw Error('予約が見つかりません。');if(active({status})&&!active(r)){const s=d.slots.find(s=>s.id===r.slotId);if(!s||!['open','low'].includes(ReservationService.describe(s,d).state))throw Error('元の枠に空きがないため再開できません。');}r.status=status})},
 slot(slotId,open,capacity){adminGuard();if(!Number.isInteger(capacity)||capacity<1||capacity>20)throw Error('定員は1〜20の整数で入力してください。');repository.update(d=>{const s=d.slots.find(s=>s.id===slotId);if(!s)throw Error('枠が見つかりません。');const booked=ReservationService.describe(s,d).booked;if(capacity<booked)throw Error('定員は予約済み人数以上にしてください。');Object.assign(s,{open,capacity})})},
 news(values){adminGuard();return repository.update(d=>{let n=d.news.find(n=>n.id===values.id);if(n?.source)throw Error('支給原稿は保護されています。複製して編集してください。');if(!n){n={id:id('news'),created:new Date().toISOString(),source:false};d.news.push(n)}Object.assign(n,{title:values.title,body:values.body,status:values.status});return n})},
 member(memberId,status){adminGuard();repository.update(d=>{const m=d.members.find(m=>m.id===memberId);if(m)m.status=status==='suspended'?'suspended':'active'})}
};
