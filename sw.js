if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let d={};const t=e=>n(e,o),l={module:{uri:o},exports:d,require:t};i[o]=Promise.all(r.map((e=>l[e]||t(e)))).then((e=>(s(...e),d)))}}define(["./workbox-f3e6b16a"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-03Icl4cD.js",revision:null},{url:"assets/index-BP4gRrqP.css",revision:null},{url:"favicon.svg",revision:"8576c97d87e60795212b276a3a5b9549"},{url:"icon-192x192.png",revision:"2458730546b874d9a59b89d72a62198d"},{url:"icon-512x512.png",revision:"1e29d04b0eb787a9531d279f763ac144"},{url:"index.html",revision:"0d17995b4c28810849f4b0443e5707f4"},{url:"registerSW.js",revision:"b185fde45807874ddf001f560aa8cd4f"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"icon-192x192.png",revision:"2458730546b874d9a59b89d72a62198d"},{url:"icon-512x512.png",revision:"1e29d04b0eb787a9531d279f763ac144"},{url:"manifest.webmanifest",revision:"abf85c4a000bf4b647f07ed512287e2a"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
