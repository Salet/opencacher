(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){},16:function(e,t,a){},17:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(2),s=a.n(o),i=(a(15),a(7)),c=a(3),h=a(4),l=a(6),u=a(5),d=a(8),f=(a(16),"https://opencaching.pl/okapi/"),v="?consumer_key=8v5yBJfdTpcsxEnzUPah",m=function(e){function t(e,a){var n;return Object(c.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={nearestCodes:[],nearestDetails:[],error:"",currentPosition:null},navigator.geolocation?n.getNearestCaches():n.setState({error:"No location services available"}),n}return Object(d.a)(t,e),Object(h.a)(t,[{key:"getNearestCaches",value:function(){var e=this;navigator.geolocation.getCurrentPosition(function(t){e.setState({currentPosition:t}),e.handleCurrentPosition.call(e,t)},function(t){e.setState({error:"Please allow location services for this browser"})})}},{key:"handleCurrentPosition",value:function(e){this.fetchCachesNearest(e).then(this.handleCachesNearest.bind(this))}},{key:"handleCachesNearest",value:function(e){this.setState({nearestCodes:e.results}),this.fetchCachesDetails(this.state.nearestCodes).then(this.handleCachesDetails.bind(this))}},{key:"handleCachesDetails",value:function(e){var t=[],a=!0,n=!1,r=void 0;try{for(var o,s=this.state.nearestCodes[Symbol.iterator]();!(a=(o=s.next()).done);a=!0){var c=o.value;t.push(Object(i.a)({distance:this.calculateDistance(this.state.currentPosition.coords.latitude,this.state.currentPosition.coords.longitude,+e[c].location.split("|")[0],+e[c].location.split("|")[1])},e[c]))}}catch(h){n=!0,r=h}finally{try{a||null==s.return||s.return()}finally{if(n)throw r}}this.setState({nearestDetails:t})}},{key:"calculateDistance",value:function(e,t,a,n){var r=a*Math.PI/180-e*Math.PI/180,o=n*Math.PI/180-t*Math.PI/180,s=Math.sin(r/2)*Math.sin(r/2)+Math.cos(e*Math.PI/180)*Math.cos(a*Math.PI/180)*Math.sin(o/2)*Math.sin(o/2);return 1e3*(6378.137*(2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s))))}},{key:"fetchCachesNearest",value:function(e){var t="".concat(f).concat("services/caches/search/nearest").concat(v,"&center=").concat(e.coords.latitude,"|").concat(e.coords.longitude);return fetch(t).then(function(e){return e.json()})}},{key:"fetchCachesDetails",value:function(e){var t="".concat(f).concat("services/caches/geocaches").concat(v,"&cache_codes=").concat(e.join("|"),"&fields=code|name|location|type|status|size2|difficulty|terrain|rating|recommendations");return fetch(t).then(function(e){return e.json()})}},{key:"renderCache",value:function(e){return r.a.createElement("div",{style:{border:"1px solid #eee",borderRadius:"3px",padding:"10px",marginBottom:"10px"}},r.a.createElement("h3",{style:{margin:0}},e.name),r.a.createElement("p",null,"Dystans: ",Math.round(e.distance),"m | Typ: ",e.type," | Ocena: ",e.rating," | Rozmiar: ",e.size2," | Teren: ",e.terrain," | Rekomendacje: ",e.recommendations))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{style:{maxWidth:"1100px",margin:"0 auto"}},this.state.error,this.state.nearestDetails.map(function(t){return e.renderCache(t)}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,a){e.exports=a(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.6d25857c.chunk.js.map