(this.webpackJsonpwayd=this.webpackJsonpwayd||[]).push([[0],{63:function(e,t,n){},64:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n.n(a),r=n(45),s=n.n(r),i=n(9),o=n(3),l=n.n(o),d=n(6),u=n(5),j=n(29);n(52),n(65),n(66);j.a.initializeApp({apiKey:"AIzaSyC9vUvUc9C-1mC0iTMYv6Y44GHfYB9oJnk",authDomain:"wayd-38265.firebaseapp.com",databaseURL:"https://wayd-38265.firebaseio.com/",projectId:"wayd-38265",storageBucket:"wayd-38265.appspot.com",messagingSenderId:"20495967302",appId:"1:20495967302:web:d1dbcd6ae5abc3c0235647"});var b=j.a,p=j.a.auth(),O=j.a.firestore(),h=j.a.storage(),m=n(24),f=n(7),x=n(21),v=n(1),g=function(){var e=Object(a.useState)({displayName:"",name:"",email:"",password:"",instagramId:"",photoURL:"",uid:""}),t=Object(u.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(""),s=Object(u.a)(r,2),o=s[0],j=s[1],b=Object(a.useState)(!1),h=Object(u.a)(b,2),m=h[0],f=h[1],g=Object(a.useState)(""),w=Object(u.a)(g,2),y=w[0],N=w[1],k=Object(a.useState)(""),U=Object(u.a)(k,2),P=U[0],S=U[1],C=function(){var e=Object(d.a)(l.a.mark((function e(t){var n,a,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.target,a=n.name,r=n.value,c((function(e){return Object(i.a)(Object(i.a)({},e),{},Object(x.a)({},a,r))})),"displayName"!=a){e.next=7;break}return e.next=5,O.collection("User_Profile").where("displayName","==",r).get();case 5:0==e.sent.docs.length&&r.length>0?(N("\uc0ac\uc6a9\uac00\ub2a5"),f(!0)):(0!=r.length?N("\uc774\ubbf8 \ub2e4\ub978 \uc0ac\uc6a9\uc790\uac00 \uc0ac\uc6a9 \uc911 \uc785\ub2c8\ub2e4."):N(""),f(!1));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),e.prev=1,!o){e.next=12;break}if(m){e.next=5;break}throw new Error("Display Name\uc744 \ud655\uc778\ud574\uc8fc\uc138\uc694.");case 5:return e.next=7,p.createUserWithEmailAndPassword(n.email,n.password);case 7:return e.sent,e.next=10,O.collection("User_Profile").add(n);case 10:e.next=15;break;case 12:return e.next=14,p.signInWithEmailAndPassword(n.email,n.password);case 14:e.sent;case 15:e.next=20;break;case 17:e.prev=17,e.t0=e.catch(1),S(e.t0.message);case 20:case"end":return e.stop()}}),e,null,[[1,17]])})));return function(t){return e.apply(this,arguments)}}();return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsxs)("form",{className:"centerContainer authForm",onSubmit:I,children:[o?Object(v.jsxs)(v.Fragment,{children:[Object(v.jsxs)("div",{children:[Object(v.jsx)("span",{children:"Email"}),Object(v.jsx)("input",{name:"email",type:"text",placeholder:"Email Adress",required:!0,value:n.email,onChange:C})]}),Object(v.jsxs)("div",{children:[Object(v.jsx)("span",{children:"PassWord"}),Object(v.jsx)("input",{name:"password",type:"password",placeholder:"6\uc790\ub9ac \uc774\uc0c1 \uc785\ub825\ud574\uc8fc\uc138\uc694.",required:!0,value:n.password,onChange:C})]}),Object(v.jsxs)("div",{children:[Object(v.jsx)("span",{children:"Display Name"}),Object(v.jsx)("input",{name:"displayName",type:"text",placeholder:"Display Name",required:!0,value:n.displayName,onChange:C})]}),Object(v.jsx)("span",{id:"checkMess",children:y}),Object(v.jsxs)("div",{children:[Object(v.jsx)("span",{children:"Name"}),Object(v.jsx)("input",{name:"name",type:"text",placeholder:"Name",required:!0,value:n.name,onChange:C})]}),Object(v.jsxs)("div",{children:[Object(v.jsx)("span",{children:"Instagram's ID"}),Object(v.jsx)("input",{name:"instagramId",type:"text",placeholder:"\uc120\ud0dd \uc0ac\ud56d",value:n.instagramId,onChange:C})]})]}):Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)("input",{name:"email",type:"text",placeholder:"Email",required:!0,value:n.email,onChange:C}),Object(v.jsx)("input",{name:"password",type:"password",placeholder:"PassWord",required:!0,value:n.password,onChange:C})]}),Object(v.jsx)("input",{type:"submit",id:"submitBtn",value:o?"\ud68c\uc6d0\uac00\uc785":"\ub85c\uadf8\uc778"}),Object(v.jsx)("span",{id:"error",children:P})]}),Object(v.jsx)("button",{id:"switchBtn",onClick:function(){j((function(e){return!e})),S("")},children:o?"\ub85c\uadf8\uc778":"\ud68c\uc6d0\uac00\uc785"})]})},w=n(8),y=n(26),N=function(){var e=function(){var e=Object(d.a)(l.a.mark((function e(t){var n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"google"===(n=t.target.name)?a=new b.auth.GoogleAuthProvider:"github"===n&&(a=new b.auth.GithubAuthProvider),e.next=4,p.signInWithPopup(a).then(function(){var e=Object(d.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.user,e.next=3,O.collection("User_Profile").where("displayName","==",n.displayName).get();case 3:0!=e.sent.docs.length&&n.updateProfile({displayName:n.email});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(v.jsxs)("div",{className:"Container",children:[Object(v.jsx)("img",{id:"logo",src:"logo.png",width:"150px"}),Object(v.jsx)(g,{}),Object(v.jsx)("hr",{}),Object(v.jsx)("span",{children:"\uc18c\uc15c \uacc4\uc815\uc73c\ub85c \ub85c\uadf8\uc778"}),Object(v.jsxs)("div",{className:"authBtns",children:[Object(v.jsxs)("button",{onClick:e,name:"google",children:[Object(v.jsx)(w.a,{icon:y.b})," "]}),Object(v.jsx)("button",{onClick:e,name:"github",children:Object(v.jsx)(w.a,{icon:y.a})})]})]})},k=n(22),U=n(67),P=n(28),S=n(12),C=n(34),I=n(35),R=n(23),_=n(37),A=n(36),L=function(e){Object(_.a)(n,e);var t=Object(A.a)(n);function n(e){var a;return Object(C.a)(this,n),(a=t.call(this,e)).setWrapperRef=a.setWrapperRef.bind(Object(R.a)(a)),a.handleClickOutside=a.handleClickOutside.bind(Object(R.a)(a)),a.state={isOpenMoal:!1},a}return Object(I.a)(n,[{key:"componentDidMount",value:function(){document.addEventListener("mousedown",this.handleClickOutside)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("mousedown",this.handleClickOutside)}},{key:"setWrapperRef",value:function(e){this.wrapperRef=e}},{key:"handleClickOutside",value:function(e){this.wrapperRef&&!this.wrapperRef.contains(e.target)?this.setState({isOpenMoal:!1}):this.setState({isOpenMoal:!0})}},{key:"render",value:function(){return Object(v.jsx)("div",{ref:this.setWrapperRef,value:this.props.setIsOpenModal(this.state.isOpenMoal),className:"modal",children:this.props.children})}}]),n}(a.Component),M=function(e){var t=e.commentObj,n=e.ProfileObj,a=e.messObj,c=e.isOwner,r=Object(f.f)(),s=function(){var e=Object(d.a)(l.a.mark((function e(){var a,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(p.currentUser.displayName!=n.displayName){e.next=5;break}r.push("/profile"),e.next=10;break;case 5:return e.next=7,O.collection("User_Profile").where("email","==",t.creator.email).get();case 7:a=e.sent,c=a.docs.map((function(e){return Object(i.a)({id:e.id},e.data())})),r.push({pathname:"/userProfile",state:{ProfileObj:c[0]}});case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),o=function(){var e=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("\ub313\uae00\uc744 \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")){e.next=4;break}return e.next=4,O.doc("".concat(a.id,"/").concat(t.id)).delete();case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)("div",{className:"commentContainer",children:[Object(v.jsxs)("div",{className:" messProfile comnentProfile",children:[Object(v.jsx)("div",{className:"profilePhoto",onClick:s,children:Object(v.jsx)("img",{src:n.photoURL?n.photoURL:"user.png"})}),Object(v.jsx)("span",{children:n.displayName})]}),Object(v.jsxs)("div",{className:"moreDiv",children:[Object(v.jsx)("span",{id:"time",children:t.createAtDetail.split(" ").map((function(e,t){if(1==t||2==t)return e+" "}))}),c&&Object(v.jsx)("span",{onClick:o,children:Object(v.jsx)(w.a,{id:"icon",icon:S.i})})]}),Object(v.jsx)("div",{id:"text",children:t.text})]})})},D=function(e){var t=e.messObj,n=e.ProfileObj,c=Object(a.useState)(""),r=Object(u.a)(c,2),s=r[0],o=r[1],j=Object(a.useState)([]),b=Object(u.a)(j,2),p=b[0],h=b[1],m=Object(a.useState)(!1),f=Object(u.a)(m,2),g=f[0],y=f[1];Object(a.useEffect)((function(){O.collection("".concat(t.id)).orderBy("createAt").onSnapshot((function(e){var t=e.docs.map((function(e){return Object(i.a)({id:e.id},e.data())}));h(t)}))}),[]);var N=function(){var e=Object(d.a)(l.a.mark((function e(a){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),e.next=3,O.collection("".concat(t.id)).add({text:s,creator:{Id:n.uid,displayName:n.displayName,photoURL:n.photoURL,email:n.email},createAt:Date.now(),createAtDetail:Date()});case 3:if(n.uid==t.creatorId){e.next=6;break}return e.next=6,O.collection("User_Alert").doc("".concat(t.creatorId)).get().then((function(e){e.exists?O.collection("User_Alert").doc("".concat(t.creatorId)).update({Alert:!0,alertObj:[].concat(Object(k.a)(e.data().alertObj),[{text:"".concat(n.displayName,"\ub2d8\uc774 \ub313\uae00\uc744 \ub2ec\uc558\uc2b5\ub2c8\ub2e4."),fromName:n.displayName,toName:t.creatorName,type:"comment",messId:t.id}])}):O.collection("User_Alert").doc("".concat(t.creatorId)).set({Alert:!0,alertObj:[{text:"".concat(n.displayName,"\ub2d8\uc774 \ub313\uae00\uc744 \ub2ec\uc558\uc2b5\ub2c8\ub2e4."),fromName:n.displayName,toName:t.creatorName,type:"comment",messId:t.id}]})}));case 6:o("");case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)("head",{children:Object(v.jsx)("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"})}),Object(v.jsxs)(L,{setIsOpenModal:y,children:[Object(v.jsx)(w.a,Object(x.a)({id:"icon",icon:S.e},"id","commentIcon")),g&&Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)("div",{className:"commentFac",children:[p.map((function(e){return Object(v.jsx)(M,{commentObj:e,ProfileObj:e.creator,messObj:t,isOwner:e.creator.Id==n.uid})})),Object(v.jsxs)("form",{onSubmit:N,className:"commentFacForm",children:[Object(v.jsx)(P.a,{id:"TextArea",onChange:function(e){var t=e.target.value;o(t)},value:s,type:"text",required:!0}),Object(v.jsx)("input",{id:"commentSubmit",type:"submit",value:"\uf054"})]})]})})]})]})},F=function(e){var t=e.messObj,n=e.isOwner,c=e.ProfileObj,r=Object(a.useState)(!1),s=Object(u.a)(r,2),o=s[0],j=s[1],b=Object(a.useState)(t.text),m=Object(u.a)(b,2),x=m[0],g=m[1],y=Object(a.useState)(""),N=Object(u.a)(y,2),C=N[0],I=N[1],R=Object(a.useState)(t.toName),_=Object(u.a)(R,2),A=_[0],M=_[1],F=Object(a.useState)({text:"",fromName:null,toName:null,type:"mention",messId:t.id}),E=Object(u.a)(F,2),W=E[0],B=E[1],T=Object(a.useState)(!1),q=Object(u.a)(T,2),J=q[0],Y=q[1],G=Object(a.useState)(0),z=Object(u.a)(G,2),H=z[0],K=z[1],Q=Object(a.useState)(!1),V=Object(u.a)(Q,2),X=V[0],Z=V[1],$=Object(f.f)();Object(a.useEffect)((function(){O.doc("Mess_More/".concat(t.id)).onSnapshot(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.exists?(K(t.data().heart),t.data().heart_ID.includes(c.uid)?Y(!0):Y(!1)):K(0);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[]);var ee=function(){var e=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("\ub0b4\uc6a9\uc744 \uc815\ub9d0 \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")){e.next=12;break}return e.next=4,O.collection("User_Alert").get().then((function(e){e.docs.map((function(e){O.collection("User_Alert").doc(e.id).update({alertObj:e.data().alertObj.filter((function(e){return e.messId!=t.id}))})}))}));case 4:if(O.collection("".concat(t.id)).onSnapshot((function(e){e.docs.forEach((function(e){console.log(e),O.collection("".concat(t.id)).doc(e.id).delete()}))})),!t.attachmentURL){e.next=8;break}return e.next=8,h.refFromURL(t.attachmentURL).delete();case 8:return e.next=10,O.doc("Messages/".concat(t.id)).delete();case 10:return e.next=12,O.doc("Mess_More/".concat(t.id)).delete();case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),te=function(){var e=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("\uc0ac\uc9c4\uc744 \uc815\ub9d0 \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")){e.next=7;break}return e.next=4,h.refFromURL(t.attachmentURL).delete();case 4:return"",e.next=7,O.doc("Messages/".concat(t.id)).update({attachmentURL:""});case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ne=function(){var e=Object(d.a)(l.a.mark((function e(){var n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(p.currentUser.uid!=t.creatorId){e.next=5;break}$.push("/profile"),e.next=10;break;case 5:return e.next=7,O.collection("User_Profile").where("uid","==",t.creatorId).get();case 7:n=e.sent,a=n.docs.map((function(e){return Object(i.a)({id:e.id},e.data())})),$.push({pathname:"/userProfile",state:{ProfileObj:a[0]}});case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ae=function(){j((function(e){return!e})),g(t.text),M(t.toName)},ce=function(){var e=Object(d.a)(l.a.mark((function e(n){var a,r,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),a="",""===C){e.next=12;break}return r=h.ref().child("".concat(t.creatorId,"/").concat(Object(U.a)())),e.next=6,r.putString(C,"data_url");case 6:return s=e.sent,e.next=9,s.ref.getDownloadURL();case 9:a=e.sent,e.next=13;break;case 12:a=t.attachmentURL;case 13:if(A==c.displayName){e.next=22;break}if(!A||t.toName==A){e.next=19;break}return e.next=17,O.collection("User_Profile").where("displayName","==",A).get().then((function(e){e.docs.map(function(){var e=Object(d.a)(l.a.mark((function e(n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.collection("User_Alert").doc("".concat(n.data().uid)).get().then((function(e){e.exists?O.collection("User_Alert").doc("".concat(n.data().uid)).update({Alert:!0,alertObj:e.data().alertObj.map((function(e){e.messId==t.id&&"mention"==e.type&&(e=W)}))}):O.collection("User_Alert").doc("".concat(n.data().uid)).set({Alert:!0,alertObj:[W]})}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}));case 17:e.next=22;break;case 19:if(A){e.next=22;break}return e.next=22,O.collection("User_Profile").where("displayName","==",A).get().then((function(e){e.docs.map(function(){var e=Object(d.a)(l.a.mark((function e(n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.collection("User_Alert").doc("".concat(n.data().uid)).get().then((function(e){e.exists&&O.collection("User_Alert").doc("".concat(e.data().uid)).update({alertObj:e.data().alertObj.filter((function(e){return e.messId!=t.id||"mention"!=e.type}))})}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}));case 22:return e.next=24,O.doc("Messages/".concat(t.id)).update({text:x,toName:A,attachmentURL:a});case 24:j(!1),re();case 26:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),re=function(){return I("")},se=function(){var e=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!J){e.next=5;break}return e.next=3,O.doc("Mess_More/".concat(t.id)).get().then(function(){var e=Object(d.a)(l.a.mark((function e(n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.doc("Mess_More/".concat(t.id)).update({heart:n.data().heart-1,heart_ID:n.data().heart_ID.filter((function(e){return e!=c.uid}))});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 3:e.next=7;break;case 5:return e.next=7,O.doc("Mess_More/".concat(t.id)).get().then(function(){var e=Object(d.a)(l.a.mark((function e(n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.exists){e.next=5;break}return e.next=3,O.collection("Mess_More").doc("".concat(t.id)).set({heart:n.data().heart+1,heart_ID:[].concat(Object(k.a)(n.data().heart_ID),[c.uid])});case 3:e.next=7;break;case 5:return e.next=7,O.collection("Mess_More").doc("".concat(t.id)).set({heart:1,heart_ID:[c.uid]});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ie=function(){g(x+"@")};return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)("head",{children:Object(v.jsx)("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"})}),Object(v.jsxs)("div",{className:"messContainer",children:[Object(v.jsxs)("div",{className:"messProfile",children:[Object(v.jsx)("div",{className:"profilePhoto",onClick:ne,children:Object(v.jsx)("img",{src:t.creatorPhoto?t.creatorPhoto:"user.png"})}),Object(v.jsx)("span",{children:t.creatorName})]}),Object(v.jsxs)("div",{className:"moreDiv",children:[Object(v.jsx)("span",{id:"time",children:t.createAtDetail.split(" ").map((function(e,t){if(1==t||2==t||4==t)return e+" "}))}),n&&!o&&Object(v.jsx)(v.Fragment,{children:Object(v.jsx)(L,{setIsOpenModal:Z,children:X?Object(v.jsxs)("div",{className:"modalChildren",children:[Object(v.jsx)("button",{onClick:ae,children:"\uc218\uc815"}),Object(v.jsx)("button",{id:"delBtn",onClick:ee,children:"\uc0ad\uc81c"})]}):Object(v.jsx)(w.a,{id:"modalLabel",icon:S.f})})})]}),o?Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)("form",{onSubmit:ce,className:"editForm",children:[A&&Object(v.jsx)("div",{className:"mention",children:Object(v.jsxs)("span",{children:["To : ",Object(v.jsx)(w.a,{icon:S.b,id:"at"})," ",A]})}),!t.attachmentURL&&Object(v.jsxs)("div",{className:"noneAttachClass",children:[Object(v.jsx)("span",{onClick:ie,id:"addMention",children:Object(v.jsx)(w.a,{icon:S.b,id:"at"})}),Object(v.jsx)("label",{for:"attach-file2",className:"file_label file_label3",children:Object(v.jsx)(w.a,{icon:S.h})})]}),Object(v.jsx)(P.a,{id:"TextArea",onChange:function(e){var n=e.target.value;if(g(n),-1!=n.search("@")){var a=n.split(" ").filter((function(e){return e.includes("@")})).toString();M(a.substring(a.search("@")+1,a.length)),B({text:"".concat(c.displayName,"\ub2d8\uc774 \uc5b8\uae09\ud558\uc168\uc2b5\ub2c8\ub2e4."),fromName:c.displayName,toName:a.substring(a.search("@")+1,a.length),type:"mention",messId:t.id})}},value:x,type:"text",required:!0}),Object(v.jsx)("input",{id:"attach-file2",type:"file",accept:"image/*",onChange:function(e){var t=e.target.files[0],n=new FileReader;n.onloadend=function(e){var t=e.currentTarget.result;I(t)},n.readAsDataURL(t)},style:{display:"none"}}),t.attachmentURL&&Object(v.jsxs)("div",{className:"attachClass",children:[Object(v.jsx)("span",{onClick:ie,id:"addMention",children:Object(v.jsx)(w.a,{icon:S.b,id:"at"})}),Object(v.jsx)("span",{id:"attachmentDel",onClick:te,children:"\uc0ac\uc9c4 \uc0ad\uc81c"}),Object(v.jsx)("img",{src:t.attachmentURL,width:"100%"})]}),C&&Object(v.jsxs)("div",{children:[Object(v.jsx)("span",{id:"attachmentDel",onClick:re,children:"\uc0ac\uc9c4 \ucde8\uc18c"}),Object(v.jsx)("img",{src:C,width:"100%"})]}),Object(v.jsxs)("div",{className:"btns",children:[Object(v.jsx)("button",{id:"delBtn",onClick:ee,children:"\uc0ad\uc81c"}),Object(v.jsx)("button",{onClick:ae,children:"\ucde8\uc18c"}),Object(v.jsx)("input",{type:"submit",value:"\uc644\ub8cc"})]})]})}):Object(v.jsxs)(v.Fragment,{children:[A&&Object(v.jsx)("div",{className:"mention",children:Object(v.jsxs)("span",{children:["To : ",Object(v.jsx)(w.a,{icon:S.b,id:"at"})," ",A]})}),Object(v.jsx)("div",{className:"messContent",children:t.text.split("\n").map((function(e){return Object(v.jsxs)("h4",{children:[e.split("@".concat(A)),Object(v.jsx)("br",{})]})}))}),t.attachmentURL&&Object(v.jsx)("img",{src:t.attachmentURL,className:"attachment2"}),Object(v.jsxs)("div",{className:"heart",children:[J?Object(v.jsx)(w.a,{id:"icon",icon:S.g,color:"#a84848",onClick:se}):Object(v.jsx)(w.a,{id:"icon",icon:S.g,onClick:se}),Object(v.jsx)("span",{children:H})]}),Object(v.jsx)(D,{messObj:t,ProfileObj:c})]})]})]})},E=function(e){var t=e.ProfileObj,n=Object(a.useState)(""),c=Object(u.a)(n,2),r=c[0],s=c[1],o=Object(a.useState)(""),j=Object(u.a)(o,2),b=j[0],p=j[1],m=Object(a.useState)(""),f=Object(u.a)(m,2),x=f[0],g=f[1],y=Object(a.useState)({text:"",fromName:null,toName:null,type:"mention",messId:""}),N=Object(u.a)(y,2),C=N[0],I=N[1],R=function(){var e=Object(d.a)(l.a.mark((function e(n){var a,c,o,u;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==r){e.next=2;break}return e.abrupt("return");case 2:if(n.preventDefault(),a="",""===b){e.next=12;break}return c=h.ref().child("".concat(t.uid,"/").concat(Object(U.a)())),e.next=8,c.putString(b,"data_url");case 8:return o=e.sent,e.next=11,o.ref.getDownloadURL();case 11:a=e.sent;case 12:return u={text:r,createAt:Date.now(),createAtDetail:Date(),creatorId:t.uid,creatorEmail:t.email,creatorName:t.displayName,creatorPhoto:t.photoURL,toName:C.toName,attachmentURL:a},e.next=15,O.collection("Messages").add(u).then(function(){var e=Object(d.a)(l.a.mark((function e(n){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=n.id,!x||x==t.displayName){e.next=4;break}return e.next=4,O.collection("User_Profile").where("displayName","==",x).get().then((function(e){e.docs.map(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.collection("User_Alert").doc("".concat(t.data().uid)).get().then((function(e){e.exists?O.collection("User_Alert").doc("".concat(t.data().uid)).update({Alert:!0,alertObj:[].concat(Object(k.a)(e.data().alertObj),[Object(i.a)(Object(i.a)({},C),{},{messId:a})])}):O.collection("User_Alert").doc("".concat(t.data().uid)).set({Alert:!0,alertObj:[Object(i.a)(Object(i.a)({},C),{},{messId:a})]})}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 15:s(""),p(""),g("");case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)("head",{children:Object(v.jsx)("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"})}),Object(v.jsxs)("form",{onSubmit:R,className:"messForm",children:[Object(v.jsxs)("div",{children:[x&&Object(v.jsx)("div",{className:"mention",children:Object(v.jsxs)("span",{children:["To : ",Object(v.jsx)(w.a,{icon:S.b,id:"at"})," ",x]})}),Object(v.jsx)("span",{onClick:function(){s(r+"@")},id:"addMention",children:Object(v.jsx)(w.a,{icon:S.b,id:"at"})}),Object(v.jsx)("label",{for:"attach-file",className:"file_label",children:Object(v.jsx)(w.a,{icon:S.h})}),Object(v.jsx)(P.a,{id:"TextArea",value:r,onChange:function(e){var n=e.target.value;if(s(n),-1!=n.search("@")){var a=n.split(" ").filter((function(e){return e.includes("@")})).toString();g(a.substring(a.search("@")+1,a.length)),I({text:"".concat(t.displayName,"\ub2d8\uc774 \uc5b8\uae09\ud558\uc168\uc2b5\ub2c8\ub2e4."),fromName:t.displayName,toName:a.substring(a.search("@")+1,a.length),type:"mention"})}},type:"text",placeholder:"What are you doing?"}),Object(v.jsx)("input",{id:"messSubmit",type:"submit",value:"\uf054"})]}),Object(v.jsx)("input",{id:"attach-file",type:"file",accept:"image/*",onChange:function(e){var t=e.target.files[0],n=new FileReader;n.onloadend=function(e){var t=e.currentTarget.result;p(t)},n.readAsDataURL(t)},style:{display:"none"}}),b&&Object(v.jsxs)("div",{className:"attachment",children:[Object(v.jsx)("span",{id:"attachmentDel",onClick:function(){return p("")},children:"\uc0ac\uc9c4 \ucde8\uc18c"}),Object(v.jsx)("img",{src:b,width:"100%"})]})]})]})},W=function(e){var t=e.ProfileObj,n=Object(a.useState)([]),c=Object(u.a)(n,2),r=c[0],s=c[1];return Object(a.useEffect)((function(){O.collection("Messages").orderBy("createAt").onSnapshot((function(e){var t=e.docs.map((function(e){return Object(i.a)({id:e.id},e.data())}));s(t)}))}),[]),Object(v.jsxs)("div",{className:"Container",children:[Object(v.jsx)("img",{id:"logo",name:"home",src:"logo.png",width:"150px"}),Object(v.jsx)(E,{ProfileObj:t}),Object(v.jsx)("div",{className:"messCotainer1",children:r.map((function(e){return Object(v.jsx)(F,{messObj:e,ProfileObj:t,isOwner:e.creatorId==t.uid},e.id)})).reverse()})]})},B=function(e){var t=e.ProfileObj,n=Object(f.g)(),c=Object(a.useState)(!1),r=Object(u.a)(c,2),s=r[0],i=r[1];return O.collection("User_Alert").doc("".concat(t.uid)).onSnapshot((function(e){if(e.exists){var t=e.data().Alert;i(t)}})),Object(v.jsxs)(v.Fragment,{children:["/"==n.pathname?Object(v.jsxs)("nav",{children:[Object(v.jsxs)(m.b,{to:"/alert",id:"bell",children:[s&&Object(v.jsx)(w.a,{icon:S.d,id:"alertDot"}),Object(v.jsx)(w.a,{icon:S.c})," "]}),Object(v.jsx)("div",{className:"profilePhoto",children:Object(v.jsx)(m.b,{to:"/profile",children:Object(v.jsx)("img",{src:t.photoURL?t.photoURL:"user.png"})})})]}):Object(v.jsxs)("nav",{children:[Object(v.jsxs)(m.b,{to:"/",id:"back",children:[Object(v.jsx)(w.a,{icon:S.a})," "]}),Object(v.jsx)("span",{id:"name",children:"/alert"==n.pathname?"\uc54c\ub9bc":t.displayName})]}),"/userProfile"==n.pathname&&Object(v.jsx)("nav",{children:Object(v.jsxs)(m.b,{to:"/",id:"back",children:[Object(v.jsx)(w.a,{icon:S.a})," "]})})]})},T=function(e){var t=e.getMyProfile,n=Object(a.useState)((function(){return JSON.parse(window.localStorage.getItem("ProfileObj"))||0})),c=Object(u.a)(n,2),r=c[0],s=c[1],o=JSON.parse(window.localStorage.getItem("ProfileObj"))||0,j=Object(a.useState)(""),b=Object(u.a)(j,2),m=b[0],g=b[1],N=Object(a.useState)([]),k=Object(u.a)(N,2),P=k[0],S=k[1],C=Object(a.useState)(!1),I=Object(u.a)(C,2),R=I[0],_=I[1],A=Object(a.useState)(""),L=Object(u.a)(A,2),M=L[0],D=L[1],E=Object(a.useState)(!0),W=Object(u.a)(E,2),B=W[0],T=W[1],q=Object(a.useState)(""),J=Object(u.a)(q,2),Y=J[0],G=J[1],z="https://www.instagram.com/".concat(o.instagramId),H=Object(f.f)();Object(a.useEffect)((function(){K()}),[]);var K=function(){O.collection("Messages").where("creatorId","==",r.uid).orderBy("createAt").onSnapshot((function(e){var t=e.docs.map((function(e){return Object(i.a)({id:e.id},e.data())}));S(t)}))},Q=function(){var e=Object(d.a)(l.a.mark((function e(t){var n,a,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.target,a=n.name,c=n.value,s((function(e){return Object(i.a)(Object(i.a)({},e),{},Object(x.a)({},a,c))})),"displayName"!=a){e.next=7;break}return e.next=5,O.collection("User_Profile").where("displayName","==",c).get();case 5:0==e.sent.docs.length&&r.displayName.length>0||c==o.displayName?(D("\uc0ac\uc6a9\uac00\ub2a5"),T(!0)):(0!=c.length?D("\uc774\ubbf8 \ub2e4\ub978 \uc0ac\uc6a9\uc790\uac00 \uc0ac\uc6a9 \uc911 \uc785\ub2c8\ub2e4."):D(""),T(!1));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),V=function(){var e=Object(d.a)(l.a.mark((function e(n){var a,c,i,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),a="",c=p.currentUser,G(""),e.prev=4,B){e.next=7;break}throw new Error("Display Name\uc744 \ud655\uc778\ud574\uc8fc\uc138\uc694.");case 7:if(""===m){e.next=17;break}return i=h.ref().child("".concat(r.uid,"/").concat(Object(U.a)())),e.next=11,i.putString(m,"data_url");case 11:return o=e.sent,e.next=14,o.ref.getDownloadURL();case 14:a=e.sent,e.next=18;break;case 17:a=r.photoURL;case 18:return e.next=20,O.doc("User_Profile/".concat(r.docId)).update({displayName:r.displayName,name:r.name,instagramId:r.instagramId,photoURL:a});case 20:return e.next=22,c.updateProfile({displayName:r.displayName,photoURL:a});case 22:_(!1),e.next=28;break;case 25:e.prev=25,e.t0=e.catch(4),G(e.t0.message);case 28:t().then((function(){return s(JSON.parse(window.localStorage.getItem("ProfileObj")))}));case 29:case"end":return e.stop()}}),e,null,[[4,25]])})));return function(t){return e.apply(this,arguments)}}();return Object(v.jsx)(v.Fragment,{children:Object(v.jsx)("div",{className:"Container",children:R?Object(v.jsxs)("form",{className:"editProfileForm",onSubmit:V,children:[Object(v.jsxs)("div",{className:"centerContainer photoChange",children:[Object(v.jsx)("div",{className:"profilePhoto",children:Object(v.jsx)("img",{src:m||(o.photoURL?o.photoURL:"user.png")})}),Object(v.jsx)("label",{for:"changefile",className:"file_label2",children:"\ud504\ub85c\ud544 \uc0ac\uc9c4 \ubc14\uafb8\uae30"}),Object(v.jsx)("input",{id:"changefile",type:"file",accept:"image/*",onChange:function(e){var t=e.target.files[0],n=new FileReader;n.onloadend=function(e){var t=e.currentTarget.result;g(t)},n.readAsDataURL(t)},style:{display:"none"}})]}),Object(v.jsxs)("div",{className:"centerContainer editWrapper",children:[Object(v.jsxs)("div",{className:"editBox",children:[Object(v.jsx)("span",{children:"\uc0ac\uc6a9\uc790 \uc774\ub984"}),Object(v.jsx)("input",{name:"displayName",type:"text",placeholder:o.displayName,onChange:Q})]}),Object(v.jsx)("span",{id:"checkMess",children:M}),Object(v.jsxs)("div",{className:"editBox",children:[Object(v.jsx)("span",{children:"\uc774\ub984"}),Object(v.jsx)("input",{name:"name",type:"text",placeholder:o.name,onChange:Q})]}),Object(v.jsxs)("div",{className:"editBox",children:[Object(v.jsx)("span",{children:"Instagram \uc544\uc774\ub514"}),Object(v.jsx)("input",{name:"instagramId",type:"text",placeholder:o.instagramId,onChange:Q})]})]}),Object(v.jsx)("span",{id:"error",children:Y}),Object(v.jsxs)("div",{className:"centerContainer btns",children:[Object(v.jsx)("button",{onClick:function(){_(!1)},children:"\ucde8\uc18c"}),Object(v.jsx)("input",{type:"submit",value:"\uc644\ub8cc"})]})]}):Object(v.jsxs)(v.Fragment,{children:[Object(v.jsxs)("div",{className:"showProfile",children:[Object(v.jsx)("div",{className:"profilePhoto",children:Object(v.jsx)("img",{src:o.photoURL?o.photoURL:"user.png"})}),Object(v.jsxs)("ul",{children:[Object(v.jsx)("li",{children:o.name}),Object(v.jsxs)("li",{id:"instagramId",children:[Object(v.jsxs)("p",{children:["Instagram ",Object(v.jsx)(w.a,{icon:y.c})]})," ",Object(v.jsx)("a",{href:z,target:"_blank",children:o.instagramId})]})]}),Object(v.jsx)("button",{onClick:function(){_(!0)},children:"\ud504\ub85c\ud544 \uc218\uc815"})]}),Object(v.jsx)("button",{id:"logoutBtn",onClick:function(){p.signOut(),H.push("/"),window.localStorage.removeItem("ProfileObj")},children:"\ub85c\uadf8\uc544\uc6c3"}),Object(v.jsxs)("span",{children:[o.displayName,"\uc758 \uc791\uc131\uae00"]}),Object(v.jsx)("div",{children:P.map((function(e){return Object(v.jsx)(F,{messObj:e,ProfileObj:o,isOwner:e.creatorId==o.uid},e.id)})).reverse()})]})})})},q=function(e){var t=e.ProfileObj,n=Object(a.useState)([]),c=Object(u.a)(n,2),r=c[0],s=c[1],o=Object(a.useState)([]),j=Object(u.a)(o,2),b=j[0],p=j[1],h=Object(a.useState)(""),m=Object(u.a)(h,2),x=m[0],g=m[1],N=Object(f.g)(),k=Object(f.f)();Object(a.useEffect)((function(){if(1==window.performance.navigation.type)k.push("/");else{var e=N.state.ProfileObj;s(e),g("https://www.instagram.com/".concat(e.instagramId)),U(e)}}),[]);var U=function(){var e=Object(d.a)(l.a.mark((function e(t){var n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.collection("Messages").where("creatorId","==",t.uid).orderBy("createAt").get();case 2:n=e.sent,a=n.docs.map((function(e){return Object(i.a)({id:e.id},e.data())})),p(a);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)("div",{className:"Container",children:[Object(v.jsx)("span",{id:"userProfileName",children:r.displayName}),Object(v.jsxs)("div",{className:"showProfile",children:[Object(v.jsx)("div",{className:"profilePhoto",children:Object(v.jsx)("img",{src:r.photoURL?r.photoURL:"user.png"})}),Object(v.jsxs)("ul",{children:[Object(v.jsx)("li",{children:r.name}),Object(v.jsxs)("li",{id:"instagramId",children:[Object(v.jsxs)("p",{children:["Instagram ",Object(v.jsx)(w.a,{icon:y.c})]})," ",Object(v.jsx)("a",{href:x,target:"_blank",children:r.instagramId})]})]})]}),Object(v.jsxs)("span",{children:[r.displayName,"\uc758 \uc791\uc131\uae00"]}),Object(v.jsx)("div",{children:b.map((function(e){return Object(v.jsx)(F,{messObj:e,ProfileObj:t,isOwner:!1},e.id)})).reverse()})]})})},J=function(e){Object(_.a)(n,e);var t=Object(A.a)(n);function n(e){var a;return Object(C.a)(this,n),(a=t.call(this,e)).setWrapperRef=a.setWrapperRef.bind(Object(R.a)(a)),a.handleClickOutside=a.handleClickOutside.bind(Object(R.a)(a)),a.state={isOpenMoal:!1},a}return Object(I.a)(n,[{key:"componentDidMount",value:function(){document.addEventListener("mousedown",this.handleClickOutside)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("mousedown",this.handleClickOutside)}},{key:"setWrapperRef",value:function(e){this.wrapperRef=e}},{key:"handleClickOutside",value:function(e){this.wrapperRef&&!this.wrapperRef.contains(e.target)?this.setState({isOpenMoal:!1}):this.setState({isOpenMoal:!0})}},{key:"render",value:function(){return Object(v.jsxs)("div",{ref:this.setWrapperRef,className:"modal2",children:[!this.state.isOpenMoal&&Object(v.jsx)("span",{id:"more",children:"\ub354\ubcf4\uae30"}),this.state.isOpenMoal&&this.props.children]})}}]),n}(a.Component),Y=function(){var e=JSON.parse(window.localStorage.getItem("ProfileObj"))||0,t=Object(a.useState)([]),n=Object(u.a)(t,2),c=n[0],r=n[1];return Object(a.useEffect)((function(){O.collection("User_Alert").doc("".concat(e.uid)).get().then(function(){var t=Object(d.a)(l.a.mark((function t(n){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!n.exists){t.next=4;break}return O.collection("User_Alert").doc("".concat(e.uid)).update({Alert:!1}),t.next=4,n.data().alertObj.map(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.collection("Messages").doc("".concat(t.messId)).get().then((function(e){var n=e.id;r((function(a){return[].concat(Object(k.a)(a),[{alertObj:t,messObj:Object(i.a)(Object(i.a)({},e.data()),{},{id:n})}])}))}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}),[]),console.log(c),Object(v.jsx)(v.Fragment,{children:Object(v.jsx)("div",{className:"Container",children:c.map((function(t){return Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)("div",{className:"centerContainer alertForm",children:[Object(v.jsx)("span",{id:"alerts",children:t.alertObj.text}),Object(v.jsx)(J,{children:Object(v.jsx)(F,{messObj:t.messObj,ProfileObj:e,isOwner:t.messObj.creatorId==e.uid},t.messObj.id)})]})})})).reverse()})})},G=function(e){var t=e.isLoggedin,n=e.getMyProfile,a=e.ProfileObj;return Object(v.jsxs)(m.a,{children:[t&&Object(v.jsx)(B,{ProfileObj:a}),Object(v.jsx)(f.c,{children:t?Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(f.a,{exact:!0,path:"/",children:Object(v.jsx)(W,{ProfileObj:a})}),Object(v.jsx)(f.a,{exact:!0,path:"/profile",children:Object(v.jsx)(T,{getMyProfile:n,ProfileObj:a})}),Object(v.jsx)(f.a,{exact:!0,path:"/userProfile",children:Object(v.jsx)(q,{ProfileObj:a})}),Object(v.jsx)(f.a,{exact:!0,path:"/alert",children:Object(v.jsx)(Y,{ProfileObj:a})})]}):Object(v.jsx)(f.a,{exact:!0,path:"/",children:Object(v.jsx)(N,{})})})]})};var z=function(){var e=Object(a.useState)(!1),t=Object(u.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(!1),s=Object(u.a)(r,2),o=s[0],j=s[1],b=Object(a.useState)([]),h=Object(u.a)(b,2),m=h[0],f=h[1];Object(a.useEffect)((function(){p.onAuthStateChanged(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t?(O.collection("User_Profile").where("email","==",t.email).get().then((function(e){""==e.docs?O.collection("User_Profile").add({displayName:t.displayName,name:"",email:t.email,password:"",instagramId:"",photoURL:t.photoURL,uid:t.uid}):e.docs.map(function(){var e=Object(d.a)(l.a.mark((function e(n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.exists||""!=n.data().uid){e.next=3;break}return e.next=3,O.collection("User_Profile").doc("".concat(n.id)).update({uid:t.uid});case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())})),x(),j(!0)):j(!1),c(!0);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[]);var x=function(){var e=Object(d.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=p.currentUser,e.next=3,O.collection("User_Profile").where("email","==",t.email).get();case 3:e.sent.docs.map((function(e){var n=Object(i.a)(Object(i.a)({docId:e.id},e.data()),{},{uid:t.uid});f(n),window.localStorage.setItem("ProfileObj",JSON.stringify(n))}));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)("head",{children:Object(v.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0 user-scalable=no"})}),n?Object(v.jsx)(G,{isLoggedin:o,getMyProfile:x,ProfileObj:m}):Object(v.jsx)("span",{children:"Loading.."}),Object(v.jsxs)("footer",{className:"centerContainer",children:[Object(v.jsx)("hr",{}),"\xa9 WAYD ",(new Date).getFullYear()," by keeper"]})]})};n(63);s.a.render(Object(v.jsx)(c.a.StrictMode,{children:Object(v.jsx)(z,{})}),document.getElementById("root"))}},[[64,1,2]]]);
//# sourceMappingURL=main.4bf6100e.chunk.js.map