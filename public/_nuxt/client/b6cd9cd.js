(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{388:function(t,e,r){},405:function(t,e,r){"use strict";r(388)},424:function(t,e,r){"use strict";r.r(e);var n=r(2),o=r(59);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var l={fetch:function(){this.$store.dispatch("cargaFuncionarios")},data:function(){return{headers:[{text:"Nombre",align:"start",sortable:!1,value:"nombre"},{text:"Apellido",value:"apellido",sortable:!1},{text:"Departamento",value:"departamento"},{text:"Sección",value:"seccion"}]}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(o.c)({funcionarios:"getFuncionarios",loading:"getLoading"})),methods:{clicked:function(t){this.$store.dispatch("actionSetFuncionarioSeleccionado",t),this.$router.push("/funcionarios/funcionario")}}},d=(r(405),r(75)),f=r(113),h=r.n(f),O=r(504),component=Object(d.a)(l,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("v-data-table",{staticClass:"elevation-1 row-pointer",attrs:{headers:this.headers,items:this.funcionarios,loading:this.loading,"loading-text":"Cargando... espere por favor"},on:{"click:row":this.clicked}})],1)}),[],!1,null,null,null);e.default=component.exports;h()(component,{VDataTable:O.a})}}]);