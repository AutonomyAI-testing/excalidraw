import{r as l}from"./iframe-B7hsO1O4.js";import"./preload-helper-BQ24v_F8.js";var S={exports:{}},u={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _=Symbol.for("react.transitional.element"),h=Symbol.for("react.fragment");function R(o,t,r){var e=null;if(r!==void 0&&(e=""+r),t.key!==void 0&&(e=""+t.key),"key"in t){r={};for(var s in t)s!=="key"&&(r[s]=t[s])}else r=t;return t=r.ref,{$$typeof:_,type:o,key:e,ref:t!==void 0?t:null,props:r}}u.Fragment=h;u.jsx=R;u.jsxs=R;S.exports=u;var T=S.exports;const a=T.jsx,x=T.jsxs,g=({initialCount:o=0,step:t=1,label:r="Counter",onChange:e})=>{const[s,d]=l.useState(o),E=l.useCallback(()=>{d(p=>{const n=p+t;return e==null||e(n),n})},[t,e]),C=l.useCallback(()=>{d(p=>{const n=p-t;return e==null||e(n),n})},[t,e]),j=l.useCallback(()=>{d(o),e==null||e(o)},[o,e]);return x("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"12px",padding:"24px",borderRadius:"8px",border:"1px solid #e0e0e0",backgroundColor:"#fafafa",fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",minWidth:"200px"},children:[a("span",{style:{fontSize:"14px",fontWeight:600,color:"#555",textTransform:"uppercase",letterSpacing:"1px"},children:r}),a("span",{style:{fontSize:"48px",fontWeight:700,color:"#333",lineHeight:1},children:s}),x("div",{style:{display:"flex",gap:"8px"},children:[a("button",{onClick:C,style:{padding:"8px 16px",fontSize:"16px",fontWeight:600,border:"1px solid #ccc",borderRadius:"4px",backgroundColor:"#fff",cursor:"pointer",transition:"background-color 0.2s"},children:"−"}),a("button",{onClick:j,style:{padding:"8px 16px",fontSize:"14px",border:"1px solid #ccc",borderRadius:"4px",backgroundColor:"#fff",cursor:"pointer",transition:"background-color 0.2s"},children:"Reset"}),a("button",{onClick:E,style:{padding:"8px 16px",fontSize:"16px",fontWeight:600,border:"1px solid #ccc",borderRadius:"4px",backgroundColor:"#fff",cursor:"pointer",transition:"background-color 0.2s"},children:"+"})]})]})};g.__docgenInfo={description:"",methods:[],displayName:"Counter",props:{initialCount:{required:!1,tsType:{name:"number"},description:"Initial count value",defaultValue:{value:"0",computed:!1}},step:{required:!1,tsType:{name:"number"},description:"Step value for increment/decrement",defaultValue:{value:"1",computed:!1}},label:{required:!1,tsType:{name:"string"},description:"Label displayed above the counter",defaultValue:{value:'"Counter"',computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(count: number) => void",signature:{arguments:[{type:{name:"number"},name:"count"}],return:{name:"void"}}},description:"Callback fired when count changes"}}};const I={title:"Components/Counter",component:g,parameters:{layout:"centered"}},i={args:{initialCount:0,step:1,label:"Counter"}},c={args:{initialCount:10,step:5,label:"Step by 5"}};var f,m,b;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    initialCount: 0,
    step: 1,
    label: "Counter"
  }
}`,...(b=(m=i.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var k,v,y;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    initialCount: 10,
    step: 5,
    label: "Step by 5"
  }
}`,...(y=(v=c.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};const q=["Default","WithCustomStart"];export{i as Default,c as WithCustomStart,q as __namedExportsOrder,I as default};
