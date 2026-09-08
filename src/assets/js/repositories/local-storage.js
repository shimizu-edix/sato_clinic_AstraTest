import {createSeed} from '../mock-data.js';
export const STORE_KEY='sato-clinic.v1.1';
const channel=typeof BroadcastChannel==='function'?new BroadcastChannel('sato-clinic-updates'):null;
const listeners=new Set();
function notify(transport){for(const fn of listeners)fn(transport)}
// Another renderer can receive a channel message before its storage cache catches up.
// Coalesce notifications and read on a later task; the storage event remains immediate.
let channelTimer;
channel?.addEventListener('message',()=>{clearTimeout(channelTimer);channelTimer=setTimeout(()=>notify('BroadcastChannel'),50)});
addEventListener('storage',e=>{if(e.key===STORE_KEY)notify('storage')});
addEventListener('focus',()=>notify('focus'));
export const repository={
 read(){const raw=localStorage.getItem(STORE_KEY);if(!raw){const data=createSeed();localStorage.setItem(STORE_KEY,JSON.stringify(data));return data}const data=JSON.parse(raw);if(data.version!==1||!['slots','reservations','members','news'].every(k=>Array.isArray(data[k])))throw Error('デモデータを読み込めません。保存内容を確認してください。');return data},
 update(fn){const data=this.read();const result=fn(data);localStorage.setItem(STORE_KEY,JSON.stringify(data));channel?.postMessage({changed:true});return result},
 subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)},
 reset(){localStorage.removeItem(STORE_KEY);this.read();channel?.postMessage({changed:true});notify('reset')}
};
export const session={get(k){try{return JSON.parse(sessionStorage.getItem('sato.'+k))}catch{return null}},set(k,v){sessionStorage.setItem('sato.'+k,JSON.stringify(v))},remove(k){sessionStorage.removeItem('sato.'+k)}};
