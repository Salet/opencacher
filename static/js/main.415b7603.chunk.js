(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a(20)},,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(9),c=a.n(o),l=(a(16),a(1)),s=a(2),r=a(4),h=a(3),u=a(5),d=(a(17),a(7)),m=a(6),p="https://opencaching.pl/okapi/",g="?consumer_key=8v5yBJfdTpcsxEnzUPah",b=function(){function e(){Object(l.a)(this,e)}return Object(s.a)(e,[{key:"fetchCachesNearest",value:function(e){var t="".concat(p).concat("services/caches/search/nearest").concat(g,"&center=").concat(e.latitude,"|").concat(e.longitude);return fetch(t).then(function(e){return e.json()})}},{key:"fetchCachesDetails",value:function(e){var t="".concat(p).concat("services/caches/geocaches").concat(g,"&cache_codes=").concat(e.join("|"),"&fields=code|name|location|type|status|size2|difficulty|terrain|rating|recommendations");return fetch(t).then(function(e){return e.json()})}},{key:"fetchCacheDetails",value:function(e){var t="".concat(p).concat("services/caches/geocache").concat(g,"&cache_code=").concat(e,"&fields=description|latest_logs");return fetch(t).then(function(e){return e.json()})}}]),e}();function v(e){return e*Math.PI/180}function E(e,t){var a=v(e.latitude),n=v(e.longitude),i=v(t.latitude),o=v(t.longitude),c=Math.sin(o-n)*Math.cos(i),l=Math.cos(a)*Math.sin(i)-Math.sin(a)*Math.cos(i)*Math.cos(o-n),s=Math.atan2(c,l);return((s=180*s/Math.PI)+360)%360}function f(e,t){var a=v(e.latitude),n=v(e.longitude),i=v(t.latitude),o=i-a,c=v(t.longitude)-n,l=Math.sin(o/2)*Math.sin(o/2)+Math.cos(a)*Math.cos(i)*Math.sin(c/2)*Math.sin(c/2);return 12756.274*Math.atan2(Math.sqrt(l),Math.sqrt(1-l))*1e3}a(18);var y=function(e){function t(e,a){var n;return Object(l.a)(this,t),(n=Object(r.a)(this,Object(h.a)(t).call(this,e,a))).cachesService=new b,n.state={nearestCodes:[],nearestDetails:[]},n.cachesService.fetchCachesNearest(n.props.geolocation).then(n.handleCachesNearest.bind(Object(m.a)(Object(m.a)(n)))),n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidUpdate",value:function(e){this.props.geolocation.latitude!==e.geolocation.latitude&&this.cachesService.fetchCachesNearest(this.props.geolocation).then(this.handleCachesNearest.bind(this))}},{key:"handleCachesNearest",value:function(e){this.setState({nearestCodes:e.results}),this.cachesService.fetchCachesDetails(this.state.nearestCodes).then(this.handleCachesDetails.bind(this))}},{key:"handleCachesDetails",value:function(e){var t=[],a=!0,n=!1,i=void 0;try{for(var o,c=this.state.nearestCodes[Symbol.iterator]();!(a=(o=c.next()).done);a=!0){var l=o.value;e[l]&&t.push(Object(d.a)({distance:e[l].location?f({latitude:this.props.geolocation.latitude,longitude:this.props.geolocation.longitude},{latitude:+e[l].location.split("|")[0],longitude:+e[l].location.split("|")[1]}):0},e[l]))}}catch(s){n=!0,i=s}finally{try{a||null==c.return||c.return()}finally{if(n)throw i}}this.setState({nearestDetails:t})}},{key:"renderCache",value:function(e){var t=this;return i.a.createElement("div",{className:"Nearby-cache",key:e.code,onClick:function(){t.props.onCacheClick(e)}},i.a.createElement("h3",null,e.name),i.a.createElement("p",null,"Dystans: ~",Math.round(e.distance),"m | Typ: ",e.type," | Ocena:"," ",e.rating," | Rozmiar: ",e.size2," | Teren: ",e.terrain," | Rekomendacje: ",e.recommendations),i.a.createElement("hr",{className:"Nearby-separator"}))}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"Nearby"},!this.state.nearestDetails.length&&i.a.createElement("p",null,"Loading..."),this.state.nearestDetails.map(function(t){return e.renderCache(t)}))}}]),t}(n.Component),C=(a(19),{distance:0,code:"",name:"",location:"",status:"",type:"",size2:"",difficulty:0,terrain:0,rating:0,recommendations:0,description:"",latest_logs:[]}),k=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(r.a)(this,Object(h.a)(t).call(this,e))).cachesService=new b,a.interval=void 0,a.state={cache:Object(d.a)({},C,e.cache),bearing:0,distance:0},a.interval=setInterval(function(){a.props.onRefreshGeolocation()},300),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.cachesService.fetchCacheDetails(this.props.cache.code).then(function(t){var a=Object(d.a)({},e.state.cache,t);e.setState({cache:a})})}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"componentDidUpdate",value:function(e){this.props.geolocation.latitude===e.geolocation.latitude&&this.props.geolocation.longitude===e.geolocation.longitude||this.setState({bearing:E({latitude:this.props.geolocation.latitude,longitude:this.props.geolocation.longitude},{latitude:+this.props.cache.location.split("|")[0],longitude:+this.props.cache.location.split("|")[1]}),distance:f({latitude:this.props.geolocation.latitude,longitude:this.props.geolocation.longitude},{latitude:+this.props.cache.location.split("|")[0],longitude:+this.props.cache.location.split("|")[1]})})}},{key:"renderLog",value:function(e){var t=new Date(e.date);return i.a.createElement("div",{key:e.uuid},i.a.createElement("b",null,e.user.username," - ",e.type," - ",t.toLocaleString()),i.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.comment}}),i.a.createElement("hr",null))}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("h3",null,this.state.cache.name),i.a.createElement("h5",null,this.state.cache.code),i.a.createElement("br",null),i.a.createElement("p",null,i.a.createElement("b",null,"Status:")," ",this.state.cache.status),i.a.createElement("p",null,i.a.createElement("b",null,"Typ:")," ",this.state.cache.type),i.a.createElement("p",null,i.a.createElement("b",null,"Ocena:")," ",this.state.cache.rating,"/5"),i.a.createElement("p",null,i.a.createElement("b",null,"Rekomendacje:")," ",this.state.cache.recommendations),i.a.createElement("p",null,i.a.createElement("b",null,"Rozmiar:")," ",this.state.cache.size2),i.a.createElement("p",null,i.a.createElement("b",null,"Trudno\u015b\u0107:")," ",this.state.cache.difficulty,"/5"),i.a.createElement("p",null,i.a.createElement("b",null,"Teren:")," ",this.state.cache.terrain,"/5"),i.a.createElement("p",null,i.a.createElement("b",null,"GPS:")," ",this.state.cache.location.split("|").join(" ")),i.a.createElement("br",null),i.a.createElement("hr",null),i.a.createElement("hr",null),i.a.createElement("br",null),i.a.createElement("div",{className:"Compass"},i.a.createElement("div",{className:"Compass-background",style:{transform:"rotateZ(".concat(360-this.props.heading,"deg)")}},i.a.createElement("span",{className:"Compass-north"},"N")),i.a.createElement("div",{className:"Compass-cache",style:{transform:"rotateZ(".concat(360-this.props.heading+this.state.bearing,"deg)")}},"|"),i.a.createElement("div",{className:"Compass-front"},i.a.createElement("br",null),"|"),i.a.createElement("div",{className:"Compass-distance"},this.state.distance.toFixed(2),"m")),i.a.createElement("br",null),i.a.createElement("hr",null),i.a.createElement("hr",null),i.a.createElement("br",null),i.a.createElement("div",{dangerouslySetInnerHTML:{__html:this.state.cache.description}}),i.a.createElement("br",null),i.a.createElement("hr",null),i.a.createElement("hr",null),i.a.createElement("br",null),this.state.cache.latest_logs.map(this.renderLog))}}]),t}(n.Component),O=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(r.a)(this,Object(h.a)(t).call(this,e))).state={page:"nearby",currentCache:null,geolocationReliable:!1,geolocationObject:!!navigator.geolocation,geolocationEnabled:!1,geolocation:{latitude:0,longitude:0,accuracy:0},orientationReliable:!1,orientationRelativeEvents:"ondeviceorientation"in window,orientationAbsoluteEvents:"ondeviceorientationabsolute"in window,orientation:{absolute:!1,alpha:0,beta:0,gamma:0,webkitCompassHeading:0,trueBearing:0}},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){window.addEventListener(this.state.orientationAbsoluteEvents?"deviceorientationabsolute":"deviceorientation",this.handleOrientationEvent.bind(this),!0),this.state.geolocationObject&&this.performGeolocation()}},{key:"performGeolocation",value:function(){navigator.geolocation.getCurrentPosition(this.handlePositionEvent.bind(this),function(){},{enableHighAccuracy:!0})}},{key:"handleOrientationEvent",value:function(e){this.state.orientationReliable||this.setState({orientationReliable:!!e.webkitCompassHeading||e.absolute&&!!e.alpha}),this.setState({orientation:{absolute:e.absolute||!1,alpha:+(e.alpha||0).toFixed(2),beta:+(e.beta||0).toFixed(2),gamma:+(e.gamma||0).toFixed(2),webkitCompassHeading:+(e.webkitCompassHeading||0).toFixed(2),trueBearing:((e.absolute?e.alpha:e.webkitCompassHeading)||0).toFixed(2)}})}},{key:"handlePositionEvent",value:function(e){this.state.geolocationEnabled||this.setState({geolocationEnabled:!0}),this.state.geolocationReliable||this.setState({geolocationReliable:!!e.coords.latitude||!!e.coords.longitude}),this.setState({geolocation:{latitude:e.coords.latitude,longitude:e.coords.longitude,accuracy:e.coords.accuracy}})}},{key:"handleCacheClick",value:function(e){this.setState({currentCache:e}),this.setPage("details")}},{key:"setPage",value:function(e){this.setState({page:e})}},{key:"render",value:function(){return i.a.createElement("div",{className:"App"},i.a.createElement("h1",null,"Opencacher"),i.a.createElement("div",{className:"App-menu"},i.a.createElement("a",{href:"#",onClick:this.setPage.bind(this,"nearby")},"Nearby")," ","|\xa0",i.a.createElement("a",{href:"#",onClick:this.setPage.bind(this,"debug")},"Debug info")),"debug"==this.state.page&&i.a.createElement("div",null,i.a.createElement("p",null,"Geolocation object: ",this.state.geolocationObject?"yes":"no"),i.a.createElement("p",null,"Geolocation enabled:"," ",this.state.geolocationEnabled?"yes":"no"),i.a.createElement("p",null,"Geolocation reading: ",JSON.stringify(this.state.geolocation)),i.a.createElement("b",null,"Geolocation reliable:"," ",this.state.geolocationReliable?"yes":"no"),i.a.createElement("p",null,"-----"),i.a.createElement("p",null,"Orientation relative events:"," ",this.state.orientationRelativeEvents?"yes":"no"),i.a.createElement("p",null,"Orientation absolute events:"," ",this.state.orientationAbsoluteEvents?"yes":"no"),i.a.createElement("p",null,"Orientation webkit events:"," ",this.state.orientation.webkitCompassHeading?"yes":"no"),i.a.createElement("p",null,"Orientation reading: ",JSON.stringify(this.state.orientation)),i.a.createElement("b",null,"Orientation reliable:"," ",this.state.orientationReliable?"yes":"no")),"nearby"==this.state.page&&(this.state.geolocationReliable&&i.a.createElement(y,{geolocation:this.state.geolocation,onCacheClick:this.handleCacheClick.bind(this)})||!this.state.geolocationEnabled&&i.a.createElement("p",null,"Please enable geolocation permission for your browser and this page to see nearby caches.")||!this.state.geolocationObject&&i.a.createElement("p",null,"Device not supported :(")),"details"==this.state.page&&this.state.currentCache&&i.a.createElement(k,{cache:this.state.currentCache,geolocation:this.state.geolocation,heading:this.state.orientation.trueBearing,onRefreshGeolocation:this.performGeolocation.bind(this)}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[10,1,2]]]);
//# sourceMappingURL=main.415b7603.chunk.js.map