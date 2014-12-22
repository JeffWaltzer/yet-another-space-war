describe('with polygon points', function() {
    var svg= null;

    beforeEach(module('YASW'));

    beforeEach(inject(function(_SVG_) {
        svg= _SVG_;
    }));

    it ('generates SVG string', function() {
        var points=[
            [10,10],
            [5,10],
            [10,5]
        ];

        expect(svg.polygon_string(points)).toEqual("10,10 5,10 10,5")
    });

    it ('generates other SVG string', function() {
        var points=[
            [11,12],
            [15,20],
            [5,20],
            [11,5]
        ];

        expect(svg.polygon_string(points)).toEqual("11,12 15,20 5,20 11,5")
    });
});
