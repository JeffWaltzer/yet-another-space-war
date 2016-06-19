function mk_class_method(name, body) {
    this.prototype[name]= body;
    if(!this.methods[name])
	this.methods.push(name);
    return body;
}
    
function add_mixin(mixin_module) {
    if (mixin_module.methods)
	mixin_module.methods.forEach(
	    function(method_name, index, method_names) {
		this.method(method_name, mixin_module[method_name]);
	    },
	    this);
}

function objectify(klass) {
    klass.methods= [];
    klass.method= mk_class_method;
    klass.mixin= add_mixin;
    return klass;
}

function mk_mixin_method(name, body) {
    this[name]= body;
    if (!this.methods[name])
	this.methods.push(name);
    return body;
}

function modularize(exports_var) {
    exports_var.methods= [];
    exports_var.method= mk_mixin_method;
}

exports.objectify= objectify;
exports.modularize= modularize;
