(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"/0OI":function(e,t,n){"use strict";n.r(t),n.d(t,"createTranslateLoader",function(){return E}),n.d(t,"CriaContaPageModule",function(){return S});var o=n("ofXK"),r=n("3Pt+"),a=n("TEn/"),s=n("tyNb"),i=n("mrSG"),l=n("fXoL"),m=n("sYmb"),d=n("AytR"),c=n("tk/3");let p=(()=>{class e{constructor(e,t){this.http=e,this.router=t,this.url="/utilizadores/",this.url_info="/utilizadoresInfo/"}criaConta(e,t,n,o){console.log(n),console.log(o),this.http.post(d.a.apiUrl+this.url,{nome:n,password:t,login_type:"0"}).subscribe(t=>{console.log(t.iduser),this.http.post(d.a.apiUrl+this.url_info,{email:e,primeiro_nome:n,ultimo_nome:o,userid:t.iduser}).subscribe(e=>{console.log(e),this.router.navigate(["/login"])},e=>{console.log(e)})},e=>{console.log(e)})}}return e.\u0275fac=function(t){return new(t||e)(l["\u0275\u0275inject"](c.a),l["\u0275\u0275inject"](s.g))},e.\u0275prov=l["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();function u(e,t){if(1&e&&(l["\u0275\u0275elementContainerStart"](0),l["\u0275\u0275elementStart"](1,"small",16),l["\u0275\u0275text"](2),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementContainerEnd"]()),2&e){const e=l["\u0275\u0275nextContext"]().$implicit;l["\u0275\u0275advance"](2),l["\u0275\u0275textInterpolate"](e.message)}}function g(e,t){if(1&e&&(l["\u0275\u0275elementStart"](0,"div"),l["\u0275\u0275template"](1,u,3,1,"ng-container",15),l["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit,n=l["\u0275\u0275nextContext"]();l["\u0275\u0275advance"](1),l["\u0275\u0275property"]("ngIf",n.email.hasError(e.type)&&(n.email.dirty||n.email.touched))}}function f(e,t){if(1&e&&(l["\u0275\u0275elementContainerStart"](0),l["\u0275\u0275elementStart"](1,"small",16),l["\u0275\u0275text"](2),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementContainerEnd"]()),2&e){const e=l["\u0275\u0275nextContext"]().$implicit;l["\u0275\u0275advance"](2),l["\u0275\u0275textInterpolate"](e.message)}}function h(e,t){if(1&e&&(l["\u0275\u0275elementStart"](0,"div"),l["\u0275\u0275template"](1,f,3,1,"ng-container",15),l["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit,n=l["\u0275\u0275nextContext"]();l["\u0275\u0275advance"](1),l["\u0275\u0275property"]("ngIf",n.password.hasError(e.type)&&(n.password.dirty||n.password.touched))}}function v(e,t){if(1&e&&(l["\u0275\u0275elementContainerStart"](0),l["\u0275\u0275elementStart"](1,"small",16),l["\u0275\u0275text"](2),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementContainerEnd"]()),2&e){const e=l["\u0275\u0275nextContext"]().$implicit;l["\u0275\u0275advance"](2),l["\u0275\u0275textInterpolate"](e.message)}}function y(e,t){if(1&e&&(l["\u0275\u0275elementStart"](0,"div"),l["\u0275\u0275template"](1,v,3,1,"ng-container",15),l["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit,n=l["\u0275\u0275nextContext"]();l["\u0275\u0275advance"](1),l["\u0275\u0275property"]("ngIf",n.passwordRepeat.hasError(e.type)&&(n.passwordRepeat.dirty||n.passwordRepeat.touched))}}const w=function(e){return{lang:e}},x=[{path:"",component:(()=>{class e{constructor(e,t,n,o){this.formBuilder=e,this.alertCtrl=t,this.translateService=n,this.api=o,this.showPass=!1,this.showPass2=!1,this.language=this.translateService.currentLang,this.passwordIconToggle="eye",this.passwordIconToggle2="eye",this.profileForm=this.formBuilder.group({email:"",pass:"",passRepeat:"",f_nome:"",l_name:""}),this.registrationForm=this.formBuilder.group({email:["",r.Validators.compose([r.Validators.maxLength(70),r.Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"),r.Validators.required])],f_nome:[],l_nome:[],pass:["",r.Validators.compose([r.Validators.required,r.Validators.minLength(6),r.Validators.maxLength(12)])],passRepeat:["",r.Validators.required]},{validator:this.matchingPasswords("pass","passRepeat")}),this.errorMessages={password:[{type:"required",message:"Password e necess\xe1ria!"},{type:"maxlength",message:"password is necessary"}],email:[{type:"required",message:"Email e necess\xe1rio!"},{type:"pattern",message:"Digite um email valido"}]}}get primeiro_nome(){return this.registrationForm.get("f_nome")}get ultimo_nome(){return this.registrationForm.get("l_nome")}get email(){return this.registrationForm.get("email")}get password(){return this.registrationForm.get("pass")}get passwordRepeat(){return this.registrationForm.get("passRepeat")}ngOnInit(){}togglePass(){this.showPass=!this.showPass,this.passwordIconToggle="eye"==this.passwordIconToggle?"eye-off":"eye"}togglePass2(){this.showPass2=!this.showPass2,this.passwordIconToggle2="eye"==this.passwordIconToggle2?"eye-off":"eye"}showAlert(){return Object(i.a)(this,void 0,void 0,function*(){const e=yield this.alertCtrl.create({header:"Erro",message:"As password n\xe3o coincidem. Tente Novamente",buttons:["Tentar Novamente"]});yield e.present();const t=yield e.onDidDismiss();console.log(t)})}matchingPasswords(e,t){return n=>{if(n.controls[e].value!==n.controls[t].value)return{mismatchedPasswords:!0}}}submit(){var e=this.registrationForm.get("email").value,t=this.registrationForm.get("pass").value,n=this.registrationForm.get("f_nome").value,o=this.registrationForm.get("l_nome").value;this.api.criaConta(e,t,n,o)}}return e.\u0275fac=function(t){return new(t||e)(l["\u0275\u0275directiveInject"](r.FormBuilder),l["\u0275\u0275directiveInject"](a.AlertController),l["\u0275\u0275directiveInject"](m.e),l["\u0275\u0275directiveInject"](p))},e.\u0275cmp=l["\u0275\u0275defineComponent"]({type:e,selectors:[["app-cria-conta"]],decls:42,vars:18,consts:[["slot","start"],["text","voltar"],["translate","",2,"text-align","center",3,"translateParams"],[1,"conteudo"],["id","imagem","src","assets/BestRide.png"],[1,"form",3,"formGroup","ngSubmit"],["formControlName","f_nome","required",""],["formControlName","l_nome","required",""],["formControlName","email","type","email","required",""],[4,"ngFor","ngForOf"],["formControlName","pass","required","",3,"type"],["slot","end",3,"name","click"],["translate","",3,"translateParams"],["formControlName","passRepeat","required","",3,"type"],["color","primary","expand","block","type","submit","translate","",3,"disabled","translateParams"],[4,"ngIf"],[1,"error-message"]],template:function(e,t){1&e&&(l["\u0275\u0275elementStart"](0,"ion-header"),l["\u0275\u0275elementStart"](1,"ion-toolbar"),l["\u0275\u0275elementStart"](2,"ion-buttons",0),l["\u0275\u0275element"](3,"ion-back-button",1),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](4,"ion-title",2),l["\u0275\u0275text"](5,"create_account.tabName "),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](6,"ion-content"),l["\u0275\u0275elementStart"](7,"ion-list",3),l["\u0275\u0275element"](8,"img",4),l["\u0275\u0275elementStart"](9,"form",5),l["\u0275\u0275listener"]("ngSubmit",function(){return t.submit()}),l["\u0275\u0275elementStart"](10,"ion-card"),l["\u0275\u0275elementStart"](11,"ion-item"),l["\u0275\u0275elementStart"](12,"ion-label"),l["\u0275\u0275text"](13,"Primeiro Nome"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275element"](14,"ion-input",6),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](15,"ion-card"),l["\u0275\u0275elementStart"](16,"ion-item"),l["\u0275\u0275elementStart"](17,"ion-label"),l["\u0275\u0275text"](18,"Ultimo Nome"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275element"](19,"ion-input",7),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](20,"ion-card"),l["\u0275\u0275elementStart"](21,"ion-item"),l["\u0275\u0275elementStart"](22,"ion-label"),l["\u0275\u0275text"](23,"Email"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275element"](24,"ion-input",8),l["\u0275\u0275elementEnd"](),l["\u0275\u0275template"](25,g,2,1,"div",9),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](26,"ion-card"),l["\u0275\u0275elementStart"](27,"ion-item"),l["\u0275\u0275elementStart"](28,"ion-label"),l["\u0275\u0275text"](29,"Password"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275element"](30,"ion-input",10),l["\u0275\u0275elementStart"](31,"ion-icon",11),l["\u0275\u0275listener"]("click",function(){return t.togglePass()}),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275template"](32,h,2,1,"div",9),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](33,"ion-card"),l["\u0275\u0275elementStart"](34,"ion-item"),l["\u0275\u0275elementStart"](35,"ion-label",12),l["\u0275\u0275text"](36,"create_account.text"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275element"](37,"ion-input",13),l["\u0275\u0275elementStart"](38,"ion-icon",11),l["\u0275\u0275listener"]("click",function(){return t.togglePass2()}),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275template"](39,y,2,1,"div",9),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](40,"ion-button",14),l["\u0275\u0275text"](41,"create_account.button_text "),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"]()),2&e&&(l["\u0275\u0275advance"](4),l["\u0275\u0275property"]("translateParams",l["\u0275\u0275pureFunction1"](12,w,t.language)),l["\u0275\u0275advance"](5),l["\u0275\u0275property"]("formGroup",t.registrationForm),l["\u0275\u0275advance"](16),l["\u0275\u0275property"]("ngForOf",t.errorMessages.email),l["\u0275\u0275advance"](5),l["\u0275\u0275property"]("type",t.showPass?"text":"password"),l["\u0275\u0275advance"](1),l["\u0275\u0275property"]("name",t.passwordIconToggle),l["\u0275\u0275advance"](1),l["\u0275\u0275property"]("ngForOf",t.errorMessages.password),l["\u0275\u0275advance"](3),l["\u0275\u0275property"]("translateParams",l["\u0275\u0275pureFunction1"](14,w,t.language)),l["\u0275\u0275advance"](2),l["\u0275\u0275property"]("type",t.showPass2?"text":"password"),l["\u0275\u0275advance"](1),l["\u0275\u0275property"]("name",t.passwordIconToggle2),l["\u0275\u0275advance"](1),l["\u0275\u0275property"]("ngForOf",t.errorMessages.password),l["\u0275\u0275advance"](1),l["\u0275\u0275property"]("disabled",!t.registrationForm.valid)("translateParams",l["\u0275\u0275pureFunction1"](16,w,t.language)))},directives:[a.IonHeader,a.IonToolbar,a.IonButtons,a.IonBackButton,a.IonBackButtonDelegate,a.IonTitle,m.a,a.IonContent,a.IonList,r["\u0275angular_packages_forms_forms_ba"],r.NgControlStatusGroup,r.FormGroupDirective,a.IonCard,a.IonItem,a.IonLabel,a.IonInput,a.TextValueAccessor,r.NgControlStatus,r.FormControlName,r.RequiredValidator,o.NgForOf,a.IonIcon,a.IonButton,o.NgIf],styles:[".conteudo[_ngcontent-%COMP%]{display:flex;flex-direction:column}ion-toolbar[_ngcontent-%COMP%]{--background:#fff}ion-item[_ngcontent-%COMP%]{--bacground:#fff}.error-message[_ngcontent-%COMP%]{color:red}#imagem[_ngcontent-%COMP%]{width:50%;align-self:center}ion-card[_ngcontent-%COMP%]{font-size:25px;box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);text-align:center}"]}),e})()}];let I=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=l["\u0275\u0275defineInjector"]({imports:[[s.i.forChild(x)],s.i]}),e})();var b=n("mqiu");function E(e){return new b.a(e,"./assets/lang/",".json")}let S=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=l["\u0275\u0275defineInjector"]({imports:[[o.CommonModule,r.FormsModule,a.IonicModule,I,r.FormsModule,r.ReactiveFormsModule,m.c.forChild({loader:{provide:m.b,useFactory:E,deps:[c.a]}})]]}),e})()}}]);