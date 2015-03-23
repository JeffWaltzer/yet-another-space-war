yet-another-space-war
=====================

Client/Server MMO Space Wars

Data format:

    The first thing sent from the server to the client is an integer
    version number. This is a description of version 0 of the data
    protocol.

    Subsequent messages are JSON arrays, of the form:

    [object-id, array of poly-lines]

    For example,

    [1, [[10, 10], [10, 20], [16, 20]]]

    describes an object whose id is 1, and which consists of two
    lines. The first line is from 10,10 to 10,20; the second line is
    from 10,20 to 16, 20.

    The coordinates for the lines are numbers in gameboard space, but
    the id may be either a number or a string.

    The array of line coordinates may not be present; that is, the
    message:

    [2]

    is valid. The meaning of such a message is to not draw the object
    with id 2 (effectively deleting it).

Installation Instructions
{{men at work}}
