import{S as Z,i as ee,s as te,k as r,q as g,a as k,l as a,m as o,r as b,h as s,c as x,n as d,b as se,F as e,u as re,A as X,G as ae}from"../../chunks/index-92b119e8.js";import{s as oe}from"../../chunks/singletons-2b362108.js";const ne=()=>{const c=oe,t={page:{subscribe:c.page.subscribe},navigating:{subscribe:c.navigating.subscribe},updated:c.updated};return Object.defineProperties(t,{preloading:{get(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:c.navigating.subscribe}},enumerable:!1},session:{get(){return ce(),{}},enumerable:!1}}),t},ie={subscribe(c){return ne().page.subscribe(c)}};function ce(){throw new Error("stores.session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")}function le(c){let t,l,h,n,D,O,P,I,R,j,p,q,A,f,i,y,B,G,V,L,M,m,U,Y,_,S=c[0].error.message+"",$;return{c(){t=r("div"),l=r("div"),h=r("div"),n=r("div"),D=r("h2"),O=g("Uh Oh"),P=k(),I=r("p"),R=g("Looks like something went wrong. You can return to the home page to restart the app."),j=k(),p=r("a"),q=g("Back Home"),A=k(),f=r("div"),i=r("div"),y=r("h3"),B=g("Error"),G=k(),V=r("strong"),L=g("Report Error"),M=k(),m=r("p"),U=g("If you'd like to help us make Matr better, copy the orange error below and share it with our devs in Discord so we can be sure to get it fixed."),Y=k(),_=r("p"),$=g(S),this.h()},l(v){t=a(v,"DIV",{class:!0});var E=o(t);l=a(E,"DIV",{class:!0});var H=o(l);h=a(H,"DIV",{class:!0});var C=o(h);n=a(C,"DIV",{class:!0});var w=o(n);D=a(w,"H2",{});var F=o(D);O=b(F,"Uh Oh"),F.forEach(s),P=x(w),I=a(w,"P",{});var N=o(I);R=b(N,"Looks like something went wrong. You can return to the home page to restart the app."),N.forEach(s),j=x(w),p=a(w,"A",{class:!0,href:!0});var T=o(p);q=b(T,"Back Home"),T.forEach(s),w.forEach(s),C.forEach(s),A=x(H),f=a(H,"DIV",{class:!0});var z=o(f);i=a(z,"DIV",{class:!0});var u=o(i);y=a(u,"H3",{});var J=o(y);B=b(J,"Error"),J.forEach(s),G=x(u),V=a(u,"STRONG",{});var K=o(V);L=b(K,"Report Error"),K.forEach(s),M=x(u),m=a(u,"P",{class:!0});var Q=o(m);U=b(Q,"If you'd like to help us make Matr better, copy the orange error below and share it with our devs in Discord so we can be sure to get it fixed."),Q.forEach(s),Y=x(u),_=a(u,"P",{class:!0});var W=o(_);$=b(W,S),W.forEach(s),u.forEach(s),z.forEach(s),H.forEach(s),E.forEach(s),this.h()},h(){d(p,"class","button button-green"),d(p,"href","/"),d(n,"class","card"),d(h,"class","col-12"),d(m,"class","mt-0 text-micro"),d(_,"class","text-gold"),d(i,"class","card"),d(f,"class","col-12"),d(l,"class","row"),d(t,"class","container")},m(v,E){se(v,t,E),e(t,l),e(l,h),e(h,n),e(n,D),e(D,O),e(n,P),e(n,I),e(I,R),e(n,j),e(n,p),e(p,q),e(l,A),e(l,f),e(f,i),e(i,y),e(y,B),e(i,G),e(i,V),e(V,L),e(i,M),e(i,m),e(m,U),e(i,Y),e(i,_),e(_,$)},p(v,[E]){E&1&&S!==(S=v[0].error.message+"")&&re($,S)},i:X,o:X,d(v){v&&s(t)}}}function de(c,t,l){let h;return ae(c,ie,n=>l(0,h=n)),[h]}class pe extends Z{constructor(t){super(),ee(this,t,de,le,te,{})}}export{pe as default};
