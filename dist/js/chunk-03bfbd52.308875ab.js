(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-03bfbd52","chunk-2d237727"],{"2e4d":function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[e._v(" "+e._s("text-"===e.$attrs.context?"Text color":"Background")+" "),l("div",{staticClass:"flex flex-row cursor-pointer",attrs:{data:e.colorize}},[l("div",{staticClass:"flex flex-col mr-2"},[l("div",[e._v("Color")]),l("div",{class:"mb-2 w-8 h-8 border-2 "+e.color.replace("text","bg"),on:{click:function(t){e.isover=!1,e.current=e.color,e.colors=!e.colors}}})]),l("div",{staticClass:"flex flex-col"},[l("div",[e._v("Over")]),l("div",{class:"mb-2 w-8 h-8 border-2 "+e.over.replace("text","bg"),on:{click:function(t){e.isover=!0,e.current=e.over,e.colors=!e.colors}}})]),e.colors?l("transition",{attrs:{name:"slidedown"}},[e.colors?l("nuxpresso-admin-palette",{attrs:{css:e.current},on:{close:function(t){e.colors=!e.colors},color:e.setColor}}):e._e()],1):e._e()],1)])},r=[],o=(l("1276"),l("ac1f"),l("159b"),l("caad"),l("2532"),l("fac9")),i={name:"NuxpTailwindColor",components:{NuxpressoAdminPalette:o["default"]},data:function(){return{twcolors:["black","white","gray","red","orange","yellow","green","teal","blue","indigo","purple","pink"],colors:!1,color:"",over:"",isover:!1,current:""}},computed:{colorize:function(){var e=this,t=this.$attrs.color?this.$attrs.color.split(" "):"";t&&(this.color="",this.over="",t.forEach((function(t){t.indexOf("hover:"+e.$attrs.context)>-1?t.split("-").length>1&&e.twcolors.includes(t.split("-")[1])&&(e.over=t.split(":")[1]):t.split("-").length>1&&e.twcolors.includes(t.split("-")[1])&&(e.color=t)})))},sendColor:function(e){if(this.$attrs.context){var t=this.$attrs.context+e;console.log(t)}}},methods:{setColor:function(e,t){var l=this.$attrs.context;l+=t?e+"-"+t:e,this.isover?this.over=l:this.color=l,this.colors=!1;var a=this.over?this.color+" hover:"+this.over:this.color;this.$emit("color",a)}}},s=i,n=l("2877"),c=Object(n["a"])(s,a,r,!1,null,null,null);t["default"]=c.exports},fac9:function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"absolute top-0 bg-gray-700 text-white p-2 w-full z-50 cursor-pointer right-0"},[l("div",{staticClass:"flex flex-row justify-start"},[l("div",[l("div",[e._v("Palette")]),l("div",{staticClass:"flex flex-row m-auto mb-2"},[l("i",{staticClass:"material-icons border border-black text-xl font-bold rounded-full h-6 w-6 mr-2 bg-transparent text-red-500",attrs:{title:"transparent"},on:{click:function(t){return e.$emit("color","","")}}},[e._v("clear")]),l("div",{staticClass:"border border-black rounded-full  w-6 h-6 mr-2 bg-white",attrs:{title:"white"},on:{click:function(t){return e.$emit("color","white","")}}}),l("div",{staticClass:"border border-black rounded-full  w-6 h-6 mr-2 bg-black",attrs:{title:"black"},on:{click:function(t){return e.$emit("color","black","")}}})]),l("div",{staticClass:"m-auto"},e._l(e.colors,(function(t,a){return l("div",[l("div",{key:"color_"+a,staticClass:"flex flex-row mb-2"},e._l(9,(function(a){return l("div",{key:e.density+"_"+t+"_"+a,class:"bg-"+t+"-"+100*a+" rounded-full border border-black  w-5 h-5 mr-1",attrs:{title:t+"-"+100*a},on:{click:function(l){return e.$emit("color",t,100*a)}}})})),0)])})),0)]),e.$attrs.field?l("div",[e._v(" Image "),e.$attrs.field.image?e._e():l("i",{staticClass:"material-icons text-white text-sm border rounded-full",on:{click:function(t){return e.$emit("media")}}},[e._v("add")]),e.$attrs.field.image?l("img",{attrs:{src:e.$attrs.field.image.url},on:{click:function(t){return e.$emit("media")}}}):e._e(),e.$attrs.field.image?l("span",{staticClass:"text-xs",on:{click:e.remove}},[e._v("Remove")]):e._e()]):e._e()]),l("button",{staticClass:"mt-1 xs",on:{click:function(t){return e.$emit("close")}}},[e._v("OK")])])},r=[],o=(l("1276"),l("ac1f"),l("159b"),l("fb6a"),"Asap+Condensed|Barlow+Condensed|Abel|Alice|Alegreya|Amethysta|Archivo+Black|Nunito+Sans|Roboto|Quattrocento|Raleway|Lora|PT+Sans|Alfa+Slab+One".replaceAll("+"," ").split("|")),i=[1,4,8,12,16,20,24,32,40,48,64,80,96,128,160,192,224,256],s=["full","1/2","1/3","2/3","1/4","3/4","1/5","2/5","3/5","4/5","1/6","2/6","4/6","5/6","1/12","2/12","3/12","4/12","5/12","7/12","8/12","9/12","10/12","11/12"],n=["gray","bluegray","brown","red","orange","yellow","green","lime","teal","blue","indigo","purple","pink"];function c(e){var t=[];return s.forEach((function(l){t.push(e+"-"+l)})),t}function d(e,t){var l=[];if(t){var a=i;a.slice().reverse().forEach((function(t){l.push("-"+e+"-"+parseInt(t/4))})),l.push(" ")}return i.forEach((function(t){l.push(e+"-"+parseInt(t/4))})),l}function u(e){for(var t=[],l=0;l<5;l++)t.push(e+"-"+25*l);return t}function b(e){var t=["transparent","white","black"];return n.forEach((function(l){t.push(e+"-"+l),t.push("hover:"+e+"-"+l)})),t}var p={width:[{label:"auto",value:"w-auto"},{label:"0",value:"w-0"},{label:"1",value:"w-1"},{label:"2",value:"w-2"},{label:"3",value:"w-3"},{label:"4",value:"w-4"},{label:"5",value:"w-5"},{label:"6",value:"w-6"},{label:"8",value:"w-8"},{label:"10",value:"w-10"},{label:"12",value:"w-12"},{label:"16",value:"w-16"},{label:"20",value:"w-20"},{label:"24",value:"w-24"},{label:"32",value:"w-32"},{label:"40",value:"w-40"},{label:"48",value:"w-48"},{label:"56",value:"w-56"},{label:"64",value:"w-64"},{label:"8%",value:"w-1/12"},{label:"16%",value:"w-1/6"},{label:"20%",value:"w-1/5"},{label:"25%",value:"w-1/4"},{label:"33%",value:"w-1/3"},{label:"40%",value:"w-2/5"},{label:"50%",value:"w-1/2"},{label:"60%",value:"w-3/5"},{label:"66%",value:"w-2/3"},{label:"75%",value:"w-3/4"},{label:"80%",value:"w-4/5"},{label:"83%",value:"w-5/6"},{label:"90%",value:"w-11/12"},{label:"100%",value:"w-full"},{label:"screen",value:"w-screen"}],height:[{label:"auto",value:"h-auto"},{label:"0",value:"h-0"},{label:"1",value:"h-1"},{label:"2",value:"h-2"},{label:"3",value:"h-3"},{label:"4",value:"h-4"},{label:"5",value:"h-5"},{label:"6",value:"h-6"},{label:"8",value:"h-8"},{label:"10",value:"h-10"},{label:"12",value:"h-12"},{label:"16",value:"h-16"},{label:"20",value:"h-20"},{label:"24",value:"h-24"},{label:"32",value:"h-32"},{label:"40",value:"h-40"},{label:"48",value:"h-48"},{label:"56",value:"h-56"},{label:"64",value:"h-64"},{label:"20%",value:"h-1/5"},{label:"25%",value:"h-1/4"},{label:"33%",value:"h-1/3"},{label:"40%",value:"h-2/5"},{label:"50%",value:"h-1/2"},{label:"60%",value:"h-3/5"},{label:"66%",value:"h-2/3"},{label:"75%",value:"h-3/4"},{label:"80%",value:"h-4/5"},{label:"full",value:"h-full"},{label:"screen",value:"h-screen"}],semantics:["article","aside","details","figcaption","figure","footer","header","main","mark","nav","product","section","summary","time"],textSize:["text-xs","text-sm","text-base","text-lg","text-xl","text-2xl","text-3xl","text-4xl","text-5xl","text-6xl","text-7xl","text-8xl","text-9xl","text-10xl","text-20xl"],textAlign:["text-left","text-center","text-right","text-justify"],textlineheight:["leading-none","leading-tight","leading-snug","leading-normal","leading-relaxed","leading-loose"],textSpacing:["tracking-tighter","tracking-tight","tracking-normal","tracking-wide","tracking-wider","tracking-widest"],textOpacity:u("text-opacity"),textcolor:b("text"),fontfamily:o,fontWeight:["font-thin","font-extralight","font-light","font-normal","font-medium","font-semibold","font-bold","font-extrabold","font-black"],bgOpacity:u("bg-opacity"),opacity:u("opacity"),colors:n,bgcolor:b("bg"),flexdirection:["flex-col","flex-row","flex-col-reverse","flex-row-reverse"],flexorder:["order-first","order-last","order-none"],flexwrap:["flex-wrap","flex-nowrap","flex-wrap-reverse"],flexgrow:["flex-grow","flex-grow-0"],flexshrink:["flex-shrink","flex-shrink-0"],zindex:["z-auto","z-0","z-1","z-2","z-3","z-4","z-5","z-6","z-7","z-8","z-9","z-10","z-20","z-30","z-40","z-50","z-max","z-top","z-2xtop"],gridcols:["md:grid-cols-1","md:grid-cols-2","md:grid-cols-3","md:grid-cols-4","md:grid-cols-5","md:grid-cols-6","md:grid-cols-7","md:grid-cols-8","md:grid-cols-9","md:grid-cols-10","md:grid-cols-11","md:grid-cols-12","md:grid-cols-none"],colspan:["md:col-span-auto","md:col-span-1","md:col-span-2","md:col-span-3","md:col-span-4","md:col-span-5","md:col-span-6","md:col-span-7","md:col-span-8","md:col-span-9","md:col-span-10","md:col-span-11","md:col-span-12","md:col-span-full"],gridgap:["gap-1","gap-2","gap-3","gap-4","gap-5","gap-6","gap-8","gap-10","gap-12","gap-16","gap-20","gap-24","gap-32","gap-40","gap-48","gap-56","gap-64"],alignitems:["items-start","items-center","items-end","items-baseline","items-stretch"],aligncontent:["content-start","content-center","content-end","content-between","content-around","content-evenly"],alignself:["self-auto","self-start","self-center","self-end","self-stretch"],justifycontent:["justify-start","justify-center","justify-end","justify-between","justify-around","justify-evenly"],justifyitems:["justify-items-auto","justify-items-start","justify-items-center","justify-items-end","justify-items-stretch"],justifyself:["justify-self-auto","justify-self-start","justify-self-center","justify-self-end","justify-self-stretch"],bordercolor:b("border"),border:["border","border-2","border-4","border-8"],borderTop:["border-t","border-t-2","border-t-4","border-t-8"],borderLeft:["border-l","border-l-2","border-l-4","border-l-8"],borderRight:["border-r","border-r-2","border-r-4","border-r-8"],borderBottom:["border-b","border-b-2","border-b-4","border-b-8"],borderOpacity:u("border-opacity"),padding:d("p"),paddingTop:d("pt"),paddingBottom:d("pb"),paddingLeft:d("pl"),paddingRight:d("pr"),spacing:c("p"),spacingTop:c("pt"),spacingBottom:c("pb"),spacingLeft:c("pl"),spacingRight:c("pr"),margin:d("m",!0),marginTop:d("mt",!0),marginBottom:d("mb",!0),marginLeft:d("ml",!0),marginRight:d("mr",!0),mauto:["m-auto"],borderType:["border-solid","border-dashed","border-dotted","border-double","border-none"],positionelement:["static","fixed","absolute","relative","sticky","modal"],positionTop:["top-0"],positionLeft:["left-0"],positionBottom:["bottom-0"],positionRight:["right-0"],objectfit:["object-contain","object-cover","object-fill","object-none","object-scale"],rotate:["rotate-0","rotate-1","rotate-2","rotate-3","rotate-6","rotate-12","rotate-45","rotate-90","rotate-180","-rotate-0","-rotate-1","-rotate-2","-rotate-3","-rotate-6","-rotate-12","-rotate-45","-rotate-90","-rotate-180"],skewX:["skew-x-0","skew-x-1","skew-x-2","skew-x-3","skew-x-6","skew-x-12","-skew-x-0","-skew-x-1","-skew-x-2","-skew-x-3","-skew-x-6","-skew-x-12"],skewY:["skew-y-0","skew-y-1","skew-y-2","skew-y-3","skew-y-6","skew-y-12","-skew-y-0","-skew-y-1","-skew-y-2","-skew-y-3","-skew-y-6","-skew-y-12"],rotate3D:["perspective-rotate3dX","perspective-rotate3dX-inverse","perspective-rotate3dY","perspective-rotate3dY-inverse"],rounded:["rounded-none","rounded-sm","rounded","rounded-md","rounded-lg","rounded-xl","rounded-2xl","rounded-3xl","rounded-full"],shadow:["shadow","shadow-xs","shadow-sm","shadow-md","shadow-lg","shadow-xl","shadow-2xl"],grayscale:["grayscale"],animation:["animate-none","animate-ping","animate-bounce","animate-spin","animate-pulse","animate-slidein","animate-slideout"],clipPath:["clip-path-angle-left","clip-path-angle-right","clip-path-arrow-left","clip-path-arrow-right","clip-path-triangle","clip-path-circle","clip-path-tag-down","clip-path-trapezoid-left","clip-path-trapezoid-right","clip-path-rombus","clip-path-parallelogram","clip-path-frame","clip-path-cross","clip-path-stairs","clip-path-stairs-2"]},f=p,h={name:"NuxpAdminPalette",data:function(){return{neutral:["transparent","white","black"],density:{extralight:100,verylight:200,mediumlight:300,light:400,normal:500,mediumdark:600,dark:700,verydark:800,extradark:900},css:"",opacity:100}},computed:{colors:function(){return f["colors"]}},mounted:function(){this.css=this.$attrs.css},watch:{opacity:function(e){this.$emit("opacity",e)}},methods:{setCSS:function(){this.$emit("classe",this.$attrs.css)},remove:function(){console.log("remove image"),this.$emit("removeimage")}}},m=h,v=l("2877"),g=Object(v["a"])(m,a,r,!1,null,null,null);t["default"]=g.exports}}]);