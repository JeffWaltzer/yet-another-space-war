function method(name, body) {
    this.prototype[name]= body;
    return body;
}
    
function objectify(klass) {
    klass.method= method;
    return klass;
}

exports.objectify= objectify;
