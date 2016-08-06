// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See meteor-coverage-self-instrumenter-tests.js for an example of importing.
export const name = 'meteor-coverage-self-instrumenter';
import { _ } from 'meteor/underscore';
import istanbulAPI from 'istanbul-api';

//var im = Npm.require('istanbul-middleware');
var Hook = istanbulAPI.libHook,
    Instrument = istanbulAPI.libInstrument;

/**
 * hooks `runInThisContext` to add instrumentation to matching files when they are loaded on the server
 */
var instrumenter = Instrument.createInstrumenter(opts);

var opts = {};
opts.verbose = true;
opts.coverageVariable = '__coverage__'; //force this always
console.log("Self instrumentation meteor-coverage started");
/**
 *
 * a match function with signature `fn(file)` that returns true if `file` needs to be instrumented
 * if the result is true, it also reads the corresponding source map
 * @returns {Function}
 */
var shallInstrumentServerScript = function (file) {
    var root = __meteor_bootstrap__.serverDir;
    file = file.substring(root.length);
    if (file.indexOf("lmieulet_meteor-coverage.js") >= 0 && file.indexOf("test") === -1) {
        // add source map later
        sourceMapNotAdded.push(root+file)
        return true;
    }
    return false;
}

var transformer = instrumenter.instrumentSync.bind(instrumenter);
Hook.hookRunInThisContext(
    shallInstrumentServerScript,
    transformer,
    {
        verbose: opts.verbose,
    }
);
/**
* This package is created before the meteor-coverage package, so it uses this timer to save the source map
* few ms later the file have been scanned into the map of the package
*/
var sourceMapNotAdded = [];
var timer = Meteor.setInterval(function () {
    if (Package["lmieulet:meteor-coverage"]){
        if (Package["lmieulet:meteor-coverage"].default && Package["lmieulet:meteor-coverage"].default.SourceMap) {
            Meteor.clearInterval(timer);
            for (var i = 0; i < sourceMapNotAdded.length; i++) {
                Package["lmieulet:meteor-coverage"].default.SourceMap.registerSourceMap(sourceMapNotAdded[i]);
                console.log("Self instrumentation meteor-coverage source map saved");
            }
        } else {
            console.log(name, "not initialized", Package["lmieulet:meteor-coverage"].default, Package["lmieulet:meteor-coverage"])
        }
    } else {
        console.error(name, "failed to access to lmieulet:meteor-coverage. Retry in 500ms")
    }
}, 500)
