(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{427:function(t,r,e){"use strict";e.r(r);e(16),e(18),e(48);var n=e(8),o=e(365),c=e(366),l={mixins:[o.validationMixin],validations:{nombreempresa:{required:c.required,minLength:Object(c.minLength)(10)},rut:{required:c.required,minLength:Object(c.minLength)(10)},ordencompra:{required:c.required},factura:{required:c.required},totalFactura:{required:c.required}},data:function(){return{nombreempresa:"NOMBRE EMPRESA DE PRUEBA",rut:"78541214-5",ordencompra:"23",factura:"2323",totalFactura:"1452100",date:(new Date).toISOString().substr(0,10),menu:!1}},computed:{computedDateFormatted:function(){return this.formatDate(this.date)},nombreempresaErrors:function(){var t=[];return this.$v.nombreempresa.$dirty?(!this.$v.nombreempresa.minLength&&t.push("Nombre de la emprea debe ser al menos de 10 caracteres"),!this.$v.nombreempresa.required&&t.push("El nombre de la empresa es obligatorio."),t):t},rutErrors:function(){var t=[];return this.$v.rut.$dirty?(!this.$v.rut.minLength&&t.push("El rut debe ser al menos de 10 caracteres"),!this.$v.rut.required&&t.push("Ingrese el rut de la empresa."),t):t},ordencompraErrors:function(){var t=[];return this.$v.ordencompra.$dirty?(!this.$v.ordencompra.required&&t.push("Ingrese el nro de la Orden de compra"),t):t},facturaErrors:function(){var t=[];return this.$v.factura.$dirty?(!this.$v.factura.required&&t.push("Ingrese el nro de la factura."),t):t},totalFacturaErrors:function(){var t=[];return this.$v.totalFactura.$dirty?(!this.$v.totalFactura.required&&t.push("Ingrese el total de la factura."),t):t}},methods:{continuar:function(){if(this.$v.$touch(),!this.$v.$invalid){var t=this.computedDateFormatted,r={nombreE:this.nombreempresa,rutE:this.rut,oc:this.ordencompra,fact:this.factura,ffact:t,total:this.totalFactura};this.$emit("avanza-stepper",r)}},formatDate:function(t){if(!t)return null;var r=t.split("-"),e=Object(n.a)(r,3),o=e[0],c=e[1],l=e[2];return"".concat(l,"/").concat(c,"/").concat(o)}}},d=e(75),m=e(113),v=e.n(m),f=e(199),h=e(351),$=e(350),x=e(341),E=e(503),F=e(331),C=e(346),_=e(435),component=Object(d.a)(l,(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",[e("v-card",[e("v-card",{staticClass:"py-md-4 mx-lg-auto"},[e("v-card-text",[e("form",[e("p",{staticClass:"title"},[t._v("\n            Proveedor\n          ")]),t._v(" "),e("v-row",{staticClass:"mx-4",attrs:{align:"center"}},[e("v-col",{staticClass:"d-flex",attrs:{cols:"12",sm:"6"}},[e("v-text-field",{attrs:{"error-messages":t.nombreempresaErrors,label:"Nombre Empresa",required:""},on:{input:function(r){return t.$v.nombreempresa.$touch()},blur:function(r){return t.$v.nombreempresa.$touch()}},model:{value:t.nombreempresa,callback:function(r){t.nombreempresa=r},expression:"nombreempresa"}})],1),t._v(" "),e("v-col",{staticClass:"d-flex",attrs:{cols:"12",sm:"6"}},[e("v-text-field",{attrs:{"error-messages":t.rutErrors,label:"Rut",required:""},on:{input:function(r){return t.$v.rut.$touch()},blur:function(r){return t.$v.rut.$touch()}},model:{value:t.rut,callback:function(r){t.rut=r},expression:"rut"}})],1)],1),t._v(" "),e("p",{staticClass:"title"},[t._v("\n            Datos de compra\n          ")]),t._v(" "),e("v-row",{staticClass:"mx-4",attrs:{align:"center"}},[e("v-col",{staticClass:"d-flex",attrs:{cols:"12",sm:"3"}},[e("v-text-field",{attrs:{"error-messages":t.facturaErrors,label:"Factura",required:""},on:{input:function(r){return t.$v.factura.$touch()},blur:function(r){return t.$v.factura.$touch()}},model:{value:t.factura,callback:function(r){t.factura=r},expression:"factura"}})],1),t._v(" "),e("v-col",{staticClass:"d-flex",attrs:{cols:"12",sm:"3"}},[e("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:t._u([{key:"activator",fn:function(r){var n=r.on,o=r.attrs;return[e("v-text-field",t._g(t._b({attrs:{label:"Fecha factura","prepend-icon":"mdi-calendar",readonly:""},model:{value:t.computedDateFormatted,callback:function(r){t.computedDateFormatted=r},expression:"computedDateFormatted"}},"v-text-field",o,!1),n))]}}]),model:{value:t.menu,callback:function(r){t.menu=r},expression:"menu"}},[t._v(" "),e("v-date-picker",{attrs:{locale:"es-es"},on:{input:function(r){t.menu=!1}},model:{value:t.date,callback:function(r){t.date=r},expression:"date"}})],1)],1),t._v(" "),e("v-col",{staticClass:"d-flex",attrs:{cols:"12",sm:"3"}},[e("v-text-field",{attrs:{"error-messages":t.ordencompraErrors,label:"Orden de Compra",required:""},on:{input:function(r){return t.$v.ordencompra.$touch()},blur:function(r){return t.$v.ordencompra.$touch()}},model:{value:t.ordencompra,callback:function(r){t.ordencompra=r},expression:"ordencompra"}})],1),t._v(" "),e("v-col",{staticClass:"d-flex",attrs:{cols:"12",sm:"3"}},[e("v-text-field",{attrs:{"error-messages":t.totalFacturaErrors,label:"Total",required:""},on:{input:function(r){return t.$v.totalFactura.$touch()},blur:function(r){return t.$v.totalFactura.$touch()}},model:{value:t.totalFactura,callback:function(r){t.totalFactura=r},expression:"totalFactura"}})],1)],1)],1)])],1)],1),t._v(" "),e("v-card-actions",{staticClass:"justify-space-around mt-3"},[e("v-btn",{attrs:{color:"primary"},on:{click:function(r){return t.continuar()}}},[t._v("\n      Continuar\n    ")])],1)],1)}),[],!1,null,null,null);r.default=component.exports;v()(component,{VBtn:f.a,VCard:h.a,VCardActions:$.a,VCardText:$.b,VCol:x.a,VDatePicker:E.a,VMenu:F.a,VRow:C.a,VTextField:_.a})}}]);