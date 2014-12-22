describe('with ship points', function() {
    var svg= null;

    beforeEach(module('YASW'));

    beforeEach(inject(function(_SVG_) {
        svg= _SVG_;
    }));

    it ('generates polygon string', function() {
        var points=[
            [10,10],
            [5,10],
            [10,5]
            ];

        expect(svg.polygon_string(points)).toEqual("10,10 5,10 10,5")
    });
});
