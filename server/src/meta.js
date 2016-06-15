function method(klass, name, body) {
    klass.prototype[name]= body;
    return body;
}
    
exports.method= method;
