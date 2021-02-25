exports.ids = [6];
exports.modules = {

/***/ 143:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VDataTable_VSimpleTable_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(143);
/* harmony import */ var _src_components_VDataTable_VSimpleTable_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VDataTable_VSimpleTable_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);




/* harmony default export */ __webpack_exports__["a"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(_mixins_themeable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]).extend({
  name: 'v-simple-table',
  props: {
    dense: Boolean,
    fixedHeader: Boolean,
    height: [Number, String]
  },
  computed: {
    classes() {
      return {
        'v-data-table--dense': this.dense,
        'v-data-table--fixed-height': !!this.height && !this.fixedHeader,
        'v-data-table--fixed-header': this.fixedHeader,
        'v-data-table--has-top': !!this.$slots.top,
        'v-data-table--has-bottom': !!this.$slots.bottom,
        ...this.themeClasses
      };
    }

  },
  methods: {
    genWrapper() {
      return this.$slots.wrapper || this.$createElement('div', {
        staticClass: 'v-data-table__wrapper',
        style: {
          height: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* convertToUnit */ "g"])(this.height)
        }
      }, [this.$createElement('table', this.$slots.default)]);
    }

  },

  render(h) {
    return h('div', {
      staticClass: 'v-data-table',
      class: this.classes
    }, [this.$slots.top, this.genWrapper(), this.$slots.bottom]);
  }

}));

/***/ }),

/***/ 187:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_fichaInventarioTable_vue_vue_type_style_index_0_id_d9d81d58_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(187);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_fichaInventarioTable_vue_vue_type_style_index_0_id_d9d81d58_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_fichaInventarioTable_vue_vue_type_style_index_0_id_d9d81d58_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_fichaInventarioTable_vue_vue_type_style_index_0_id_d9d81d58_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_fichaInventarioTable_vue_vue_type_style_index_0_id_d9d81d58_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/activos/components/fichaInventarioTable.vue?vue&type=template&id=d9d81d58&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-simple-table',{staticClass:"my-border",scopedSlots:_vm._u([{key:"default",fn:function(){return [_c('thead',[_c('tr',[_c('th',{staticClass:"text-left",attrs:{"sm":"2"}},[_vm._v("\n          Nº INVENTARIO\n        ")]),_vm._v(" "),_c('th',{staticClass:"text-left"},[_vm._v("\n          DESCRIPCION\n        ")])])]),_vm._v(" "),_c('tbody',_vm._l((_vm.activos),function(item){return _c('tr',{key:item.inventario},[_c('td',{attrs:{"width":"200"}},[_vm._v("\n          "+_vm._s(item.inventario)+"\n        ")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(item.nombre))])])}),0)]},proxy:true}])})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/activos/components/fichaInventarioTable.vue?vue&type=template&id=d9d81d58&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/activos/components/fichaInventarioTable.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var fichaInventarioTablevue_type_script_lang_js_ = ({
  props: {
    activos: {
      type: Array,
      default: () => []
    }
  }
});
// CONCATENATED MODULE: ./src/pages/activos/components/fichaInventarioTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_fichaInventarioTablevue_type_script_lang_js_ = (fichaInventarioTablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(29);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDataTable/VSimpleTable.js
var VSimpleTable = __webpack_require__(155);

// CONCATENATED MODULE: ./src/pages/activos/components/fichaInventarioTable.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(202)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_fichaInventarioTablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "d9d81d58",
  "88c3f054"
  
)

/* harmony default export */ var fichaInventarioTable = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */


installComponents_default()(component, {VSimpleTable: VSimpleTable["a" /* default */]})


/***/ })

};;
//# sourceMappingURL=fichaInventarioTable.js.map