var ep=Object.defineProperty;var np=(n,t,e)=>t in n?ep(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var ft=(n,t,e)=>(np(n,typeof t!="symbol"?t+"":t,e),e),bo=(n,t,e)=>{if(!t.has(n))throw TypeError("Cannot "+e)};var g=(n,t,e)=>(bo(n,t,"read from private field"),e?e.call(n):t.get(n)),F=(n,t,e)=>{if(t.has(n))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(n):t.set(n,e)},U=(n,t,e,r)=>(bo(n,t,"write to private field"),r?r.call(n,e):t.set(n,e),e);var Di=(n,t,e,r)=>({set _(i){U(n,t,i,e)},get _(){return g(n,t,r)}}),O=(n,t,e)=>(bo(n,t,"access private method"),e);import{a as Ge}from"./browser-polyfill-3de740ec.js";import{i as rp,e as ip,p as sp,c as op,g as Ns,s as tr,k as ap}from"./extension-info-79ba4f04.js";const lp=["summaryLanguage","displayLanguage","theme","copyFormat","llm","temporaryChat","chatGptPaidUser","claudePaidUser","customGPTsURL","geminiURL","customPrompt","followupPrompts","summaryStrategy","ytSummaryWidgetVisibility","summaryIconVisibility","summaryIconOnVideoThumbnailVisibility","summaryIconInVideoPlayer","showWidgetMessage","obsidianExport"];var Yu={hasSubscribers:!1},bt=Yu,Nr=Yu,cp=typeof performance=="object"&&performance&&typeof performance.now=="function"?performance:Date,So=()=>bt.hasSubscribers||Nr.hasSubscribers,Xu=new Set,fc=typeof process=="object"&&process?process:{},up=(n,t,e,r)=>{typeof fc.emitWarning=="function"?fc.emitWarning(n,t,e,r):console.error(`[${e}] ${t}: ${n}`)},hp=n=>!Xu.has(n),Me=n=>!!n&&n===Math.floor(n)&&n>0&&isFinite(n),Zu=n=>Me(n)?n<=Math.pow(2,8)?Uint8Array:n<=Math.pow(2,16)?Uint16Array:n<=Math.pow(2,32)?Uint32Array:n<=Number.MAX_SAFE_INTEGER?Gi:null:null,Gi=class extends Array{constructor(t){super(t),this.fill(0)}},Ce,Wn,dp=(Ce=class{constructor(t,e){ft(this,"heap");ft(this,"length");if(!g(Ce,Wn))throw new TypeError("instantiate Stack using Stack.create(n)");this.heap=new e(t),this.length=0}static create(t){let e=Zu(t);if(!e)return[];U(Ce,Wn,!0);let r=new Ce(t,e);return U(Ce,Wn,!1),r}push(t){this.heap[this.length++]=t}pop(){return this.heap[--this.length]}},Wn=new WeakMap,F(Ce,Wn,!1),Ce),Yt,Gt,te,dn,ee,Kn,Qn,ne,vt,re,gt,ot,$,Ut,Ht,Dt,Tt,ie,wt,se,oe,Wt,Kt,ae,Jn,jt,fn,Zr,jo,pn,be,ti,Qt,Rs,th,gn,Yn,ei,de,Fe,fe,Ue,ni,Bo,rT,ze,Dn,Xn,Hi,Cs,eh,Ps,nh,Zn,Wi,nt,it,ri,zo,ks,rh,Vs,ih,mn,Dr,ii,$o,_n,Or,pe,je,si,qo,oi,fp=(oi=class{constructor(t){F(this,Zr);F(this,Rs);F(this,de);F(this,fe);F(this,ni);F(this,ze);F(this,Xn);F(this,Cs);F(this,Ps);F(this,Zn);F(this,nt);F(this,ri);F(this,ks);F(this,Vs);F(this,mn);F(this,ii);F(this,_n);F(this,pe);F(this,si);F(this,Yt,void 0);F(this,Gt,void 0);F(this,te,void 0);F(this,dn,void 0);F(this,ee,void 0);F(this,Kn,void 0);F(this,Qn,void 0);F(this,ne,void 0);ft(this,"ttl");ft(this,"ttlResolution");ft(this,"ttlAutopurge");ft(this,"updateAgeOnGet");ft(this,"updateAgeOnHas");ft(this,"allowStale");ft(this,"noDisposeOnSet");ft(this,"noUpdateTTL");ft(this,"maxEntrySize");ft(this,"sizeCalculation");ft(this,"noDeleteOnFetchRejection");ft(this,"noDeleteOnStaleGet");ft(this,"allowStaleOnFetchAbort");ft(this,"allowStaleOnFetchRejection");ft(this,"ignoreFetchAbort");ft(this,"backgroundFetchSize");F(this,vt,void 0);F(this,re,void 0);F(this,gt,void 0);F(this,ot,void 0);F(this,$,void 0);F(this,Ut,void 0);F(this,Ht,void 0);F(this,Dt,void 0);F(this,Tt,void 0);F(this,ie,void 0);F(this,wt,void 0);F(this,se,void 0);F(this,oe,void 0);F(this,Wt,void 0);F(this,Kt,void 0);F(this,ae,void 0);F(this,Jn,void 0);F(this,jt,void 0);F(this,fn,void 0);F(this,pn,()=>{});F(this,be,()=>{});F(this,ti,()=>{});F(this,Qt,()=>!1);F(this,gn,t=>{});F(this,Yn,(t,e,r)=>{});F(this,ei,(t,e,r,i)=>{if(r||i)throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");return 0});ft(this,rT,"LRUCache");let{max:e=0,ttl:r,ttlResolution:i=1,ttlAutopurge:o,updateAgeOnGet:a,updateAgeOnHas:c,allowStale:u,dispose:d,onInsert:f,disposeAfter:_,noDisposeOnSet:T,noUpdateTTL:R,maxSize:P=0,maxEntrySize:k=0,sizeCalculation:N,fetchMethod:x,memoMethod:j,noDeleteOnFetchRejection:z,noDeleteOnStaleGet:H,allowStaleOnFetchRejection:Q,allowStaleOnFetchAbort:W,ignoreFetchAbort:E,backgroundFetchSize:m=1,perf:y}=t;if(this.backgroundFetchSize=m,y!==void 0&&typeof(y==null?void 0:y.now)!="function")throw new TypeError("perf option must have a now() method if specified");if(U(this,ne,y??cp),e!==0&&!Me(e))throw new TypeError("max option must be a nonnegative integer");let w=e?Zu(e):Array;if(!w)throw new Error("invalid max value: "+e);if(U(this,Yt,e),U(this,Gt,P),this.maxEntrySize=k||g(this,Gt),this.sizeCalculation=N,this.sizeCalculation){if(!g(this,Gt)&&!this.maxEntrySize)throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");if(typeof this.sizeCalculation!="function")throw new TypeError("sizeCalculation set to non-function")}if(j!==void 0&&typeof j!="function")throw new TypeError("memoMethod must be a function if defined");if(U(this,Qn,j),x!==void 0&&typeof x!="function")throw new TypeError("fetchMethod must be a function if specified");if(U(this,Kn,x),U(this,Jn,!!x),U(this,gt,new Map),U(this,ot,Array.from({length:e}).fill(void 0)),U(this,$,Array.from({length:e}).fill(void 0)),U(this,Ut,new w(e)),U(this,Ht,new w(e)),U(this,Dt,0),U(this,Tt,0),U(this,ie,dp.create(e)),U(this,vt,0),U(this,re,0),typeof d=="function"&&U(this,te,d),typeof f=="function"&&U(this,dn,f),typeof _=="function"?(U(this,ee,_),U(this,wt,[])):(U(this,ee,void 0),U(this,wt,void 0)),U(this,ae,!!g(this,te)),U(this,fn,!!g(this,dn)),U(this,jt,!!g(this,ee)),this.noDisposeOnSet=!!T,this.noUpdateTTL=!!R,this.noDeleteOnFetchRejection=!!z,this.allowStaleOnFetchRejection=!!Q,this.allowStaleOnFetchAbort=!!W,this.ignoreFetchAbort=!!E,this.maxEntrySize!==0){if(g(this,Gt)!==0&&!Me(g(this,Gt)))throw new TypeError("maxSize must be a positive integer if specified");if(!Me(this.maxEntrySize))throw new TypeError("maxEntrySize must be a positive integer if specified");O(this,Rs,th).call(this)}if(this.allowStale=!!u,this.noDeleteOnStaleGet=!!H,this.updateAgeOnGet=!!a,this.updateAgeOnHas=!!c,this.ttlResolution=Me(i)||i===0?i:1,this.ttlAutopurge=!!o,this.ttl=r||0,this.ttl){if(!Me(this.ttl))throw new TypeError("ttl must be a positive integer if specified");O(this,Zr,jo).call(this)}if(g(this,Yt)===0&&this.ttl===0&&g(this,Gt)===0)throw new TypeError("At least one of max, maxSize, or ttl is required");if(!this.ttlAutopurge&&!g(this,Yt)&&!g(this,Gt)){let I="LRU_CACHE_UNBOUNDED";hp(I)&&(Xu.add(I),up("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.","UnboundedCacheWarning",I,oi))}}get perf(){return g(this,ne)}static unsafeExposeInternals(t){return{starts:g(t,oe),ttls:g(t,Wt),autopurgeTimers:g(t,Kt),sizes:g(t,se),keyMap:g(t,gt),keyList:g(t,ot),valList:g(t,$),next:g(t,Ut),prev:g(t,Ht),get head(){return g(t,Dt)},get tail(){return g(t,Tt)},free:g(t,ie),isBackgroundFetch:e=>{var r;return O(r=t,nt,it).call(r,e)},backgroundFetch:(e,r,i,o)=>{var a;return O(a=t,Zn,Wi).call(a,e,r,i,o)},moveToTail:e=>{var r;return O(r=t,_n,Or).call(r,e)},indexes:e=>{var r;return O(r=t,de,Fe).call(r,e)},rindexes:e=>{var r;return O(r=t,fe,Ue).call(r,e)},isStale:e=>{var r;return g(r=t,Qt).call(r,e)}}}get max(){return g(this,Yt)}get maxSize(){return g(this,Gt)}get calculatedSize(){return g(this,re)}get size(){return g(this,vt)}get fetchMethod(){return g(this,Kn)}get memoMethod(){return g(this,Qn)}get dispose(){return g(this,te)}get onInsert(){return g(this,dn)}get disposeAfter(){return g(this,ee)}getRemainingTTL(t){return g(this,gt).has(t)?1/0:0}*entries(){for(let t of O(this,de,Fe).call(this))g(this,$)[t]!==void 0&&g(this,ot)[t]!==void 0&&!O(this,nt,it).call(this,g(this,$)[t])&&(yield[g(this,ot)[t],g(this,$)[t]])}*rentries(){for(let t of O(this,fe,Ue).call(this))g(this,$)[t]!==void 0&&g(this,ot)[t]!==void 0&&!O(this,nt,it).call(this,g(this,$)[t])&&(yield[g(this,ot)[t],g(this,$)[t]])}*keys(){for(let t of O(this,de,Fe).call(this)){let e=g(this,ot)[t];e!==void 0&&!O(this,nt,it).call(this,g(this,$)[t])&&(yield e)}}*rkeys(){for(let t of O(this,fe,Ue).call(this)){let e=g(this,ot)[t];e!==void 0&&!O(this,nt,it).call(this,g(this,$)[t])&&(yield e)}}*values(){for(let t of O(this,de,Fe).call(this))g(this,$)[t]!==void 0&&!O(this,nt,it).call(this,g(this,$)[t])&&(yield g(this,$)[t])}*rvalues(){for(let t of O(this,fe,Ue).call(this))g(this,$)[t]!==void 0&&!O(this,nt,it).call(this,g(this,$)[t])&&(yield g(this,$)[t])}[Symbol.iterator](){return this.entries()}find(t,e={}){for(let r of O(this,de,Fe).call(this)){let i=g(this,$)[r],o=O(this,nt,it).call(this,i)?i.__staleWhileFetching:i;if(o!==void 0&&t(o,g(this,ot)[r],this))return O(this,mn,Dr).call(this,g(this,ot)[r],e)}}forEach(t,e=this){for(let r of O(this,de,Fe).call(this)){let i=g(this,$)[r],o=O(this,nt,it).call(this,i)?i.__staleWhileFetching:i;o!==void 0&&t.call(e,o,g(this,ot)[r],this)}}rforEach(t,e=this){for(let r of O(this,fe,Ue).call(this)){let i=g(this,$)[r],o=O(this,nt,it).call(this,i)?i.__staleWhileFetching:i;o!==void 0&&t.call(e,o,g(this,ot)[r],this)}}purgeStale(){let t=!1;for(let e of O(this,fe,Ue).call(this,{allowStale:!0}))g(this,Qt).call(this,e)&&(O(this,pe,je).call(this,g(this,ot)[e],"expire"),t=!0);return t}info(t){let e=g(this,gt).get(t);if(e===void 0)return;let r=g(this,$)[e],i=O(this,nt,it).call(this,r)?r.__staleWhileFetching:r;if(i===void 0)return;let o={value:i};if(g(this,Wt)&&g(this,oe)){let a=g(this,Wt)[e],c=g(this,oe)[e];if(a&&c){let u=a-(g(this,ne).now()-c);o.ttl=u,o.start=Date.now()}}return g(this,se)&&(o.size=g(this,se)[e]),o}dump(){let t=[];for(let e of O(this,de,Fe).call(this,{allowStale:!0})){let r=g(this,ot)[e],i=g(this,$)[e],o=O(this,nt,it).call(this,i)?i.__staleWhileFetching:i;if(o===void 0||r===void 0)continue;let a={value:o};if(g(this,Wt)&&g(this,oe)){a.ttl=g(this,Wt)[e];let c=g(this,ne).now()-g(this,oe)[e];a.start=Math.floor(Date.now()-c)}g(this,se)&&(a.size=g(this,se)[e]),t.unshift([r,a])}return t}load(t){this.clear();for(let[e,r]of t){if(r.start){let i=Date.now()-r.start;r.start=g(this,ne).now()-i}O(this,ze,Dn).call(this,e,r.value,r)}}set(t,e,r={}){let{status:i=bt.hasSubscribers?{}:void 0}=r;r.status=i,i&&(i.op="set",i.key=t,e!==void 0&&(i.value=e),i.cache=this);let o=O(this,ze,Dn).call(this,t,e,r);return i&&bt.hasSubscribers&&bt.publish(i),o}pop(){var t;try{for(;g(this,vt);){let e=g(this,$)[g(this,Dt)];if(O(this,Xn,Hi).call(this,!0),O(this,nt,it).call(this,e)){if(e.__staleWhileFetching)return e.__staleWhileFetching}else if(e!==void 0)return e}}finally{if(g(this,jt)&&g(this,wt)){let e=g(this,wt),r;for(;r=e==null?void 0:e.shift();)(t=g(this,ee))==null||t.call(this,...r)}}}has(t,e={}){let{status:r=bt.hasSubscribers?{}:void 0}=e;e.status=r,r&&(r.op="has",r.key=t,r.cache=this);let i=O(this,Cs,eh).call(this,t,e);return bt.hasSubscribers&&bt.publish(r),i}peek(t,e={}){let{status:r=So()?{}:void 0}=e;r&&(r.op="peek",r.key=t,r.cache=this),e.status=r;let i=O(this,Ps,nh).call(this,t,e);return bt.hasSubscribers&&bt.publish(r),i}fetch(t,e={}){let r=Nr.hasSubscribers,{status:i=So()?{}:void 0}=e;e.status=i,i&&e.context&&(i.context=e.context);let o=O(this,ri,zo).call(this,t,e);return i&&r&&(i.trace=!0,Nr.tracePromise(()=>o,i).catch(()=>{})),o}forceFetch(t,e={}){let r=Nr.hasSubscribers,{status:i=So()?{}:void 0}=e;e.status=i,i&&e.context&&(i.context=e.context);let o=O(this,ks,rh).call(this,t,e);return i&&r&&(i.trace=!0,Nr.tracePromise(()=>o,i).catch(()=>{})),o}memo(t,e={}){let{status:r=bt.hasSubscribers?{}:void 0}=e;e.status=r,r&&(r.op="memo",r.key=t,e.context&&(r.context=e.context),r.cache=this);let i=O(this,Vs,ih).call(this,t,e);return r&&(r.value=i),bt.hasSubscribers&&bt.publish(r),i}get(t,e={}){let{status:r=bt.hasSubscribers?{}:void 0}=e;e.status=r,r&&(r.op="get",r.key=t,r.cache=this);let i=O(this,mn,Dr).call(this,t,e);return r&&(i!==void 0&&(r.value=i),bt.hasSubscribers&&bt.publish(r)),i}delete(t){return O(this,pe,je).call(this,t,"delete")}clear(){return O(this,si,qo).call(this,"delete")}},rT=Symbol.toStringTag,Yt=new WeakMap,Gt=new WeakMap,te=new WeakMap,dn=new WeakMap,ee=new WeakMap,Kn=new WeakMap,Qn=new WeakMap,ne=new WeakMap,vt=new WeakMap,re=new WeakMap,gt=new WeakMap,ot=new WeakMap,$=new WeakMap,Ut=new WeakMap,Ht=new WeakMap,Dt=new WeakMap,Tt=new WeakMap,ie=new WeakMap,wt=new WeakMap,se=new WeakMap,oe=new WeakMap,Wt=new WeakMap,Kt=new WeakMap,ae=new WeakMap,Jn=new WeakMap,jt=new WeakMap,fn=new WeakMap,Zr=new WeakSet,jo=function(){let t=new Gi(g(this,Yt)),e=new Gi(g(this,Yt));U(this,Wt,t),U(this,oe,e);let r=this.ttlAutopurge?Array.from({length:g(this,Yt)}):void 0;U(this,Kt,r),U(this,ti,(c,u,d=g(this,ne).now())=>{e[c]=u!==0?d:0,t[c]=u,i(c,u)}),U(this,pn,c=>{e[c]=t[c]!==0?g(this,ne).now():0,i(c,t[c])});let i=this.ttlAutopurge?(c,u)=>{if(r!=null&&r[c]&&(clearTimeout(r[c]),r[c]=void 0),u&&u!==0&&r){let d=setTimeout(()=>{g(this,Qt).call(this,c)&&O(this,pe,je).call(this,g(this,ot)[c],"expire")},u+1);d.unref&&d.unref(),r[c]=d}}:()=>{};U(this,be,(c,u)=>{if(t[u]){let d=t[u],f=e[u];if(!d||!f)return;c.ttl=d,c.start=f,c.now=o||a();let _=c.now-f;c.remainingTTL=d-_}});let o=0,a=()=>{let c=g(this,ne).now();if(this.ttlResolution>0){o=c;let u=setTimeout(()=>o=0,this.ttlResolution);u.unref&&u.unref()}return c};this.getRemainingTTL=c=>{let u=g(this,gt).get(c);if(u===void 0)return 0;let d=t[u],f=e[u];if(!d||!f)return 1/0;let _=(o||a())-f;return d-_},U(this,Qt,c=>{let u=e[c],d=t[c];return!!d&&!!u&&(o||a())-u>d})},pn=new WeakMap,be=new WeakMap,ti=new WeakMap,Qt=new WeakMap,Rs=new WeakSet,th=function(){let t=new Gi(g(this,Yt));U(this,re,0),U(this,se,t),U(this,gn,e=>{U(this,re,g(this,re)-t[e]),t[e]=0}),U(this,ei,(e,r,i,o)=>{if(!Me(i)){if(O(this,nt,it).call(this,r))return this.backgroundFetchSize;if(o){if(typeof o!="function")throw new TypeError("sizeCalculation must be a function");if(i=o(r,e),!Me(i))throw new TypeError("sizeCalculation return invalid (expect positive integer)")}else throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.")}return i}),U(this,Yn,(e,r,i)=>{if(t[e]=r,g(this,Gt)){let o=g(this,Gt)-t[e];for(;g(this,re)>o;)O(this,Xn,Hi).call(this,!0)}U(this,re,g(this,re)+t[e]),i&&(i.entrySize=r,i.totalCalculatedSize=g(this,re))})},gn=new WeakMap,Yn=new WeakMap,ei=new WeakMap,de=new WeakSet,Fe=function*({allowStale:t=this.allowStale}={}){if(g(this,vt))for(let e=g(this,Tt);O(this,ni,Bo).call(this,e)&&((t||!g(this,Qt).call(this,e))&&(yield e),e!==g(this,Dt));)e=g(this,Ht)[e]},fe=new WeakSet,Ue=function*({allowStale:t=this.allowStale}={}){if(g(this,vt))for(let e=g(this,Dt);O(this,ni,Bo).call(this,e)&&((t||!g(this,Qt).call(this,e))&&(yield e),e!==g(this,Tt));)e=g(this,Ut)[e]},ni=new WeakSet,Bo=function(t){return t!==void 0&&g(this,gt).get(g(this,ot)[t])===t},ze=new WeakSet,Dn=function(t,e,r,i){var P,k,N,x,j,z,H,Q;let{ttl:o=this.ttl,start:a,noDisposeOnSet:c=this.noDisposeOnSet,sizeCalculation:u=this.sizeCalculation,status:d}=r,f=O(this,nt,it).call(this,e);if(e===void 0)return d&&(d.set="deleted"),this.delete(t),this;let{noUpdateTTL:_=this.noUpdateTTL}=r;d&&!f&&(d.value=e);let T=g(this,ei).call(this,t,e,r.size||0,u,d);if(this.maxEntrySize&&T>this.maxEntrySize)return O(this,pe,je).call(this,t,"set"),d&&(d.set="miss",d.maxEntrySizeExceeded=!0),this;let R=g(this,vt)===0?void 0:g(this,gt).get(t);if(R===void 0)R=g(this,vt)===0?g(this,Tt):g(this,ie).length!==0?g(this,ie).pop():g(this,vt)===g(this,Yt)?O(this,Xn,Hi).call(this,!1):g(this,vt),g(this,ot)[R]=t,g(this,$)[R]=e,g(this,gt).set(t,R),g(this,Ut)[g(this,Tt)]=R,g(this,Ht)[R]=g(this,Tt),U(this,Tt,R),Di(this,vt)._++,g(this,Yn).call(this,R,T,d),d&&(d.set="add"),_=!1,g(this,fn)&&!f&&((P=g(this,dn))==null||P.call(this,e,t,"add"));else{O(this,_n,Or).call(this,R);let W=g(this,$)[R];if(e!==W){if(!c)if(O(this,nt,it).call(this,W)){W!==i&&W.__abortController.abort(new Error("replaced"));let{__staleWhileFetching:E}=W;E!==void 0&&E!==e&&(g(this,ae)&&((k=g(this,te))==null||k.call(this,E,t,"set")),g(this,jt)&&((N=g(this,wt))==null||N.push([E,t,"set"])))}else g(this,ae)&&((x=g(this,te))==null||x.call(this,W,t,"set")),g(this,jt)&&((j=g(this,wt))==null||j.push([W,t,"set"]));if(g(this,gn).call(this,R),g(this,Yn).call(this,R,T,d),g(this,$)[R]=e,!f){let E=W&&O(this,nt,it).call(this,W)?W.__staleWhileFetching:W,m=E===void 0?"add":e!==E?"replace":"update";d&&(d.set=m,E!==void 0&&(d.oldValue=E)),g(this,fn)&&((z=this.onInsert)==null||z.call(this,e,t,m))}}else f||(d&&(d.set="update"),g(this,fn)&&((H=this.onInsert)==null||H.call(this,e,t,"update")))}if(o!==0&&!g(this,Wt)&&O(this,Zr,jo).call(this),g(this,Wt)&&(_||g(this,ti).call(this,R,o,a),d&&g(this,be).call(this,d,R)),!c&&g(this,jt)&&g(this,wt)){let W=g(this,wt),E;for(;E=W==null?void 0:W.shift();)(Q=g(this,ee))==null||Q.call(this,...E)}return this},Xn=new WeakSet,Hi=function(t){var c,u,d;let e=g(this,Dt),r=g(this,ot)[e],i=g(this,$)[e],o=O(this,nt,it).call(this,i);o&&i.__abortController.abort(new Error("evicted"));let a=o?i.__staleWhileFetching:i;return(g(this,ae)||g(this,jt))&&a!==void 0&&(g(this,ae)&&((c=g(this,te))==null||c.call(this,a,r,"evict")),g(this,jt)&&((u=g(this,wt))==null||u.push([a,r,"evict"]))),g(this,gn).call(this,e),(d=g(this,Kt))!=null&&d[e]&&(clearTimeout(g(this,Kt)[e]),g(this,Kt)[e]=void 0),t&&(g(this,ot)[e]=void 0,g(this,$)[e]=void 0,g(this,ie).push(e)),g(this,vt)===1?(U(this,Dt,U(this,Tt,0)),g(this,ie).length=0):U(this,Dt,g(this,Ut)[e]),g(this,gt).delete(r),Di(this,vt)._--,e},Cs=new WeakSet,eh=function(t,e={}){let{updateAgeOnHas:r=this.updateAgeOnHas,status:i}=e,o=g(this,gt).get(t);if(o!==void 0){let a=g(this,$)[o];if(O(this,nt,it).call(this,a)&&a.__staleWhileFetching===void 0)return!1;if(g(this,Qt).call(this,o))i&&(i.has="stale",g(this,be).call(this,i,o));else return r&&g(this,pn).call(this,o),i&&(i.has="hit",g(this,be).call(this,i,o)),!0}else i&&(i.has="miss");return!1},Ps=new WeakSet,nh=function(t,e){let{status:r,allowStale:i=this.allowStale}=e,o=g(this,gt).get(t);if(o===void 0||!i&&g(this,Qt).call(this,o)){r&&(r.peek=o===void 0?"miss":"stale");return}let a=g(this,$)[o],c=O(this,nt,it).call(this,a)?a.__staleWhileFetching:a;return r&&(c!==void 0?(r.peek="hit",r.value=c):r.peek="miss"),c},Zn=new WeakSet,Wi=function(t,e,r,i){let o=e===void 0?void 0:g(this,$)[e];if(O(this,nt,it).call(this,o))return o;let a=new AbortController,{signal:c}=r;c==null||c.addEventListener("abort",()=>a.abort(c.reason),{signal:a.signal});let u={signal:a.signal,options:r,context:i},d=(k,N=!1)=>{let{aborted:x}=a.signal,j=r.ignoreFetchAbort&&k!==void 0,z=r.ignoreFetchAbort||!!(r.allowStaleOnFetchAbort&&k!==void 0);if(r.status&&(x&&!N?(r.status.fetchAborted=!0,r.status.fetchError=a.signal.reason,j&&(r.status.fetchAbortIgnored=!0)):r.status.fetchResolved=!0),x&&!j&&!N)return _(a.signal.reason,z);let H=R,Q=g(this,$)[e];return(Q===R||Q===void 0&&j&&N)&&(k===void 0?H.__staleWhileFetching!==void 0?g(this,$)[e]=H.__staleWhileFetching:O(this,pe,je).call(this,t,"fetch"):(r.status&&(r.status.fetchUpdated=!0),O(this,ze,Dn).call(this,t,k,u.options,H))),k},f=k=>(r.status&&(r.status.fetchRejected=!0,r.status.fetchError=k),_(k,!1)),_=(k,N)=>{let{aborted:x}=a.signal,j=x&&r.allowStaleOnFetchAbort,z=j||r.allowStaleOnFetchRejection,H=z||r.noDeleteOnFetchRejection,Q=R;if(g(this,$)[e]===R&&(!H||!N&&Q.__staleWhileFetching===void 0?O(this,pe,je).call(this,t,"fetch"):j||(g(this,$)[e]=Q.__staleWhileFetching)),z)return r.status&&Q.__staleWhileFetching!==void 0&&(r.status.returnedStale=!0),Q.__staleWhileFetching;if(Q.__returned===Q)throw k},T=(k,N)=>{var j;let x=(j=g(this,Kn))==null?void 0:j.call(this,t,o,u);a.signal.addEventListener("abort",()=>{(!r.ignoreFetchAbort||r.allowStaleOnFetchAbort)&&(k(void 0),r.allowStaleOnFetchAbort&&(k=z=>d(z,!0)))}),x&&x instanceof Promise?x.then(z=>k(z===void 0?void 0:z),N):x!==void 0&&k(x)};r.status&&(r.status.fetchDispatched=!0);let R=new Promise(T).then(d,f),P=Object.assign(R,{__abortController:a,__staleWhileFetching:o,__returned:void 0});return e===void 0?(O(this,ze,Dn).call(this,t,P,{...u.options,status:void 0}),e=g(this,gt).get(t)):g(this,$)[e]=P,P},nt=new WeakSet,it=function(t){if(!g(this,Jn))return!1;let e=t;return!!e&&e instanceof Promise&&e.hasOwnProperty("__staleWhileFetching")&&e.__abortController instanceof AbortController},ri=new WeakSet,zo=async function(t,e={}){let{allowStale:r=this.allowStale,updateAgeOnGet:i=this.updateAgeOnGet,noDeleteOnStaleGet:o=this.noDeleteOnStaleGet,ttl:a=this.ttl,noDisposeOnSet:c=this.noDisposeOnSet,size:u=0,sizeCalculation:d=this.sizeCalculation,noUpdateTTL:f=this.noUpdateTTL,noDeleteOnFetchRejection:_=this.noDeleteOnFetchRejection,allowStaleOnFetchRejection:T=this.allowStaleOnFetchRejection,ignoreFetchAbort:R=this.ignoreFetchAbort,allowStaleOnFetchAbort:P=this.allowStaleOnFetchAbort,context:k,forceRefresh:N=!1,status:x,signal:j}=e;if(x&&(x.op="fetch",x.key=t,N&&(x.forceRefresh=!0),x.cache=this),!g(this,Jn))return x&&(x.fetch="get"),O(this,mn,Dr).call(this,t,{allowStale:r,updateAgeOnGet:i,noDeleteOnStaleGet:o,status:x});let z={allowStale:r,updateAgeOnGet:i,noDeleteOnStaleGet:o,ttl:a,noDisposeOnSet:c,size:u,sizeCalculation:d,noUpdateTTL:f,noDeleteOnFetchRejection:_,allowStaleOnFetchRejection:T,allowStaleOnFetchAbort:P,ignoreFetchAbort:R,status:x,signal:j},H=g(this,gt).get(t);if(H===void 0){x&&(x.fetch="miss");let Q=O(this,Zn,Wi).call(this,t,H,z,k);return Q.__returned=Q}else{let Q=g(this,$)[H];if(O(this,nt,it).call(this,Q)){let y=r&&Q.__staleWhileFetching!==void 0;return x&&(x.fetch="inflight",y&&(x.returnedStale=!0)),y?Q.__staleWhileFetching:Q.__returned=Q}let W=g(this,Qt).call(this,H);if(!N&&!W)return x&&(x.fetch="hit"),O(this,_n,Or).call(this,H),i&&g(this,pn).call(this,H),x&&g(this,be).call(this,x,H),Q;let E=O(this,Zn,Wi).call(this,t,H,z,k),m=E.__staleWhileFetching!==void 0&&r;return x&&(x.fetch=W?"stale":"refresh",m&&W&&(x.returnedStale=!0)),m?E.__staleWhileFetching:E.__returned=E}},ks=new WeakSet,rh=async function(t,e={}){let r=await O(this,ri,zo).call(this,t,e);if(r===void 0)throw new Error("fetch() returned undefined");return r},Vs=new WeakSet,ih=function(t,e={}){let r=g(this,Qn);if(!r)throw new Error("no memoMethod provided to constructor");let{context:i,status:o,forceRefresh:a,...c}=e;o&&a&&(o.forceRefresh=!0);let u=O(this,mn,Dr).call(this,t,c),d=a||u===void 0;if(o&&(o.memo=d?"miss":"hit",d||(o.value=u)),!d)return u;let f=r(t,u,{options:c,context:i});return o&&(o.value=f),O(this,ze,Dn).call(this,t,f,c),f},mn=new WeakSet,Dr=function(t,e={}){let{allowStale:r=this.allowStale,updateAgeOnGet:i=this.updateAgeOnGet,noDeleteOnStaleGet:o=this.noDeleteOnStaleGet,status:a}=e,c=g(this,gt).get(t);if(c===void 0){a&&(a.get="miss");return}let u=g(this,$)[c],d=O(this,nt,it).call(this,u);return a&&g(this,be).call(this,a,c),g(this,Qt).call(this,c)?d?(a&&(a.get="stale-fetching"),r&&u.__staleWhileFetching!==void 0?(a&&(a.returnedStale=!0),u.__staleWhileFetching):void 0):(o||O(this,pe,je).call(this,t,"expire"),a&&(a.get="stale"),r?(a&&(a.returnedStale=!0),u):void 0):(a&&(a.get=d?"fetching":"hit"),O(this,_n,Or).call(this,c),i&&g(this,pn).call(this,c),d?u.__staleWhileFetching:u)},ii=new WeakSet,$o=function(t,e){g(this,Ht)[e]=t,g(this,Ut)[t]=e},_n=new WeakSet,Or=function(t){t!==g(this,Tt)&&(t===g(this,Dt)?U(this,Dt,g(this,Ut)[t]):O(this,ii,$o).call(this,g(this,Ht)[t],g(this,Ut)[t]),O(this,ii,$o).call(this,g(this,Tt),t),U(this,Tt,t))},pe=new WeakSet,je=function(t,e){var i,o,a,c,u,d;bt.hasSubscribers&&bt.publish({op:"delete",delete:e,key:t,cache:this});let r=!1;if(g(this,vt)!==0){let f=g(this,gt).get(t);if(f!==void 0)if((i=g(this,Kt))!=null&&i[f]&&(clearTimeout((o=g(this,Kt))==null?void 0:o[f]),g(this,Kt)[f]=void 0),r=!0,g(this,vt)===1)O(this,si,qo).call(this,e);else{g(this,gn).call(this,f);let _=g(this,$)[f];if(O(this,nt,it).call(this,_)?_.__abortController.abort(new Error("deleted")):(g(this,ae)||g(this,jt))&&(g(this,ae)&&((a=g(this,te))==null||a.call(this,_,t,e)),g(this,jt)&&((c=g(this,wt))==null||c.push([_,t,e]))),g(this,gt).delete(t),g(this,ot)[f]=void 0,g(this,$)[f]=void 0,f===g(this,Tt))U(this,Tt,g(this,Ht)[f]);else if(f===g(this,Dt))U(this,Dt,g(this,Ut)[f]);else{let T=g(this,Ht)[f];g(this,Ut)[T]=g(this,Ut)[f];let R=g(this,Ut)[f];g(this,Ht)[R]=g(this,Ht)[f]}Di(this,vt)._--,g(this,ie).push(f)}}if(g(this,jt)&&((u=g(this,wt))!=null&&u.length)){let f=g(this,wt),_;for(;_=f==null?void 0:f.shift();)(d=g(this,ee))==null||d.call(this,..._)}return r},si=new WeakSet,qo=function(t){var e,r,i,o;for(let a of O(this,fe,Ue).call(this,{allowStale:!0})){let c=g(this,$)[a];if(O(this,nt,it).call(this,c))c.__abortController.abort(new Error("deleted"));else{let u=g(this,ot)[a];g(this,ae)&&((e=g(this,te))==null||e.call(this,c,u,t)),g(this,jt)&&((r=g(this,wt))==null||r.push([c,u,t]))}}if(g(this,gt).clear(),g(this,$).fill(void 0),g(this,ot).fill(void 0),g(this,Wt)&&g(this,oe)){g(this,Wt).fill(0),g(this,oe).fill(0);for(let a of g(this,Kt)??[])a!==void 0&&clearTimeout(a);(i=g(this,Kt))==null||i.fill(void 0)}if(g(this,se)&&g(this,se).fill(0),U(this,Dt,0),U(this,Tt,0),g(this,ie).length=0,U(this,re,0),U(this,vt,0),g(this,jt)&&g(this,wt)){let a=g(this,wt),c;for(;c=a==null?void 0:a.shift();)(o=g(this,ee))==null||o.call(this,...c)}},oi);const sh=()=>Ge.runtime.getManifest(),kr={"glasp-extension":"glasp","youtube-summary":"youtube-summary","chatgpt-extension":"chatgpt"}[op],wa="https://apis.glasp.co/api/client/v1",pp=()=>{try{return rp()?`extension-${kr}-safari`:ip()?`extension-${kr}-edge`:sp()?`extension-${kr}-firefox`:`extension-${kr}-chrome`}catch{return`extension-${kr}`}},Ds=()=>{let n="";try{n=sh().version}catch{}return{"X-Glasp-Platform":pp(),...n?{"X-Glasp-App-Version":n}:{}}},gp=n=>({Authorization:`Bearer ${n}`,"Content-Type":"application/json",...Ds()}),Go={customPrompt:5e4,followupPrompt:4e3,obsidianTemplate:2e4},mp=2e5,oh=200,Fn=n=>typeof n=="string"?n.slice(0,mp):null,lT=(n,t)=>{const e=Go[n],r=t==null?void 0:t[n];return typeof r!="number"||!Number.isSafeInteger(r)||r<oh?e:Math.min(r,e)},_p={highlighter:!1,summaries:!1,chat:!1,pdf:!1,community:!1,highlightingWriteEnabled:!1,readOnlyMode:!0,imageLongPress:!1,mobileFab:!1,preferencesSync:!1},Wr={highlighter:!0,summaries:!0,chat:!0,pdf:!0,community:!0,highlightingWriteEnabled:!0,readOnlyMode:!1,imageLongPress:!0,mobileFab:!0,preferencesSync:!0},Tn=async()=>{var n;return(n=await Ns("extConfig"))==null?void 0:n.extConfig},pc=async n=>{await tr("extConfig",n)},gc=30*60*1e3,yp=10*60*1e3,vp=1e4,Ep=Object.keys(Wr),Tp=/^[a-z0-9.-]{1,253}$/i,ah=500,wp=new Set(["co.uk","org.uk","ac.uk","me.uk","com.au","net.au","co.jp","ne.jp","or.jp","co.in","com.br","co.nz","co.za","com.mx","com.sg","com.hk","com.cn","co.kr","com.tr","com.tw","com.ru","com.ua"]),Ip=n=>n.includes(".")&&!wp.has(n),mc=n=>Array.isArray(n)?n.slice(0,ah):void 0,Ap=n=>{if(!Array.isArray(n))return[];const t=[];for(const e of n){if(t.length>=ah)break;if(!e||typeof e!="object")continue;const r=e;if(typeof r.host!="string")continue;const i=r.host.toLowerCase();if(!Tp.test(i)||!Ip(i)||typeof r.includeSubdomains!="boolean")continue;let o;if(r.pathPrefix!==void 0){if(typeof r.pathPrefix!="string"||!r.pathPrefix.startsWith("/")||r.pathPrefix.includes("*"))continue;o=r.pathPrefix}t.push({host:i,includeSubdomains:r.includeSubdomains,...o?{pathPrefix:o}:{}})}return t},cT=async()=>{try{const n=await Tn();return Ap(n==null?void 0:n.excludedSites)}catch{return[]}},es=(n,t)=>{const e=n&&typeof n=="object"?n:{},r={...t};for(const i of Ep){const o=e[i];typeof o=="boolean"&&(r[i]=o)}return r},Os=()=>{let n="";try{n=sh().version}catch{}return{platform:Ds()["X-Glasp-Platform"],version:n}},bp=n=>{const t=n&&typeof n=="object"?n:{};let e=es(t.flags,Wr);const r=Array.isArray(t.overrides)?t.overrides:[],{platform:i,version:o}=Os();for(const a of r){if(!a||typeof a!="object")continue;const c=a;c.platform===i&&(c.version!==void 0&&(typeof c.version!="string"||c.version!==o)||(e=es(c.flags,e)))}return e},Sp=async()=>{try{if(await Rp())return _p;const n=await Tn();return es(n==null?void 0:n.flags,Wr)}catch{return Wr}},lh=new Set(["extension-youtube-summary-safari"]),uT="glasp-summary-youtube://check-for-updates",ch=(n,t)=>{const e=o=>{const a=o.split(".");if(a.length<3||a.length>4)return null;const c=a.map(u=>/^\d{1,4}$/.test(u)?Number(u):NaN);return c.some(Number.isNaN)?null:c},r=e(n),i=e(t);if(!r||!i)return null;for(let o=0;o<Math.max(r.length,i.length);o+=1){const a=(r[o]??0)-(i[o]??0);if(a!==0)return a}return 0},hT=async()=>{try{const n=await Tn(),t=n==null?void 0:n.latestVersion;if(typeof t!="string"||!t)return null;const{platform:e,version:r}=Os();if(!lh.has(e)||!r)return null;const i=ch(t,r);return i!==null&&i>0?{version:t}:null}catch{return null}},Rp=async()=>{try{const n=await Tn(),t=n==null?void 0:n.minVersion;if(typeof t!="string"||!t)return null;const{platform:e,version:r}=Os();if(!lh.has(e)||!r)return null;const i=ch(t,r);return i!==null&&i>0?{required:t}:null}catch{return null}},dT=async()=>{try{const n=await Tn(),t=n==null?void 0:n.limits;if(!t||typeof t!="object")return{};const e={};for(const r of Object.keys(Go)){const i=t[r];typeof i=="number"&&Number.isSafeInteger(i)&&i>=oh&&(e[r]=Math.min(i,Go[r]))}return e}catch{return{}}};let Vr=null;const fT=()=>Vr||(Vr=Cp().finally(()=>{Vr=null}),Vr),Cp=async()=>{var n,t;try{const e=await Tn(),r=(e==null?void 0:e.fetchedAt)??0,i=Date.now()-r,o=Os();if(((n=e==null?void 0:e.resolvedFor)==null?void 0:n.platform)===o.platform&&((t=e==null?void 0:e.resolvedFor)==null?void 0:t.version)===o.version&&i>=0&&i<gc)return;let c=null,u,d,f;try{const _=await fetch(`${wa}/ext-config`,{method:"GET",headers:Ds(),signal:AbortSignal.timeout(vp)});if(_.ok){const T=await _.json();c=bp(T),u=mc(T==null?void 0:T.excludedSites);const R=T==null?void 0:T.latestVersions;if(R&&typeof R=="object"){const k=R[o.platform];typeof k=="string"&&(d=k)}const P=T==null?void 0:T.minVersions;if(P&&typeof P=="object"){const k=P[o.platform];typeof k=="string"&&(f=k)}}}catch{}if(c)await pc({flags:c,excludedSites:u,latestVersion:d,minVersion:f,fetchedAt:Date.now(),resolvedFor:o});else{const _=await Tn();await pc({flags:es((_==null?void 0:_.flags)??(e==null?void 0:e.flags),Wr),excludedSites:mc((_==null?void 0:_.excludedSites)??(e==null?void 0:e.excludedSites)),latestVersion:(_==null?void 0:_.latestVersion)??(e==null?void 0:e.latestVersion),minVersion:(_==null?void 0:_.minVersion)??(e==null?void 0:e.minVersion),fetchedAt:Date.now()-gc+yp,resolvedFor:(_==null?void 0:_.resolvedFor)??(e==null?void 0:e.resolvedFor)})}}catch{}};var _c=function(){return _c=Object.assign||function(t){for(var e,r=1,i=arguments.length;r<i;r++){e=arguments[r];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},_c.apply(this,arguments)};function uh(n,t){var e={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.indexOf(r)<0&&(e[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(e[r[i]]=n[r[i]]);return e}function pT(n,t,e){if(e||arguments.length===2)for(var r=0,i=t.length,o;r<i;r++)(o||!(r in t))&&(o||(o=Array.prototype.slice.call(t,0,r)),o[r]=t[r]);return n.concat(o||Array.prototype.slice.call(t))}const Pp=()=>{};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hh=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?t[e++]=i:i<2048?(t[e++]=i>>6|192,t[e++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=i>>18|240,t[e++]=i>>12&63|128,t[e++]=i>>6&63|128,t[e++]=i&63|128):(t[e++]=i>>12|224,t[e++]=i>>6&63|128,t[e++]=i&63|128)}return t},kp=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const i=n[e++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=n[e++];t[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=n[e++],a=n[e++],c=n[e++],u=((i&7)<<18|(o&63)<<12|(a&63)<<6|c&63)-65536;t[r++]=String.fromCharCode(55296+(u>>10)),t[r++]=String.fromCharCode(56320+(u&1023))}else{const o=n[e++],a=n[e++];t[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return t.join("")},dh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const o=n[i],a=i+1<n.length,c=a?n[i+1]:0,u=i+2<n.length,d=u?n[i+2]:0,f=o>>2,_=(o&3)<<4|c>>4;let T=(c&15)<<2|d>>6,R=d&63;u||(R=64,a||(T=64)),r.push(e[f],e[_],e[T],e[R])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(hh(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):kp(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const o=e[n.charAt(i++)],c=i<n.length?e[n.charAt(i)]:0;++i;const d=i<n.length?e[n.charAt(i)]:64;++i;const _=i<n.length?e[n.charAt(i)]:64;if(++i,o==null||c==null||d==null||_==null)throw new Vp;const T=o<<2|c>>4;if(r.push(T),d!==64){const R=c<<4&240|d>>2;if(r.push(R),_!==64){const P=d<<6&192|_;r.push(P)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Vp extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Np=function(n){const t=hh(n);return dh.encodeByteArray(t,!0)},ns=function(n){return Np(n).replace(/\./g,"")},fh=function(n){try{return dh.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Op=()=>Dp().__FIREBASE_DEFAULTS__,Lp=()=>{if(typeof process>"u"||typeof process.env>"u")return;const n={}.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},xp=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&fh(n[1]);return t&&JSON.parse(t)},Ia=()=>{try{return Pp()||Op()||Lp()||xp()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ph=n=>{var t,e;return(e=(t=Ia())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[n]},gh=n=>{const t=ph(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},mh=()=>{var n;return(n=Ia())===null||n===void 0?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mp{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Aa(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fp(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",i=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n),c="";return[ns(JSON.stringify(e)),ns(JSON.stringify(a)),c].join(".")}const Ur={};function Up(){const n={prod:[],emulator:[]};for(const t of Object.keys(Ur))Ur[t]?n.emulator.push(t):n.prod.push(t);return n}function jp(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let yc=!1;function ba(n,t){if(typeof window>"u"||typeof document>"u"||!Sn(window.location.host)||Ur[n]===t||Ur[n]||yc)return;Ur[n]=t;function e(T){return`__firebase__banner__${T}`}const r="__firebase__banner",o=Up().prod.length>0;function a(){const T=document.getElementById(r);T&&T.remove()}function c(T){T.style.display="flex",T.style.background="#7faaf0",T.style.position="fixed",T.style.bottom="5px",T.style.left="5px",T.style.padding=".5em",T.style.borderRadius="5px",T.style.alignItems="center"}function u(T,R){T.setAttribute("width","24"),T.setAttribute("id",R),T.setAttribute("height","24"),T.setAttribute("viewBox","0 0 24 24"),T.setAttribute("fill","none"),T.style.marginLeft="-6px"}function d(){const T=document.createElement("span");return T.style.cursor="pointer",T.style.marginLeft="16px",T.style.fontSize="24px",T.innerHTML=" &times;",T.onclick=()=>{yc=!0,a()},T}function f(T,R){T.setAttribute("id",R),T.innerText="Learn more",T.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",T.setAttribute("target","__blank"),T.style.paddingLeft="5px",T.style.textDecoration="underline"}function _(){const T=jp(r),R=e("text"),P=document.getElementById(R)||document.createElement("span"),k=e("learnmore"),N=document.getElementById(k)||document.createElement("a"),x=e("preprendIcon"),j=document.getElementById(x)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(T.created){const z=T.element;c(z),f(N,k);const H=d();u(j,x),z.append(j,P,N,H),document.body.appendChild(z)}o?(P.innerText="Preview backend disconnected.",j.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(j.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,P.innerText="Preview backend running in this workspace."),P.setAttribute("id",R)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",_):_()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ce(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Bp(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ce())}function zp(){var n;const t=(n=Ia())===null||n===void 0?void 0:n.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function $p(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function qp(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Gp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Hp(){return!zp()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Wp(){try{return typeof indexedDB=="object"}catch{return!1}}function Kp(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{e=!1},i.onerror=()=>{var o;t(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qp="FirebaseError";class Ve extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=Qp,Object.setPrototypeOf(this,Ve.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ai.prototype.create)}}class ai{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},i=`${this.service}/${t}`,o=this.errors[t],a=o?Jp(o,r):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new Ve(i,c,r)}}function Jp(n,t){return n.replace(Yp,(e,r)=>{const i=t[r];return i!=null?String(i):`<${r}?>`})}const Yp=/\{\$([^}]+)}/g;function wn(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const i of e){if(!r.includes(i))return!1;const o=n[i],a=t[i];if(vc(o)&&vc(a)){if(!wn(o,a))return!1}else if(o!==a)return!1}for(const i of r)if(!e.includes(i))return!1;return!0}function vc(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _h(n){const t=[];for(const[e,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(i))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function Xp(n,t){const e=new Zp(n,t);return e.subscribe.bind(e)}class Zp{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,r){let i;if(t===void 0&&e===void 0&&r===void 0)throw new Error("Missing Observer.");tg(t,["next","error","complete"])?i=t:i={next:t,error:e,complete:r},i.next===void 0&&(i.next=Ro),i.error===void 0&&(i.error=Ro),i.complete===void 0&&(i.complete=Ro);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),o}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function tg(n,t){if(typeof n!="object"||n===null)return!1;for(const e of t)if(e in n&&typeof n[e]=="function")return!0;return!1}function Ro(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jt(n){return n&&n._delegate?n._delegate:n}class Qe{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eg{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new Mp;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:e});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),i=(e=t==null?void 0:t.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(rg(t))try{this.getOrInitializeService({instanceIdentifier:cn})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(t=cn){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=cn){return this.instances.has(t)}getOptions(t=cn){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);r===c&&a.resolve(i)}return i}onInit(t,e){var r;const i=this.normalizeInstanceIdentifier(e),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(i,o);const a=this.instances.get(i);return a&&t(a,i),()=>{o.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const i of r)try{i(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:ng(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=cn){return this.component?this.component.multipleInstances?t:cn:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ng(n){return n===cn?void 0:n}function rg(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ig{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new eg(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var J;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(J||(J={}));const sg={debug:J.DEBUG,verbose:J.VERBOSE,info:J.INFO,warn:J.WARN,error:J.ERROR,silent:J.SILENT},og=J.INFO,ag={[J.DEBUG]:"log",[J.VERBOSE]:"log",[J.INFO]:"info",[J.WARN]:"warn",[J.ERROR]:"error"},lg=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),i=ag[t];if(i)console[i](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Sa{constructor(t){this.name=t,this._logLevel=og,this._logHandler=lg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in J))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?sg[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,J.DEBUG,...t),this._logHandler(this,J.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,J.VERBOSE,...t),this._logHandler(this,J.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,J.INFO,...t),this._logHandler(this,J.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,J.WARN,...t),this._logHandler(this,J.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,J.ERROR,...t),this._logHandler(this,J.ERROR,...t)}}const cg=(n,t)=>t.some(e=>n instanceof e);let Ec,Tc;function ug(){return Ec||(Ec=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function hg(){return Tc||(Tc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const yh=new WeakMap,Ho=new WeakMap,vh=new WeakMap,Co=new WeakMap,Ra=new WeakMap;function dg(n){const t=new Promise((e,r)=>{const i=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(He(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&yh.set(e,n)}).catch(()=>{}),Ra.set(t,n),t}function fg(n){if(Ho.has(n))return;const t=new Promise((e,r)=>{const i=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});Ho.set(n,t)}let Wo={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Ho.get(n);if(t==="objectStoreNames")return n.objectStoreNames||vh.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return He(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function pg(n){Wo=n(Wo)}function gg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(Po(this),t,...e);return vh.set(r,t.sort?t.sort():[t]),He(r)}:hg().includes(n)?function(...t){return n.apply(Po(this),t),He(yh.get(this))}:function(...t){return He(n.apply(Po(this),t))}}function mg(n){return typeof n=="function"?gg(n):(n instanceof IDBTransaction&&fg(n),cg(n,ug())?new Proxy(n,Wo):n)}function He(n){if(n instanceof IDBRequest)return dg(n);if(Co.has(n))return Co.get(n);const t=mg(n);return t!==n&&(Co.set(n,t),Ra.set(t,n)),t}const Po=n=>Ra.get(n);function _g(n,t,{blocked:e,upgrade:r,blocking:i,terminated:o}={}){const a=indexedDB.open(n,t),c=He(a);return r&&a.addEventListener("upgradeneeded",u=>{r(He(a.result),u.oldVersion,u.newVersion,He(a.transaction),u)}),e&&a.addEventListener("blocked",u=>e(u.oldVersion,u.newVersion,u)),c.then(u=>{o&&u.addEventListener("close",()=>o()),i&&u.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const yg=["get","getKey","getAll","getAllKeys","count"],vg=["put","add","delete","clear"],ko=new Map;function wc(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(ko.get(t))return ko.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,i=vg.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(i||yg.includes(e)))return;const o=async function(a,...c){const u=this.transaction(a,i?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[e](...c),i&&u.done]))[0]};return ko.set(t,o),o}pg(n=>({...n,get:(t,e,r)=>wc(t,e)||n.get(t,e,r),has:(t,e)=>!!wc(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eg{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Tg(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function Tg(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Ko="@firebase/app",Ic="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pe=new Sa("@firebase/app"),wg="@firebase/app-compat",Ig="@firebase/analytics-compat",Ag="@firebase/analytics",bg="@firebase/app-check-compat",Sg="@firebase/app-check",Rg="@firebase/auth",Cg="@firebase/auth-compat",Pg="@firebase/database",kg="@firebase/data-connect",Vg="@firebase/database-compat",Ng="@firebase/functions",Dg="@firebase/functions-compat",Og="@firebase/installations",Lg="@firebase/installations-compat",xg="@firebase/messaging",Mg="@firebase/messaging-compat",Fg="@firebase/performance",Ug="@firebase/performance-compat",jg="@firebase/remote-config",Bg="@firebase/remote-config-compat",zg="@firebase/storage",$g="@firebase/storage-compat",qg="@firebase/firestore",Gg="@firebase/ai",Hg="@firebase/firestore-compat",Wg="firebase",Kg="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qo="[DEFAULT]",Qg={[Ko]:"fire-core",[wg]:"fire-core-compat",[Ag]:"fire-analytics",[Ig]:"fire-analytics-compat",[Sg]:"fire-app-check",[bg]:"fire-app-check-compat",[Rg]:"fire-auth",[Cg]:"fire-auth-compat",[Pg]:"fire-rtdb",[kg]:"fire-data-connect",[Vg]:"fire-rtdb-compat",[Ng]:"fire-fn",[Dg]:"fire-fn-compat",[Og]:"fire-iid",[Lg]:"fire-iid-compat",[xg]:"fire-fcm",[Mg]:"fire-fcm-compat",[Fg]:"fire-perf",[Ug]:"fire-perf-compat",[jg]:"fire-rc",[Bg]:"fire-rc-compat",[zg]:"fire-gcs",[$g]:"fire-gcs-compat",[qg]:"fire-fst",[Hg]:"fire-fst-compat",[Gg]:"fire-vertex","fire-js":"fire-js",[Wg]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rs=new Map,Jg=new Map,Jo=new Map;function Ac(n,t){try{n.container.addComponent(t)}catch(e){Pe.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function In(n){const t=n.name;if(Jo.has(t))return Pe.debug(`There were multiple attempts to register component ${t}.`),!1;Jo.set(t,n);for(const e of rs.values())Ac(e,n);for(const e of Jg.values())Ac(e,n);return!0}function Ls(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function Se(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},We=new ai("app","Firebase",Yg);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xg{constructor(t,e,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Qe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw We.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xs=Kg;function Eh(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r=Object.assign({name:Qo,automaticDataCollectionEnabled:!0},t),i=r.name;if(typeof i!="string"||!i)throw We.create("bad-app-name",{appName:String(i)});if(e||(e=mh()),!e)throw We.create("no-options");const o=rs.get(i);if(o){if(wn(e,o.options)&&wn(r,o.config))return o;throw We.create("duplicate-app",{appName:i})}const a=new ig(i);for(const u of Jo.values())a.addComponent(u);const c=new Xg(e,r,a);return rs.set(i,c),c}function Ca(n=Qo){const t=rs.get(n);if(!t&&n===Qo&&mh())return Eh();if(!t)throw We.create("no-app",{appName:n});return t}function me(n,t,e){var r;let i=(r=Qg[n])!==null&&r!==void 0?r:n;e&&(i+=`-${e}`);const o=i.match(/\s|\//),a=t.match(/\s|\//);if(o||a){const c=[`Unable to register library "${i}" with version "${t}":`];o&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&a&&c.push("and"),a&&c.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Pe.warn(c.join(" "));return}In(new Qe(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zg="firebase-heartbeat-database",tm=1,Kr="firebase-heartbeat-store";let Vo=null;function Th(){return Vo||(Vo=_g(Zg,tm,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Kr)}catch(e){console.warn(e)}}}}).catch(n=>{throw We.create("idb-open",{originalErrorMessage:n.message})})),Vo}async function em(n){try{const e=(await Th()).transaction(Kr),r=await e.objectStore(Kr).get(wh(n));return await e.done,r}catch(t){if(t instanceof Ve)Pe.warn(t.message);else{const e=We.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Pe.warn(e.message)}}}async function bc(n,t){try{const r=(await Th()).transaction(Kr,"readwrite");await r.objectStore(Kr).put(t,wh(n)),await r.done}catch(e){if(e instanceof Ve)Pe.warn(e.message);else{const r=We.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Pe.warn(r.message)}}}function wh(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nm=1024,rm=30;class im{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new om(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Sc();if(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats.length>rm){const a=am(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Pe.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Sc(),{heartbeatsToSend:r,unsentEntries:i}=sm(this._heartbeatsCache.heartbeats),o=ns(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Pe.warn(e),""}}}function Sc(){return new Date().toISOString().substring(0,10)}function sm(n,t=nm){const e=[];let r=n.slice();for(const i of n){const o=e.find(a=>a.agent===i.agent);if(o){if(o.dates.push(i.date),Rc(e)>t){o.dates.pop();break}}else if(e.push({agent:i.agent,dates:[i.date]}),Rc(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class om{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Wp()?Kp().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await em(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const i=await this.read();return bc(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:i.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const i=await this.read();return bc(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...t.heartbeats]})}else return}}function Rc(n){return ns(JSON.stringify({version:2,heartbeats:n})).length}function am(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lm(n){In(new Qe("platform-logger",t=>new Eg(t),"PRIVATE")),In(new Qe("heartbeat",t=>new im(t),"PRIVATE")),me(Ko,Ic,n),me(Ko,Ic,"esm2017"),me("fire-js","")}lm("");var cm="firebase",um="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */me(cm,um,"app");function Ih(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const hm=Ih,Ah=new ai("auth","Firebase",Ih());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const is=new Sa("@firebase/auth");function dm(n,...t){is.logLevel<=J.WARN&&is.warn(`Auth (${xs}): ${n}`,...t)}function Ki(n,...t){is.logLevel<=J.ERROR&&is.error(`Auth (${xs}): ${n}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ss(n,...t){throw Pa(n,...t)}function bh(n,...t){return Pa(n,...t)}function Sh(n,t,e){const r=Object.assign(Object.assign({},hm()),{[t]:e});return new ai("auth","Firebase",r).create(t,{appName:n.name})}function jr(n){return Sh(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Pa(n,...t){if(typeof n!="string"){const e=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(e,...r)}return Ah.create(n,...t)}function X(n,t,...e){if(!n)throw Pa(t,...e)}function Br(n){const t="INTERNAL ASSERTION FAILED: "+n;throw Ki(t),new Error(t)}function os(n,t){n||Br(t)}function fm(){return Cc()==="http:"||Cc()==="https:"}function Cc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pm(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(fm()||qp()||"connection"in navigator)?navigator.onLine:!0}function gm(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mm{constructor(t,e){this.shortDelay=t,this.longDelay=e,os(e>t,"Short delay should be less than long delay!"),this.isMobile=Bp()||Gp()}get(){return pm()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _m(n,t){os(n.emulator,"Emulator should always be set here");const{url:e}=n.emulator;return t?`${e}${t.startsWith("/")?t.slice(1):t}`:e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rh{static initialize(t,e,r){this.fetchImpl=t,e&&(this.headersImpl=e),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Br("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Br("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Br("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ym={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vm=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Em=new mm(3e4,6e4);function ka(n,t){return n.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:n.tenantId}):t}async function li(n,t,e,r,i={}){return Ch(n,i,async()=>{let o={},a={};r&&(t==="GET"?a=r:o={body:JSON.stringify(r)});const c=_h(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:t,headers:u},o);return $p()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&Sn(n.emulatorConfig.host)&&(d.credentials="include"),Rh.fetch()(await Ph(n,n.config.apiHost,e,c),d)})}async function Ch(n,t,e){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},ym),t);try{const i=new wm(n),o=await Promise.race([e(),i.promise]);i.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw Oi(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const c=o.ok?a.errorMessage:a.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Oi(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Oi(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw Oi(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Sh(n,f,d);ss(n,f)}}catch(i){if(i instanceof Ve)throw i;ss(n,"network-request-failed",{message:String(i)})}}async function Tm(n,t,e,r,i={}){const o=await li(n,t,e,r,i);return"mfaPendingCredential"in o&&ss(n,"multi-factor-auth-required",{_serverResponse:o}),o}async function Ph(n,t,e,r){const i=`${t}${e}?${r}`,o=n,a=o.config.emulator?_m(n.config,i):`${n.config.apiScheme}://${i}`;return vm.includes(e)&&(await o._persistenceManagerAvailable,o._getPersistenceType()==="COOKIE")?o._getPersistence()._getFinalTarget(a).toString():a}class wm{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((e,r)=>{this.timer=setTimeout(()=>r(bh(this.auth,"network-request-failed")),Em.get())})}}function Oi(n,t,e){const r={appName:n.name};e.email&&(r.email=e.email),e.phoneNumber&&(r.phoneNumber=e.phoneNumber);const i=bh(n,t,r);return i.customData._tokenResponse=e,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Im(n,t){return li(n,"POST","/v1/accounts:delete",t)}async function as(n,t){return li(n,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zr(n){if(n)try{const t=new Date(Number(n));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function Am(n,t=!1){const e=Jt(n),r=await e.getIdToken(t),i=kh(r);X(i&&i.exp&&i.auth_time&&i.iat,e.auth,"internal-error");const o=typeof i.firebase=="object"?i.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:i,token:r,authTime:zr(No(i.auth_time)),issuedAtTime:zr(No(i.iat)),expirationTime:zr(No(i.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function No(n){return Number(n)*1e3}function kh(n){const[t,e,r]=n.split(".");if(t===void 0||e===void 0||r===void 0)return Ki("JWT malformed, contained fewer than 3 sections"),null;try{const i=fh(e);return i?JSON.parse(i):(Ki("Failed to decode base64 JWT payload"),null)}catch(i){return Ki("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Pc(n){const t=kh(n);return X(t,"internal-error"),X(typeof t.exp<"u","internal-error"),X(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yo(n,t,e=!1){if(e)return t;try{return await t}catch(r){throw r instanceof Ve&&bm(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function bm({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sm{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){var e;if(t){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((e=this.user.stsTokenManager.expirationTime)!==null&&e!==void 0?e:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(t=!1){if(!this.isRunning)return;const e=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},e)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo{constructor(t,e){this.createdAt=t,this.lastLoginAt=e,this._initializeTime()}_initializeTime(){this.lastSignInTime=zr(this.lastLoginAt),this.creationTime=zr(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ls(n){var t;const e=n.auth,r=await n.getIdToken(),i=await Yo(n,as(e,{idToken:r}));X(i==null?void 0:i.users.length,e,"internal-error");const o=i.users[0];n._notifyReloadListener(o);const a=!((t=o.providerUserInfo)===null||t===void 0)&&t.length?Vh(o.providerUserInfo):[],c=Cm(n.providerData,a),u=n.isAnonymous,d=!(n.email&&o.passwordHash)&&!(c!=null&&c.length),f=u?d:!1,_={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:c,metadata:new Xo(o.createdAt,o.lastLoginAt),isAnonymous:f};Object.assign(n,_)}async function Rm(n){const t=Jt(n);await ls(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function Cm(n,t){return[...n.filter(r=>!t.some(i=>i.providerId===r.providerId)),...t]}function Vh(n){return n.map(t=>{var{providerId:e}=t,r=uh(t,["providerId"]);return{providerId:e,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pm(n,t){const e=await Ch(n,{},async()=>{const r=_h({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:i,apiKey:o}=n.config,a=await Ph(n,i,"/v1/token",`key=${o}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&Sn(n.emulatorConfig.host)&&(u.credentials="include"),Rh.fetch()(a,u)});return{accessToken:e.access_token,expiresIn:e.expires_in,refreshToken:e.refresh_token}}async function km(n,t){return li(n,"POST","/v2/accounts:revokeToken",ka(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){X(t.idToken,"internal-error"),X(typeof t.idToken<"u","internal-error"),X(typeof t.refreshToken<"u","internal-error");const e="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):Pc(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,e)}updateFromIdToken(t){X(t.length!==0,"internal-error");const e=Pc(t);this.updateTokensAndExpiration(t,null,e)}async getToken(t,e=!1){return!e&&this.accessToken&&!this.isExpired?this.accessToken:(X(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,e){const{accessToken:r,refreshToken:i,expiresIn:o}=await Pm(t,e);this.updateTokensAndExpiration(r,i,Number(o))}updateTokensAndExpiration(t,e,r){this.refreshToken=e||null,this.accessToken=t||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(t,e){const{refreshToken:r,accessToken:i,expirationTime:o}=e,a=new Un;return r&&(X(typeof r=="string","internal-error",{appName:t}),a.refreshToken=r),i&&(X(typeof i=="string","internal-error",{appName:t}),a.accessToken=i),o&&(X(typeof o=="number","internal-error",{appName:t}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new Un,this.toJSON())}_performRefresh(){return Br("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(n,t){X(typeof n=="string"||typeof n>"u","internal-error",{appName:t})}class le{constructor(t){var{uid:e,auth:r,stsTokenManager:i}=t,o=uh(t,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Sm(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new Xo(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(t){const e=await Yo(this,this.stsTokenManager.getToken(this.auth,t));return X(e,this.auth,"internal-error"),this.accessToken!==e&&(this.accessToken=e,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),e}getIdTokenResult(t){return Am(this,t)}reload(){return Rm(this)}_assign(t){this!==t&&(X(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(e=>Object.assign({},e)),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const e=new le(Object.assign(Object.assign({},this),{auth:t,stsTokenManager:this.stsTokenManager._clone()}));return e.metadata._copy(this.metadata),e}_onReload(t){X(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,e=!1){let r=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),r=!0),e&&await ls(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Se(this.auth.app))return Promise.reject(jr(this.auth));const t=await this.getIdToken();return await Yo(this,Im(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>Object.assign({},t)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,e){var r,i,o,a,c,u,d,f;const _=(r=e.displayName)!==null&&r!==void 0?r:void 0,T=(i=e.email)!==null&&i!==void 0?i:void 0,R=(o=e.phoneNumber)!==null&&o!==void 0?o:void 0,P=(a=e.photoURL)!==null&&a!==void 0?a:void 0,k=(c=e.tenantId)!==null&&c!==void 0?c:void 0,N=(u=e._redirectEventId)!==null&&u!==void 0?u:void 0,x=(d=e.createdAt)!==null&&d!==void 0?d:void 0,j=(f=e.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:z,emailVerified:H,isAnonymous:Q,providerData:W,stsTokenManager:E}=e;X(z&&E,t,"internal-error");const m=Un.fromJSON(this.name,E);X(typeof z=="string",t,"internal-error"),xe(_,t.name),xe(T,t.name),X(typeof H=="boolean",t,"internal-error"),X(typeof Q=="boolean",t,"internal-error"),xe(R,t.name),xe(P,t.name),xe(k,t.name),xe(N,t.name),xe(x,t.name),xe(j,t.name);const y=new le({uid:z,auth:t,email:T,emailVerified:H,displayName:_,isAnonymous:Q,photoURL:P,phoneNumber:R,tenantId:k,stsTokenManager:m,createdAt:x,lastLoginAt:j});return W&&Array.isArray(W)&&(y.providerData=W.map(w=>Object.assign({},w))),N&&(y._redirectEventId=N),y}static async _fromIdTokenResponse(t,e,r=!1){const i=new Un;i.updateFromServerResponse(e);const o=new le({uid:e.localId,auth:t,stsTokenManager:i,isAnonymous:r});return await ls(o),o}static async _fromGetAccountInfoResponse(t,e,r){const i=e.users[0];X(i.localId!==void 0,"internal-error");const o=i.providerUserInfo!==void 0?Vh(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(o!=null&&o.length),c=new Un;c.updateFromIdToken(r);const u=new le({uid:i.localId,auth:t,stsTokenManager:c,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Xo(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(o!=null&&o.length)};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kc=new Map;function un(n){os(n instanceof Function,"Expected a class definition");let t=kc.get(n);return t?(os(t instanceof n,"Instance stored in cache mismatched with class"),t):(t=new n,kc.set(n,t),t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,e){this.storage[t]=e}async _get(t){const e=this.storage[t];return e===void 0?null:e}async _remove(t){delete this.storage[t]}_addListener(t,e){}_removeListener(t,e){}}Nh.type="NONE";const Vc=Nh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Do(n,t,e){return`firebase:${n}:${t}:${e}`}class jn{constructor(t,e,r){this.persistence=t,this.auth=e,this.userKey=r;const{config:i,name:o}=this.auth;this.fullUserKey=Do(this.userKey,i.apiKey,o),this.fullPersistenceKey=Do("persistence",i.apiKey,o),this.boundEventHandler=e._onStorageEvent.bind(e),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);if(!t)return null;if(typeof t=="string"){const e=await as(this.auth,{idToken:t}).catch(()=>{});return e?le._fromGetAccountInfoResponse(this.auth,e,t):null}return le._fromJSON(this.auth,t)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const e=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,e)return this.setCurrentUser(e)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,e,r="authUser"){if(!e.length)return new jn(un(Vc),t,r);const i=(await Promise.all(e.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let o=i[0]||un(Vc);const a=Do(r,t.config.apiKey,t.name);let c=null;for(const d of e)try{const f=await d._get(a);if(f){let _;if(typeof f=="string"){const T=await as(t,{idToken:f}).catch(()=>{});if(!T)break;_=await le._fromGetAccountInfoResponse(t,T,f)}else _=le._fromJSON(t,f);d!==o&&(c=_),o=d;break}}catch{}const u=i.filter(d=>d._shouldAllowMigration);return!o._shouldAllowMigration||!u.length?new jn(o,t,r):(o=u[0],c&&await o._set(a,c.toJSON()),await Promise.all(e.map(async d=>{if(d!==o)try{await d._remove(a)}catch{}})),new jn(o,t,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nc(n){const t=n.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(Om(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Vm(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(xm(t))return"Blackberry";if(Mm(t))return"Webos";if(Nm(t))return"Safari";if((t.includes("chrome/")||Dm(t))&&!t.includes("edge/"))return"Chrome";if(Lm(t))return"Android";{const e=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(e);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Vm(n=ce()){return/firefox\//i.test(n)}function Nm(n=ce()){const t=n.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Dm(n=ce()){return/crios\//i.test(n)}function Om(n=ce()){return/iemobile/i.test(n)}function Lm(n=ce()){return/android/i.test(n)}function xm(n=ce()){return/blackberry/i.test(n)}function Mm(n=ce()){return/webos/i.test(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dh(n,t=[]){let e;switch(n){case"Browser":e=Nc(ce());break;case"Worker":e=`${Nc(ce())}-${n}`;break;default:e=n}const r=t.length?t.join(","):"FirebaseCore-web";return`${e}/JsCore/${xs}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fm{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,e){const r=o=>new Promise((a,c)=>{try{const u=t(o);a(u)}catch(u){c(u)}});r.onAbort=e,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const e=[];try{for(const r of this.queue)await r(t),r.onAbort&&e.push(r.onAbort)}catch(r){e.reverse();for(const i of e)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Um(n,t={}){return li(n,"GET","/v2/passwordPolicy",ka(n,t))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jm=6;class Bm{constructor(t){var e,r,i,o;const a=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(e=a.minPasswordLength)!==null&&e!==void 0?e:jm,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=t.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(o=t.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=t.schemaVersion}validatePassword(t){var e,r,i,o,a,c;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,u),this.validatePasswordCharacterOptions(t,u),u.isValid&&(u.isValid=(e=u.meetsMinPasswordLength)!==null&&e!==void 0?e:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(o=u.containsUppercaseLetter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(t,e){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(e.meetsMinPasswordLength=t.length>=r),i&&(e.meetsMaxPasswordLength=t.length<=i)}validatePasswordCharacterOptions(t,e){this.updatePasswordCharacterOptionsStatuses(e,!1,!1,!1,!1);let r;for(let i=0;i<t.length;i++)r=t.charAt(i),this.updatePasswordCharacterOptionsStatuses(e,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(t,e,r,i,o){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=e)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zm{constructor(t,e,r,i){this.app=t,this.heartbeatServiceProvider=e,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Dc(this),this.idTokenSubscription=new Dc(this),this.beforeStateQueue=new Fm(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ah,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(o=>this._resolvePersistenceManagerAvailable=o)}_initializeWithPersistence(t,e){return e&&(this._popupRedirectResolver=un(e)),this._initializationPromise=this.queue(async()=>{var r,i,o;if(!this._deleted&&(this.persistenceManager=await jn.create(this,t),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(e),this.lastNotifiedUid=((o=this.currentUser)===null||o===void 0?void 0:o.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const e=await as(this,{idToken:t}),r=await le._fromGetAccountInfoResponse(this,e,t);await this.directlySetCurrentUser(r)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var e;if(Se(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,o=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(e=this.redirectUser)===null||e===void 0?void 0:e._redirectEventId,c=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(t);(!a||a===c)&&(u!=null&&u.user)&&(i=u.user,o=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return X(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(t){let e=null;try{e=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return e}async reloadAndSetCurrentUserOrClear(t){try{await ls(t)}catch(e){if((e==null?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=gm()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(Se(this.app))return Promise.reject(jr(this));const e=t?Jt(t):null;return e&&X(e.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(e&&e._clone(this))}async _updateCurrentUser(t,e=!1){if(!this._deleted)return t&&X(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),e||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return Se(this.app)?Promise.reject(jr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return Se(this.app)?Promise.reject(jr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(un(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const e=this._getPasswordPolicyInternal();return e.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):e.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await Um(this),e=new Bm(t);this.tenantId===null?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new ai("auth","Firebase",t())}onAuthStateChanged(t,e,r){return this.registerStateListener(this.authStateSubscription,t,e,r)}beforeAuthStateChanged(t,e){return this.beforeStateQueue.pushCallback(t,e)}onIdTokenChanged(t,e,r){return this.registerStateListener(this.idTokenSubscription,t,e,r)}authStateReady(){return new Promise((t,e)=>{if(this.currentUser)t();else{const r=this.onAuthStateChanged(()=>{r(),t()},e)}})}async revokeAccessToken(t){if(this.currentUser){const e=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:e};this.tenantId!=null&&(r.tenantId=this.tenantId),await km(this,r)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)===null||t===void 0?void 0:t.toJSON()}}async _setRedirectUser(t,e){const r=await this.getOrInitRedirectPersistenceManager(e);return t===null?r.removeCurrentUser():r.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const e=t&&un(t)||this._popupRedirectResolver;X(e,this,"argument-error"),this.redirectPersistenceManager=await jn.create(this,[un(e._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var e,r;return this._isInitialized&&await this.queue(async()=>{}),((e=this._currentUser)===null||e===void 0?void 0:e._redirectEventId)===t?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t,e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(e=(t=this.currentUser)===null||t===void 0?void 0:t.uid)!==null&&e!==void 0?e:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,e,r,i){if(this._deleted)return()=>{};const o=typeof e=="function"?e:e.next.bind(e);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(X(c,this,"internal-error"),c.then(()=>{a||o(this.currentUser)}),typeof e=="function"){const u=t.addObserver(e,r,i);return()=>{a=!0,u()}}else{const u=t.addObserver(e);return()=>{a=!0,u()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return X(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=Dh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var t;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const r=await((t=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||t===void 0?void 0:t.getHeartbeatsHeader());r&&(e["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){var t;if(Se(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||t===void 0?void 0:t.getToken());return e!=null&&e.error&&dm(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Va(n){return Jt(n)}class Dc{constructor(t){this.auth=t,this.observer=null,this.addObserver=Xp(e=>this.observer=e)}get next(){return X(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $m(n,t){const e=Ls(n,"auth");if(e.isInitialized()){const i=e.getImmediate(),o=e.getOptions();if(wn(o,t??{}))return i;ss(i,"already-initialized")}return e.initialize({options:t})}function qm(n,t){const e=(t==null?void 0:t.persistence)||[],r=(Array.isArray(e)?e:[e]).map(un);t!=null&&t.errorMap&&n._updateErrorMap(t.errorMap),n._initializeWithPersistence(r,t==null?void 0:t.popupRedirectResolver)}function Gm(n,t,e){const r=Va(n);X(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const i=!!(e!=null&&e.disableWarnings),o=Oh(t),{host:a,port:c}=Hm(t),u=c===null?"":`:${c}`,d={url:`${o}//${a}${u}/`},f=Object.freeze({host:a,port:c,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){X(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),X(wn(d,r.config.emulator)&&wn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Sn(a)?(Aa(`${o}//${a}${u}`),ba("Auth",!0)):i||Wm()}function Oh(n){const t=n.indexOf(":");return t<0?"":n.substr(0,t+1)}function Hm(n){const t=Oh(n),e=/(\/\/)?([^?#/]+)/.exec(n.substr(t.length));if(!e)return{host:"",port:null};const r=e[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const o=i[1];return{host:o,port:Oc(r.substr(o.length+1))}}else{const[o,a]=r.split(":");return{host:o,port:Oc(a)}}}function Oc(n){if(!n)return null;const t=Number(n);return isNaN(t)?null:t}function Wm(){function n(){const t=document.createElement("p"),e=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",e.position="fixed",e.width="100%",e.backgroundColor="#ffffff",e.border=".1em solid #000000",e.color="#b50000",e.bottom="0px",e.left="0px",e.margin="0px",e.zIndex="10000",e.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,e,r,i=!1){const o=await le._fromIdTokenResponse(t,r,i),a=Lc(r);return new cs({user:o,providerId:a,_tokenResponse:r,operationType:e})}static async _forOperation(t,e,r){await t._updateTokensIfNecessary(r,!0);const i=Lc(r);return new cs({user:t,providerId:i,_tokenResponse:r,operationType:e})}}function Lc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Km(n,t){return Tm(n,"POST","/v1/accounts:signInWithCustomToken",ka(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gT(n,t){if(Se(n.app))return Promise.reject(jr(n));const e=Va(n),r=await Km(e,{token:t,returnSecureToken:!0}),i=await cs._fromIdTokenResponse(e,"signIn",r);return await e._updateCurrentUser(i.user),i}function Qm(n,t,e,r){return Jt(n).onAuthStateChanged(t,e,r)}function mT(n){return Jt(n).signOut()}const xc="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jm(n){return Promise.all(n.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(e){return{fulfilled:!1,reason:e}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const e=this.receivers.find(i=>i.isListeningto(t));if(e)return e;const r=new Ms(t);return this.receivers.push(r),r}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const e=t,{eventId:r,eventType:i,data:o}=e.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;e.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(a).map(async d=>d(e.origin,o)),u=await Jm(c);e.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(t,e){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(e)}_unsubscribe(t,e){this.handlersMap[t]&&e&&this.handlersMap[t].delete(e),(!e||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ms.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ym(n="",t=10){let e="";for(let r=0;r<t;r++)e+=Math.floor(Math.random()*10);return n+e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xm{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,e,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let o,a;return new Promise((c,u)=>{const d=Ym("",20);i.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(_){const T=_;if(T.data.eventId===d)switch(T.data.status){case"ack":clearTimeout(f),o=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),c(T.data.response);break;default:clearTimeout(f),clearTimeout(o),u(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:t,eventId:d,data:e},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mc(){return window}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lh(){return typeof Mc().WorkerGlobalScope<"u"&&typeof Mc().importScripts=="function"}async function Zm(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function t_(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function e_(){return Lh()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xh="firebaseLocalStorageDb",n_=1,us="firebaseLocalStorage",Mh="fbase_key";class ci{constructor(t){this.request=t}toPromise(){return new Promise((t,e)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{e(this.request.error)})})}}function Fs(n,t){return n.transaction([us],t?"readwrite":"readonly").objectStore(us)}function r_(){const n=indexedDB.deleteDatabase(xh);return new ci(n).toPromise()}function Zo(){const n=indexedDB.open(xh,n_);return new Promise((t,e)=>{n.addEventListener("error",()=>{e(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(us,{keyPath:Mh})}catch(i){e(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(us)?t(r):(r.close(),await r_(),t(await Zo()))})})}async function Fc(n,t,e){const r=Fs(n,!0).put({[Mh]:t,value:e});return new ci(r).toPromise()}async function i_(n,t){const e=Fs(n,!1).get(t),r=await new ci(e).toPromise();return r===void 0?null:r.value}function Uc(n,t){const e=Fs(n,!0).delete(t);return new ci(e).toPromise()}const s_=800,o_=3;class Fh{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Zo(),this.db)}async _withRetries(t){let e=0;for(;;)try{const r=await this._openDb();return await t(r)}catch(r){if(e++>o_)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Lh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ms._getInstance(e_()),this.receiver._subscribe("keyChanged",async(t,e)=>({keyProcessed:(await this._poll()).includes(e.key)})),this.receiver._subscribe("ping",async(t,e)=>["keyChanged"])}async initializeSender(){var t,e;if(this.activeServiceWorker=await Zm(),!this.activeServiceWorker)return;this.sender=new Xm(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((t=r[0])===null||t===void 0)&&t.fulfilled&&!((e=r[0])===null||e===void 0)&&e.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||t_()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await Zo();return await Fc(t,xc,"1"),await Uc(t,xc),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,e){return this._withPendingWrite(async()=>(await this._withRetries(r=>Fc(r,t,e)),this.localCache[t]=e,this.notifyServiceWorker(t)))}async _get(t){const e=await this._withRetries(r=>i_(r,t));return this.localCache[t]=e,e}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(e=>Uc(e,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(i=>{const o=Fs(i,!1).getAll();return new ci(o).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const e=[],r=new Set;if(t.length!==0)for(const{fbase_key:i,value:o}of t)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(o)&&(this.notifyListeners(i,o),e.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),e.push(i));return e}notifyListeners(t,e){this.localCache[t]=e;const r=this.listeners[t];if(r)for(const i of Array.from(r))i(e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),s_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,e){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Fh.type="LOCAL";const a_=Fh;var jc="@firebase/auth",Bc="1.10.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l_{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)===null||t===void 0?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const e=this.auth.onIdTokenChanged(r=>{t((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,e),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const e=this.internalListeners.get(t);e&&(this.internalListeners.delete(t),e(),this.updateProactiveRefresh())}assertAuthConfigured(){X(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function c_(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function u_(n){In(new Qe("auth",(t,{options:e})=>{const r=t.getProvider("app").getImmediate(),i=t.getProvider("heartbeat"),o=t.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;X(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Dh(n)},d=new zm(r,i,o,u);return qm(d,e),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,r)=>{t.getProvider("auth-internal").initialize()})),In(new Qe("auth-internal",t=>{const e=Va(t.getProvider("auth").getImmediate());return(r=>new l_(r))(e)},"PRIVATE").setInstantiationMode("EXPLICIT")),me(jc,Bc,c_(n)),me(jc,Bc,"esm2017")}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h_(n=Ca()){const t=Ls(n,"auth");if(t.isInitialized())return t.getImmediate();const e=$m(n,{persistence:[a_]}),r=ph("auth");return r&&Gm(e,`http://${r}`),e}u_("WebExtension");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d_="type.googleapis.com/google.protobuf.Int64Value",f_="type.googleapis.com/google.protobuf.UInt64Value";function Uh(n,t){const e={};for(const r in n)n.hasOwnProperty(r)&&(e[r]=t(n[r]));return e}function hs(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(t=>hs(t));if(typeof n=="function"||typeof n=="object")return Uh(n,t=>hs(t));throw new Error("Data cannot be encoded in JSON: "+n)}function er(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case d_:case f_:{const t=Number(n.value);if(isNaN(t))throw new Error("Data cannot be decoded from JSON: "+n);return t}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(t=>er(t)):typeof n=="function"||typeof n=="object"?Uh(n,t=>er(t)):n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Na="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zc={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class $t extends Ve{constructor(t,e,r){super(`${Na}/${t}`,e||""),this.details=r,Object.setPrototypeOf(this,$t.prototype)}}function p_(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function ds(n,t){let e=p_(n),r=e,i;try{const o=t&&t.error;if(o){const a=o.status;if(typeof a=="string"){if(!zc[a])return new $t("internal","internal");e=zc[a],r=a}const c=o.message;typeof c=="string"&&(r=c),i=o.details,i!==void 0&&(i=er(i))}}catch{}return e==="ok"?null:new $t(e,r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g_{constructor(t,e,r,i){this.app=t,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,Se(t)&&t.settings.appCheckToken&&(this.serverAppAppCheckToken=t.settings.appCheckToken),this.auth=e.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||e.get().then(o=>this.auth=o,()=>{}),this.messaging||r.get().then(o=>this.messaging=o,()=>{}),this.appCheck||i==null||i.get().then(o=>this.appCheck=o,()=>{})}async getAuthToken(){if(this.auth)try{const t=await this.auth.getToken();return t==null?void 0:t.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(t){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const e=t?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return e.error?null:e.token}return null}async getContext(t){const e=await this.getAuthToken(),r=await this.getMessagingToken(),i=await this.getAppCheckToken(t);return{authToken:e,messagingToken:r,appCheckToken:i}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ta="us-central1",m_=/^data: (.*?)(?:\n|$)/;function __(n){let t=null;return{promise:new Promise((e,r)=>{t=setTimeout(()=>{r(new $t("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{t&&clearTimeout(t)}}}class y_{constructor(t,e,r,i,o=ta,a=(...c)=>fetch(...c)){this.app=t,this.fetchImpl=a,this.emulatorOrigin=null,this.contextProvider=new g_(t,e,r,i),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(o);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=ta}catch{this.customDomain=null,this.region=o}}_delete(){return this.deleteService()}_url(t){const e=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${e}/${this.region}/${t}`:this.customDomain!==null?`${this.customDomain}/${t}`:`https://${this.region}-${e}.cloudfunctions.net/${t}`}}function v_(n,t,e){const r=Sn(t);n.emulatorOrigin=`http${r?"s":""}://${t}:${e}`,r&&(Aa(n.emulatorOrigin),ba("Functions",!0))}function E_(n,t,e){const r=i=>w_(n,t,i,e||{});return r.stream=(i,o)=>A_(n,t,i,o),r}async function T_(n,t,e,r){e["Content-Type"]="application/json";let i;try{i=await r(n,{method:"POST",body:JSON.stringify(t),headers:e})}catch{return{status:0,json:null}}let o=null;try{o=await i.json()}catch{}return{status:i.status,json:o}}async function jh(n,t){const e={},r=await n.contextProvider.getContext(t.limitedUseAppCheckTokens);return r.authToken&&(e.Authorization="Bearer "+r.authToken),r.messagingToken&&(e["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(e["X-Firebase-AppCheck"]=r.appCheckToken),e}function w_(n,t,e,r){const i=n._url(t);return I_(n,i,e,r)}async function I_(n,t,e,r){e=hs(e);const i={data:e},o=await jh(n,r),a=r.timeout||7e4,c=__(a),u=await Promise.race([T_(t,i,o,n.fetchImpl),c.promise,n.cancelAllRequests]);if(c.cancel(),!u)throw new $t("cancelled","Firebase Functions instance was deleted.");const d=ds(u.status,u.json);if(d)throw d;if(!u.json)throw new $t("internal","Response is not valid JSON object.");let f=u.json.data;if(typeof f>"u"&&(f=u.json.result),typeof f>"u")throw new $t("internal","Response is missing data field.");return{data:er(f)}}function A_(n,t,e,r){const i=n._url(t);return b_(n,i,e,r||{})}async function b_(n,t,e,r){var i;e=hs(e);const o={data:e},a=await jh(n,r);a["Content-Type"]="application/json",a.Accept="text/event-stream";let c;try{c=await n.fetchImpl(t,{method:"POST",body:JSON.stringify(o),headers:a,signal:r==null?void 0:r.signal})}catch(R){if(R instanceof Error&&R.name==="AbortError"){const k=new $t("cancelled","Request was cancelled.");return{data:Promise.reject(k),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(k)}}}}}}const P=ds(0,null);return{data:Promise.reject(P),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(P)}}}}}}let u,d;const f=new Promise((R,P)=>{u=R,d=P});(i=r==null?void 0:r.signal)===null||i===void 0||i.addEventListener("abort",()=>{const R=new $t("cancelled","Request was cancelled.");d(R)});const _=c.body.getReader(),T=S_(_,u,d,r==null?void 0:r.signal);return{stream:{[Symbol.asyncIterator](){const R=T.getReader();return{async next(){const{value:P,done:k}=await R.read();return{value:P,done:k}},async return(){return await R.cancel(),{done:!0,value:void 0}}}}},data:f}}function S_(n,t,e,r){const i=(a,c)=>{const u=a.match(m_);if(!u)return;const d=u[1];try{const f=JSON.parse(d);if("result"in f){t(er(f.result));return}if("message"in f){c.enqueue(er(f.message));return}if("error"in f){const _=ds(0,f);c.error(_),e(_);return}}catch(f){if(f instanceof $t){c.error(f),e(f);return}}},o=new TextDecoder;return new ReadableStream({start(a){let c="";return u();async function u(){if(r!=null&&r.aborted){const d=new $t("cancelled","Request was cancelled");return a.error(d),e(d),Promise.resolve()}try{const{value:d,done:f}=await n.read();if(f){c.trim()&&i(c.trim(),a),a.close();return}if(r!=null&&r.aborted){const T=new $t("cancelled","Request was cancelled");a.error(T),e(T),await n.cancel();return}c+=o.decode(d,{stream:!0});const _=c.split(`
`);c=_.pop()||"";for(const T of _)T.trim()&&i(T.trim(),a);return u()}catch(d){const f=d instanceof $t?d:ds(0,null);a.error(f),e(f)}}},cancel(){return n.cancel()}})}const $c="@firebase/functions",qc="0.12.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R_="auth-internal",C_="app-check-internal",P_="messaging-internal";function k_(n){const t=(e,{instanceIdentifier:r})=>{const i=e.getProvider("app").getImmediate(),o=e.getProvider(R_),a=e.getProvider(P_),c=e.getProvider(C_);return new y_(i,o,a,c,r)};In(new Qe(Na,t,"PUBLIC").setMultipleInstances(!0)),me($c,qc,n),me($c,qc,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V_(n=Ca(),t=ta){const r=Ls(Jt(n),Na).getImmediate({identifier:t}),i=gh("functions");return i&&N_(r,...i),r}function N_(n,t,e){v_(Jt(n),t,e)}function Da(n,t,e){return E_(Jt(n),t,e)}k_();var Gc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ke,Bh;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(E,m){function y(){}y.prototype=m.prototype,E.D=m.prototype,E.prototype=new y,E.prototype.constructor=E,E.C=function(w,I,b){for(var v=Array(arguments.length-2),Te=2;Te<arguments.length;Te++)v[Te-2]=arguments[Te];return m.prototype[I].apply(w,v)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(r,e),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,m,y){y||(y=0);var w=Array(16);if(typeof m=="string")for(var I=0;16>I;++I)w[I]=m.charCodeAt(y++)|m.charCodeAt(y++)<<8|m.charCodeAt(y++)<<16|m.charCodeAt(y++)<<24;else for(I=0;16>I;++I)w[I]=m[y++]|m[y++]<<8|m[y++]<<16|m[y++]<<24;m=E.g[0],y=E.g[1],I=E.g[2];var b=E.g[3],v=m+(b^y&(I^b))+w[0]+3614090360&4294967295;m=y+(v<<7&4294967295|v>>>25),v=b+(I^m&(y^I))+w[1]+3905402710&4294967295,b=m+(v<<12&4294967295|v>>>20),v=I+(y^b&(m^y))+w[2]+606105819&4294967295,I=b+(v<<17&4294967295|v>>>15),v=y+(m^I&(b^m))+w[3]+3250441966&4294967295,y=I+(v<<22&4294967295|v>>>10),v=m+(b^y&(I^b))+w[4]+4118548399&4294967295,m=y+(v<<7&4294967295|v>>>25),v=b+(I^m&(y^I))+w[5]+1200080426&4294967295,b=m+(v<<12&4294967295|v>>>20),v=I+(y^b&(m^y))+w[6]+2821735955&4294967295,I=b+(v<<17&4294967295|v>>>15),v=y+(m^I&(b^m))+w[7]+4249261313&4294967295,y=I+(v<<22&4294967295|v>>>10),v=m+(b^y&(I^b))+w[8]+1770035416&4294967295,m=y+(v<<7&4294967295|v>>>25),v=b+(I^m&(y^I))+w[9]+2336552879&4294967295,b=m+(v<<12&4294967295|v>>>20),v=I+(y^b&(m^y))+w[10]+4294925233&4294967295,I=b+(v<<17&4294967295|v>>>15),v=y+(m^I&(b^m))+w[11]+2304563134&4294967295,y=I+(v<<22&4294967295|v>>>10),v=m+(b^y&(I^b))+w[12]+1804603682&4294967295,m=y+(v<<7&4294967295|v>>>25),v=b+(I^m&(y^I))+w[13]+4254626195&4294967295,b=m+(v<<12&4294967295|v>>>20),v=I+(y^b&(m^y))+w[14]+2792965006&4294967295,I=b+(v<<17&4294967295|v>>>15),v=y+(m^I&(b^m))+w[15]+1236535329&4294967295,y=I+(v<<22&4294967295|v>>>10),v=m+(I^b&(y^I))+w[1]+4129170786&4294967295,m=y+(v<<5&4294967295|v>>>27),v=b+(y^I&(m^y))+w[6]+3225465664&4294967295,b=m+(v<<9&4294967295|v>>>23),v=I+(m^y&(b^m))+w[11]+643717713&4294967295,I=b+(v<<14&4294967295|v>>>18),v=y+(b^m&(I^b))+w[0]+3921069994&4294967295,y=I+(v<<20&4294967295|v>>>12),v=m+(I^b&(y^I))+w[5]+3593408605&4294967295,m=y+(v<<5&4294967295|v>>>27),v=b+(y^I&(m^y))+w[10]+38016083&4294967295,b=m+(v<<9&4294967295|v>>>23),v=I+(m^y&(b^m))+w[15]+3634488961&4294967295,I=b+(v<<14&4294967295|v>>>18),v=y+(b^m&(I^b))+w[4]+3889429448&4294967295,y=I+(v<<20&4294967295|v>>>12),v=m+(I^b&(y^I))+w[9]+568446438&4294967295,m=y+(v<<5&4294967295|v>>>27),v=b+(y^I&(m^y))+w[14]+3275163606&4294967295,b=m+(v<<9&4294967295|v>>>23),v=I+(m^y&(b^m))+w[3]+4107603335&4294967295,I=b+(v<<14&4294967295|v>>>18),v=y+(b^m&(I^b))+w[8]+1163531501&4294967295,y=I+(v<<20&4294967295|v>>>12),v=m+(I^b&(y^I))+w[13]+2850285829&4294967295,m=y+(v<<5&4294967295|v>>>27),v=b+(y^I&(m^y))+w[2]+4243563512&4294967295,b=m+(v<<9&4294967295|v>>>23),v=I+(m^y&(b^m))+w[7]+1735328473&4294967295,I=b+(v<<14&4294967295|v>>>18),v=y+(b^m&(I^b))+w[12]+2368359562&4294967295,y=I+(v<<20&4294967295|v>>>12),v=m+(y^I^b)+w[5]+4294588738&4294967295,m=y+(v<<4&4294967295|v>>>28),v=b+(m^y^I)+w[8]+2272392833&4294967295,b=m+(v<<11&4294967295|v>>>21),v=I+(b^m^y)+w[11]+1839030562&4294967295,I=b+(v<<16&4294967295|v>>>16),v=y+(I^b^m)+w[14]+4259657740&4294967295,y=I+(v<<23&4294967295|v>>>9),v=m+(y^I^b)+w[1]+2763975236&4294967295,m=y+(v<<4&4294967295|v>>>28),v=b+(m^y^I)+w[4]+1272893353&4294967295,b=m+(v<<11&4294967295|v>>>21),v=I+(b^m^y)+w[7]+4139469664&4294967295,I=b+(v<<16&4294967295|v>>>16),v=y+(I^b^m)+w[10]+3200236656&4294967295,y=I+(v<<23&4294967295|v>>>9),v=m+(y^I^b)+w[13]+681279174&4294967295,m=y+(v<<4&4294967295|v>>>28),v=b+(m^y^I)+w[0]+3936430074&4294967295,b=m+(v<<11&4294967295|v>>>21),v=I+(b^m^y)+w[3]+3572445317&4294967295,I=b+(v<<16&4294967295|v>>>16),v=y+(I^b^m)+w[6]+76029189&4294967295,y=I+(v<<23&4294967295|v>>>9),v=m+(y^I^b)+w[9]+3654602809&4294967295,m=y+(v<<4&4294967295|v>>>28),v=b+(m^y^I)+w[12]+3873151461&4294967295,b=m+(v<<11&4294967295|v>>>21),v=I+(b^m^y)+w[15]+530742520&4294967295,I=b+(v<<16&4294967295|v>>>16),v=y+(I^b^m)+w[2]+3299628645&4294967295,y=I+(v<<23&4294967295|v>>>9),v=m+(I^(y|~b))+w[0]+4096336452&4294967295,m=y+(v<<6&4294967295|v>>>26),v=b+(y^(m|~I))+w[7]+1126891415&4294967295,b=m+(v<<10&4294967295|v>>>22),v=I+(m^(b|~y))+w[14]+2878612391&4294967295,I=b+(v<<15&4294967295|v>>>17),v=y+(b^(I|~m))+w[5]+4237533241&4294967295,y=I+(v<<21&4294967295|v>>>11),v=m+(I^(y|~b))+w[12]+1700485571&4294967295,m=y+(v<<6&4294967295|v>>>26),v=b+(y^(m|~I))+w[3]+2399980690&4294967295,b=m+(v<<10&4294967295|v>>>22),v=I+(m^(b|~y))+w[10]+4293915773&4294967295,I=b+(v<<15&4294967295|v>>>17),v=y+(b^(I|~m))+w[1]+2240044497&4294967295,y=I+(v<<21&4294967295|v>>>11),v=m+(I^(y|~b))+w[8]+1873313359&4294967295,m=y+(v<<6&4294967295|v>>>26),v=b+(y^(m|~I))+w[15]+4264355552&4294967295,b=m+(v<<10&4294967295|v>>>22),v=I+(m^(b|~y))+w[6]+2734768916&4294967295,I=b+(v<<15&4294967295|v>>>17),v=y+(b^(I|~m))+w[13]+1309151649&4294967295,y=I+(v<<21&4294967295|v>>>11),v=m+(I^(y|~b))+w[4]+4149444226&4294967295,m=y+(v<<6&4294967295|v>>>26),v=b+(y^(m|~I))+w[11]+3174756917&4294967295,b=m+(v<<10&4294967295|v>>>22),v=I+(m^(b|~y))+w[2]+718787259&4294967295,I=b+(v<<15&4294967295|v>>>17),v=y+(b^(I|~m))+w[9]+3951481745&4294967295,E.g[0]=E.g[0]+m&4294967295,E.g[1]=E.g[1]+(I+(v<<21&4294967295|v>>>11))&4294967295,E.g[2]=E.g[2]+I&4294967295,E.g[3]=E.g[3]+b&4294967295}r.prototype.u=function(E,m){m===void 0&&(m=E.length);for(var y=m-this.blockSize,w=this.B,I=this.h,b=0;b<m;){if(I==0)for(;b<=y;)i(this,E,b),b+=this.blockSize;if(typeof E=="string"){for(;b<m;)if(w[I++]=E.charCodeAt(b++),I==this.blockSize){i(this,w),I=0;break}}else for(;b<m;)if(w[I++]=E[b++],I==this.blockSize){i(this,w),I=0;break}}this.h=I,this.o+=m},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var m=1;m<E.length-8;++m)E[m]=0;var y=8*this.o;for(m=E.length-8;m<E.length;++m)E[m]=y&255,y/=256;for(this.u(E),E=Array(16),m=y=0;4>m;++m)for(var w=0;32>w;w+=8)E[y++]=this.g[m]>>>w&255;return E};function o(E,m){var y=c;return Object.prototype.hasOwnProperty.call(y,E)?y[E]:y[E]=m(E)}function a(E,m){this.h=m;for(var y=[],w=!0,I=E.length-1;0<=I;I--){var b=E[I]|0;w&&b==m||(y[I]=b,w=!1)}this.g=y}var c={};function u(E){return-128<=E&&128>E?o(E,function(m){return new a([m|0],0>m?-1:0)}):new a([E|0],0>E?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return _;if(0>E)return N(d(-E));for(var m=[],y=1,w=0;E>=y;w++)m[w]=E/y|0,y*=4294967296;return new a(m,0)}function f(E,m){if(E.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(E.charAt(0)=="-")return N(f(E.substring(1),m));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=d(Math.pow(m,8)),w=_,I=0;I<E.length;I+=8){var b=Math.min(8,E.length-I),v=parseInt(E.substring(I,I+b),m);8>b?(b=d(Math.pow(m,b)),w=w.j(b).add(d(v))):(w=w.j(y),w=w.add(d(v)))}return w}var _=u(0),T=u(1),R=u(16777216);n=a.prototype,n.m=function(){if(k(this))return-N(this).m();for(var E=0,m=1,y=0;y<this.g.length;y++){var w=this.i(y);E+=(0<=w?w:4294967296+w)*m,m*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(P(this))return"0";if(k(this))return"-"+N(this).toString(E);for(var m=d(Math.pow(E,6)),y=this,w="";;){var I=H(y,m).g;y=x(y,I.j(m));var b=((0<y.g.length?y.g[0]:y.h)>>>0).toString(E);if(y=I,P(y))return b+w;for(;6>b.length;)b="0"+b;w=b+w}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function P(E){if(E.h!=0)return!1;for(var m=0;m<E.g.length;m++)if(E.g[m]!=0)return!1;return!0}function k(E){return E.h==-1}n.l=function(E){return E=x(this,E),k(E)?-1:P(E)?0:1};function N(E){for(var m=E.g.length,y=[],w=0;w<m;w++)y[w]=~E.g[w];return new a(y,~E.h).add(T)}n.abs=function(){return k(this)?N(this):this},n.add=function(E){for(var m=Math.max(this.g.length,E.g.length),y=[],w=0,I=0;I<=m;I++){var b=w+(this.i(I)&65535)+(E.i(I)&65535),v=(b>>>16)+(this.i(I)>>>16)+(E.i(I)>>>16);w=v>>>16,b&=65535,v&=65535,y[I]=v<<16|b}return new a(y,y[y.length-1]&-2147483648?-1:0)};function x(E,m){return E.add(N(m))}n.j=function(E){if(P(this)||P(E))return _;if(k(this))return k(E)?N(this).j(N(E)):N(N(this).j(E));if(k(E))return N(this.j(N(E)));if(0>this.l(R)&&0>E.l(R))return d(this.m()*E.m());for(var m=this.g.length+E.g.length,y=[],w=0;w<2*m;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(var I=0;I<E.g.length;I++){var b=this.i(w)>>>16,v=this.i(w)&65535,Te=E.i(I)>>>16,dr=E.i(I)&65535;y[2*w+2*I]+=v*dr,j(y,2*w+2*I),y[2*w+2*I+1]+=b*dr,j(y,2*w+2*I+1),y[2*w+2*I+1]+=v*Te,j(y,2*w+2*I+1),y[2*w+2*I+2]+=b*Te,j(y,2*w+2*I+2)}for(w=0;w<m;w++)y[w]=y[2*w+1]<<16|y[2*w];for(w=m;w<2*m;w++)y[w]=0;return new a(y,0)};function j(E,m){for(;(E[m]&65535)!=E[m];)E[m+1]+=E[m]>>>16,E[m]&=65535,m++}function z(E,m){this.g=E,this.h=m}function H(E,m){if(P(m))throw Error("division by zero");if(P(E))return new z(_,_);if(k(E))return m=H(N(E),m),new z(N(m.g),N(m.h));if(k(m))return m=H(E,N(m)),new z(N(m.g),m.h);if(30<E.g.length){if(k(E)||k(m))throw Error("slowDivide_ only works with positive integers.");for(var y=T,w=m;0>=w.l(E);)y=Q(y),w=Q(w);var I=W(y,1),b=W(w,1);for(w=W(w,2),y=W(y,2);!P(w);){var v=b.add(w);0>=v.l(E)&&(I=I.add(y),b=v),w=W(w,1),y=W(y,1)}return m=x(E,I.j(m)),new z(I,m)}for(I=_;0<=E.l(m);){for(y=Math.max(1,Math.floor(E.m()/m.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),b=d(y),v=b.j(m);k(v)||0<v.l(E);)y-=w,b=d(y),v=b.j(m);P(b)&&(b=T),I=I.add(b),E=x(E,v)}return new z(I,E)}n.A=function(E){return H(this,E).h},n.and=function(E){for(var m=Math.max(this.g.length,E.g.length),y=[],w=0;w<m;w++)y[w]=this.i(w)&E.i(w);return new a(y,this.h&E.h)},n.or=function(E){for(var m=Math.max(this.g.length,E.g.length),y=[],w=0;w<m;w++)y[w]=this.i(w)|E.i(w);return new a(y,this.h|E.h)},n.xor=function(E){for(var m=Math.max(this.g.length,E.g.length),y=[],w=0;w<m;w++)y[w]=this.i(w)^E.i(w);return new a(y,this.h^E.h)};function Q(E){for(var m=E.g.length+1,y=[],w=0;w<m;w++)y[w]=E.i(w)<<1|E.i(w-1)>>>31;return new a(y,E.h)}function W(E,m){var y=m>>5;m%=32;for(var w=E.g.length-y,I=[],b=0;b<w;b++)I[b]=0<m?E.i(b+y)>>>m|E.i(b+y+1)<<32-m:E.i(b+y);return new a(I,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Bh=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=f,Ke=a}).apply(typeof Gc<"u"?Gc:typeof self<"u"?self:typeof window<"u"?window:{});var Li=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var zh,Lr,$h,Qi,ea,qh,Gh,Hh;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,l,h){return s==Array.prototype||s==Object.prototype||(s[l]=h.value),s};function e(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof Li=="object"&&Li];for(var l=0;l<s.length;++l){var h=s[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=e(this);function i(s,l){if(l)t:{var h=r;s=s.split(".");for(var p=0;p<s.length-1;p++){var A=s[p];if(!(A in h))break t;h=h[A]}s=s[s.length-1],p=h[s],l=l(p),l!=p&&l!=null&&t(h,s,{configurable:!0,writable:!0,value:l})}}function o(s,l){s instanceof String&&(s+="");var h=0,p=!1,A={next:function(){if(!p&&h<s.length){var S=h++;return{value:l(S,s[S]),done:!1}}return p=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}i("Array.prototype.values",function(s){return s||function(){return o(this,function(l,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function u(s){var l=typeof s;return l=l!="object"?l:s?Array.isArray(s)?"array":l:"null",l=="array"||l=="object"&&typeof s.length=="number"}function d(s){var l=typeof s;return l=="object"&&s!=null||l=="function"}function f(s,l,h){return s.call.apply(s.bind,arguments)}function _(s,l,h){if(!s)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,p),s.apply(l,A)}}return function(){return s.apply(l,arguments)}}function T(s,l,h){return T=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:_,T.apply(null,arguments)}function R(s,l){var h=Array.prototype.slice.call(arguments,1);return function(){var p=h.slice();return p.push.apply(p,arguments),s.apply(this,p)}}function P(s,l){function h(){}h.prototype=l.prototype,s.aa=l.prototype,s.prototype=new h,s.prototype.constructor=s,s.Qb=function(p,A,S){for(var D=Array(arguments.length-2),rt=2;rt<arguments.length;rt++)D[rt-2]=arguments[rt];return l.prototype[A].apply(p,D)}}function k(s){const l=s.length;if(0<l){const h=Array(l);for(let p=0;p<l;p++)h[p]=s[p];return h}return[]}function N(s,l){for(let h=1;h<arguments.length;h++){const p=arguments[h];if(u(p)){const A=s.length||0,S=p.length||0;s.length=A+S;for(let D=0;D<S;D++)s[A+D]=p[D]}else s.push(p)}}class x{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function j(s){return/^[\s\xa0]*$/.test(s)}function z(){var s=c.navigator;return s&&(s=s.userAgent)?s:""}function H(s){return H[" "](s),s}H[" "]=function(){};var Q=z().indexOf("Gecko")!=-1&&!(z().toLowerCase().indexOf("webkit")!=-1&&z().indexOf("Edge")==-1)&&!(z().indexOf("Trident")!=-1||z().indexOf("MSIE")!=-1)&&z().indexOf("Edge")==-1;function W(s,l,h){for(const p in s)l.call(h,s[p],p,s)}function E(s,l){for(const h in s)l.call(void 0,s[h],h,s)}function m(s){const l={};for(const h in s)l[h]=s[h];return l}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function w(s,l){let h,p;for(let A=1;A<arguments.length;A++){p=arguments[A];for(h in p)s[h]=p[h];for(let S=0;S<y.length;S++)h=y[S],Object.prototype.hasOwnProperty.call(p,h)&&(s[h]=p[h])}}function I(s){var l=1;s=s.split(":");const h=[];for(;0<l&&s.length;)h.push(s.shift()),l--;return s.length&&h.push(s.join(":")),h}function b(s){c.setTimeout(()=>{throw s},0)}function v(){var s=Zs;let l=null;return s.g&&(l=s.g,s.g=s.g.next,s.g||(s.h=null),l.next=null),l}class Te{constructor(){this.h=this.g=null}add(l,h){const p=dr.get();p.set(l,h),this.h?this.h.next=p:this.g=p,this.h=p}}var dr=new x(()=>new Tf,s=>s.reset());class Tf{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let fr,pr=!1,Zs=new Te,dl=()=>{const s=c.Promise.resolve(void 0);fr=()=>{s.then(wf)}};var wf=()=>{for(var s;s=v();){try{s.h.call(s.g)}catch(h){b(h)}var l=dr;l.j(s),100>l.h&&(l.h++,s.next=l.g,l.g=s)}pr=!1};function Ne(){this.s=this.s,this.C=this.C}Ne.prototype.s=!1,Ne.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ne.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ct(s,l){this.type=s,this.g=this.target=l,this.defaultPrevented=!1}Ct.prototype.h=function(){this.defaultPrevented=!0};var If=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var s=!1,l=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const h=()=>{};c.addEventListener("test",h,l),c.removeEventListener("test",h,l)}catch{}return s}();function gr(s,l){if(Ct.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var h=this.type=s.type,p=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=l,l=s.relatedTarget){if(Q){t:{try{H(l.nodeName);var A=!0;break t}catch{}A=!1}A||(l=null)}}else h=="mouseover"?l=s.fromElement:h=="mouseout"&&(l=s.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:Af[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&gr.aa.h.call(this)}}P(gr,Ct);var Af={2:"touch",3:"pen",4:"mouse"};gr.prototype.h=function(){gr.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var mr="closure_listenable_"+(1e6*Math.random()|0),bf=0;function Sf(s,l,h,p,A){this.listener=s,this.proxy=null,this.src=l,this.type=h,this.capture=!!p,this.ha=A,this.key=++bf,this.da=this.fa=!1}function gi(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function mi(s){this.src=s,this.g={},this.h=0}mi.prototype.add=function(s,l,h,p,A){var S=s.toString();s=this.g[S],s||(s=this.g[S]=[],this.h++);var D=eo(s,l,p,A);return-1<D?(l=s[D],h||(l.fa=!1)):(l=new Sf(l,this.src,S,!!p,A),l.fa=h,s.push(l)),l};function to(s,l){var h=l.type;if(h in s.g){var p=s.g[h],A=Array.prototype.indexOf.call(p,l,void 0),S;(S=0<=A)&&Array.prototype.splice.call(p,A,1),S&&(gi(l),s.g[h].length==0&&(delete s.g[h],s.h--))}}function eo(s,l,h,p){for(var A=0;A<s.length;++A){var S=s[A];if(!S.da&&S.listener==l&&S.capture==!!h&&S.ha==p)return A}return-1}var no="closure_lm_"+(1e6*Math.random()|0),ro={};function fl(s,l,h,p,A){if(p&&p.once)return gl(s,l,h,p,A);if(Array.isArray(l)){for(var S=0;S<l.length;S++)fl(s,l[S],h,p,A);return null}return h=ao(h),s&&s[mr]?s.K(l,h,d(p)?!!p.capture:!!p,A):pl(s,l,h,!1,p,A)}function pl(s,l,h,p,A,S){if(!l)throw Error("Invalid event type");var D=d(A)?!!A.capture:!!A,rt=so(s);if(rt||(s[no]=rt=new mi(s)),h=rt.add(l,h,p,D,S),h.proxy)return h;if(p=Rf(),h.proxy=p,p.src=s,p.listener=h,s.addEventListener)If||(A=D),A===void 0&&(A=!1),s.addEventListener(l.toString(),p,A);else if(s.attachEvent)s.attachEvent(_l(l.toString()),p);else if(s.addListener&&s.removeListener)s.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Rf(){function s(h){return l.call(s.src,s.listener,h)}const l=Cf;return s}function gl(s,l,h,p,A){if(Array.isArray(l)){for(var S=0;S<l.length;S++)gl(s,l[S],h,p,A);return null}return h=ao(h),s&&s[mr]?s.L(l,h,d(p)?!!p.capture:!!p,A):pl(s,l,h,!0,p,A)}function ml(s,l,h,p,A){if(Array.isArray(l))for(var S=0;S<l.length;S++)ml(s,l[S],h,p,A);else p=d(p)?!!p.capture:!!p,h=ao(h),s&&s[mr]?(s=s.i,l=String(l).toString(),l in s.g&&(S=s.g[l],h=eo(S,h,p,A),-1<h&&(gi(S[h]),Array.prototype.splice.call(S,h,1),S.length==0&&(delete s.g[l],s.h--)))):s&&(s=so(s))&&(l=s.g[l.toString()],s=-1,l&&(s=eo(l,h,p,A)),(h=-1<s?l[s]:null)&&io(h))}function io(s){if(typeof s!="number"&&s&&!s.da){var l=s.src;if(l&&l[mr])to(l.i,s);else{var h=s.type,p=s.proxy;l.removeEventListener?l.removeEventListener(h,p,s.capture):l.detachEvent?l.detachEvent(_l(h),p):l.addListener&&l.removeListener&&l.removeListener(p),(h=so(l))?(to(h,s),h.h==0&&(h.src=null,l[no]=null)):gi(s)}}}function _l(s){return s in ro?ro[s]:ro[s]="on"+s}function Cf(s,l){if(s.da)s=!0;else{l=new gr(l,this);var h=s.listener,p=s.ha||s.src;s.fa&&io(s),s=h.call(p,l)}return s}function so(s){return s=s[no],s instanceof mi?s:null}var oo="__closure_events_fn_"+(1e9*Math.random()>>>0);function ao(s){return typeof s=="function"?s:(s[oo]||(s[oo]=function(l){return s.handleEvent(l)}),s[oo])}function Pt(){Ne.call(this),this.i=new mi(this),this.M=this,this.F=null}P(Pt,Ne),Pt.prototype[mr]=!0,Pt.prototype.removeEventListener=function(s,l,h,p){ml(this,s,l,h,p)};function Mt(s,l){var h,p=s.F;if(p)for(h=[];p;p=p.F)h.push(p);if(s=s.M,p=l.type||l,typeof l=="string")l=new Ct(l,s);else if(l instanceof Ct)l.target=l.target||s;else{var A=l;l=new Ct(p,s),w(l,A)}if(A=!0,h)for(var S=h.length-1;0<=S;S--){var D=l.g=h[S];A=_i(D,p,!0,l)&&A}if(D=l.g=s,A=_i(D,p,!0,l)&&A,A=_i(D,p,!1,l)&&A,h)for(S=0;S<h.length;S++)D=l.g=h[S],A=_i(D,p,!1,l)&&A}Pt.prototype.N=function(){if(Pt.aa.N.call(this),this.i){var s=this.i,l;for(l in s.g){for(var h=s.g[l],p=0;p<h.length;p++)gi(h[p]);delete s.g[l],s.h--}}this.F=null},Pt.prototype.K=function(s,l,h,p){return this.i.add(String(s),l,!1,h,p)},Pt.prototype.L=function(s,l,h,p){return this.i.add(String(s),l,!0,h,p)};function _i(s,l,h,p){if(l=s.i.g[String(l)],!l)return!0;l=l.concat();for(var A=!0,S=0;S<l.length;++S){var D=l[S];if(D&&!D.da&&D.capture==h){var rt=D.listener,At=D.ha||D.src;D.fa&&to(s.i,D),A=rt.call(At,p)!==!1&&A}}return A&&!p.defaultPrevented}function yl(s,l,h){if(typeof s=="function")h&&(s=T(s,h));else if(s&&typeof s.handleEvent=="function")s=T(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(s,l||0)}function vl(s){s.g=yl(()=>{s.g=null,s.i&&(s.i=!1,vl(s))},s.l);const l=s.h;s.h=null,s.m.apply(null,l)}class Pf extends Ne{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:vl(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function _r(s){Ne.call(this),this.h=s,this.g={}}P(_r,Ne);var El=[];function Tl(s){W(s.g,function(l,h){this.g.hasOwnProperty(h)&&io(l)},s),s.g={}}_r.prototype.N=function(){_r.aa.N.call(this),Tl(this)},_r.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var lo=c.JSON.stringify,kf=c.JSON.parse,Vf=class{stringify(s){return c.JSON.stringify(s,void 0)}parse(s){return c.JSON.parse(s,void 0)}};function co(){}co.prototype.h=null;function wl(s){return s.h||(s.h=s.i())}function Il(){}var yr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function uo(){Ct.call(this,"d")}P(uo,Ct);function ho(){Ct.call(this,"c")}P(ho,Ct);var sn={},Al=null;function yi(){return Al=Al||new Pt}sn.La="serverreachability";function bl(s){Ct.call(this,sn.La,s)}P(bl,Ct);function vr(s){const l=yi();Mt(l,new bl(l))}sn.STAT_EVENT="statevent";function Sl(s,l){Ct.call(this,sn.STAT_EVENT,s),this.stat=l}P(Sl,Ct);function Ft(s){const l=yi();Mt(l,new Sl(l,s))}sn.Ma="timingevent";function Rl(s,l){Ct.call(this,sn.Ma,s),this.size=l}P(Rl,Ct);function Er(s,l){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){s()},l)}function Tr(){this.g=!0}Tr.prototype.xa=function(){this.g=!1};function Nf(s,l,h,p,A,S){s.info(function(){if(s.g)if(S)for(var D="",rt=S.split("&"),At=0;At<rt.length;At++){var et=rt[At].split("=");if(1<et.length){var kt=et[0];et=et[1];var Vt=kt.split("_");D=2<=Vt.length&&Vt[1]=="type"?D+(kt+"="+et+"&"):D+(kt+"=redacted&")}}else D=null;else D=S;return"XMLHTTP REQ ("+p+") [attempt "+A+"]: "+l+`
`+h+`
`+D})}function Df(s,l,h,p,A,S,D){s.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+A+"]: "+l+`
`+h+`
`+S+" "+D})}function Pn(s,l,h,p){s.info(function(){return"XMLHTTP TEXT ("+l+"): "+Lf(s,h)+(p?" "+p:"")})}function Of(s,l){s.info(function(){return"TIMEOUT: "+l})}Tr.prototype.info=function(){};function Lf(s,l){if(!s.g)return l;if(!l)return null;try{var h=JSON.parse(l);if(h){for(s=0;s<h.length;s++)if(Array.isArray(h[s])){var p=h[s];if(!(2>p.length)){var A=p[1];if(Array.isArray(A)&&!(1>A.length)){var S=A[0];if(S!="noop"&&S!="stop"&&S!="close")for(var D=1;D<A.length;D++)A[D]=""}}}}return lo(h)}catch{return l}}var vi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Cl={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},fo;function Ei(){}P(Ei,co),Ei.prototype.g=function(){return new XMLHttpRequest},Ei.prototype.i=function(){return{}},fo=new Ei;function De(s,l,h,p){this.j=s,this.i=l,this.l=h,this.R=p||1,this.U=new _r(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Pl}function Pl(){this.i=null,this.g="",this.h=!1}var kl={},po={};function go(s,l,h){s.L=1,s.v=Ai(we(l)),s.m=h,s.P=!0,Vl(s,null)}function Vl(s,l){s.F=Date.now(),Ti(s),s.A=we(s.v);var h=s.A,p=s.R;Array.isArray(p)||(p=[String(p)]),Gl(h.i,"t",p),s.C=0,h=s.j.J,s.h=new Pl,s.g=cc(s.j,h?l:null,!s.m),0<s.O&&(s.M=new Pf(T(s.Y,s,s.g),s.O)),l=s.U,h=s.g,p=s.ca;var A="readystatechange";Array.isArray(A)||(A&&(El[0]=A.toString()),A=El);for(var S=0;S<A.length;S++){var D=fl(h,A[S],p||l.handleEvent,!1,l.h||l);if(!D)break;l.g[D.key]=D}l=s.H?m(s.H):{},s.m?(s.u||(s.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,l)):(s.u="GET",s.g.ea(s.A,s.u,null,l)),vr(),Nf(s.i,s.u,s.A,s.l,s.R,s.m)}De.prototype.ca=function(s){s=s.target;const l=this.M;l&&Ie(s)==3?l.j():this.Y(s)},De.prototype.Y=function(s){try{if(s==this.g)t:{const Vt=Ie(this.g);var l=this.g.Ba();const Nn=this.g.Z();if(!(3>Vt)&&(Vt!=3||this.g&&(this.h.h||this.g.oa()||Xl(this.g)))){this.J||Vt!=4||l==7||(l==8||0>=Nn?vr(3):vr(2)),mo(this);var h=this.g.Z();this.X=h;e:if(Nl(this)){var p=Xl(this.g);s="";var A=p.length,S=Ie(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){on(this),wr(this);var D="";break e}this.h.i=new c.TextDecoder}for(l=0;l<A;l++)this.h.h=!0,s+=this.h.i.decode(p[l],{stream:!(S&&l==A-1)});p.length=0,this.h.g+=s,this.C=0,D=this.h.g}else D=this.g.oa();if(this.o=h==200,Df(this.i,this.u,this.A,this.l,this.R,Vt,h),this.o){if(this.T&&!this.K){e:{if(this.g){var rt,At=this.g;if((rt=At.g?At.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!j(rt)){var et=rt;break e}}et=null}if(h=et)Pn(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,_o(this,h);else{this.o=!1,this.s=3,Ft(12),on(this),wr(this);break t}}if(this.P){h=!0;let Zt;for(;!this.J&&this.C<D.length;)if(Zt=xf(this,D),Zt==po){Vt==4&&(this.s=4,Ft(14),h=!1),Pn(this.i,this.l,null,"[Incomplete Response]");break}else if(Zt==kl){this.s=4,Ft(15),Pn(this.i,this.l,D,"[Invalid Chunk]"),h=!1;break}else Pn(this.i,this.l,Zt,null),_o(this,Zt);if(Nl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Vt!=4||D.length!=0||this.h.h||(this.s=1,Ft(16),h=!1),this.o=this.o&&h,!h)Pn(this.i,this.l,D,"[Invalid Chunked Response]"),on(this),wr(this);else if(0<D.length&&!this.W){this.W=!0;var kt=this.j;kt.g==this&&kt.ba&&!kt.M&&(kt.j.info("Great, no buffering proxy detected. Bytes received: "+D.length),Io(kt),kt.M=!0,Ft(11))}}else Pn(this.i,this.l,D,null),_o(this,D);Vt==4&&on(this),this.o&&!this.J&&(Vt==4?sc(this.j,this):(this.o=!1,Ti(this)))}else Zf(this.g),h==400&&0<D.indexOf("Unknown SID")?(this.s=3,Ft(12)):(this.s=0,Ft(13)),on(this),wr(this)}}}catch{}finally{}};function Nl(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function xf(s,l){var h=s.C,p=l.indexOf(`
`,h);return p==-1?po:(h=Number(l.substring(h,p)),isNaN(h)?kl:(p+=1,p+h>l.length?po:(l=l.slice(p,p+h),s.C=p+h,l)))}De.prototype.cancel=function(){this.J=!0,on(this)};function Ti(s){s.S=Date.now()+s.I,Dl(s,s.I)}function Dl(s,l){if(s.B!=null)throw Error("WatchDog timer not null");s.B=Er(T(s.ba,s),l)}function mo(s){s.B&&(c.clearTimeout(s.B),s.B=null)}De.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(Of(this.i,this.A),this.L!=2&&(vr(),Ft(17)),on(this),this.s=2,wr(this)):Dl(this,this.S-s)};function wr(s){s.j.G==0||s.J||sc(s.j,s)}function on(s){mo(s);var l=s.M;l&&typeof l.ma=="function"&&l.ma(),s.M=null,Tl(s.U),s.g&&(l=s.g,s.g=null,l.abort(),l.ma())}function _o(s,l){try{var h=s.j;if(h.G!=0&&(h.g==s||yo(h.h,s))){if(!s.K&&yo(h.h,s)&&h.G==3){try{var p=h.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var A=p;if(A[0]==0){t:if(!h.u){if(h.g)if(h.g.F+3e3<s.F)ki(h),Ci(h);else break t;wo(h),Ft(18)}}else h.za=A[1],0<h.za-h.T&&37500>A[2]&&h.F&&h.v==0&&!h.C&&(h.C=Er(T(h.Za,h),6e3));if(1>=xl(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else ln(h,11)}else if((s.K||h.g==s)&&ki(h),!j(l))for(A=h.Da.g.parse(l),l=0;l<A.length;l++){let et=A[l];if(h.T=et[0],et=et[1],h.G==2)if(et[0]=="c"){h.K=et[1],h.ia=et[2];const kt=et[3];kt!=null&&(h.la=kt,h.j.info("VER="+h.la));const Vt=et[4];Vt!=null&&(h.Aa=Vt,h.j.info("SVER="+h.Aa));const Nn=et[5];Nn!=null&&typeof Nn=="number"&&0<Nn&&(p=1.5*Nn,h.L=p,h.j.info("backChannelRequestTimeoutMs_="+p)),p=h;const Zt=s.g;if(Zt){const Ni=Zt.g?Zt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ni){var S=p.h;S.g||Ni.indexOf("spdy")==-1&&Ni.indexOf("quic")==-1&&Ni.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(vo(S,S.h),S.h=null))}if(p.D){const Ao=Zt.g?Zt.g.getResponseHeader("X-HTTP-Session-Id"):null;Ao&&(p.ya=Ao,st(p.I,p.D,Ao))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-s.F,h.j.info("Handshake RTT: "+h.R+"ms")),p=h;var D=s;if(p.qa=lc(p,p.J?p.ia:null,p.W),D.K){Ml(p.h,D);var rt=D,At=p.L;At&&(rt.I=At),rt.B&&(mo(rt),Ti(rt)),p.g=D}else rc(p);0<h.i.length&&Pi(h)}else et[0]!="stop"&&et[0]!="close"||ln(h,7);else h.G==3&&(et[0]=="stop"||et[0]=="close"?et[0]=="stop"?ln(h,7):To(h):et[0]!="noop"&&h.l&&h.l.ta(et),h.v=0)}}vr(4)}catch{}}var Mf=class{constructor(s,l){this.g=s,this.map=l}};function Ol(s){this.l=s||10,c.PerformanceNavigationTiming?(s=c.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ll(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function xl(s){return s.h?1:s.g?s.g.size:0}function yo(s,l){return s.h?s.h==l:s.g?s.g.has(l):!1}function vo(s,l){s.g?s.g.add(l):s.h=l}function Ml(s,l){s.h&&s.h==l?s.h=null:s.g&&s.g.has(l)&&s.g.delete(l)}Ol.prototype.cancel=function(){if(this.i=Fl(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function Fl(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let l=s.i;for(const h of s.g.values())l=l.concat(h.D);return l}return k(s.i)}function Ff(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map<"u"&&s instanceof Map||typeof Set<"u"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(u(s)){for(var l=[],h=s.length,p=0;p<h;p++)l.push(s[p]);return l}l=[],h=0;for(p in s)l[h++]=s[p];return l}function Uf(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map<"u"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set<"u"&&s instanceof Set)){if(u(s)||typeof s=="string"){var l=[];s=s.length;for(var h=0;h<s;h++)l.push(h);return l}l=[],h=0;for(const p in s)l[h++]=p;return l}}}function Ul(s,l){if(s.forEach&&typeof s.forEach=="function")s.forEach(l,void 0);else if(u(s)||typeof s=="string")Array.prototype.forEach.call(s,l,void 0);else for(var h=Uf(s),p=Ff(s),A=p.length,S=0;S<A;S++)l.call(void 0,p[S],h&&h[S],s)}var jl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function jf(s,l){if(s){s=s.split("&");for(var h=0;h<s.length;h++){var p=s[h].indexOf("="),A=null;if(0<=p){var S=s[h].substring(0,p);A=s[h].substring(p+1)}else S=s[h];l(S,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function an(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof an){this.h=s.h,wi(this,s.j),this.o=s.o,this.g=s.g,Ii(this,s.s),this.l=s.l;var l=s.i,h=new br;h.i=l.i,l.g&&(h.g=new Map(l.g),h.h=l.h),Bl(this,h),this.m=s.m}else s&&(l=String(s).match(jl))?(this.h=!1,wi(this,l[1]||"",!0),this.o=Ir(l[2]||""),this.g=Ir(l[3]||"",!0),Ii(this,l[4]),this.l=Ir(l[5]||"",!0),Bl(this,l[6]||"",!0),this.m=Ir(l[7]||"")):(this.h=!1,this.i=new br(null,this.h))}an.prototype.toString=function(){var s=[],l=this.j;l&&s.push(Ar(l,zl,!0),":");var h=this.g;return(h||l=="file")&&(s.push("//"),(l=this.o)&&s.push(Ar(l,zl,!0),"@"),s.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&s.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&s.push("/"),s.push(Ar(h,h.charAt(0)=="/"?$f:zf,!0))),(h=this.i.toString())&&s.push("?",h),(h=this.m)&&s.push("#",Ar(h,Gf)),s.join("")};function we(s){return new an(s)}function wi(s,l,h){s.j=h?Ir(l,!0):l,s.j&&(s.j=s.j.replace(/:$/,""))}function Ii(s,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);s.s=l}else s.s=null}function Bl(s,l,h){l instanceof br?(s.i=l,Hf(s.i,s.h)):(h||(l=Ar(l,qf)),s.i=new br(l,s.h))}function st(s,l,h){s.i.set(l,h)}function Ai(s){return st(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function Ir(s,l){return s?l?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function Ar(s,l,h){return typeof s=="string"?(s=encodeURI(s).replace(l,Bf),h&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function Bf(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var zl=/[#\/\?@]/g,zf=/[#\?:]/g,$f=/[#\?]/g,qf=/[#\?@]/g,Gf=/#/g;function br(s,l){this.h=this.g=null,this.i=s||null,this.j=!!l}function Oe(s){s.g||(s.g=new Map,s.h=0,s.i&&jf(s.i,function(l,h){s.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}n=br.prototype,n.add=function(s,l){Oe(this),this.i=null,s=kn(this,s);var h=this.g.get(s);return h||this.g.set(s,h=[]),h.push(l),this.h+=1,this};function $l(s,l){Oe(s),l=kn(s,l),s.g.has(l)&&(s.i=null,s.h-=s.g.get(l).length,s.g.delete(l))}function ql(s,l){return Oe(s),l=kn(s,l),s.g.has(l)}n.forEach=function(s,l){Oe(this),this.g.forEach(function(h,p){h.forEach(function(A){s.call(l,A,p,this)},this)},this)},n.na=function(){Oe(this);const s=Array.from(this.g.values()),l=Array.from(this.g.keys()),h=[];for(let p=0;p<l.length;p++){const A=s[p];for(let S=0;S<A.length;S++)h.push(l[p])}return h},n.V=function(s){Oe(this);let l=[];if(typeof s=="string")ql(this,s)&&(l=l.concat(this.g.get(kn(this,s))));else{s=Array.from(this.g.values());for(let h=0;h<s.length;h++)l=l.concat(s[h])}return l},n.set=function(s,l){return Oe(this),this.i=null,s=kn(this,s),ql(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[l]),this.h+=1,this},n.get=function(s,l){return s?(s=this.V(s),0<s.length?String(s[0]):l):l};function Gl(s,l,h){$l(s,l),0<h.length&&(s.i=null,s.g.set(kn(s,l),k(h)),s.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],l=Array.from(this.g.keys());for(var h=0;h<l.length;h++){var p=l[h];const S=encodeURIComponent(String(p)),D=this.V(p);for(p=0;p<D.length;p++){var A=S;D[p]!==""&&(A+="="+encodeURIComponent(String(D[p]))),s.push(A)}}return this.i=s.join("&")};function kn(s,l){return l=String(l),s.j&&(l=l.toLowerCase()),l}function Hf(s,l){l&&!s.j&&(Oe(s),s.i=null,s.g.forEach(function(h,p){var A=p.toLowerCase();p!=A&&($l(this,p),Gl(this,A,h))},s)),s.j=l}function Wf(s,l){const h=new Tr;if(c.Image){const p=new Image;p.onload=R(Le,h,"TestLoadImage: loaded",!0,l,p),p.onerror=R(Le,h,"TestLoadImage: error",!1,l,p),p.onabort=R(Le,h,"TestLoadImage: abort",!1,l,p),p.ontimeout=R(Le,h,"TestLoadImage: timeout",!1,l,p),c.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=s}else l(!1)}function Kf(s,l){const h=new Tr,p=new AbortController,A=setTimeout(()=>{p.abort(),Le(h,"TestPingServer: timeout",!1,l)},1e4);fetch(s,{signal:p.signal}).then(S=>{clearTimeout(A),S.ok?Le(h,"TestPingServer: ok",!0,l):Le(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(A),Le(h,"TestPingServer: error",!1,l)})}function Le(s,l,h,p,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),p(h)}catch{}}function Qf(){this.g=new Vf}function Jf(s,l,h){const p=h||"";try{Ul(s,function(A,S){let D=A;d(A)&&(D=lo(A)),l.push(p+S+"="+encodeURIComponent(D))})}catch(A){throw l.push(p+"type="+encodeURIComponent("_badmap")),A}}function bi(s){this.l=s.Ub||null,this.j=s.eb||!1}P(bi,co),bi.prototype.g=function(){return new Si(this.l,this.j)},bi.prototype.i=function(s){return function(){return s}}({});function Si(s,l){Pt.call(this),this.D=s,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}P(Si,Pt),n=Si.prototype,n.open=function(s,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=l,this.readyState=1,Rr(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(l.body=s),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Sr(this)),this.readyState=0},n.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,Rr(this)),this.g&&(this.readyState=3,Rr(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Hl(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function Hl(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}n.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var l=s.value?s.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!s.done}))&&(this.response=this.responseText+=l)}s.done?Sr(this):Rr(this),this.readyState==3&&Hl(this)}},n.Ra=function(s){this.g&&(this.response=this.responseText=s,Sr(this))},n.Qa=function(s){this.g&&(this.response=s,Sr(this))},n.ga=function(){this.g&&Sr(this)};function Sr(s){s.readyState=4,s.l=null,s.j=null,s.v=null,Rr(s)}n.setRequestHeader=function(s,l){this.u.append(s,l)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,s.push(h[0]+": "+h[1]),h=l.next();return s.join(`\r
`)};function Rr(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(Si.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function Wl(s){let l="";return W(s,function(h,p){l+=p,l+=":",l+=h,l+=`\r
`}),l}function Eo(s,l,h){t:{for(p in h){var p=!1;break t}p=!0}p||(h=Wl(h),typeof s=="string"?h!=null&&encodeURIComponent(String(h)):st(s,l,h))}function ut(s){Pt.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}P(ut,Pt);var Yf=/^https?$/i,Xf=["POST","PUT"];n=ut.prototype,n.Ha=function(s){this.J=s},n.ea=function(s,l,h,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);l=l?l.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():fo.g(),this.v=this.o?wl(this.o):wl(fo),this.g.onreadystatechange=T(this.Ea,this);try{this.B=!0,this.g.open(l,String(s),!0),this.B=!1}catch(S){Kl(this,S);return}if(s=h||"",h=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var A in p)h.set(A,p[A]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const S of p.keys())h.set(S,p.get(S));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(h.keys()).find(S=>S.toLowerCase()=="content-type"),A=c.FormData&&s instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Xf,l,void 0))||p||A||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,D]of h)this.g.setRequestHeader(S,D);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Yl(this),this.u=!0,this.g.send(s),this.u=!1}catch(S){Kl(this,S)}};function Kl(s,l){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=l,s.m=5,Ql(s),Ri(s)}function Ql(s){s.A||(s.A=!0,Mt(s,"complete"),Mt(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,Mt(this,"complete"),Mt(this,"abort"),Ri(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ri(this,!0)),ut.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Jl(this):this.bb())},n.bb=function(){Jl(this)};function Jl(s){if(s.h&&typeof a<"u"&&(!s.v[1]||Ie(s)!=4||s.Z()!=2)){if(s.u&&Ie(s)==4)yl(s.Ea,0,s);else if(Mt(s,"readystatechange"),Ie(s)==4){s.h=!1;try{const D=s.Z();t:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break t;default:l=!1}var h;if(!(h=l)){var p;if(p=D===0){var A=String(s.D).match(jl)[1]||null;!A&&c.self&&c.self.location&&(A=c.self.location.protocol.slice(0,-1)),p=!Yf.test(A?A.toLowerCase():"")}h=p}if(h)Mt(s,"complete"),Mt(s,"success");else{s.m=6;try{var S=2<Ie(s)?s.g.statusText:""}catch{S=""}s.l=S+" ["+s.Z()+"]",Ql(s)}}finally{Ri(s)}}}}function Ri(s,l){if(s.g){Yl(s);const h=s.g,p=s.v[0]?()=>{}:null;s.g=null,s.v=null,l||Mt(s,"ready");try{h.onreadystatechange=p}catch{}}}function Yl(s){s.I&&(c.clearTimeout(s.I),s.I=null)}n.isActive=function(){return!!this.g};function Ie(s){return s.g?s.g.readyState:0}n.Z=function(){try{return 2<Ie(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(s){if(this.g){var l=this.g.responseText;return s&&l.indexOf(s)==0&&(l=l.substring(s.length)),kf(l)}};function Xl(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function Zf(s){const l={};s=(s.g&&2<=Ie(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<s.length;p++){if(j(s[p]))continue;var h=I(s[p]);const A=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const S=l[A]||[];l[A]=S,S.push(h)}E(l,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Cr(s,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[s]||l}function Zl(s){this.Aa=0,this.i=[],this.j=new Tr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Cr("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Cr("baseRetryDelayMs",5e3,s),this.cb=Cr("retryDelaySeedMs",1e4,s),this.Wa=Cr("forwardChannelMaxRetries",2,s),this.wa=Cr("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new Ol(s&&s.concurrentRequestLimit),this.Da=new Qf,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Zl.prototype,n.la=8,n.G=1,n.connect=function(s,l,h,p){Ft(0),this.W=s,this.H=l||{},h&&p!==void 0&&(this.H.OSID=h,this.H.OAID=p),this.F=this.X,this.I=lc(this,null,this.W),Pi(this)};function To(s){if(tc(s),s.G==3){var l=s.U++,h=we(s.I);if(st(h,"SID",s.K),st(h,"RID",l),st(h,"TYPE","terminate"),Pr(s,h),l=new De(s,s.j,l),l.L=2,l.v=Ai(we(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!h&&c.Image&&(new Image().src=l.v,h=!0),h||(l.g=cc(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Ti(l)}ac(s)}function Ci(s){s.g&&(Io(s),s.g.cancel(),s.g=null)}function tc(s){Ci(s),s.u&&(c.clearTimeout(s.u),s.u=null),ki(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&c.clearTimeout(s.s),s.s=null)}function Pi(s){if(!Ll(s.h)&&!s.s){s.s=!0;var l=s.Ga;fr||dl(),pr||(fr(),pr=!0),Zs.add(l,s),s.B=0}}function tp(s,l){return xl(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=l.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=Er(T(s.Ga,s,l),oc(s,s.B)),s.B++,!0)}n.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const A=new De(this,this.j,s);let S=this.o;if(this.S&&(S?(S=m(S),w(S,this.S)):S=this.S),this.m!==null||this.O||(A.H=S,S=null),this.P)t:{for(var l=0,h=0;h<this.i.length;h++){e:{var p=this.i[h];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break e}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=h;break t}if(l===4096||h===this.i.length-1){l=h+1;break t}}l=1e3}else l=1e3;l=nc(this,A,l),h=we(this.I),st(h,"RID",s),st(h,"CVER",22),this.D&&st(h,"X-HTTP-Session-Id",this.D),Pr(this,h),S&&(this.O?l="headers="+encodeURIComponent(String(Wl(S)))+"&"+l:this.m&&Eo(h,this.m,S)),vo(this.h,A),this.Ua&&st(h,"TYPE","init"),this.P?(st(h,"$req",l),st(h,"SID","null"),A.T=!0,go(A,h,null)):go(A,h,l),this.G=2}}else this.G==3&&(s?ec(this,s):this.i.length==0||Ll(this.h)||ec(this))};function ec(s,l){var h;l?h=l.l:h=s.U++;const p=we(s.I);st(p,"SID",s.K),st(p,"RID",h),st(p,"AID",s.T),Pr(s,p),s.m&&s.o&&Eo(p,s.m,s.o),h=new De(s,s.j,h,s.B+1),s.m===null&&(h.H=s.o),l&&(s.i=l.D.concat(s.i)),l=nc(s,h,1e3),h.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),vo(s.h,h),go(h,p,l)}function Pr(s,l){s.H&&W(s.H,function(h,p){st(l,p,h)}),s.l&&Ul({},function(h,p){st(l,p,h)})}function nc(s,l,h){h=Math.min(s.i.length,h);var p=s.l?T(s.l.Na,s.l,s):null;t:{var A=s.i;let S=-1;for(;;){const D=["count="+h];S==-1?0<h?(S=A[0].g,D.push("ofs="+S)):S=0:D.push("ofs="+S);let rt=!0;for(let At=0;At<h;At++){let et=A[At].g;const kt=A[At].map;if(et-=S,0>et)S=Math.max(0,A[At].g-100),rt=!1;else try{Jf(kt,D,"req"+et+"_")}catch{p&&p(kt)}}if(rt){p=D.join("&");break t}}}return s=s.i.splice(0,h),l.D=s,p}function rc(s){if(!s.g&&!s.u){s.Y=1;var l=s.Fa;fr||dl(),pr||(fr(),pr=!0),Zs.add(l,s),s.v=0}}function wo(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=Er(T(s.Fa,s),oc(s,s.v)),s.v++,!0)}n.Fa=function(){if(this.u=null,ic(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=Er(T(this.ab,this),s)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ft(10),Ci(this),ic(this))};function Io(s){s.A!=null&&(c.clearTimeout(s.A),s.A=null)}function ic(s){s.g=new De(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var l=we(s.qa);st(l,"RID","rpc"),st(l,"SID",s.K),st(l,"AID",s.T),st(l,"CI",s.F?"0":"1"),!s.F&&s.ja&&st(l,"TO",s.ja),st(l,"TYPE","xmlhttp"),Pr(s,l),s.m&&s.o&&Eo(l,s.m,s.o),s.L&&(s.g.I=s.L);var h=s.g;s=s.ia,h.L=1,h.v=Ai(we(l)),h.m=null,h.P=!0,Vl(h,s)}n.Za=function(){this.C!=null&&(this.C=null,Ci(this),wo(this),Ft(19))};function ki(s){s.C!=null&&(c.clearTimeout(s.C),s.C=null)}function sc(s,l){var h=null;if(s.g==l){ki(s),Io(s),s.g=null;var p=2}else if(yo(s.h,l))h=l.D,Ml(s.h,l),p=1;else return;if(s.G!=0){if(l.o)if(p==1){h=l.m?l.m.length:0,l=Date.now()-l.F;var A=s.B;p=yi(),Mt(p,new Rl(p,h)),Pi(s)}else rc(s);else if(A=l.s,A==3||A==0&&0<l.X||!(p==1&&tp(s,l)||p==2&&wo(s)))switch(h&&0<h.length&&(l=s.h,l.i=l.i.concat(h)),A){case 1:ln(s,5);break;case 4:ln(s,10);break;case 3:ln(s,6);break;default:ln(s,2)}}}function oc(s,l){let h=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(h*=2),h*l}function ln(s,l){if(s.j.info("Error code "+l),l==2){var h=T(s.fb,s),p=s.Xa;const A=!p;p=new an(p||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||wi(p,"https"),Ai(p),A?Wf(p.toString(),h):Kf(p.toString(),h)}else Ft(2);s.G=0,s.l&&s.l.sa(l),ac(s),tc(s)}n.fb=function(s){s?(this.j.info("Successfully pinged google.com"),Ft(2)):(this.j.info("Failed to ping google.com"),Ft(1))};function ac(s){if(s.G=0,s.ka=[],s.l){const l=Fl(s.h);(l.length!=0||s.i.length!=0)&&(N(s.ka,l),N(s.ka,s.i),s.h.i.length=0,k(s.i),s.i.length=0),s.l.ra()}}function lc(s,l,h){var p=h instanceof an?we(h):new an(h);if(p.g!="")l&&(p.g=l+"."+p.g),Ii(p,p.s);else{var A=c.location;p=A.protocol,l=l?l+"."+A.hostname:A.hostname,A=+A.port;var S=new an(null);p&&wi(S,p),l&&(S.g=l),A&&Ii(S,A),h&&(S.l=h),p=S}return h=s.D,l=s.ya,h&&l&&st(p,h,l),st(p,"VER",s.la),Pr(s,p),p}function cc(s,l,h){if(l&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=s.Ca&&!s.pa?new ut(new bi({eb:h})):new ut(s.pa),l.Ha(s.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function uc(){}n=uc.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Vi(){}Vi.prototype.g=function(s,l){return new qt(s,l)};function qt(s,l){Pt.call(this),this.g=new Zl(l),this.l=s,this.h=l&&l.messageUrlParams||null,s=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(s?s["X-WebChannel-Content-Type"]=l.messageContentType:s={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(s?s["X-WebChannel-Client-Profile"]=l.va:s={"X-WebChannel-Client-Profile":l.va}),this.g.S=s,(s=l&&l.Sb)&&!j(s)&&(this.g.m=s),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!j(l)&&(this.g.D=l,s=this.h,s!==null&&l in s&&(s=this.h,l in s&&delete s[l])),this.j=new Vn(this)}P(qt,Pt),qt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},qt.prototype.close=function(){To(this.g)},qt.prototype.o=function(s){var l=this.g;if(typeof s=="string"){var h={};h.__data__=s,s=h}else this.u&&(h={},h.__data__=lo(s),s=h);l.i.push(new Mf(l.Ya++,s)),l.G==3&&Pi(l)},qt.prototype.N=function(){this.g.l=null,delete this.j,To(this.g),delete this.g,qt.aa.N.call(this)};function hc(s){uo.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var l=s.__sm__;if(l){t:{for(const h in l){s=h;break t}s=void 0}(this.i=s)&&(s=this.i,l=l!==null&&s in l?l[s]:void 0),this.data=l}else this.data=s}P(hc,uo);function dc(){ho.call(this),this.status=1}P(dc,ho);function Vn(s){this.g=s}P(Vn,uc),Vn.prototype.ua=function(){Mt(this.g,"a")},Vn.prototype.ta=function(s){Mt(this.g,new hc(s))},Vn.prototype.sa=function(s){Mt(this.g,new dc)},Vn.prototype.ra=function(){Mt(this.g,"b")},Vi.prototype.createWebChannel=Vi.prototype.g,qt.prototype.send=qt.prototype.o,qt.prototype.open=qt.prototype.m,qt.prototype.close=qt.prototype.close,Hh=function(){return new Vi},Gh=function(){return yi()},qh=sn,ea={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},vi.NO_ERROR=0,vi.TIMEOUT=8,vi.HTTP_ERROR=6,Qi=vi,Cl.COMPLETE="complete",$h=Cl,Il.EventType=yr,yr.OPEN="a",yr.CLOSE="b",yr.ERROR="c",yr.MESSAGE="d",Pt.prototype.listen=Pt.prototype.K,Lr=Il,ut.prototype.listenOnce=ut.prototype.L,ut.prototype.getLastError=ut.prototype.Ka,ut.prototype.getLastErrorCode=ut.prototype.Ba,ut.prototype.getStatus=ut.prototype.Z,ut.prototype.getResponseJson=ut.prototype.Oa,ut.prototype.getResponseText=ut.prototype.oa,ut.prototype.send=ut.prototype.ea,ut.prototype.setWithCredentials=ut.prototype.Ha,zh=ut}).apply(typeof Li<"u"?Li:typeof self<"u"?self:typeof window<"u"?window:{});const Hc="@firebase/firestore",Wc="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Ot.UNAUTHENTICATED=new Ot(null),Ot.GOOGLE_CREDENTIALS=new Ot("google-credentials-uid"),Ot.FIRST_PARTY=new Ot("first-party-uid"),Ot.MOCK_USER=new Ot("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let lr="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const An=new Sa("@firebase/firestore");function On(){return An.logLevel}function L(n,...t){if(An.logLevel<=J.DEBUG){const e=t.map(Oa);An.debug(`Firestore (${lr}): ${n}`,...e)}}function ke(n,...t){if(An.logLevel<=J.ERROR){const e=t.map(Oa);An.error(`Firestore (${lr}): ${n}`,...e)}}function Je(n,...t){if(An.logLevel<=J.WARN){const e=t.map(Oa);An.warn(`Firestore (${lr}): ${n}`,...e)}}function Oa(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,Wh(n,r,e)}function Wh(n,t,e){let r=`FIRESTORE (${lr}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw ke(r),new Error(r)}function ct(n,t,e,r){let i="Unexpected state";typeof e=="string"?i=e:r=e,n||Wh(t,i,r)}function Z(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends Ve{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kh{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class D_{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(Ot.UNAUTHENTICATED))}shutdown(){}}class O_{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class L_{constructor(t){this.t=t,this.currentUser=Ot.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){ct(this.o===void 0,42304);let r=this.i;const i=u=>this.i!==r?(r=this.i,e(u)):Promise.resolve();let o=new yn;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new yn,t.enqueueRetryable(()=>i(this.currentUser))};const a=()=>{const u=o;t.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},c=u=>{L("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(L("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new yn)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(L("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ct(typeof r.accessToken=="string",31837,{l:r}),new Kh(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return ct(t===null||typeof t=="string",2055,{h:t}),new Ot(t)}}class x_{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=Ot.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class M_{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new x_(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(Ot.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Kc{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class F_{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Se(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){ct(this.o===void 0,3512);const r=o=>{o.error!=null&&L("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,L("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};const i=o=>{L("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?i(o):L("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Kc(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(ct(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Kc(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U_(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qh(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jh{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=U_(40);for(let o=0;o<i.length;++o)r.length<20&&i[o]<e&&(r+=t.charAt(i[o]%62))}return r}}function K(n,t){return n<t?-1:n>t?1:0}function na(n,t){let e=0;for(;e<n.length&&e<t.length;){const r=n.codePointAt(e),i=t.codePointAt(e);if(r!==i){if(r<128&&i<128)return K(r,i);{const o=Qh(),a=j_(o.encode(Qc(n,e)),o.encode(Qc(t,e)));return a!==0?a:K(r,i)}}e+=r>65535?2:1}return K(n.length,t.length)}function Qc(n,t){return n.codePointAt(t)>65535?n.substring(t,t+2):n.substring(t,t+1)}function j_(n,t){for(let e=0;e<n.length&&e<t.length;++e)if(n[e]!==t[e])return K(n[e],t[e]);return K(n.length,t.length)}function nr(n,t,e){return n.length===t.length&&n.every((r,i)=>e(r,t[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jc="__name__";class he{constructor(t,e,r){e===void 0?e=0:e>t.length&&G(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&G(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return he.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof he?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let i=0;i<r;i++){const o=he.compareSegments(t.get(i),e.get(i));if(o!==0)return o}return K(t.length,e.length)}static compareSegments(t,e){const r=he.isNumericId(t),i=he.isNumericId(e);return r&&!i?-1:!r&&i?1:r&&i?he.extractNumericId(t).compare(he.extractNumericId(e)):na(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Ke.fromString(t.substring(4,t.length-2))}}class at extends he{construct(t,e,r){return new at(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new M(V.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(i=>i.length>0))}return new at(e)}static emptyPath(){return new at([])}}const B_=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class xt extends he{construct(t,e,r){return new xt(t,e,r)}static isValidIdentifier(t){return B_.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),xt.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Jc}static keyField(){return new xt([Jc])}static fromServerFormat(t){const e=[];let r="",i=0;const o=()=>{if(r.length===0)throw new M(V.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;i<t.length;){const c=t[i];if(c==="\\"){if(i+1===t.length)throw new M(V.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const u=t[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new M(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=u,i+=2}else c==="`"?(a=!a,i++):c!=="."||a?(r+=c,i++):(o(),i++)}if(o(),a)throw new M(V.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new xt(e)}static emptyPath(){return new xt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{constructor(t){this.path=t}static fromPath(t){return new B(at.fromString(t))}static fromName(t){return new B(at.fromString(t).popFirst(5))}static empty(){return new B(at.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&at.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return at.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new B(new at(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z_(n,t,e){if(!e)throw new M(V.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function $_(n,t,e,r){if(t===!0&&r===!0)throw new M(V.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Yc(n){if(B.isDocumentKey(n))throw new M(V.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Yh(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Us(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":G(12329,{type:typeof n})}function ra(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new M(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Us(n);throw new M(V.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}function q_(n,t){if(t<=0)throw new M(V.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${t}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(n,t){const e={typeString:n};return t&&(e.value=t),e}function ui(n,t){if(!Yh(n))throw new M(V.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const i=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const a=n[r];if(i&&typeof a!==i){e=`JSON field '${r}' must be a ${i}.`;break}if(o!==void 0&&a!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new M(V.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xc=-62135596800,Zc=1e6;class lt{static now(){return lt.fromMillis(Date.now())}static fromDate(t){return lt.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*Zc);return new lt(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new M(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new M(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Xc)throw new M(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new M(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Zc}_compareTo(t){return this.seconds===t.seconds?K(this.nanoseconds,t.nanoseconds):K(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:lt._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(ui(t,lt._jsonSchema))return new lt(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Xc;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}lt._jsonSchemaVersion="firestore/timestamp/1.0",lt._jsonSchema={type:yt("string",lt._jsonSchemaVersion),seconds:yt("number"),nanoseconds:yt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{static fromTimestamp(t){return new q(t)}static min(){return new q(new lt(0,0))}static max(){return new q(new lt(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr=-1;function G_(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=q.fromTimestamp(r===1e9?new lt(e+1,0):new lt(e,r));return new Ye(i,B.empty(),t)}function H_(n){return new Ye(n.readTime,n.key,Qr)}class Ye{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new Ye(q.min(),B.empty(),Qr)}static max(){return new Ye(q.max(),B.empty(),Qr)}}function W_(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=B.comparator(n.documentKey,t.documentKey),e!==0?e:K(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K_="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Q_{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function js(n){if(n.code!==V.FAILED_PRECONDITION||n.message!==K_)throw n;L("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&G(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new C((r,i)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,i)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,i)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof C?e:C.resolve(e)}catch(e){return C.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):C.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):C.reject(e)}static resolve(t){return new C((e,r)=>{e(t)})}static reject(t){return new C((e,r)=>{r(t)})}static waitFor(t){return new C((e,r)=>{let i=0,o=0,a=!1;t.forEach(c=>{++i,c.next(()=>{++o,a&&o===i&&e()},u=>r(u))}),a=!0,o===i&&e()})}static or(t){let e=C.resolve(!1);for(const r of t)e=e.next(i=>i?C.resolve(i):r());return e}static forEach(t,e){const r=[];return t.forEach((i,o)=>{r.push(e.call(this,i,o))}),this.waitFor(r)}static mapArray(t,e){return new C((r,i)=>{const o=t.length,a=new Array(o);let c=0;for(let u=0;u<o;u++){const d=u;e(t[d]).next(f=>{a[d]=f,++c,c===o&&r(a)},f=>i(f))}})}static doWhile(t,e){return new C((r,i)=>{const o=()=>{t()===!0?e().next(()=>{o()},i):r()};o()})}}function J_(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function cr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this._e(r),this.ae=r=>e.writeSequenceNumber(r))}_e(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ae&&this.ae(t),t}}Bs.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y_=-1;function zs(n){return n==null}function fs(n){return n===0&&1/n==-1/0}function X_(n){return typeof n=="number"&&Number.isInteger(n)&&!fs(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xh="";function Z_(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=tu(t)),t=ty(n.get(e),t);return tu(t)}function ty(n,t){let e=t;const r=n.length;for(let i=0;i<r;i++){const o=n.charAt(i);switch(o){case"\0":e+="";break;case Xh:e+="";break;default:e+=o}}return e}function tu(n){return n+Xh+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eu(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function ur(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Zh(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(t,e){this.comparator=t,this.root=e||St.EMPTY}insert(t,e){return new dt(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,St.BLACK,null,null))}remove(t){return new dt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,St.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(t,r.key);if(i===0)return e+r.left.size;i<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){const t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new xi(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new xi(this.root,t,this.comparator,!1)}getReverseIterator(){return new xi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new xi(this.root,t,this.comparator,!0)}}class xi{constructor(t,e,r,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&i&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class St{constructor(t,e,r,i,o){this.key=t,this.value=e,this.color=r??St.RED,this.left=i??St.EMPTY,this.right=o??St.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,i,o){return new St(t??this.key,e??this.value,r??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let i=this;const o=r(t,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(t,e,r),null):o===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return St.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return St.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,St.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,St.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw G(43730,{key:this.key,value:this.value});if(this.right.isRed())throw G(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw G(27949);return t+(this.isRed()?0:1)}}St.EMPTY=null,St.RED=!0,St.BLACK=!1;St.EMPTY=new class{constructor(){this.size=0}get key(){throw G(57766)}get value(){throw G(16141)}get color(){throw G(16727)}get left(){throw G(29726)}get right(){throw G(36894)}copy(t,e,r,i,o){return this}insert(t,e,r){return new St(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(t){this.comparator=t,this.data=new dt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new nu(this.data.getIterator())}getIteratorFrom(t){return new nu(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof Et)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=r.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new Et(this.comparator);return e.data=t,e}}class nu{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(t){this.fields=t,t.sort(xt.comparator)}static empty(){return new $e([])}unionWith(t){let e=new Et(xt.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new $e(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return nr(this.fields,t.fields,(e,r)=>e.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class td extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new td("Invalid base64 string: "+o):o}}(t);return new Rt(e)}static fromUint8Array(t){const e=function(i){let o="";for(let a=0;a<i.length;++a)o+=String.fromCharCode(i[a]);return o}(t);return new Rt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const r=new Uint8Array(e.length);for(let i=0;i<e.length;i++)r[i]=e.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return K(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Rt.EMPTY_BYTE_STRING=new Rt("");const ey=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Xe(n){if(ct(!!n,39018),typeof n=="string"){let t=0;const e=ey.exec(n);if(ct(!!e,46558,{timestamp:n}),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:ht(n.seconds),nanos:ht(n.nanos)}}function ht(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ze(n){return typeof n=="string"?Rt.fromBase64String(n):Rt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ed="server_timestamp",nd="__type__",rd="__previous_value__",id="__local_write_time__";function La(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{})[nd])===null||e===void 0?void 0:e.stringValue)===ed}function $s(n){const t=n.mapValue.fields[rd];return La(t)?$s(t):t}function Jr(n){const t=Xe(n.mapValue.fields[id].timestampValue);return new lt(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ny{constructor(t,e,r,i,o,a,c,u,d,f){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=i,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=d,this.isUsingEmulator=f}}const ps="(default)";class Yr{constructor(t,e){this.projectId=t,this.database=e||ps}static empty(){return new Yr("","")}get isDefaultDatabase(){return this.database===ps}isEqual(t){return t instanceof Yr&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sd="__type__",od="__max__",Mi={mapValue:{fields:{__type__:{stringValue:od}}}},ad="__vector__",gs="value";function tn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?La(n)?4:iy(n)?9007199254740991:ry(n)?10:11:G(28295,{value:n})}function Ee(n,t){if(n===t)return!0;const e=tn(n);if(e!==tn(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Jr(n).isEqual(Jr(t));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const a=Xe(i.timestampValue),c=Xe(o.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(i,o){return Ze(i.bytesValue).isEqual(Ze(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(i,o){return ht(i.geoPointValue.latitude)===ht(o.geoPointValue.latitude)&&ht(i.geoPointValue.longitude)===ht(o.geoPointValue.longitude)}(n,t);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return ht(i.integerValue)===ht(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const a=ht(i.doubleValue),c=ht(o.doubleValue);return a===c?fs(a)===fs(c):isNaN(a)&&isNaN(c)}return!1}(n,t);case 9:return nr(n.arrayValue.values||[],t.arrayValue.values||[],Ee);case 10:case 11:return function(i,o){const a=i.mapValue.fields||{},c=o.mapValue.fields||{};if(eu(a)!==eu(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!Ee(a[u],c[u])))return!1;return!0}(n,t);default:return G(52216,{left:n})}}function Xr(n,t){return(n.values||[]).find(e=>Ee(e,t))!==void 0}function rr(n,t){if(n===t)return 0;const e=tn(n),r=tn(t);if(e!==r)return K(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return K(n.booleanValue,t.booleanValue);case 2:return function(o,a){const c=ht(o.integerValue||o.doubleValue),u=ht(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,t);case 3:return ru(n.timestampValue,t.timestampValue);case 4:return ru(Jr(n),Jr(t));case 5:return na(n.stringValue,t.stringValue);case 6:return function(o,a){const c=Ze(o),u=Ze(a);return c.compareTo(u)}(n.bytesValue,t.bytesValue);case 7:return function(o,a){const c=o.split("/"),u=a.split("/");for(let d=0;d<c.length&&d<u.length;d++){const f=K(c[d],u[d]);if(f!==0)return f}return K(c.length,u.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,a){const c=K(ht(o.latitude),ht(a.latitude));return c!==0?c:K(ht(o.longitude),ht(a.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return iu(n.arrayValue,t.arrayValue);case 10:return function(o,a){var c,u,d,f;const _=o.fields||{},T=a.fields||{},R=(c=_[gs])===null||c===void 0?void 0:c.arrayValue,P=(u=T[gs])===null||u===void 0?void 0:u.arrayValue,k=K(((d=R==null?void 0:R.values)===null||d===void 0?void 0:d.length)||0,((f=P==null?void 0:P.values)===null||f===void 0?void 0:f.length)||0);return k!==0?k:iu(R,P)}(n.mapValue,t.mapValue);case 11:return function(o,a){if(o===Mi.mapValue&&a===Mi.mapValue)return 0;if(o===Mi.mapValue)return 1;if(a===Mi.mapValue)return-1;const c=o.fields||{},u=Object.keys(c),d=a.fields||{},f=Object.keys(d);u.sort(),f.sort();for(let _=0;_<u.length&&_<f.length;++_){const T=na(u[_],f[_]);if(T!==0)return T;const R=rr(c[u[_]],d[f[_]]);if(R!==0)return R}return K(u.length,f.length)}(n.mapValue,t.mapValue);default:throw G(23264,{le:e})}}function ru(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return K(n,t);const e=Xe(n),r=Xe(t),i=K(e.seconds,r.seconds);return i!==0?i:K(e.nanos,r.nanos)}function iu(n,t){const e=n.values||[],r=t.values||[];for(let i=0;i<e.length&&i<r.length;++i){const o=rr(e[i],r[i]);if(o)return o}return K(e.length,r.length)}function ir(n){return ia(n)}function ia(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const r=Xe(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return Ze(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return B.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",i=!0;for(const o of e.values||[])i?i=!1:r+=",",r+=ia(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){const r=Object.keys(e.fields||{}).sort();let i="{",o=!0;for(const a of r)o?o=!1:i+=",",i+=`${a}:${ia(e.fields[a])}`;return i+"}"}(n.mapValue):G(61005,{value:n})}function Ji(n){switch(tn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=$s(n);return t?16+Ji(t):16;case 5:return 2*n.stringValue.length;case 6:return Ze(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,o)=>i+Ji(o),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return ur(r.fields,(o,a)=>{i+=o.length+Ji(a)}),i}(n.mapValue);default:throw G(13486,{value:n})}}function su(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function sa(n){return!!n&&"integerValue"in n}function xa(n){return!!n&&"arrayValue"in n}function ou(n){return!!n&&"nullValue"in n}function au(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Oo(n){return!!n&&"mapValue"in n}function ry(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{})[sd])===null||e===void 0?void 0:e.stringValue)===ad}function $r(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const t={mapValue:{fields:{}}};return ur(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=$r(r)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=$r(n.arrayValue.values[e]);return t}return Object.assign({},n)}function iy(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===od}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(t){this.value=t}static empty(){return new ge({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!Oo(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=$r(e)}setAll(t){let e=xt.emptyPath(),r={},i=[];t.forEach((a,c)=>{if(!e.isImmediateParentOf(c)){const u=this.getFieldsMap(e);this.applyChanges(u,r,i),r={},i=[],e=c.popLast()}a?r[c.lastSegment()]=$r(a):i.push(c.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,r,i)}delete(t){const e=this.field(t.popLast());Oo(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Ee(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let i=e.mapValue.fields[t.get(r)];Oo(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,r){ur(e,(i,o)=>t[i]=o);for(const i of r)delete t[i]}clone(){return new ge($r(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(t,e,r,i,o,a,c){this.key=t,this.documentType=e,this.version=r,this.readTime=i,this.createTime=o,this.data=a,this.documentState=c}static newInvalidDocument(t){return new Lt(t,0,q.min(),q.min(),q.min(),ge.empty(),0)}static newFoundDocument(t,e,r,i){return new Lt(t,1,e,q.min(),r,i,0)}static newNoDocument(t,e){return new Lt(t,2,e,q.min(),q.min(),ge.empty(),0)}static newUnknownDocument(t,e){return new Lt(t,3,e,q.min(),q.min(),ge.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=ge.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=ge.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=q.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Lt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Lt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(t,e){this.position=t,this.inclusive=e}}function lu(n,t,e){let r=0;for(let i=0;i<n.position.length;i++){const o=t[i],a=n.position[i];if(o.field.isKeyField()?r=B.comparator(B.fromName(a.referenceValue),e.key):r=rr(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function cu(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Ee(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(t,e="asc"){this.field=t,this.dir=e}}function sy(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ld{}class _t extends ld{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new ay(t,e,r):e==="array-contains"?new uy(t,r):e==="in"?new hy(t,r):e==="not-in"?new dy(t,r):e==="array-contains-any"?new fy(t,r):new _t(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new ly(t,r):new cy(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(rr(e,this.value)):e!==null&&tn(this.value)===tn(e)&&this.matchesComparison(rr(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return G(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ue extends ld{constructor(t,e){super(),this.filters=t,this.op=e,this.he=null}static create(t,e){return new ue(t,e)}matches(t){return cd(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function cd(n){return n.op==="and"}function ud(n){return oy(n)&&cd(n)}function oy(n){for(const t of n.filters)if(t instanceof ue)return!1;return!0}function oa(n){if(n instanceof _t)return n.field.canonicalString()+n.op.toString()+ir(n.value);if(ud(n))return n.filters.map(t=>oa(t)).join(",");{const t=n.filters.map(e=>oa(e)).join(",");return`${n.op}(${t})`}}function hd(n,t){return n instanceof _t?function(r,i){return i instanceof _t&&r.op===i.op&&r.field.isEqual(i.field)&&Ee(r.value,i.value)}(n,t):n instanceof ue?function(r,i){return i instanceof ue&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((o,a,c)=>o&&hd(a,i.filters[c]),!0):!1}(n,t):void G(19439)}function dd(n){return n instanceof _t?function(e){return`${e.field.canonicalString()} ${e.op} ${ir(e.value)}`}(n):n instanceof ue?function(e){return e.op.toString()+" {"+e.getFilters().map(dd).join(" ,")+"}"}(n):"Filter"}class ay extends _t{constructor(t,e,r){super(t,e,r),this.key=B.fromName(r.referenceValue)}matches(t){const e=B.comparator(t.key,this.key);return this.matchesComparison(e)}}class ly extends _t{constructor(t,e){super(t,"in",e),this.keys=fd("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class cy extends _t{constructor(t,e){super(t,"not-in",e),this.keys=fd("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function fd(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(r=>B.fromName(r.referenceValue))}class uy extends _t{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return xa(e)&&Xr(e.arrayValue,this.value)}}class hy extends _t{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Xr(this.value.arrayValue,e)}}class dy extends _t{constructor(t,e){super(t,"not-in",e)}matches(t){if(Xr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Xr(this.value.arrayValue,e)}}class fy extends _t{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!xa(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>Xr(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class py{constructor(t,e=null,r=[],i=[],o=null,a=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=i,this.limit=o,this.startAt=a,this.endAt=c,this.Pe=null}}function uu(n,t=null,e=[],r=[],i=null,o=null,a=null){return new py(n,t,e,r,i,o,a)}function Ma(n){const t=Z(n);if(t.Pe===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>oa(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),zs(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>ir(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>ir(r)).join(",")),t.Pe=e}return t.Pe}function Fa(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!sy(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!hd(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!cu(n.startAt,t.startAt)&&cu(n.endAt,t.endAt)}function aa(n){return B.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(t,e=null,r=[],i=[],o=null,a="F",c=null,u=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=i,this.limit=o,this.limitType=a,this.startAt=c,this.endAt=u,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function gy(n,t,e,r,i,o,a,c){return new hi(n,t,e,r,i,o,a,c)}function pd(n){return new hi(n)}function hu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function gd(n){return n.collectionGroup!==null}function qr(n){const t=Z(n);if(t.Te===null){t.Te=[];const e=new Set;for(const o of t.explicitOrderBy)t.Te.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Et(xt.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.Te.push(new _s(o,r))}),e.has(xt.keyField().canonicalString())||t.Te.push(new _s(xt.keyField(),r))}return t.Te}function _e(n){const t=Z(n);return t.Ie||(t.Ie=my(t,qr(n))),t.Ie}function my(n,t){if(n.limitType==="F")return uu(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(i=>{const o=i.dir==="desc"?"asc":"desc";return new _s(i.field,o)});const e=n.endAt?new ms(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new ms(n.startAt.position,n.startAt.inclusive):null;return uu(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function la(n,t){const e=n.filters.concat([t]);return new hi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}function ys(n,t,e){return new hi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function qs(n,t){return Fa(_e(n),_e(t))&&n.limitType===t.limitType}function md(n){return`${Ma(_e(n))}|lt:${n.limitType}`}function Ln(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(i=>dd(i)).join(", ")}]`),zs(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(i=>ir(i)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(i=>ir(i)).join(",")),`Target(${r})`}(_e(n))}; limitType=${n.limitType})`}function Gs(n,t){return t.isFoundDocument()&&function(r,i){const o=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):B.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,i){for(const o of qr(r))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,i){for(const o of r.filters)if(!o.matches(i))return!1;return!0}(n,t)&&function(r,i){return!(r.startAt&&!function(a,c,u){const d=lu(a,c,u);return a.inclusive?d<=0:d<0}(r.startAt,qr(r),i)||r.endAt&&!function(a,c,u){const d=lu(a,c,u);return a.inclusive?d>=0:d>0}(r.endAt,qr(r),i))}(n,t)}function _y(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function _d(n){return(t,e)=>{let r=!1;for(const i of qr(n)){const o=yy(i,t,e);if(o!==0)return o;r=r||i.field.isKeyField()}return 0}}function yy(n,t,e){const r=n.field.isKeyField()?B.comparator(t.key,e.key):function(o,a,c){const u=a.data.field(o),d=c.data.field(o);return u!==null&&d!==null?rr(u,d):G(42886)}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return G(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[i,o]of r)if(this.equalsFn(i,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),i=this.inner[r];if(i===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],t))return void(i[o]=[t,e]);i.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],t))return r.length===1?delete this.inner[e]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(t){ur(this.inner,(e,r)=>{for(const[i,o]of r)t(i,o)})}isEmpty(){return Zh(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vy=new dt(B.comparator);function en(){return vy}const yd=new dt(B.comparator);function xr(...n){let t=yd;for(const e of n)t=t.insert(e.key,e);return t}function Ey(n){let t=yd;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function hn(){return Gr()}function vd(){return Gr()}function Gr(){return new Rn(n=>n.toString(),(n,t)=>n.isEqual(t))}const Ty=new Et(B.comparator);function tt(...n){let t=Ty;for(const e of n)t=t.add(e);return t}const wy=new Et(K);function Iy(){return wy}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ua(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:fs(t)?"-0":t}}function Ed(n){return{integerValue:""+n}}function Ay(n,t){return X_(t)?Ed(t):Ua(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(){this._=void 0}}function by(n,t,e){return n instanceof ca?function(i,o){const a={fields:{[nd]:{stringValue:ed},[id]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&La(o)&&(o=$s(o)),o&&(a.fields[rd]=o),{mapValue:a}}(e,t):n instanceof vs?Td(n,t):n instanceof Es?wd(n,t):function(i,o){const a=Ry(i,o),c=du(a)+du(i.Ee);return sa(a)&&sa(i.Ee)?Ed(c):Ua(i.serializer,c)}(n,t)}function Sy(n,t,e){return n instanceof vs?Td(n,t):n instanceof Es?wd(n,t):e}function Ry(n,t){return n instanceof ua?function(r){return sa(r)||function(o){return!!o&&"doubleValue"in o}(r)}(t)?t:{integerValue:0}:null}class ca extends Hs{}class vs extends Hs{constructor(t){super(),this.elements=t}}function Td(n,t){const e=Id(t);for(const r of n.elements)e.some(i=>Ee(i,r))||e.push(r);return{arrayValue:{values:e}}}class Es extends Hs{constructor(t){super(),this.elements=t}}function wd(n,t){let e=Id(t);for(const r of n.elements)e=e.filter(i=>!Ee(i,r));return{arrayValue:{values:e}}}class ua extends Hs{constructor(t,e){super(),this.serializer=t,this.Ee=e}}function du(n){return ht(n.integerValue||n.doubleValue)}function Id(n){return xa(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Cy(n,t){return n.field.isEqual(t.field)&&function(r,i){return r instanceof vs&&i instanceof vs||r instanceof Es&&i instanceof Es?nr(r.elements,i.elements,Ee):r instanceof ua&&i instanceof ua?Ee(r.Ee,i.Ee):r instanceof ca&&i instanceof ca}(n.transform,t.transform)}class vn{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new vn}static exists(t){return new vn(void 0,t)}static updateTime(t){return new vn(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Yi(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class ja{}function Ad(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new ky(n.key,vn.none()):new Ba(n.key,n.data,vn.none());{const e=n.data,r=ge.empty();let i=new Et(xt.comparator);for(let o of t.fields)if(!i.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),i=i.add(o)}return new Ws(n.key,r,new $e(i.toArray()),vn.none())}}function Py(n,t,e){n instanceof Ba?function(i,o,a){const c=i.value.clone(),u=pu(i.fieldTransforms,o,a.transformResults);c.setAll(u),o.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,t,e):n instanceof Ws?function(i,o,a){if(!Yi(i.precondition,o))return void o.convertToUnknownDocument(a.version);const c=pu(i.fieldTransforms,o,a.transformResults),u=o.data;u.setAll(bd(i)),u.setAll(c),o.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,t,e):function(i,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function Hr(n,t,e,r){return n instanceof Ba?function(o,a,c,u){if(!Yi(o.precondition,a))return c;const d=o.value.clone(),f=gu(o.fieldTransforms,u,a);return d.setAll(f),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,t,e,r):n instanceof Ws?function(o,a,c,u){if(!Yi(o.precondition,a))return c;const d=gu(o.fieldTransforms,u,a),f=a.data;return f.setAll(bd(o)),f.setAll(d),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(_=>_.field))}(n,t,e,r):function(o,a,c){return Yi(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,t,e)}function fu(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&nr(r,i,(o,a)=>Cy(o,a))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class Ba extends ja{constructor(t,e,r,i=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Ws extends ja{constructor(t,e,r,i,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function bd(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}}),t}function pu(n,t,e){const r=new Map;ct(n.length===e.length,32656,{Ae:e.length,Re:n.length});for(let i=0;i<e.length;i++){const o=n[i],a=o.transform,c=t.data.field(o.field);r.set(o.field,Sy(a,c,e[i]))}return r}function gu(n,t,e){const r=new Map;for(const i of n){const o=i.transform,a=e.data.field(i.field);r.set(i.field,by(o,a,t))}return r}class ky extends ja{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vy{constructor(t,e,r,i){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(t.key)&&Py(o,t,r[i])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=Hr(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=Hr(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=vd();return this.mutations.forEach(i=>{const o=t.get(i.key),a=o.overlayedDocument;let c=this.applyToLocalView(a,o.mutatedFields);c=e.has(i.key)?null:c;const u=Ad(a,c);u!==null&&r.set(i.key,u),a.isValidDocument()||a.convertToNoDocument(q.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),tt())}isEqual(t){return this.batchId===t.batchId&&nr(this.mutations,t.mutations,(e,r)=>fu(e,r))&&nr(this.baseMutations,t.baseMutations,(e,r)=>fu(e,r))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ny{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dy{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pt,Y;function Sd(n){if(n===void 0)return ke("GRPC error has no .code"),V.UNKNOWN;switch(n){case pt.OK:return V.OK;case pt.CANCELLED:return V.CANCELLED;case pt.UNKNOWN:return V.UNKNOWN;case pt.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case pt.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case pt.INTERNAL:return V.INTERNAL;case pt.UNAVAILABLE:return V.UNAVAILABLE;case pt.UNAUTHENTICATED:return V.UNAUTHENTICATED;case pt.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case pt.NOT_FOUND:return V.NOT_FOUND;case pt.ALREADY_EXISTS:return V.ALREADY_EXISTS;case pt.PERMISSION_DENIED:return V.PERMISSION_DENIED;case pt.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case pt.ABORTED:return V.ABORTED;case pt.OUT_OF_RANGE:return V.OUT_OF_RANGE;case pt.UNIMPLEMENTED:return V.UNIMPLEMENTED;case pt.DATA_LOSS:return V.DATA_LOSS;default:return G(39323,{code:n})}}(Y=pt||(pt={}))[Y.OK=0]="OK",Y[Y.CANCELLED=1]="CANCELLED",Y[Y.UNKNOWN=2]="UNKNOWN",Y[Y.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Y[Y.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Y[Y.NOT_FOUND=5]="NOT_FOUND",Y[Y.ALREADY_EXISTS=6]="ALREADY_EXISTS",Y[Y.PERMISSION_DENIED=7]="PERMISSION_DENIED",Y[Y.UNAUTHENTICATED=16]="UNAUTHENTICATED",Y[Y.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Y[Y.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Y[Y.ABORTED=10]="ABORTED",Y[Y.OUT_OF_RANGE=11]="OUT_OF_RANGE",Y[Y.UNIMPLEMENTED=12]="UNIMPLEMENTED",Y[Y.INTERNAL=13]="INTERNAL",Y[Y.UNAVAILABLE=14]="UNAVAILABLE",Y[Y.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oy=new Ke([4294967295,4294967295],0);function mu(n){const t=Qh().encode(n),e=new Bh;return e.update(t),new Uint8Array(e.digest())}function _u(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),i=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new Ke([e,r],0),new Ke([i,o],0)]}class za{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new Mr(`Invalid padding: ${e}`);if(r<0)throw new Mr(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new Mr(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new Mr(`Invalid padding when bitmap length is 0: ${e}`);this.fe=8*t.length-e,this.ge=Ke.fromNumber(this.fe)}pe(t,e,r){let i=t.add(e.multiply(Ke.fromNumber(r)));return i.compare(Oy)===1&&(i=new Ke([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.fe===0)return!1;const e=mu(t),[r,i]=_u(e);for(let o=0;o<this.hashCount;o++){const a=this.pe(r,i,o);if(!this.ye(a))return!1}return!0}static create(t,e,r){const i=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new za(o,i,e);return r.forEach(c=>a.insert(c)),a}insert(t){if(this.fe===0)return;const e=mu(t),[r,i]=_u(e);for(let o=0;o<this.hashCount;o++){const a=this.pe(r,i,o);this.we(a)}}we(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class Mr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(t,e,r,i,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const i=new Map;return i.set(t,di.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new Ks(q.min(),i,new dt(K),en(),tt())}}class di{constructor(t,e,r,i,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new di(r,e,tt(),tt(),tt())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(t,e,r,i){this.Se=t,this.removedTargetIds=e,this.key=r,this.be=i}}class Rd{constructor(t,e){this.targetId=t,this.De=e}}class Cd{constructor(t,e,r=Rt.EMPTY_BYTE_STRING,i=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=i}}class yu{constructor(){this.ve=0,this.Ce=vu(),this.Fe=Rt.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(t){t.approximateByteSize()>0&&(this.xe=!0,this.Fe=t)}Le(){let t=tt(),e=tt(),r=tt();return this.Ce.forEach((i,o)=>{switch(o){case 0:t=t.add(i);break;case 2:e=e.add(i);break;case 1:r=r.add(i);break;default:G(38017,{changeType:o})}}),new di(this.Fe,this.Me,t,e,r)}ke(){this.xe=!1,this.Ce=vu()}qe(t,e){this.xe=!0,this.Ce=this.Ce.insert(t,e)}Qe(t){this.xe=!0,this.Ce=this.Ce.remove(t)}$e(){this.ve+=1}Ue(){this.ve-=1,ct(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class Ly{constructor(t){this.We=t,this.Ge=new Map,this.ze=en(),this.je=Fi(),this.Je=Fi(),this.He=new dt(K)}Ye(t){for(const e of t.Se)t.be&&t.be.isFoundDocument()?this.Ze(e,t.be):this.Xe(e,t.key,t.be);for(const e of t.removedTargetIds)this.Xe(e,t.key,t.be)}et(t){this.forEachTarget(t,e=>{const r=this.tt(e);switch(t.state){case 0:this.nt(e)&&r.Be(t.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(t.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(e);break;case 3:this.nt(e)&&(r.Ke(),r.Be(t.resumeToken));break;case 4:this.nt(e)&&(this.rt(e),r.Be(t.resumeToken));break;default:G(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Ge.forEach((r,i)=>{this.nt(i)&&e(i)})}it(t){const e=t.targetId,r=t.De.count,i=this.st(e);if(i){const o=i.target;if(aa(o))if(r===0){const a=new B(o.path);this.Xe(e,a,Lt.newNoDocument(a,q.min()))}else ct(r===1,20013,{expectedCount:r});else{const a=this.ot(e);if(a!==r){const c=this._t(t),u=c?this.ut(c,t,a):1;if(u!==0){this.rt(e);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(e,d)}}}}}_t(t){const e=t.De.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:o=0}=e;let a,c;try{a=Ze(r).toUint8Array()}catch(u){if(u instanceof td)return Je("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new za(a,i,o)}catch(u){return Je(u instanceof Mr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.fe===0?null:c}ut(t,e,r){return e.De.count===r-this.ht(t,e.targetId)?0:2}ht(t,e){const r=this.We.getRemoteKeysForTarget(e);let i=0;return r.forEach(o=>{const a=this.We.lt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(c)||(this.Xe(e,o,null),i++)}),i}Pt(t){const e=new Map;this.Ge.forEach((o,a)=>{const c=this.st(a);if(c){if(o.current&&aa(c.target)){const u=new B(c.target.path);this.Tt(u).has(a)||this.It(a,u)||this.Xe(a,u,Lt.newNoDocument(u,t))}o.Ne&&(e.set(a,o.Le()),o.ke())}});let r=tt();this.Je.forEach((o,a)=>{let c=!0;a.forEachWhile(u=>{const d=this.st(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(o))}),this.ze.forEach((o,a)=>a.setReadTime(t));const i=new Ks(t,e,this.He,this.ze,r);return this.ze=en(),this.je=Fi(),this.Je=Fi(),this.He=new dt(K),i}Ze(t,e){if(!this.nt(t))return;const r=this.It(t,e.key)?2:0;this.tt(t).qe(e.key,r),this.ze=this.ze.insert(e.key,e),this.je=this.je.insert(e.key,this.Tt(e.key).add(t)),this.Je=this.Je.insert(e.key,this.dt(e.key).add(t))}Xe(t,e,r){if(!this.nt(t))return;const i=this.tt(t);this.It(t,e)?i.qe(e,1):i.Qe(e),this.Je=this.Je.insert(e,this.dt(e).delete(t)),this.Je=this.Je.insert(e,this.dt(e).add(t)),r&&(this.ze=this.ze.insert(e,r))}removeTarget(t){this.Ge.delete(t)}ot(t){const e=this.tt(t).Le();return this.We.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}$e(t){this.tt(t).$e()}tt(t){let e=this.Ge.get(t);return e||(e=new yu,this.Ge.set(t,e)),e}dt(t){let e=this.Je.get(t);return e||(e=new Et(K),this.Je=this.Je.insert(t,e)),e}Tt(t){let e=this.je.get(t);return e||(e=new Et(K),this.je=this.je.insert(t,e)),e}nt(t){const e=this.st(t)!==null;return e||L("WatchChangeAggregator","Detected inactive target",t),e}st(t){const e=this.Ge.get(t);return e&&e.Oe?null:this.We.Et(t)}rt(t){this.Ge.set(t,new yu),this.We.getRemoteKeysForTarget(t).forEach(e=>{this.Xe(t,e,null)})}It(t,e){return this.We.getRemoteKeysForTarget(t).has(e)}}function Fi(){return new dt(B.comparator)}function vu(){return new dt(B.comparator)}const xy=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),My=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),Fy=(()=>({and:"AND",or:"OR"}))();class Uy{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function ha(n,t){return n.useProto3Json||zs(t)?t:{value:t}}function da(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Pd(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Bn(n){return ct(!!n,49232),q.fromTimestamp(function(e){const r=Xe(e);return new lt(r.seconds,r.nanos)}(n))}function kd(n,t){return fa(n,t).canonicalString()}function fa(n,t){const e=function(i){return new at(["projects",i.projectId,"databases",i.database])}(n).child("documents");return t===void 0?e:e.child(t)}function Vd(n){const t=at.fromString(n);return ct(xd(t),10190,{key:t.toString()}),t}function Lo(n,t){const e=Vd(t);if(e.get(1)!==n.databaseId.projectId)throw new M(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new M(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new B(Dd(e))}function Nd(n,t){return kd(n.databaseId,t)}function jy(n){const t=Vd(n);return t.length===4?at.emptyPath():Dd(t)}function Eu(n){return new at(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Dd(n){return ct(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function By(n,t){let e;if("targetChange"in t){t.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:G(39313,{state:d})}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],o=function(d,f){return d.useProto3Json?(ct(f===void 0||typeof f=="string",58123),Rt.fromBase64String(f||"")):(ct(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Rt.fromUint8Array(f||new Uint8Array))}(n,t.targetChange.resumeToken),a=t.targetChange.cause,c=a&&function(d){const f=d.code===void 0?V.UNKNOWN:Sd(d.code);return new M(f,d.message||"")}(a);e=new Cd(r,i,o,c||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const i=Lo(n,r.document.name),o=Bn(r.document.updateTime),a=r.document.createTime?Bn(r.document.createTime):q.min(),c=new ge({mapValue:{fields:r.document.fields}}),u=Lt.newFoundDocument(i,o,a,c),d=r.targetIds||[],f=r.removedTargetIds||[];e=new Xi(d,f,u.key,u)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const i=Lo(n,r.document),o=r.readTime?Bn(r.readTime):q.min(),a=Lt.newNoDocument(i,o),c=r.removedTargetIds||[];e=new Xi([],c,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const i=Lo(n,r.document),o=r.removedTargetIds||[];e=new Xi([],o,i,null)}else{if(!("filter"in t))return G(11601,{At:t});{t.filter;const r=t.filter;r.targetId;const{count:i=0,unchangedNames:o}=r,a=new Dy(i,o),c=r.targetId;e=new Rd(c,a)}}return e}function zy(n,t){return{documents:[Nd(n,t.path)]}}function $y(n,t){const e={structuredQuery:{}},r=t.path;let i;t.collectionGroup!==null?(i=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=Nd(n,i);const o=function(d){if(d.length!==0)return Ld(ue.create(d,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const a=function(d){if(d.length!==0)return d.map(f=>function(T){return{field:xn(T.field),direction:Hy(T.dir)}}(f))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const c=ha(n,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(t.endAt)),{Vt:e,parent:i}}function qy(n){let t=jy(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let i=null;if(r>0){ct(r===1,65062);const f=e.from[0];f.allDescendants?i=f.collectionId:t=t.child(f.collectionId)}let o=[];e.where&&(o=function(_){const T=Od(_);return T instanceof ue&&ud(T)?T.getFilters():[T]}(e.where));let a=[];e.orderBy&&(a=function(_){return _.map(T=>function(P){return new _s(Mn(P.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(P.direction))}(T))}(e.orderBy));let c=null;e.limit&&(c=function(_){let T;return T=typeof _=="object"?_.value:_,zs(T)?null:T}(e.limit));let u=null;e.startAt&&(u=function(_){const T=!!_.before,R=_.values||[];return new ms(R,T)}(e.startAt));let d=null;return e.endAt&&(d=function(_){const T=!_.before,R=_.values||[];return new ms(R,T)}(e.endAt)),gy(t,i,a,o,c,"F",u,d)}function Gy(n,t){const e=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return G(28987,{purpose:i})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Od(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=Mn(e.unaryFilter.field);return _t.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Mn(e.unaryFilter.field);return _t.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Mn(e.unaryFilter.field);return _t.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Mn(e.unaryFilter.field);return _t.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return G(61313);default:return G(60726)}}(n):n.fieldFilter!==void 0?function(e){return _t.create(Mn(e.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return G(58110);default:return G(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return ue.create(e.compositeFilter.filters.map(r=>Od(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return G(1026)}}(e.compositeFilter.op))}(n):G(30097,{filter:n})}function Hy(n){return xy[n]}function Wy(n){return My[n]}function Ky(n){return Fy[n]}function xn(n){return{fieldPath:n.canonicalString()}}function Mn(n){return xt.fromServerFormat(n.fieldPath)}function Ld(n){return n instanceof _t?function(e){if(e.op==="=="){if(au(e.value))return{unaryFilter:{field:xn(e.field),op:"IS_NAN"}};if(ou(e.value))return{unaryFilter:{field:xn(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(au(e.value))return{unaryFilter:{field:xn(e.field),op:"IS_NOT_NAN"}};if(ou(e.value))return{unaryFilter:{field:xn(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:xn(e.field),op:Wy(e.op),value:e.value}}}(n):n instanceof ue?function(e){const r=e.getFilters().map(i=>Ld(i));return r.length===1?r[0]:{compositeFilter:{op:Ky(e.op),filters:r}}}(n):G(54877,{filter:n})}function xd(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(t,e,r,i,o=q.min(),a=q.min(),c=Rt.EMPTY_BYTE_STRING,u=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(t){return new qe(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new qe(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new qe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new qe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qy{constructor(t){this.gt=t}}function Jy(n){const t=qy({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ys(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yy{constructor(){this.Dn=new Xy}addToCollectionParentIndex(t,e){return this.Dn.add(e),C.resolve()}getCollectionParents(t,e){return C.resolve(this.Dn.getEntries(e))}addFieldIndex(t,e){return C.resolve()}deleteFieldIndex(t,e){return C.resolve()}deleteAllFieldIndexes(t){return C.resolve()}createTargetIndexes(t,e){return C.resolve()}getDocumentsMatchingTarget(t,e){return C.resolve(null)}getIndexType(t,e){return C.resolve(0)}getFieldIndexes(t,e){return C.resolve([])}getNextCollectionGroupToUpdate(t){return C.resolve(null)}getMinOffset(t,e){return C.resolve(Ye.min())}getMinOffsetFromCollectionGroup(t,e){return C.resolve(Ye.min())}updateCollectionGroup(t,e,r){return C.resolve()}updateIndexEntries(t,e){return C.resolve()}}class Xy{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),i=this.index[e]||new Et(at.comparator),o=!i.has(r);return this.index[e]=i.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),i=this.index[e];return i&&i.has(r)}getEntries(t){return(this.index[t]||new Et(at.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Md=41943040;class zt{static withCacheSize(t){return new zt(t,zt.DEFAULT_COLLECTION_PERCENTILE,zt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */zt.DEFAULT_COLLECTION_PERCENTILE=10,zt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,zt.DEFAULT=new zt(Md,zt.DEFAULT_COLLECTION_PERCENTILE,zt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),zt.DISABLED=new zt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr{constructor(t){this._r=t}next(){return this._r+=2,this._r}static ar(){return new sr(0)}static ur(){return new sr(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wu="LruGarbageCollector",Zy=1048576;function Iu([n,t],[e,r]){const i=K(n,e);return i===0?K(t,r):i}class tv{constructor(t){this.Tr=t,this.buffer=new Et(Iu),this.Ir=0}dr(){return++this.Ir}Er(t){const e=[t,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();Iu(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class ev{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(t){L(wu,`Garbage collection scheduled in ${t}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){cr(e)?L(wu,"Ignoring IndexedDB error during garbage collection: ",e):await js(e)}await this.Rr(3e5)})}}class nv{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.mr(t).next(r=>Math.floor(e/100*r))}nthSequenceNumber(t,e){if(e===0)return C.resolve(Bs.ue);const r=new tv(e);return this.Vr.forEachTarget(t,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.gr(t,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(t,e,r){return this.Vr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(L("LruGarbageCollector","Garbage collection skipped; disabled"),C.resolve(Tu)):this.getCacheSize(t).next(r=>r<this.params.cacheSizeCollectionThreshold?(L("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Tu):this.pr(t,e))}getCacheSize(t){return this.Vr.getCacheSize(t)}pr(t,e){let r,i,o,a,c,u,d;const f=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(_=>(_>this.params.maximumSequenceNumbersToCollect?(L("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${_}`),i=this.params.maximumSequenceNumbersToCollect):i=_,a=Date.now(),this.nthSequenceNumber(t,i))).next(_=>(r=_,c=Date.now(),this.removeTargets(t,r,e))).next(_=>(o=_,u=Date.now(),this.removeOrphanedDocuments(t,r))).next(_=>(d=Date.now(),On()<=J.DEBUG&&L("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${i} in `+(c-a)+`ms
	Removed ${o} targets in `+(u-c)+`ms
	Removed ${_} documents in `+(d-u)+`ms
Total Duration: ${d-f}ms`),C.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:o,documentsRemoved:_})))}}function rv(n,t){return new nv(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iv{constructor(){this.changes=new Rn(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Lt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?C.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sv{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ov{constructor(t,e,r,i){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=i}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(i=>(r=i,this.remoteDocumentCache.getEntry(t,e))).next(i=>(r!==null&&Hr(r.mutation,i,$e.empty(),lt.now()),i))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,tt()).next(()=>r))}getLocalViewOfDocuments(t,e,r=tt()){const i=hn();return this.populateOverlays(t,i,e).next(()=>this.computeViews(t,e,i,r).next(o=>{let a=xr();return o.forEach((c,u)=>{a=a.insert(c,u.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const r=hn();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,tt()))}populateOverlays(t,e,r){const i=[];return r.forEach(o=>{e.has(o)||i.push(o)}),this.documentOverlayCache.getOverlays(t,i).next(o=>{o.forEach((a,c)=>{e.set(a,c)})})}computeViews(t,e,r,i){let o=en();const a=Gr(),c=function(){return Gr()}();return e.forEach((u,d)=>{const f=r.get(d.key);i.has(d.key)&&(f===void 0||f.mutation instanceof Ws)?o=o.insert(d.key,d):f!==void 0?(a.set(d.key,f.mutation.getFieldMask()),Hr(f.mutation,d,f.mutation.getFieldMask(),lt.now())):a.set(d.key,$e.empty())}),this.recalculateAndSaveOverlays(t,o).next(u=>(u.forEach((d,f)=>a.set(d,f)),e.forEach((d,f)=>{var _;return c.set(d,new sv(f,(_=a.get(d))!==null&&_!==void 0?_:null))}),c))}recalculateAndSaveOverlays(t,e){const r=Gr();let i=new dt((a,c)=>a-c),o=tt();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const c of a)c.keys().forEach(u=>{const d=e.get(u);if(d===null)return;let f=r.get(u)||$e.empty();f=c.applyToLocalView(d,f),r.set(u,f);const _=(i.get(c.batchId)||tt()).add(u);i=i.insert(c.batchId,_)})}).next(()=>{const a=[],c=i.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),d=u.key,f=u.value,_=vd();f.forEach(T=>{if(!o.has(T)){const R=Ad(e.get(T),r.get(T));R!==null&&_.set(T,R),o=o.add(T)}}),a.push(this.documentOverlayCache.saveOverlays(t,d,_))}return C.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,i){return function(a){return B.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):gd(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,i):this.getDocumentsMatchingCollectionQuery(t,e,r,i)}getNextDocuments(t,e,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,i).next(o=>{const a=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,i-o.size):C.resolve(hn());let c=Qr,u=o;return a.next(d=>C.forEach(d,(f,_)=>(c<_.largestBatchId&&(c=_.largestBatchId),o.get(f)?C.resolve():this.remoteDocumentCache.getEntry(t,f).next(T=>{u=u.insert(f,T)}))).next(()=>this.populateOverlays(t,d,o)).next(()=>this.computeViews(t,u,d,tt())).next(f=>({batchId:c,changes:Ey(f)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new B(e)).next(r=>{let i=xr();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(t,e,r,i){const o=e.collectionGroup;let a=xr();return this.indexManager.getCollectionParents(t,o).next(c=>C.forEach(c,u=>{const d=function(_,T){return new hi(T,null,_.explicitOrderBy.slice(),_.filters.slice(),_.limit,_.limitType,_.startAt,_.endAt)}(e,u.child(o));return this.getDocumentsMatchingCollectionQuery(t,d,r,i).next(f=>{f.forEach((_,T)=>{a=a.insert(_,T)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,r,i){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,i))).next(a=>{o.forEach((u,d)=>{const f=d.getKey();a.get(f)===null&&(a=a.insert(f,Lt.newInvalidDocument(f)))});let c=xr();return a.forEach((u,d)=>{const f=o.get(u);f!==void 0&&Hr(f.mutation,d,$e.empty(),lt.now()),Gs(e,d)&&(c=c.insert(u,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class av{constructor(t){this.serializer=t,this.Br=new Map,this.Lr=new Map}getBundleMetadata(t,e){return C.resolve(this.Br.get(e))}saveBundleMetadata(t,e){return this.Br.set(e.id,function(i){return{id:i.id,version:i.version,createTime:Bn(i.createTime)}}(e)),C.resolve()}getNamedQuery(t,e){return C.resolve(this.Lr.get(e))}saveNamedQuery(t,e){return this.Lr.set(e.name,function(i){return{name:i.name,query:Jy(i.bundledQuery),readTime:Bn(i.readTime)}}(e)),C.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lv{constructor(){this.overlays=new dt(B.comparator),this.kr=new Map}getOverlay(t,e){return C.resolve(this.overlays.get(e))}getOverlays(t,e){const r=hn();return C.forEach(e,i=>this.getOverlay(t,i).next(o=>{o!==null&&r.set(i,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((i,o)=>{this.wt(t,e,o)}),C.resolve()}removeOverlaysForBatchId(t,e,r){const i=this.kr.get(r);return i!==void 0&&(i.forEach(o=>this.overlays=this.overlays.remove(o)),this.kr.delete(r)),C.resolve()}getOverlaysForCollection(t,e,r){const i=hn(),o=e.length+1,a=new B(e.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,d=u.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===o&&u.largestBatchId>r&&i.set(u.getKey(),u)}return C.resolve(i)}getOverlaysForCollectionGroup(t,e,r,i){let o=new dt((d,f)=>d-f);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>r){let f=o.get(d.largestBatchId);f===null&&(f=hn(),o=o.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const c=hn(),u=o.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,f)=>c.set(d,f)),!(c.size()>=i)););return C.resolve(c)}wt(t,e,r){const i=this.overlays.get(r.key);if(i!==null){const a=this.kr.get(i.largestBatchId).delete(r.key);this.kr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Ny(e,r));let o=this.kr.get(e);o===void 0&&(o=tt(),this.kr.set(e,o)),this.kr.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cv{constructor(){this.sessionToken=Rt.EMPTY_BYTE_STRING}getSessionToken(t){return C.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,C.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $a{constructor(){this.qr=new Et(It.Qr),this.$r=new Et(It.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(t,e){const r=new It(t,e);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.Wr(new It(t,e))}Gr(t,e){t.forEach(r=>this.removeReference(r,e))}zr(t){const e=new B(new at([])),r=new It(e,t),i=new It(e,t+1),o=[];return this.$r.forEachInRange([r,i],a=>{this.Wr(a),o.push(a.key)}),o}jr(){this.qr.forEach(t=>this.Wr(t))}Wr(t){this.qr=this.qr.delete(t),this.$r=this.$r.delete(t)}Jr(t){const e=new B(new at([])),r=new It(e,t),i=new It(e,t+1);let o=tt();return this.$r.forEachInRange([r,i],a=>{o=o.add(a.key)}),o}containsKey(t){const e=new It(t,0),r=this.qr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class It{constructor(t,e){this.key=t,this.Hr=e}static Qr(t,e){return B.comparator(t.key,e.key)||K(t.Hr,e.Hr)}static Ur(t,e){return K(t.Hr,e.Hr)||B.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uv{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.er=1,this.Yr=new Et(It.Qr)}checkEmpty(t){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,i){const o=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Vy(o,e,r,i);this.mutationQueue.push(a);for(const c of i)this.Yr=this.Yr.add(new It(c.key,o)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return C.resolve(a)}lookupMutationBatch(t,e){return C.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,i=this.Xr(r),o=i<0?0:i;return C.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?Y_:this.er-1)}getAllMutationBatches(t){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new It(e,0),i=new It(e,Number.POSITIVE_INFINITY),o=[];return this.Yr.forEachInRange([r,i],a=>{const c=this.Zr(a.Hr);o.push(c)}),C.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new Et(K);return e.forEach(i=>{const o=new It(i,0),a=new It(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([o,a],c=>{r=r.add(c.Hr)})}),C.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,i=r.length+1;let o=r;B.isDocumentKey(o)||(o=o.child(""));const a=new It(new B(o),0);let c=new Et(K);return this.Yr.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(c=c.add(u.Hr)),!0)},a),C.resolve(this.ei(c))}ei(t){const e=[];return t.forEach(r=>{const i=this.Zr(r);i!==null&&e.push(i)}),e}removeMutationBatch(t,e){ct(this.ti(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return C.forEach(e.mutations,i=>{const o=new It(i.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)}).next(()=>{this.Yr=r})}rr(t){}containsKey(t,e){const r=new It(e,0),i=this.Yr.firstAfterOrEqual(r);return C.resolve(e.isEqual(i&&i.key))}performConsistencyCheck(t){return this.mutationQueue.length,C.resolve()}ti(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){const e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hv{constructor(t){this.ni=t,this.docs=function(){return new dt(B.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,i=this.docs.get(r),o=i?i.size:0,a=this.ni(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return C.resolve(r?r.document.mutableCopy():Lt.newInvalidDocument(e))}getEntries(t,e){let r=en();return e.forEach(i=>{const o=this.docs.get(i);r=r.insert(i,o?o.document.mutableCopy():Lt.newInvalidDocument(i))}),C.resolve(r)}getDocumentsMatchingQuery(t,e,r,i){let o=en();const a=e.path,c=new B(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||W_(H_(f),r)<=0||(i.has(f.key)||Gs(e,f))&&(o=o.insert(f.key,f.mutableCopy()))}return C.resolve(o)}getAllFromCollectionGroup(t,e,r,i){G(9500)}ri(t,e){return C.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new dv(this)}getSize(t){return C.resolve(this.size)}}class dv extends iv{constructor(t){super(),this.Or=t}applyChanges(t){const e=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?e.push(this.Or.addEntry(t,i)):this.Or.removeEntry(r)}),C.waitFor(e)}getFromCache(t,e){return this.Or.getEntry(t,e)}getAllFromCache(t,e){return this.Or.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fv{constructor(t){this.persistence=t,this.ii=new Rn(e=>Ma(e),Fa),this.lastRemoteSnapshotVersion=q.min(),this.highestTargetId=0,this.si=0,this.oi=new $a,this.targetCount=0,this._i=sr.ar()}forEachTarget(t,e){return this.ii.forEach((r,i)=>e(i)),C.resolve()}getLastRemoteSnapshotVersion(t){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return C.resolve(this.si)}allocateTargetId(t){return this.highestTargetId=this._i.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.si&&(this.si=e),C.resolve()}hr(t){this.ii.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this._i=new sr(e),this.highestTargetId=e),t.sequenceNumber>this.si&&(this.si=t.sequenceNumber)}addTargetData(t,e){return this.hr(e),this.targetCount+=1,C.resolve()}updateTargetData(t,e){return this.hr(e),C.resolve()}removeTargetData(t,e){return this.ii.delete(e.target),this.oi.zr(e.targetId),this.targetCount-=1,C.resolve()}removeTargets(t,e,r){let i=0;const o=[];return this.ii.forEach((a,c)=>{c.sequenceNumber<=e&&r.get(c.targetId)===null&&(this.ii.delete(a),o.push(this.removeMatchingKeysForTargetId(t,c.targetId)),i++)}),C.waitFor(o).next(()=>i)}getTargetCount(t){return C.resolve(this.targetCount)}getTargetData(t,e){const r=this.ii.get(e)||null;return C.resolve(r)}addMatchingKeys(t,e,r){return this.oi.Kr(e,r),C.resolve()}removeMatchingKeys(t,e,r){this.oi.Gr(e,r);const i=this.persistence.referenceDelegate,o=[];return i&&e.forEach(a=>{o.push(i.markPotentiallyOrphaned(t,a))}),C.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.oi.zr(e),C.resolve()}getMatchingKeysForTargetId(t,e){const r=this.oi.Jr(e);return C.resolve(r)}containsKey(t,e){return C.resolve(this.oi.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fd{constructor(t,e){this.ai={},this.overlays={},this.ui=new Bs(0),this.ci=!1,this.ci=!0,this.li=new cv,this.referenceDelegate=t(this),this.hi=new fv(this),this.indexManager=new Yy,this.remoteDocumentCache=function(i){return new hv(i)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new Qy(e),this.Ti=new av(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new lv,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.ai[t.toKey()];return r||(r=new uv(e,this.referenceDelegate),this.ai[t.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(t,e,r){L("MemoryPersistence","Starting transaction:",t);const i=new pv(this.ui.next());return this.referenceDelegate.Ii(),r(i).next(o=>this.referenceDelegate.di(i).next(()=>o)).toPromise().then(o=>(i.raiseOnCommittedEvent(),o))}Ei(t,e){return C.or(Object.values(this.ai).map(r=>()=>r.containsKey(t,e)))}}class pv extends Q_{constructor(t){super(),this.currentSequenceNumber=t}}class qa{constructor(t){this.persistence=t,this.Ai=new $a,this.Ri=null}static Vi(t){return new qa(t)}get mi(){if(this.Ri)return this.Ri;throw G(60996)}addReference(t,e,r){return this.Ai.addReference(r,e),this.mi.delete(r.toString()),C.resolve()}removeReference(t,e,r){return this.Ai.removeReference(r,e),this.mi.add(r.toString()),C.resolve()}markPotentiallyOrphaned(t,e){return this.mi.add(e.toString()),C.resolve()}removeTarget(t,e){this.Ai.zr(e.targetId).forEach(i=>this.mi.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(i=>{i.forEach(o=>this.mi.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}Ii(){this.Ri=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.mi,r=>{const i=B.fromPath(r);return this.fi(t,i).next(o=>{o||e.removeEntry(i,q.min())})}).next(()=>(this.Ri=null,e.apply(t)))}updateLimboDocument(t,e){return this.fi(t,e).next(r=>{r?this.mi.delete(e.toString()):this.mi.add(e.toString())})}Pi(t){return 0}fi(t,e){return C.or([()=>C.resolve(this.Ai.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ei(t,e)])}}class Ts{constructor(t,e){this.persistence=t,this.gi=new Rn(r=>Z_(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=rv(this,e)}static Vi(t,e){return new Ts(t,e)}Ii(){}di(t){return C.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}mr(t){const e=this.yr(t);return this.persistence.getTargetCache().getTargetCount(t).next(r=>e.next(i=>r+i))}yr(t){let e=0;return this.gr(t,r=>{e++}).next(()=>e)}gr(t,e){return C.forEach(this.gi,(r,i)=>this.Sr(t,r,i).next(o=>o?C.resolve():e(i)))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const i=this.persistence.getRemoteDocumentCache(),o=i.newChangeBuffer();return i.ri(t,a=>this.Sr(t,a,e).next(c=>{c||(r++,o.removeEntry(a,q.min()))})).next(()=>o.apply(t)).next(()=>r)}markPotentiallyOrphaned(t,e){return this.gi.set(e,t.currentSequenceNumber),C.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.gi.set(r,t.currentSequenceNumber),C.resolve()}removeReference(t,e,r){return this.gi.set(r,t.currentSequenceNumber),C.resolve()}updateLimboDocument(t,e){return this.gi.set(e,t.currentSequenceNumber),C.resolve()}Pi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Ji(t.data.value)),e}Sr(t,e,r){return C.or([()=>this.persistence.Ei(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const i=this.gi.get(e);return C.resolve(i!==void 0&&i>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(t,e,r,i){this.targetId=t,this.fromCache=e,this.Is=r,this.ds=i}static Es(t,e){let r=tt(),i=tt();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new Ga(t,e.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gv{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mv{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return Hp()?8:J_(ce())>0?6:4}()}initialize(t,e){this.gs=t,this.indexManager=e,this.As=!0}getDocumentsMatchingQuery(t,e,r,i){const o={result:null};return this.ps(t,e).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.ys(t,e,i,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new gv;return this.ws(t,e,a).next(c=>{if(o.result=c,this.Rs)return this.Ss(t,e,a,c.size)})}).next(()=>o.result)}Ss(t,e,r,i){return r.documentReadCount<this.Vs?(On()<=J.DEBUG&&L("QueryEngine","SDK will not create cache indexes for query:",Ln(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),C.resolve()):(On()<=J.DEBUG&&L("QueryEngine","Query:",Ln(e),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.fs*i?(On()<=J.DEBUG&&L("QueryEngine","The SDK decides to create cache indexes for query:",Ln(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,_e(e))):C.resolve())}ps(t,e){if(hu(e))return C.resolve(null);let r=_e(e);return this.indexManager.getIndexType(t,r).next(i=>i===0?null:(e.limit!==null&&i===1&&(e=ys(e,null,"F"),r=_e(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{const a=tt(...o);return this.gs.getDocuments(t,a).next(c=>this.indexManager.getMinOffset(t,r).next(u=>{const d=this.bs(e,c);return this.Ds(e,d,a,u.readTime)?this.ps(t,ys(e,null,"F")):this.vs(t,d,e,u)}))})))}ys(t,e,r,i){return hu(e)||i.isEqual(q.min())?C.resolve(null):this.gs.getDocuments(t,r).next(o=>{const a=this.bs(e,o);return this.Ds(e,a,r,i)?C.resolve(null):(On()<=J.DEBUG&&L("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Ln(e)),this.vs(t,a,e,G_(i,Qr)).next(c=>c))})}bs(t,e){let r=new Et(_d(t));return e.forEach((i,o)=>{Gs(t,o)&&(r=r.add(o))}),r}Ds(t,e,r,i){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}ws(t,e,r){return On()<=J.DEBUG&&L("QueryEngine","Using full collection scan to execute query:",Ln(e)),this.gs.getDocumentsMatchingQuery(t,e,Ye.min(),r)}vs(t,e,r,i){return this.gs.getDocumentsMatchingQuery(t,r,i).next(o=>(e.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ha="LocalStore",_v=3e8;class yv{constructor(t,e,r,i){this.persistence=t,this.Cs=e,this.serializer=i,this.Fs=new dt(K),this.Ms=new Rn(o=>Ma(o),Fa),this.xs=new Map,this.Os=t.getRemoteDocumentCache(),this.hi=t.getTargetCache(),this.Ti=t.getBundleCache(),this.Ns(r)}Ns(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new ov(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Fs))}}function vv(n,t,e,r){return new yv(n,t,e,r)}async function Ud(n,t){const e=Z(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let i;return e.mutationQueue.getAllMutationBatches(r).next(o=>(i=o,e.Ns(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],c=[];let u=tt();for(const d of i){a.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of o){c.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return e.localDocuments.getDocuments(r,u).next(d=>({Bs:d,removedBatchIds:a,addedBatchIds:c}))})})}function jd(n){const t=Z(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.hi.getLastRemoteSnapshotVersion(e))}function Ev(n,t){const e=Z(n),r=t.snapshotVersion;let i=e.Fs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=e.Os.newChangeBuffer({trackRemovals:!0});i=e.Fs;const c=[];t.targetChanges.forEach((f,_)=>{const T=i.get(_);if(!T)return;c.push(e.hi.removeMatchingKeys(o,f.removedDocuments,_).next(()=>e.hi.addMatchingKeys(o,f.addedDocuments,_)));let R=T.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(_)!==null?R=R.withResumeToken(Rt.EMPTY_BYTE_STRING,q.min()).withLastLimboFreeSnapshotVersion(q.min()):f.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(f.resumeToken,r)),i=i.insert(_,R),function(k,N,x){return k.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=_v?!0:x.addedDocuments.size+x.modifiedDocuments.size+x.removedDocuments.size>0}(T,R,f)&&c.push(e.hi.updateTargetData(o,R))});let u=en(),d=tt();if(t.documentUpdates.forEach(f=>{t.resolvedLimboDocuments.has(f)&&c.push(e.persistence.referenceDelegate.updateLimboDocument(o,f))}),c.push(Tv(o,a,t.documentUpdates).next(f=>{u=f.Ls,d=f.ks})),!r.isEqual(q.min())){const f=e.hi.getLastRemoteSnapshotVersion(o).next(_=>e.hi.setTargetsMetadata(o,o.currentSequenceNumber,r));c.push(f)}return C.waitFor(c).next(()=>a.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,u,d)).next(()=>u)}).then(o=>(e.Fs=i,o))}function Tv(n,t,e){let r=tt(),i=tt();return e.forEach(o=>r=r.add(o)),t.getEntries(n,r).next(o=>{let a=en();return e.forEach((c,u)=>{const d=o.get(c);u.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),u.isNoDocument()&&u.version.isEqual(q.min())?(t.removeEntry(c,u.readTime),a=a.insert(c,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(u),a=a.insert(c,u)):L(Ha,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",u.version)}),{Ls:a,ks:i}})}function wv(n,t){const e=Z(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return e.hi.getTargetData(r,t).next(o=>o?(i=o,C.resolve(i)):e.hi.allocateTargetId(r).next(a=>(i=new qe(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.hi.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=e.Fs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(e.Fs=e.Fs.insert(r.targetId,r),e.Ms.set(t,r.targetId)),r})}async function pa(n,t,e){const r=Z(n),i=r.Fs.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!cr(a))throw a;L(Ha,`Failed to update sequence numbers for target ${t}: ${a}`)}r.Fs=r.Fs.remove(t),r.Ms.delete(i.target)}function Au(n,t,e){const r=Z(n);let i=q.min(),o=tt();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,d,f){const _=Z(u),T=_.Ms.get(f);return T!==void 0?C.resolve(_.Fs.get(T)):_.hi.getTargetData(d,f)}(r,a,_e(t)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,c.targetId).next(u=>{o=u})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,t,e?i:q.min(),e?o:tt())).next(c=>(Iv(r,_y(t),c),{documents:c,qs:o})))}function Iv(n,t,e){let r=n.xs.get(t)||q.min();e.forEach((i,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.xs.set(t,r)}class bu{constructor(){this.activeTargetIds=Iy()}Gs(t){this.activeTargetIds=this.activeTargetIds.add(t)}zs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Av{constructor(){this.Fo=new bu,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Fo.Gs(t),this.Mo[t]||"not-current"}updateQueryState(t,e,r){this.Mo[t]=e}removeLocalQueryTarget(t){this.Fo.zs(t)}isLocalQueryTarget(t){return this.Fo.activeTargetIds.has(t)}clearQueryState(t){delete this.Mo[t]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(t){return this.Fo.activeTargetIds.has(t)}start(){return this.Fo=new bu,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bv{xo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Su="ConnectivityMonitor";class Ru{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(t){this.ko.push(t)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){L(Su,"Network connectivity changed: AVAILABLE");for(const t of this.ko)t(0)}Lo(){L(Su,"Network connectivity changed: UNAVAILABLE");for(const t of this.ko)t(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ui=null;function ga(){return Ui===null?Ui=function(){return 268435456+Math.round(2147483648*Math.random())}():Ui++,"0x"+Ui.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xo="RestConnection",Sv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Rv{get Qo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=e+"://"+t.host,this.Uo=`projects/${r}/databases/${i}`,this.Ko=this.databaseId.database===ps?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(t,e,r,i,o){const a=ga(),c=this.Go(t,e.toUriEncodedString());L(xo,`Sending RPC '${t}' ${a}:`,c,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(u,i,o);const{host:d}=new URL(c),f=Sn(d);return this.jo(t,c,u,r,f).then(_=>(L(xo,`Received RPC '${t}' ${a}: `,_),_),_=>{throw Je(xo,`RPC '${t}' ${a} failed with error: `,_,"url: ",c,"request:",r),_})}Jo(t,e,r,i,o,a){return this.Wo(t,e,r,i,o)}zo(t,e,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+lr}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((i,o)=>t[o]=i),r&&r.headers.forEach((i,o)=>t[o]=i)}Go(t,e){const r=Sv[t];return`${this.$o}/v1/${e}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cv{constructor(t){this.Ho=t.Ho,this.Yo=t.Yo}Zo(t){this.Xo=t}e_(t){this.t_=t}n_(t){this.r_=t}onMessage(t){this.i_=t}close(){this.Yo()}send(t){this.Ho(t)}s_(){this.Xo()}o_(){this.t_()}__(t){this.r_(t)}a_(t){this.i_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nt="WebChannelConnection";class Pv extends Rv{constructor(t){super(t),this.u_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}jo(t,e,r,i,o){const a=ga();return new Promise((c,u)=>{const d=new zh;d.setWithCredentials(!0),d.listenOnce($h.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Qi.NO_ERROR:const _=d.getResponseJson();L(Nt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(_)),c(_);break;case Qi.TIMEOUT:L(Nt,`RPC '${t}' ${a} timed out`),u(new M(V.DEADLINE_EXCEEDED,"Request time out"));break;case Qi.HTTP_ERROR:const T=d.getStatus();if(L(Nt,`RPC '${t}' ${a} failed with status:`,T,"response text:",d.getResponseText()),T>0){let R=d.getResponseJson();Array.isArray(R)&&(R=R[0]);const P=R==null?void 0:R.error;if(P&&P.status&&P.message){const k=function(x){const j=x.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(j)>=0?j:V.UNKNOWN}(P.status);u(new M(k,P.message))}else u(new M(V.UNKNOWN,"Server responded with status "+d.getStatus()))}else u(new M(V.UNAVAILABLE,"Connection failed."));break;default:G(9055,{c_:t,streamId:a,l_:d.getLastErrorCode(),h_:d.getLastError()})}}finally{L(Nt,`RPC '${t}' ${a} completed.`)}});const f=JSON.stringify(i);L(Nt,`RPC '${t}' ${a} sending request:`,i),d.send(e,"POST",f,r,15)})}P_(t,e,r){const i=ga(),o=[this.$o,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=Hh(),c=Gh(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.zo(u.initMessageHeaders,e,r),u.encodeInitMessageHeaders=!0;const f=o.join("");L(Nt,`Creating RPC '${t}' stream ${i}: ${f}`,u);const _=a.createWebChannel(f,u);this.T_(_);let T=!1,R=!1;const P=new Cv({Ho:N=>{R?L(Nt,`Not sending because RPC '${t}' stream ${i} is closed:`,N):(T||(L(Nt,`Opening RPC '${t}' stream ${i} transport.`),_.open(),T=!0),L(Nt,`RPC '${t}' stream ${i} sending:`,N),_.send(N))},Yo:()=>_.close()}),k=(N,x,j)=>{N.listen(x,z=>{try{j(z)}catch(H){setTimeout(()=>{throw H},0)}})};return k(_,Lr.EventType.OPEN,()=>{R||(L(Nt,`RPC '${t}' stream ${i} transport opened.`),P.s_())}),k(_,Lr.EventType.CLOSE,()=>{R||(R=!0,L(Nt,`RPC '${t}' stream ${i} transport closed`),P.__(),this.I_(_))}),k(_,Lr.EventType.ERROR,N=>{R||(R=!0,Je(Nt,`RPC '${t}' stream ${i} transport errored. Name:`,N.name,"Message:",N.message),P.__(new M(V.UNAVAILABLE,"The operation could not be completed")))}),k(_,Lr.EventType.MESSAGE,N=>{var x;if(!R){const j=N.data[0];ct(!!j,16349);const z=j,H=(z==null?void 0:z.error)||((x=z[0])===null||x===void 0?void 0:x.error);if(H){L(Nt,`RPC '${t}' stream ${i} received error:`,H);const Q=H.status;let W=function(y){const w=pt[y];if(w!==void 0)return Sd(w)}(Q),E=H.message;W===void 0&&(W=V.INTERNAL,E="Unknown error status: "+Q+" with message "+H.message),R=!0,P.__(new M(W,E)),_.close()}else L(Nt,`RPC '${t}' stream ${i} received:`,j),P.a_(j)}}),k(c,qh.STAT_EVENT,N=>{N.stat===ea.PROXY?L(Nt,`RPC '${t}' stream ${i} detected buffering proxy`):N.stat===ea.NOPROXY&&L(Nt,`RPC '${t}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{P.o_()},0),P}terminate(){this.u_.forEach(t=>t.close()),this.u_=[]}T_(t){this.u_.push(t)}I_(t){this.u_=this.u_.filter(e=>e===t)}}function Mo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qs(n){return new Uy(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bd{constructor(t,e,r=1e3,i=1.5,o=6e4){this.Fi=t,this.timerId=e,this.d_=r,this.E_=i,this.A_=o,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(t){this.cancel();const e=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),i=Math.max(0,e-r);i>0&&L("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),t())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cu="PersistentStream";class kv{constructor(t,e,r,i,o,a,c,u){this.Fi=t,this.w_=r,this.S_=i,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new Bd(t,e)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(t){this.q_(),this.stream.send(t)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,t!==4?this.F_.reset():e&&e.code===V.RESOURCE_EXHAUSTED?(ke(e.toString()),ke("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):e&&e.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.n_(e)}U_(){}auth(){this.state=1;const t=this.K_(this.b_),e=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.b_===e&&this.W_(r,i)},r=>{t(()=>{const i=new M(V.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(i)})})}W_(t,e){const r=this.K_(this.b_);this.stream=this.z_(t,e),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{r(()=>this.G_(i))}),this.stream.onMessage(i=>{r(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(t){return L(Cu,`close with error: ${t}`),this.stream=null,this.close(4,t)}K_(t){return e=>{this.Fi.enqueueAndForget(()=>this.b_===t?e():(L(Cu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Vv extends kv{constructor(t,e,r,i,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,i,a),this.serializer=o}z_(t,e){return this.connection.P_("Listen",t,e)}j_(t){return this.onNext(t)}onNext(t){this.F_.reset();const e=By(this.serializer,t),r=function(o){if(!("targetChange"in o))return q.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?q.min():a.readTime?Bn(a.readTime):q.min()}(t);return this.listener.J_(e,r)}H_(t){const e={};e.database=Eu(this.serializer),e.addTarget=function(o,a){let c;const u=a.target;if(c=aa(u)?{documents:zy(o,u)}:{query:$y(o,u).Vt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Pd(o,a.resumeToken);const d=ha(o,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(q.min())>0){c.readTime=da(o,a.snapshotVersion.toTimestamp());const d=ha(o,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,t);const r=Gy(this.serializer,t);r&&(e.labels=r),this.k_(e)}Y_(t){const e={};e.database=Eu(this.serializer),e.removeTarget=t,this.k_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nv{}class Dv extends Nv{constructor(t,e,r,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new M(V.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Wo(t,fa(e,r),i,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new M(V.UNKNOWN,o.toString())})}Jo(t,e,r,i,o){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Jo(t,fa(e,r),i,a,c,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new M(V.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class Ov{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(t){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ua("Offline")))}set(t){this.ha(),this.sa=0,t==="Online"&&(this._a=!1),this.ua(t)}ua(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ca(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(ke(e),this._a=!1):L("OnlineStateTracker",e)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const or="RemoteStore";class Lv{constructor(t,e,r,i,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=o,this.Ea.xo(a=>{r.enqueueAndForget(async()=>{pi(this)&&(L(or,"Restarting streams for network reachability change."),await async function(u){const d=Z(u);d.Ia.add(4),await fi(d),d.Aa.set("Unknown"),d.Ia.delete(4),await Js(d)}(this))})}),this.Aa=new Ov(r,i)}}async function Js(n){if(pi(n))for(const t of n.da)await t(!0)}async function fi(n){for(const t of n.da)await t(!1)}function zd(n,t){const e=Z(n);e.Ta.has(t.targetId)||(e.Ta.set(t.targetId,t),Ja(e)?Qa(e):hr(e).x_()&&Ka(e,t))}function Wa(n,t){const e=Z(n),r=hr(e);e.Ta.delete(t),r.x_()&&$d(e,t),e.Ta.size===0&&(r.x_()?r.B_():pi(e)&&e.Aa.set("Unknown"))}function Ka(n,t){if(n.Ra.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(q.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}hr(n).H_(t)}function $d(n,t){n.Ra.$e(t),hr(n).Y_(t)}function Qa(n){n.Ra=new Ly({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),Et:t=>n.Ta.get(t)||null,lt:()=>n.datastore.serializer.databaseId}),hr(n).start(),n.Aa.aa()}function Ja(n){return pi(n)&&!hr(n).M_()&&n.Ta.size>0}function pi(n){return Z(n).Ia.size===0}function qd(n){n.Ra=void 0}async function xv(n){n.Aa.set("Online")}async function Mv(n){n.Ta.forEach((t,e)=>{Ka(n,t)})}async function Fv(n,t){qd(n),Ja(n)?(n.Aa.la(t),Qa(n)):n.Aa.set("Unknown")}async function Uv(n,t,e){if(n.Aa.set("Online"),t instanceof Cd&&t.state===2&&t.cause)try{await async function(i,o){const a=o.cause;for(const c of o.targetIds)i.Ta.has(c)&&(await i.remoteSyncer.rejectListen(c,a),i.Ta.delete(c),i.Ra.removeTarget(c))}(n,t)}catch(r){L(or,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await Pu(n,r)}else if(t instanceof Xi?n.Ra.Ye(t):t instanceof Rd?n.Ra.it(t):n.Ra.et(t),!e.isEqual(q.min()))try{const r=await jd(n.localStore);e.compareTo(r)>=0&&await function(o,a){const c=o.Ra.Pt(a);return c.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const f=o.Ta.get(d);f&&o.Ta.set(d,f.withResumeToken(u.resumeToken,a))}}),c.targetMismatches.forEach((u,d)=>{const f=o.Ta.get(u);if(!f)return;o.Ta.set(u,f.withResumeToken(Rt.EMPTY_BYTE_STRING,f.snapshotVersion)),$d(o,u);const _=new qe(f.target,u,d,f.sequenceNumber);Ka(o,_)}),o.remoteSyncer.applyRemoteEvent(c)}(n,e)}catch(r){L(or,"Failed to raise snapshot:",r),await Pu(n,r)}}async function Pu(n,t,e){if(!cr(t))throw t;n.Ia.add(1),await fi(n),n.Aa.set("Offline"),e||(e=()=>jd(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{L(or,"Retrying IndexedDB access"),await e(),n.Ia.delete(1),await Js(n)})}async function ku(n,t){const e=Z(n);e.asyncQueue.verifyOperationInProgress(),L(or,"RemoteStore received new credentials");const r=pi(e);e.Ia.add(3),await fi(e),r&&e.Aa.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ia.delete(3),await Js(e)}async function jv(n,t){const e=Z(n);t?(e.Ia.delete(2),await Js(e)):t||(e.Ia.add(2),await fi(e),e.Aa.set("Unknown"))}function hr(n){return n.Va||(n.Va=function(e,r,i){const o=Z(e);return o.ia(),new Vv(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Zo:xv.bind(null,n),e_:Mv.bind(null,n),n_:Fv.bind(null,n),J_:Uv.bind(null,n)}),n.da.push(async t=>{t?(n.Va.N_(),Ja(n)?Qa(n):n.Aa.set("Unknown")):(await n.Va.stop(),qd(n))})),n.Va}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ya{constructor(t,e,r,i,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=i,this.removalCallback=o,this.deferred=new yn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,i,o){const a=Date.now()+r,c=new Ya(t,e,a,i,o);return c.start(r),c}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new M(V.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Gd(n,t){if(ke("AsyncQueue",`${t}: ${n}`),cr(n))return new M(V.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{static emptySet(t){return new zn(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||B.comparator(e.key,r.key):(e,r)=>B.comparator(e.key,r.key),this.keyedMap=xr(),this.sortedSet=new dt(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof zn)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=r.getNext().key;if(!i.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new zn;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vu{constructor(){this.fa=new dt(B.comparator)}track(t){const e=t.doc.key,r=this.fa.get(e);r?t.type!==0&&r.type===3?this.fa=this.fa.insert(e,t):t.type===3&&r.type!==1?this.fa=this.fa.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.fa=this.fa.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.fa=this.fa.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.fa=this.fa.remove(e):t.type===1&&r.type===2?this.fa=this.fa.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.fa=this.fa.insert(e,{type:2,doc:t.doc}):G(63341,{At:t,ga:r}):this.fa=this.fa.insert(e,t)}pa(){const t=[];return this.fa.inorderTraversal((e,r)=>{t.push(r)}),t}}class ar{constructor(t,e,r,i,o,a,c,u,d){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(t,e,r,i,o){const a=[];return e.forEach(c=>{a.push({type:0,doc:c})}),new ar(t,e,zn.emptySet(e),a,r,i,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&qs(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let i=0;i<e.length;i++)if(e[i].type!==r[i].type||!e[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bv{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(t=>t.ba())}}class zv{constructor(){this.queries=Nu(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(e,r){const i=Z(e),o=i.queries;i.queries=Nu(),o.forEach((a,c)=>{for(const u of c.wa)u.onError(r)})})(this,new M(V.ABORTED,"Firestore shutting down"))}}function Nu(){return new Rn(n=>md(n),qs)}async function $v(n,t){const e=Z(n);let r=3;const i=t.query;let o=e.queries.get(i);o?!o.Sa()&&t.ba()&&(r=2):(o=new Bv,r=t.ba()?0:1);try{switch(r){case 0:o.ya=await e.onListen(i,!0);break;case 1:o.ya=await e.onListen(i,!1);break;case 2:await e.onFirstRemoteStoreListen(i)}}catch(a){const c=Gd(a,`Initialization of query '${Ln(t.query)}' failed`);return void t.onError(c)}e.queries.set(i,o),o.wa.push(t),t.va(e.onlineState),o.ya&&t.Ca(o.ya)&&Xa(e)}async function qv(n,t){const e=Z(n),r=t.query;let i=3;const o=e.queries.get(r);if(o){const a=o.wa.indexOf(t);a>=0&&(o.wa.splice(a,1),o.wa.length===0?i=t.ba()?0:1:!o.Sa()&&t.ba()&&(i=2))}switch(i){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function Gv(n,t){const e=Z(n);let r=!1;for(const i of t){const o=i.query,a=e.queries.get(o);if(a){for(const c of a.wa)c.Ca(i)&&(r=!0);a.ya=i}}r&&Xa(e)}function Hv(n,t,e){const r=Z(n),i=r.queries.get(t);if(i)for(const o of i.wa)o.onError(e);r.queries.delete(t)}function Xa(n){n.Da.forEach(t=>{t.next()})}var ma,Du;(Du=ma||(ma={})).Fa="default",Du.Cache="cache";class Wv{constructor(t,e,r){this.query=t,this.Ma=e,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(t){if(!this.options.includeMetadataChanges){const r=[];for(const i of t.docChanges)i.type!==3&&r.push(i);t=new ar(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.xa?this.Na(t)&&(this.Ma.next(t),e=!0):this.Ba(t,this.onlineState)&&(this.La(t),e=!0),this.Oa=t,e}onError(t){this.Ma.error(t)}va(t){this.onlineState=t;let e=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,t)&&(this.La(this.Oa),e=!0),e}Ba(t,e){if(!t.fromCache||!this.ba())return!0;const r=e!=="Offline";return(!this.options.ka||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Na(t){if(t.docChanges.length>0)return!0;const e=this.Oa&&this.Oa.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}La(t){t=ar.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.xa=!0,this.Ma.next(t)}ba(){return this.options.source!==ma.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(t){this.key=t}}class Wd{constructor(t){this.key=t}}class Kv{constructor(t,e){this.query=t,this.Ha=e,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=tt(),this.mutatedKeys=tt(),this.Xa=_d(t),this.eu=new zn(this.Xa)}get tu(){return this.Ha}nu(t,e){const r=e?e.ru:new Vu,i=e?e.eu:this.eu;let o=e?e.mutatedKeys:this.mutatedKeys,a=i,c=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(t.inorderTraversal((f,_)=>{const T=i.get(f),R=Gs(this.query,_)?_:null,P=!!T&&this.mutatedKeys.has(T.key),k=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let N=!1;T&&R?T.data.isEqual(R.data)?P!==k&&(r.track({type:3,doc:R}),N=!0):this.iu(T,R)||(r.track({type:2,doc:R}),N=!0,(u&&this.Xa(R,u)>0||d&&this.Xa(R,d)<0)&&(c=!0)):!T&&R?(r.track({type:0,doc:R}),N=!0):T&&!R&&(r.track({type:1,doc:T}),N=!0,(u||d)&&(c=!0)),N&&(R?(a=a.add(R),o=k?o.add(f):o.delete(f)):(a=a.delete(f),o=o.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),o=o.delete(f.key),r.track({type:1,doc:f})}return{eu:a,ru:r,Ds:c,mutatedKeys:o}}iu(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,i){const o=this.eu;this.eu=t.eu,this.mutatedKeys=t.mutatedKeys;const a=t.ru.pa();a.sort((f,_)=>function(R,P){const k=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return G(20277,{At:N})}};return k(R)-k(P)}(f.type,_.type)||this.Xa(f.doc,_.doc)),this.su(r),i=i!=null&&i;const c=e&&!i?this.ou():[],u=this.Za.size===0&&this.current&&!i?1:0,d=u!==this.Ya;return this.Ya=u,a.length!==0||d?{snapshot:new ar(this.query,t.eu,o,a,t.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:c}:{_u:c}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new Vu,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(t){return!this.Ha.has(t)&&!!this.eu.has(t)&&!this.eu.get(t).hasLocalMutations}su(t){t&&(t.addedDocuments.forEach(e=>this.Ha=this.Ha.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ha=this.Ha.delete(e)),this.current=t.current)}ou(){if(!this.current)return[];const t=this.Za;this.Za=tt(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});const e=[];return t.forEach(r=>{this.Za.has(r)||e.push(new Wd(r))}),this.Za.forEach(r=>{t.has(r)||e.push(new Hd(r))}),e}uu(t){this.Ha=t.qs,this.Za=tt();const e=this.nu(t.documents);return this.applyChanges(e,!0)}cu(){return ar.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const Za="SyncEngine";class Qv{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class Jv{constructor(t){this.key=t,this.lu=!1}}class Yv{constructor(t,e,r,i,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new Rn(c=>md(c),qs),this.Tu=new Map,this.Iu=new Set,this.du=new dt(B.comparator),this.Eu=new Map,this.Au=new $a,this.Ru={},this.Vu=new Map,this.mu=sr.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function Xv(n,t,e=!0){const r=Xd(n);let i;const o=r.Pu.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),i=o.view.cu()):i=await Kd(r,t,e,!0),i}async function Zv(n,t){const e=Xd(n);await Kd(e,t,!0,!1)}async function Kd(n,t,e,r){const i=await wv(n.localStore,_e(t)),o=i.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e);let c;return r&&(c=await tE(n,t,o,a==="current",i.resumeToken)),n.isPrimaryClient&&e&&zd(n.remoteStore,i),c}async function tE(n,t,e,r,i){n.gu=(_,T,R)=>async function(k,N,x,j){let z=N.view.nu(x);z.Ds&&(z=await Au(k.localStore,N.query,!1).then(({documents:E})=>N.view.nu(E,z)));const H=j&&j.targetChanges.get(N.targetId),Q=j&&j.targetMismatches.get(N.targetId)!=null,W=N.view.applyChanges(z,k.isPrimaryClient,H,Q);return Lu(k,N.targetId,W._u),W.snapshot}(n,_,T,R);const o=await Au(n.localStore,t,!0),a=new Kv(t,o.qs),c=a.nu(o.documents),u=di.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",i),d=a.applyChanges(c,n.isPrimaryClient,u);Lu(n,e,d._u);const f=new Qv(t,e,a);return n.Pu.set(t,f),n.Tu.has(e)?n.Tu.get(e).push(t):n.Tu.set(e,[t]),d.snapshot}async function eE(n,t,e){const r=Z(n),i=r.Pu.get(t),o=r.Tu.get(i.targetId);if(o.length>1)return r.Tu.set(i.targetId,o.filter(a=>!qs(a,t))),void r.Pu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await pa(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),e&&Wa(r.remoteStore,i.targetId),_a(r,i.targetId)}).catch(js)):(_a(r,i.targetId),await pa(r.localStore,i.targetId,!0))}async function nE(n,t){const e=Z(n),r=e.Pu.get(t),i=e.Tu.get(r.targetId);e.isPrimaryClient&&i.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),Wa(e.remoteStore,r.targetId))}async function Qd(n,t){const e=Z(n);try{const r=await Ev(e.localStore,t);t.targetChanges.forEach((i,o)=>{const a=e.Eu.get(o);a&&(ct(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.lu=!0:i.modifiedDocuments.size>0?ct(a.lu,14607):i.removedDocuments.size>0&&(ct(a.lu,42227),a.lu=!1))}),await Yd(e,r,t)}catch(r){await js(r)}}function Ou(n,t,e){const r=Z(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const i=[];r.Pu.forEach((o,a)=>{const c=a.view.va(t);c.snapshot&&i.push(c.snapshot)}),function(a,c){const u=Z(a);u.onlineState=c;let d=!1;u.queries.forEach((f,_)=>{for(const T of _.wa)T.va(c)&&(d=!0)}),d&&Xa(u)}(r.eventManager,t),i.length&&r.hu.J_(i),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function rE(n,t,e){const r=Z(n);r.sharedClientState.updateQueryState(t,"rejected",e);const i=r.Eu.get(t),o=i&&i.key;if(o){let a=new dt(B.comparator);a=a.insert(o,Lt.newNoDocument(o,q.min()));const c=tt().add(o),u=new Ks(q.min(),new Map,new dt(K),a,c);await Qd(r,u),r.du=r.du.remove(o),r.Eu.delete(t),tl(r)}else await pa(r.localStore,t,!1).then(()=>_a(r,t,e)).catch(js)}function _a(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Tu.get(t))n.Pu.delete(r),e&&n.hu.pu(r,e);n.Tu.delete(t),n.isPrimaryClient&&n.Au.zr(t).forEach(r=>{n.Au.containsKey(r)||Jd(n,r)})}function Jd(n,t){n.Iu.delete(t.path.canonicalString());const e=n.du.get(t);e!==null&&(Wa(n.remoteStore,e),n.du=n.du.remove(t),n.Eu.delete(e),tl(n))}function Lu(n,t,e){for(const r of e)r instanceof Hd?(n.Au.addReference(r.key,t),iE(n,r)):r instanceof Wd?(L(Za,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,t),n.Au.containsKey(r.key)||Jd(n,r.key)):G(19791,{yu:r})}function iE(n,t){const e=t.key,r=e.path.canonicalString();n.du.get(e)||n.Iu.has(r)||(L(Za,"New document in limbo: "+e),n.Iu.add(r),tl(n))}function tl(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const t=n.Iu.values().next().value;n.Iu.delete(t);const e=new B(at.fromString(t)),r=n.mu.next();n.Eu.set(r,new Jv(e)),n.du=n.du.insert(e,r),zd(n.remoteStore,new qe(_e(pd(e.path)),r,"TargetPurposeLimboResolution",Bs.ue))}}async function Yd(n,t,e){const r=Z(n),i=[],o=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach((c,u)=>{a.push(r.gu(u,t,e).then(d=>{var f;if((d||e)&&r.isPrimaryClient){const _=d?!d.fromCache:(f=e==null?void 0:e.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,_?"current":"not-current")}if(d){i.push(d);const _=Ga.Es(u.targetId,d);o.push(_)}}))}),await Promise.all(a),r.hu.J_(i),await async function(u,d){const f=Z(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",_=>C.forEach(d,T=>C.forEach(T.Is,R=>f.persistence.referenceDelegate.addReference(_,T.targetId,R)).next(()=>C.forEach(T.ds,R=>f.persistence.referenceDelegate.removeReference(_,T.targetId,R)))))}catch(_){if(!cr(_))throw _;L(Ha,"Failed to update sequence numbers: "+_)}for(const _ of d){const T=_.targetId;if(!_.fromCache){const R=f.Fs.get(T),P=R.snapshotVersion,k=R.withLastLimboFreeSnapshotVersion(P);f.Fs=f.Fs.insert(T,k)}}}(r.localStore,o))}async function sE(n,t){const e=Z(n);if(!e.currentUser.isEqual(t)){L(Za,"User change. New user:",t.toKey());const r=await Ud(e.localStore,t);e.currentUser=t,function(o,a){o.Vu.forEach(c=>{c.forEach(u=>{u.reject(new M(V.CANCELLED,a))})}),o.Vu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Yd(e,r.Bs)}}function oE(n,t){const e=Z(n),r=e.Eu.get(t);if(r&&r.lu)return tt().add(r.key);{let i=tt();const o=e.Tu.get(t);if(!o)return i;for(const a of o){const c=e.Pu.get(a);i=i.unionWith(c.view.tu)}return i}}function Xd(n){const t=Z(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=Qd.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=oE.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=rE.bind(null,t),t.hu.J_=Gv.bind(null,t.eventManager),t.hu.pu=Hv.bind(null,t.eventManager),t}class ws{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Qs(t.databaseInfo.databaseId),this.sharedClientState=this.bu(t),this.persistence=this.Du(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Cu(t,this.localStore),this.indexBackfillerScheduler=this.Fu(t,this.localStore)}Cu(t,e){return null}Fu(t,e){return null}vu(t){return vv(this.persistence,new mv,t.initialUser,this.serializer)}Du(t){return new Fd(qa.Vi,this.serializer)}bu(t){return new Av}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ws.provider={build:()=>new ws};class aE extends ws{constructor(t){super(),this.cacheSizeBytes=t}Cu(t,e){ct(this.persistence.referenceDelegate instanceof Ts,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new ev(r,t.asyncQueue,e)}Du(t){const e=this.cacheSizeBytes!==void 0?zt.withCacheSize(this.cacheSizeBytes):zt.DEFAULT;return new Fd(r=>Ts.Vi(r,e),this.serializer)}}class ya{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ou(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=sE.bind(null,this.syncEngine),await jv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new zv}()}createDatastore(t){const e=Qs(t.databaseInfo.databaseId),r=function(o){return new Pv(o)}(t.databaseInfo);return function(o,a,c,u){return new Dv(o,a,c,u)}(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,i,o,a,c){return new Lv(r,i,o,a,c)}(this.localStore,this.datastore,t.asyncQueue,e=>Ou(this.syncEngine,e,0),function(){return Ru.C()?new Ru:new bv}())}createSyncEngine(t,e){return function(i,o,a,c,u,d,f){const _=new Yv(i,o,a,c,u,d);return f&&(_.fu=!0),_}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(i){const o=Z(i);L(or,"RemoteStore shutting down."),o.Ia.add(5),await fi(o),o.Ea.shutdown(),o.Aa.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}ya.provider={build:()=>new ya};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lE{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.xu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.xu(this.observer.error,t):ke("Uncaught Error in snapshot listener:",t.toString()))}Ou(){this.muted=!0}xu(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nn="FirestoreClient";class cE{constructor(t,e,r,i,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=i,this.user=Ot.UNAUTHENTICATED,this.clientId=Jh.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{L(nn,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(L(nn,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new yn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Gd(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}}async function Fo(n,t){n.asyncQueue.verifyOperationInProgress(),L(nn,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Ud(t.localStore,i),r=i)}),t.persistence.setDatabaseDeletedListener(()=>{Je("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{L("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{Je("Terminating Firestore due to IndexedDb database deletion failed",i)})}),n._offlineComponents=t}async function xu(n,t){n.asyncQueue.verifyOperationInProgress();const e=await uE(n);L(nn,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>ku(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>ku(t.remoteStore,i)),n._onlineComponents=t}async function uE(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){L(nn,"Using user provided OfflineComponentProvider");try{await Fo(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(i){return i.name==="FirebaseError"?i.code===V.FAILED_PRECONDITION||i.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(e))throw e;Je("Error using user provided cache. Falling back to memory cache: "+e),await Fo(n,new ws)}}else L(nn,"Using default OfflineComponentProvider"),await Fo(n,new aE(void 0));return n._offlineComponents}async function hE(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(L(nn,"Using user provided OnlineComponentProvider"),await xu(n,n._uninitializedComponentsProvider._online)):(L(nn,"Using default OnlineComponentProvider"),await xu(n,new ya))),n._onlineComponents}async function dE(n){const t=await hE(n),e=t.eventManager;return e.onListen=Xv.bind(null,t.syncEngine),e.onUnlisten=eE.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Zv.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=nE.bind(null,t.syncEngine),e}function fE(n,t,e={}){const r=new yn;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,c,u,d){const f=new lE({next:T=>{f.Ou(),a.enqueueAndForget(()=>qv(o,_)),T.fromCache&&u.source==="server"?d.reject(new M(V.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(T)},error:T=>d.reject(T)}),_=new Wv(c,f,{includeMetadataChanges:!0,ka:!0});return $v(o,_)}(await dE(n),n.asyncQueue,t,e,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zd(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mu=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tf="firestore.googleapis.com",Fu=!0;class Uu{constructor(t){var e,r;if(t.host===void 0){if(t.ssl!==void 0)throw new M(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=tf,this.ssl=Fu}else this.host=t.host,this.ssl=(e=t.ssl)!==null&&e!==void 0?e:Fu;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Md;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Zy)throw new M(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}$_("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Zd((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new M(V.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new M(V.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new M(V.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class el{constructor(t,e,r,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Uu({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new M(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new M(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Uu(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new D_;switch(r.type){case"firstParty":return new M_(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new M(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const r=Mu.get(e);r&&(L("ComponentProvider","Removing Datastore"),Mu.delete(e),r.terminate())}(this),Promise.resolve()}}function pE(n,t,e,r={}){var i;n=ra(n,el);const o=Sn(t),a=n._getSettings(),c=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),u=`${t}:${e}`;o&&(Aa(`https://${u}`),ba("Firestore",!0)),a.host!==tf&&a.host!==u&&Je("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const d=Object.assign(Object.assign({},a),{host:u,ssl:o,emulatorOptions:r});if(!wn(d,c)&&(n._setSettings(d),r.mockUserToken)){let f,_;if(typeof r.mockUserToken=="string")f=r.mockUserToken,_=Ot.MOCK_USER;else{f=Fp(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const T=r.mockUserToken.sub||r.mockUserToken.user_id;if(!T)throw new M(V.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");_=new Ot(T)}n._authCredentials=new O_(new Kh(f,_))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Cn(this.firestore,t,this._query)}}class Bt{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new $n(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Bt(this.firestore,t,this._key)}toJSON(){return{type:Bt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(ui(e,Bt._jsonSchema))return new Bt(t,r||null,new B(at.fromString(e.referencePath)))}}Bt._jsonSchemaVersion="firestore/documentReference/1.0",Bt._jsonSchema={type:yt("string",Bt._jsonSchemaVersion),referencePath:yt("string")};class $n extends Cn{constructor(t,e,r){super(t,e,pd(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Bt(this.firestore,null,new B(t))}withConverter(t){return new $n(this.firestore,t,this._path)}}function yT(n,t,...e){if(n=Jt(n),z_("collection","path",t),n instanceof el){const r=at.fromString(t,...e);return Yc(r),new $n(n,null,r)}{if(!(n instanceof Bt||n instanceof $n))throw new M(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(at.fromString(t,...e));return Yc(r),new $n(n.firestore,null,r)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ju="AsyncQueue";class Bu{constructor(t=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new Bd(this,"async_queue_retry"),this.oc=()=>{const r=Mo();r&&L(ju,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=t;const e=Mo();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.ac(),this.uc(t)}enterRestrictedMode(t){if(!this.Xu){this.Xu=!0,this.rc=t||!1;const e=Mo();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.oc)}}enqueue(t){if(this.ac(),this.Xu)return new Promise(()=>{});const e=new yn;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Zu.push(t),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(t){if(!cr(t))throw t;L(ju,"Operation failed with retryable error: "+t)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(t){const e=this._c.then(()=>(this.nc=!0,t().catch(r=>{throw this.tc=r,this.nc=!1,ke("INTERNAL UNHANDLED ERROR: ",zu(r)),r}).then(r=>(this.nc=!1,r))));return this._c=e,e}enqueueAfterDelay(t,e,r){this.ac(),this.sc.indexOf(t)>-1&&(e=0);const i=Ya.createAndSchedule(this,t,e,r,o=>this.lc(o));return this.ec.push(i),i}ac(){this.tc&&G(47125,{hc:zu(this.tc)})}verifyOperationInProgress(){}async Pc(){let t;do t=this._c,await t;while(t!==this._c)}Tc(t){for(const e of this.ec)if(e.timerId===t)return!0;return!1}Ic(t){return this.Pc().then(()=>{this.ec.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(const e of this.ec)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Pc()})}dc(t){this.sc.push(t)}lc(t){const e=this.ec.indexOf(t);this.ec.splice(e,1)}}function zu(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class ef extends el{constructor(t,e,r,i){super(t,e,r,i),this.type="firestore",this._queue=new Bu,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Bu(t),this._firestoreClient=void 0,await t}}}function gE(n,t){const e=typeof n=="object"?n:Ca(),r=typeof n=="string"?n:t||ps,i=Ls(e,"firestore").getImmediate({identifier:r});if(!i._initialized){const o=gh("firestore");o&&pE(i,...o)}return i}function mE(n){if(n._terminated)throw new M(V.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||_E(n),n._firestoreClient}function _E(n){var t,e,r;const i=n._freezeSettings(),o=function(c,u,d,f){return new ny(c,u,d,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Zd(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((e=i.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new cE(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(c){const u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Xt(Rt.fromBase64String(t))}catch(e){throw new M(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Xt(Rt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Xt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(ui(t,Xt._jsonSchema))return Xt.fromBase64String(t.bytes)}}Xt._jsonSchemaVersion="firestore/bytes/1.0",Xt._jsonSchema={type:yt("string",Xt._jsonSchemaVersion),bytes:yt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new M(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new xt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new M(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new M(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return K(this._lat,t._lat)||K(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ye._jsonSchemaVersion}}static fromJSON(t){if(ui(t,ye._jsonSchema))return new ye(t.latitude,t.longitude)}}ye._jsonSchemaVersion="firestore/geoPoint/1.0",ye._jsonSchema={type:yt("string",ye._jsonSchemaVersion),latitude:yt("number"),longitude:yt("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,i){if(r.length!==i.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==i[o])return!1;return!0}(this._values,t._values)}toJSON(){return{type:ve._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(ui(t,ve._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new ve(t.vectorValues);throw new M(V.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ve._jsonSchemaVersion="firestore/vectorValue/1.0",ve._jsonSchema={type:yt("string",ve._jsonSchemaVersion),vectorValues:yt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yE=/^__.*__$/;function sf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw G(40011,{Ec:n})}}class nl{constructor(t,e,r,i,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=i,o===void 0&&this.Ac(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(t){return new nl(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.Rc({path:r,mc:!1});return i.fc(t),i}gc(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.Rc({path:r,mc:!1});return i.Ac(),i}yc(t){return this.Rc({path:void 0,mc:!0})}wc(t){return va(t,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}Ac(){if(this.path)for(let t=0;t<this.path.length;t++)this.fc(this.path.get(t))}fc(t){if(t.length===0)throw this.wc("Document fields must not be empty");if(sf(this.Ec)&&yE.test(t))throw this.wc('Document fields cannot begin and end with "__"')}}class vE{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Qs(t)}Dc(t,e,r,i=!1){return new nl({Ec:t,methodName:e,bc:r,path:xt.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function EE(n){const t=n._freezeSettings(),e=Qs(n._databaseId);return new vE(n._databaseId,!!t.ignoreUndefinedProperties,e)}function TE(n,t,e,r=!1){return rl(e,n.Dc(r?4:3,t))}function rl(n,t){if(of(n=Jt(n)))return IE("Unsupported field value:",t,n),wE(n,t);if(n instanceof rf)return function(r,i){if(!sf(i.Ec))throw i.wc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.wc(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.mc&&t.Ec!==4)throw t.wc("Nested arrays are not supported");return function(r,i){const o=[];let a=0;for(const c of r){let u=rl(c,i.yc(a));u==null&&(u={nullValue:"NULL_VALUE"}),o.push(u),a++}return{arrayValue:{values:o}}}(n,t)}return function(r,i){if((r=Jt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Ay(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=lt.fromDate(r);return{timestampValue:da(i.serializer,o)}}if(r instanceof lt){const o=new lt(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:da(i.serializer,o)}}if(r instanceof ye)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Xt)return{bytesValue:Pd(i.serializer,r._byteString)};if(r instanceof Bt){const o=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw i.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:kd(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof ve)return function(a,c){return{mapValue:{fields:{[sd]:{stringValue:ad},[gs]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw c.wc("VectorValues must only contain numeric values.");return Ua(c.serializer,d)})}}}}}}(r,i);throw i.wc(`Unsupported field value: ${Us(r)}`)}(n,t)}function wE(n,t){const e={};return Zh(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ur(n,(r,i)=>{const o=rl(i,t.Vc(r));o!=null&&(e[r]=o)}),{mapValue:{fields:e}}}function of(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof lt||n instanceof ye||n instanceof Xt||n instanceof Bt||n instanceof rf||n instanceof ve)}function IE(n,t,e){if(!of(e)||!Yh(e)){const r=Us(e);throw r==="an object"?t.wc(n+" a custom object"):t.wc(n+" "+r)}}const AE=new RegExp("[~\\*/\\[\\]]");function bE(n,t,e){if(t.search(AE)>=0)throw va(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new nf(...t.split("."))._internalPath}catch{throw va(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function va(n,t,e,r,i){const o=r&&!r.isEmpty(),a=i!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(o||a)&&(u+=" (found",o&&(u+=` in field ${r}`),a&&(u+=` in document ${i}`),u+=")"),new M(V.INVALID_ARGUMENT,c+n+u)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class af{constructor(t,e,r,i,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new Bt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new SE(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(il("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class SE extends af{data(){return super.data()}}function il(n,t){return typeof t=="string"?bE(n,t):t instanceof nf?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RE(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new M(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class sl{}class lf extends sl{}function vT(n,t,...e){let r=[];t instanceof sl&&r.push(t),r=r.concat(e),function(o){const a=o.filter(u=>u instanceof ol).length,c=o.filter(u=>u instanceof Ys).length;if(a>1||a>0&&c>0)throw new M(V.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class Ys extends lf{constructor(t,e,r){super(),this._field=t,this._op=e,this._value=r,this.type="where"}static _create(t,e,r){return new Ys(t,e,r)}_apply(t){const e=this._parse(t);return cf(t._query,e),new Cn(t.firestore,t.converter,la(t._query,e))}_parse(t){const e=EE(t.firestore);return function(o,a,c,u,d,f,_){let T;if(d.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new M(V.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){qu(_,f);const P=[];for(const k of _)P.push($u(u,o,k));T={arrayValue:{values:P}}}else T=$u(u,o,_)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||qu(_,f),T=TE(c,a,_,f==="in"||f==="not-in");return _t.create(d,f,T)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function ET(n,t,e){const r=t,i=il("where",n);return Ys._create(i,r,e)}class ol extends sl{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new ol(t,e)}_parse(t){const e=this._queryConstraints.map(r=>r._parse(t)).filter(r=>r.getFilters().length>0);return e.length===1?e[0]:ue.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(i,o){let a=i;const c=o.getFlattenedFilters();for(const u of c)cf(a,u),a=la(a,u)}(t._query,e),new Cn(t.firestore,t.converter,la(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class al extends lf{constructor(t,e,r){super(),this.type=t,this._limit=e,this._limitType=r}static _create(t,e,r){return new al(t,e,r)}_apply(t){return new Cn(t.firestore,t.converter,ys(t._query,this._limit,this._limitType))}}function TT(n){return q_("limit",n),al._create("limit",n,"F")}function $u(n,t,e){if(typeof(e=Jt(e))=="string"){if(e==="")throw new M(V.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!gd(t)&&e.indexOf("/")!==-1)throw new M(V.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const r=t.path.child(at.fromString(e));if(!B.isDocumentKey(r))throw new M(V.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return su(n,new B(r))}if(e instanceof Bt)return su(n,e._key);throw new M(V.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Us(e)}.`)}function qu(n,t){if(!Array.isArray(n)||n.length===0)throw new M(V.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function cf(n,t){const e=function(i,o){for(const a of i)for(const c of a.getFlattenedFilters())if(o.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new M(V.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new M(V.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class CE{convertValue(t,e="none"){switch(tn(t)){case 0:return null;case 1:return t.booleanValue;case 2:return ht(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Ze(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw G(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return ur(t,(i,o)=>{r[i]=this.convertValue(o,e)}),r}convertVectorValue(t){var e,r,i;const o=(i=(r=(e=t.fields)===null||e===void 0?void 0:e[gs].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>ht(a.doubleValue));return new ve(o)}convertGeoPoint(t){return new ye(ht(t.latitude),ht(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":const r=$s(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(Jr(t));default:return null}}convertTimestamp(t){const e=Xe(t);return new lt(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=at.fromString(t);ct(xd(r),9688,{name:t});const i=new Yr(r.get(1),r.get(3)),o=new B(r.popFirst(5));return i.isEqual(e)||ke(`Document ${o} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}class ji{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class qn extends af{constructor(t,e,r,i,o,a){super(t,e,r,i,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Zi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(il("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new M(V.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=qn._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}qn._jsonSchemaVersion="firestore/documentSnapshot/1.0",qn._jsonSchema={type:yt("string",qn._jsonSchemaVersion),bundleSource:yt("string","DocumentSnapshot"),bundleName:yt("string"),bundle:yt("string")};class Zi extends qn{data(t={}){return super.data(t)}}class Gn{constructor(t,e,r,i){this._firestore=t,this._userDataWriter=e,this._snapshot=i,this.metadata=new ji(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(r=>{t.call(e,new Zi(this._firestore,this._userDataWriter,r.key,r,new ji(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new M(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(i,o){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(c=>{const u=new Zi(i._firestore,i._userDataWriter,c.doc.key,c.doc,new ji(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>o||c.type!==3).map(c=>{const u=new Zi(i._firestore,i._userDataWriter,c.doc.key,c.doc,new ji(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,f=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:PE(c.type),doc:u,oldIndex:d,newIndex:f}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new M(V.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Gn._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=Jh.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],i=[];return this.docs.forEach(o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),i.push(o.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function PE(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return G(61501,{type:n})}}Gn._jsonSchemaVersion="firestore/querySnapshot/1.0",Gn._jsonSchema={type:yt("string",Gn._jsonSchemaVersion),bundleSource:yt("string","QuerySnapshot"),bundleName:yt("string"),bundle:yt("string")};class kE extends CE{constructor(t){super(),this.firestore=t}convertBytes(t){return new Xt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Bt(this.firestore,null,e)}}function wT(n){n=ra(n,Cn);const t=ra(n.firestore,ef),e=mE(t),r=new kE(t);return RE(n._query),fE(e,n._query).then(i=>new Gn(t,r,n,i))}(function(t,e=!0){(function(i){lr=i})(xs),In(new Qe("firestore",(r,{instanceIdentifier:i,options:o})=>{const a=r.getProvider("app").getImmediate(),c=new ef(new L_(r.getProvider("auth-internal")),new F_(a,r.getProvider("app-check-internal")),function(d,f){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new M(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Yr(d.options.projectId,f)}(a,i),a);return o=Object.assign({useFetchStreams:e},o),c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),me(Hc,Wc,t),me(Hc,Wc,"esm2017")})();const VE={apiKey:"AIzaSyCAdXVRjHTtC1MqWEioaH8nZ9t-e6EMM5A",authDomain:"auth.glasp.co",databaseURL:"https://driven-current-285910.firebaseio.com",projectId:"driven-current-285910",storageBucket:"glasp_images",messagingSenderId:"843827296791",appId:"1:843827296791:web:6bc729caeb6e531701fa52",measurementId:"G-Z2FG8Y72WK"},ll=Eh(VE),rn=h_(ll),cl=V_(ll),IT=gE(ll),NE=24*60*60*1e3,uf=new fp({max:100,ttl:24*60*60*1e3});function DE(n){if(!n)return null;const t=uf.get(n);if(typeof t!="string"||!t)return null;try{return JSON.parse(t)}catch{return null}}function hf(n,t,e=NE){!n||!t||uf.set(n,JSON.stringify(t),{ttl:e})}const OE=1e4,Xs=new Promise(n=>{const t=setTimeout(()=>{n()},OE);rn.authStateReady().then(()=>{clearTimeout(t),n()},()=>{clearTimeout(t),n()})});class ul extends Error{constructor(t,e,r){super(e),this.status=t,this.code=r,this.name="ApiError"}}const LE=n=>{try{const t=JSON.parse(n),e=t==null?void 0:t.code;return typeof e=="string"?e:void 0}catch{return}};async function xE(){await Xs;const n=rn.currentUser;if(!n)throw new ul(401,"Not signed in");return gp(await n.getIdToken())}async function df(n,t={method:"GET"}){const e=await xE(),r=await fetch(`${wa}${n}`,{method:t.method,headers:e,body:t.body!==void 0?JSON.stringify(t.body):void 0,cache:"no-store"});if(!r.ok){const o=await r.text().catch(()=>"");throw new ul(r.status,o||r.statusText,LE(o))}if(r.status===204)return;const i=await r.text();if(i)try{return JSON.parse(i)}catch{return}}const ME=["en","ja","es","ko","pt-BR","fr","vi"],FE=[{value:"en",_label:"English",label:"English"},{value:"am",_label:"አማርኛ",label:"Amharic"},{value:"ar",_label:"العربية",label:"Arabic"},{value:"bn",_label:"বাংলা",label:"Bengali"},{value:"bg",_label:"Български език",label:"Bulgarian"},{value:"ca",_label:"Llengua Catalana",label:"Catalan"},{value:"zh-cn",_label:"中文 (简体)",label:"Chinese (Simplified)"},{value:"zh-tw",_label:"中文 (繁體)",label:"Chinese (Traditional)"},{value:"hr",_label:"Hrvatski jezik",label:"Croatian"},{value:"cs",_label:"Čeština",label:"Czech"},{value:"da",_label:"Dansk Sprog",label:"Danish"},{value:"nl",_label:"Nederlandse taal",label:"Dutch"},{value:"et",_label:"Eesti keel",label:"Estonian"},{value:"fil",_label:"Wikang Filipino",label:"Filipino"},{value:"fi",_label:"Suomi",label:"Finnish"},{value:"fr",_label:"Français",label:"French"},{value:"de",_label:"German",label:"German"},{value:"el",_label:"Ελληνική γλώσσα",label:"Greek"},{value:"gu",_label:"ગુજરાતી ભાષા",label:"Gujarati"},{value:"he",_label:"עברית",label:"Hebrew"},{value:"hi",_label:"हिन्दी",label:"Hindi"},{value:"hu",_label:"Magyar nyelv",label:"Hungarian"},{value:"id",_label:"Bahasa Indonesia",label:"Indonesian"},{value:"it",_label:"Italiano",label:"Italian"},{value:"ja",_label:"日本語",label:"Japanese"},{value:"kn",_label:"ಕನ್ನಡ ಭಾಷೆ",label:"Kannada"},{value:"ko",_label:"한국어",label:"Korean"},{value:"lv",_label:"Latviešu valoda",label:"Latvian"},{value:"lt",_label:"Lietuvių kalba",label:"Lithuanian"},{value:"ms",_label:"Bahasa Melayu",label:"Malay"},{value:"ml",_label:"മലയാളം ഭാഷ",label:"Malayalam"},{value:"mr",_label:"मराठी भाषा",label:"Marathi"},{value:"no",_label:"Norsk",label:"Norwegian"},{value:"fa",_label:"فارسی",label:"Persian"},{value:"pl",_label:"Język polski",label:"Polish"},{value:"pt",_label:"Português",label:"Portuguese (Portugal)"},{value:"pt-br",_label:"Português (Brasil)",label:"Portuguese (Brazil)"},{value:"ro",_label:"Limba Română",label:"Romanian"},{value:"ru",_label:"Русский",label:"Russian"},{value:"sr",_label:"Српски језик",label:"Serbian"},{value:"sk",_label:"Slovenský jazyk",label:"Slovak"},{value:"sl",_label:"Slovenščina",label:"Slovenian"},{value:"es",_label:"Español",label:"Spanish"},{value:"sw",_label:"Lugha ya Kiswahili",label:"Swahili"},{value:"sv",_label:"Svenska",label:"Swedish"},{value:"ta",_label:"தமிழ் மொழி",label:"Tamil"},{value:"te",_label:"తెలుగు భాష",label:"Telugu"},{value:"th",_label:"ภาษาไทย",label:"Thai"},{value:"tr",_label:"Türkçe",label:"Turkish"},{value:"uk",_label:"Українська",label:"Ukrainian"},{value:"vi",_label:"Tiếng Việt",label:"Vietnamese"}],UE=[];let Gu;function hl(){return Gu??(Gu=jE()),Gu}async function jE(){try{const n=await Ge.storage.local.get(["language","summaryLanguage"]);if(n.summaryLanguage!==void 0){n.language!==void 0&&await Ge.storage.local.remove("language");return}let t;return typeof n.language=="string"&&n.language&&n.language!=="en"&&(t=n.language,await tr("summaryLanguage",n.language)),n.language!==void 0&&await Ge.storage.local.remove("language"),t}catch{return}}const bn=lp,ff="/settings/preferences",BE=6*60*60*1e3,Hu=60*1e3,zE=2e3,$E=5*60*1e3,Is=n=>{if(n===null||typeof n!="object")return JSON.stringify(n)??"und";if(Array.isArray(n))return`[${n.map(Is).join(",")}]`;const t=n;return`{${Object.keys(t).sort().map(r=>`${JSON.stringify(r)}:${Is(t[r])}`).join(",")}}`},En=(n,t)=>Is(n)===Is(t),qE=new Set(["auto",...FE.map(n=>n.value)]),GE=new Set(["auto",...ME]),Bi=new Set(["visible","hidden"]),HE=new Set(["auto","light","dark"]),WE=new Set(["plaintext","markdown"]),KE=new Set(["chunk","start_to_limit","entire_content"]),Fr=n=>typeof n=="boolean",Wu=n=>t=>typeof t=="string"&&t.length<=n,Ae=n=>t=>typeof t=="string"&&n.has(t),Ku=n=>typeof n=="string"&&n.length<=2048&&(n===""||/^https?:\/\//.test(n)),QE=n=>typeof n=="string"&&/^[\w.-]{1,64}$/.test(n)&&!UE.includes(n),JE=n=>{if(typeof n!="object"||n===null)return null;const t=n,e=Fn(t[1]),r=Fn(t[2]),i=Fn(t[3]);return e===null||r===null||i===null?null:{1:e,2:r,3:i}},YE=["title","source","author","published","created","description","image","site"],XE=n=>{if(typeof n!="object"||n===null)return null;const t=n;if(!Wu(512)(t.folder))return null;const e=Fn(t.summaryTemplate),r=Fn(t.highlightsTemplate);if(e===null||r===null||typeof t.properties!="object"||t.properties===null)return null;const i=t.properties,o={};for(const a of YE){const c=i[a];if(typeof c!="object"||c===null)return null;const u=c;if(!Fr(u.enabled)||!Wu(128)(u.name))return null;o[a]={enabled:u.enabled,name:u.name}}return{folder:t.folder,properties:o,summaryTemplate:e,highlightsTemplate:r}},As={summaryLanguage:n=>Ae(qE)(n)?n:null,displayLanguage:n=>Ae(GE)(n)?n:null,theme:n=>Ae(HE)(n)?n:null,copyFormat:n=>Ae(WE)(n)?n:null,llm:n=>QE(n)?n:null,temporaryChat:n=>Fr(n)?n:null,chatGptPaidUser:n=>Fr(n)?n:null,claudePaidUser:n=>Fr(n)?n:null,customGPTsURL:n=>Ku(n)?n:null,geminiURL:n=>Ku(n)?n:null,customPrompt:Fn,followupPrompts:JE,summaryStrategy:n=>Ae(KE)(n)?n:null,ytSummaryWidgetVisibility:n=>Ae(Bi)(n)?n:null,summaryIconVisibility:n=>Ae(Bi)(n)?n:null,summaryIconOnVideoThumbnailVisibility:n=>Ae(Bi)(n)?n:null,summaryIconInVideoPlayer:n=>Ae(Bi)(n)?n:null,showWidgetMessage:n=>Fr(n)?n:null,obsidianExport:XE},pf=n=>bn.includes(n),ZE=n=>{const t={};for(const e of bn){const r=n[e];if(r===void 0)continue;const i=As[e](r);i!==null&&(t[e]=i)}return t},Be=async n=>{var e;const t=(e=await Ns("prefsSyncState"))==null?void 0:e.prefsSyncState;if(!(!t||t.ownerUid&&t.ownerUid!==n))return t},Hn=async()=>{const n=await Ns([...bn]),t={};for(const e of bn){const r=n==null?void 0:n[e];r!==void 0&&(t[e]=r)}return t},bs=(n,t,e)=>{const r=[];for(const i of n){if(!pf(i)||r.includes(i))continue;const o=t[i];if(o===void 0)continue;const a=As[i](o);a!==null&&(En(a,e[i])||r.push(i))}return r};let Ea=!1,Qu=0,zi,$i=null,mt=null;const tT=n=>(mt==null?void 0:mt.uid)===n?[...mt.keys]:[],Uo=(n,t)=>{mt=t.length?{uid:n,keys:new Set(t)}:null},gf=(n,t)=>{if(t.length){(mt==null?void 0:mt.uid)!==n&&(mt={uid:n,keys:new Set});for(const e of t)mt.keys.add(e)}},Re=(n,t)=>{const e=t&&(!t.pendingUid||t.pendingUid===n)?t.pendingKeys??[]:[];return[...new Set([...e,...tT(n)])]},mf=n=>{const e=($i??Promise.resolve()).then(n,n).finally(()=>{$i===e&&($i=null)});return $i=e,e},Ss=n=>{var t;return((t=rn.currentUser)==null?void 0:t.uid)!==n},_f=async()=>(await Sp()).preferencesSync;async function Ta(){var u;await Xs,await hl();const n=(u=rn.currentUser)==null?void 0:u.uid;if(!n||!await _f())return;const t=await Be(n),e=Re(n,t);if(e.length===0||(t==null?void 0:t.lastPushFailureAt)!==void 0&&Date.now()-t.lastPushFailureAt<$E)return;const r=(t==null?void 0:t.lastSynced)??{},i=await Hn(),o=bs(e,i,r),a=async d=>{const f=await Be(n);await tr("prefsSyncState",{ownerUid:n,lastPullAt:(f==null?void 0:f.lastPullAt)??(t==null?void 0:t.lastPullAt)??0,pendingKeys:[],pendingUid:void 0,lastPushFailureAt:f==null?void 0:f.lastPushFailureAt,lastSynced:(f==null?void 0:f.lastSynced)??r,...d})};if(o.length===0){Uo(n,[]),e.length&&await a({pendingKeys:[],pendingUid:void 0});return}const c={};for(const d of o)c[d]=As[d](i[d]);try{if(await df(ff,{method:"PATCH",body:c}),Ss(n))return;const[d,f]=await Promise.all([Hn(),Be(n)]),_={...r,...f==null?void 0:f.lastSynced,...c},T=bs(Re(n,f),d,_);Uo(n,T),await tr("prefsSyncState",{ownerUid:n,lastPullAt:(f==null?void 0:f.lastPullAt)??(t==null?void 0:t.lastPullAt)??0,pendingKeys:T,pendingUid:T.length?n:void 0,lastPushFailureAt:void 0,lastSynced:_})}catch(d){if(Ss(n))return;if(d instanceof ul&&d.status>=400&&d.status<500&&d.status!==401){const T=new Set(o),[R,P]=await Promise.all([Hn(),Be(n)]),k=Re(n,P).filter(N=>!T.has(N)||!pf(N)||!En(As[N](R[N]),c[N]));Uo(n,k),await a({pendingKeys:k,pendingUid:k.length?n:void 0,lastPushFailureAt:void 0});return}const _=Re(n,await Be(n));gf(n,_),await a({pendingKeys:_,pendingUid:_.length?n:void 0,lastPushFailureAt:Date.now()})}}async function eT(n){var R;await Xs,await hl();const t=(R=rn.currentUser)==null?void 0:R.uid;if(!t||!await _f())return;const e=await Be(t),r=Re(t,e);if(r.length>0&&bs(r,await Hn(),(e==null?void 0:e.lastSynced)??{}).length>0){await Ta();return}const i=e?Date.now()-e.lastPullAt:1/0;if(!n&&i<BE||n&&i<Hu||Date.now()-Qu<Hu||Ss(t))return;Qu=Date.now();const o=Re(t,e);await tr("prefsSyncState",{ownerUid:t,lastPullAt:Date.now(),pendingKeys:o,pendingUid:o.length?t:void 0,lastPushFailureAt:e==null?void 0:e.lastPushFailureAt,lastSynced:(e==null?void 0:e.lastSynced)??{}});const a=await Hn();let c;try{const P=await df(ff),k=P==null?void 0:P.preferences;if(!k||typeof k!="object")return;c=ZE(k)}catch{return}if(Ss(t))return;const u=await Be(t),d=await Hn();if(bs(Re(t,u),d,(u==null?void 0:u.lastSynced)??{}).length>0){await Ta();return}const _={};for(const P of bn){const k=c[P];k!==void 0&&!En(k,d[P])&&En(d[P],a[P])&&(_[P]=k)}const T={ownerUid:t,lastPullAt:Date.now(),pendingKeys:[],pendingUid:void 0,lastPushFailureAt:u==null?void 0:u.lastPushFailureAt,lastSynced:{...u==null?void 0:u.lastSynced,...c}};if((mt==null?void 0:mt.uid)===t){for(const P of Re(t,u))mt.keys.delete(P);mt.keys.size===0&&(mt=null)}Ea=!0;try{await Ge.storage.local.set({..._,prefsSyncState:T})}finally{Ea=!1}}const ts=(n=!1)=>mf(()=>eT(n)),AT=()=>ts(!0),bT=async()=>{mt=null,await ap("prefsSyncState")};let qi,Ju=!1;const nT=async n=>{var c,u,d;if(await Xs,Ju||(qi=await hl(),Ju=!0),qi!==void 0&&En(n.summaryLanguage,qi)&&(delete n.summaryLanguage,qi=void 0,Object.keys(n).length===0))return;const t=((c=rn.currentUser)==null?void 0:c.uid)??((d=(u=await Ns("user"))==null?void 0:u.user)==null?void 0:d.uid);if(!t)return;const e=await Be(t),r=bn.filter(f=>{var _;return n[f]!==void 0&&!En(n[f],(_=e==null?void 0:e.lastSynced)==null?void 0:_[f])}),i=[...new Set([...Re(t,e),...r])];if(i.length===0)return;gf(t,i);const o=r.length||e==null?void 0:e.lastPushFailureAt;e!==void 0&&e.pendingUid===t&&e.lastPushFailureAt===o&&En([...e.pendingKeys??[]].sort(),[...i].sort())||await tr("prefsSyncState",{ownerUid:t,lastPullAt:(e==null?void 0:e.lastPullAt)??0,pendingKeys:i,pendingUid:t,lastPushFailureAt:o,lastSynced:(e==null?void 0:e.lastSynced)??{}}),zi&&clearTimeout(zi),zi=setTimeout(()=>{zi=void 0,mf(()=>Ta())},zE)};function ST(){Qm(rn,n=>{mt&&mt.uid!==(n==null?void 0:n.uid)&&(mt=null),n&&ts()}),Ge.runtime.onInstalled.addListener(()=>void ts(!0)),Ge.runtime.onStartup.addListener(()=>void ts(!0)),Ge.storage.onChanged.addListener((n,t)=>{var r;if(t!=="local"||Ea)return;const e={};for(const i of bn)i in n&&(e[i]=(r=n[i])==null?void 0:r.newValue);Object.keys(e).length!==0&&nT(e)})}const RT=async({data:n})=>{try{Da(cl,"cf-logs-sendGlaspLog")(n)}catch{return}};async function CT(n){return(await Da(cl,"cf-api-getYtScripts")(n)).data}const PT=n=>{(async()=>{try{const t={"Content-Type":"application/json",...Ds()},e=rn.currentUser;e&&(t.Authorization=`Bearer ${await e.getIdToken()}`),await fetch(`${wa}/summaries/prompt`,{method:"POST",headers:t,body:JSON.stringify(n)})}catch{}})()},yf=Da(cl,"cf-api-youtube"),vf="yt-transcript-exists",Ef=1e3*60*60*24;async function kT(n,t){try{const e=`${vf}-${n}-${t}`;if(DE(e))return!1;const i=(await yf({action:"check",videoId:n,langCode:t})).data,o=(i==null?void 0:i.status)==="success"&&"next"in i?i.next:!0;return o||hf(e,!0,Ef),o}catch{return!0}}function VT(n,t=!1){const e=`${vf}-${n.videoId}-${n.langCode}`;hf(e,!0,Ef),yf({action:"log",doc:n,isDefault:t})}export{wa as A,AT as B,Sp as C,NE as D,hl as E,ST as F,FE as G,dT as H,lT as I,sh as J,lp as K,uh as L,pT as M,Go as P,uT as S,fp as U,_c as _,cT as a,Rp as b,DE as c,IT as d,yT as e,wT as f,hT as g,hf as h,rn as i,gp as j,Xs as k,TT as l,df as m,mT as n,Qm as o,bT as p,vT as q,ul as r,gT as s,fT as t,RT as u,kT as v,ET as w,VT as x,PT as y,CT as z};
