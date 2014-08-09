var LeapController = function (player) {
    this.player = player;
    // creates a new Leap Controller object
    this.controller = new Leap.Controller();
    // connect the controller with the web socket
    this.controller.connect();
}

LeapController.prototype = {
    constructor: LeapController,
    update: function() {
        var player = this.player;
        var leapToScene = this.leapToScene;
        this.controller.on('frame', function(frame){
            // loop through the hands array returned from 'frame'
            for (var i=0; i < frame.hands.length; i++){
                // for each hand:
                var hand = frame.hands[i];
                // get the hand position in canvas coordination by using leapToScene function
                var handPos = leapToScene(frame, hand.palmPosition, w, h);
                // grabStrength has value from 0 to 1
                if (hand.grabStrength == 1 ){
                    // if grabStrength = 1, let the player fire a laser
                    player.fire();
                }
                // update new aircraft's position according to the position of the player's hand
                player.sprite.x = handPos[0];
                player.sprite.y = handPos[1];
            }
        });
    },
    leapToScene: function(frame , leapPos, gameDivWidth, gameDivHeight ){
        // Gets the interaction box of the current frame
        var iBox = frame.interactionBox;
        // Gets the left border and top border of the box
        // In order to convert the position to the proper
        // location for the canvas
        var left = iBox.center[0] - iBox.size[0]/2;
        var top = iBox.center[1] + iBox.size[1]/2;
        // Takes our leap coordinates, and changes them so
        // that the origin is in the top left corner
        var x = leapPos[0] - left;
        var y = leapPos[1] - top;
        // Divides the position by the size of the box
        // so that x and y values will range from 0 to 1
        // as they lay within the interaction box
        x /= iBox.size[0];
        y /= iBox.size[1];
        // Uses the height and width of the canvas to scale
        // the x and y coordinates in a way that they
        // take up the entire canvas
        x *= gameDivWidth;
        y *= gameDivHeight;
        // Returns the values, making sure to negate the sign
        // of the y coordinate, because the y basis in canvas
        // points down instead of up
        return [ x , -y ];
    }
}