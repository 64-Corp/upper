Global
---



each() 
-----------------------------
Helper function for iterating over an array. If the func returns
a true value, it will break out of the loop.


eachReverse() 
-----------------------------
Helper function for iterating over an array backwards. If the func
returns a true value, it will break out of the loop.


eachProp() 
-----------------------------
Cycles over properties in an object and calls a function for each
property value. If the function returns a truthy value, then the
iteration is stopped.


mixin() 
-----------------------------
Simple function to mix in properties from source into target,
but only if target does not already have a property of the same name.


makeError(id, message, err) 
-----------------------------
Constructs an error with a pointer to an URL with more information.

**Parameters**

**id**: String, the error ID that maps to an ID on a web page.

**message**: String, human readable error.

**err**: Error, the original error, if there is one.

**Returns**: Error, Constructs an error with a pointer to an URL with more information.

trimDots(ary) 
-----------------------------
Trims the . and .. from an array of path segments.
It will keep a leading path segment if a .. will become
the first path segment, to help with module name lookups,
which act like paths, but can be remapped. But the end result,
all paths that use this function should look normalized.
NOTE: this method MODIFIES the input array.

**Parameters**

**ary**: Array, the array of path segments.


normalize(name, baseName, applyMap) 
-----------------------------
Given a relative module name, like ./something, normalize it to
a real name that can be mapped to a path.

**Parameters**

**name**: String, the relative name

**baseName**: String, a real name that the name arg is relative
to.

**applyMap**: Boolean, apply the map config to the value. Should
only be done if this normalization is for a dependency ID.

**Returns**: String, normalized name

makeModuleMap(name, parentModuleMap, isNormalized:, applyMap:) 
-----------------------------
Creates a module mapping that includes plugin prefix, module
name, and path. If parentModuleMap is provided it will
also normalize the name via require.normalize()

**Parameters**

**name**: String, the module name

**parentModuleMap**: String, parent module map
for the module name, used to resolve relative names.

**isNormalized:**: Boolean, is the ID already normalized.
This is true if this call is done for a define() module ID.

**applyMap:**: Boolean, apply the map config to the ID.
Should only be true if this map is for a dependency.

**Returns**: Object, Creates a module mapping that includes plugin prefix, module
name, and path. If parentModuleMap is provided it will
also normalize the name via require.normalize()

takeGlobalQueue() 
-----------------------------
Internal method to transfer globalQueue items to this context's
defQueue.


check() 
-----------------------------
Checks if the module is ready to define itself, and if so,
define it.


getScriptData(evt) 
-----------------------------
Given an event from a script node, get the requirejs info from it,
and then removes the event listeners on the node.

**Parameters**

**evt**: Event, Given an event from a script node, get the requirejs info from it,
and then removes the event listeners on the node.

**Returns**: Object, Given an event from a script node, get the requirejs info from it,
and then removes the event listeners on the node.

configure(cfg) 
-----------------------------
Set a configuration for the context.

**Parameters**

**cfg**: Object, config object to integrate.


toUrl() 
-----------------------------
Converts a module name + .extension into an URL path.
*Requires* the use of a module name. It does not support using
plain URLs like nameToUrl.


enable() 
-----------------------------
Called to enable a module if it is still in the registry
awaiting enablement. A second arg, parent, the parent module,
is passed in for context, when this method is overridden by
the optimizer. Not shown here to keep code compact.


completeLoad(moduleName) 
-----------------------------
Internal method used by environment adapters to complete a load event.
A load event could be a script load or just a load pass from a synchronous
load call.

**Parameters**

**moduleName**: String, the name of the module to potentially complete.


nameToUrl() 
-----------------------------
Converts a module name to a file path. Supports cases where
moduleName may actually be just an URL.
Note that it **does not** call normalize on the moduleName,
it is assumed to have already been normalized. This is an
internal API, not a public one. Use toUrl for the public API.


execCb() 
-----------------------------
Executes a module callback function. Broken out as a separate function
solely to allow the build system to sequence the files in the built
layer in the right sequence.


onScriptLoad(evt) 
-----------------------------
callback for script loads, used to check status of loading.

**Parameters**

**evt**: Event, the event from the browser for the script
that was loaded.


onScriptError() 
-----------------------------
Callback for script errors.


config() 
-----------------------------
Support require.config() to make it easier to cooperate with other
AMD loaders on globally agreed names.


createNode() 
-----------------------------
Creates the node for the load command. Only used in browser envs.


load(context, moduleName, url) 
-----------------------------
Does the request to load a module for the browser case.
Make this a separate function to allow other environments
to override it.

**Parameters**

**context**: Object, the require context to find state.

**moduleName**: String, the name of the module.

**url**: Object, the URL to the module.


define() 
-----------------------------
The function that handles definitions of modules. Differs from
require() in that a string for the module should be the first argument,
and the function to execute after dependencies are loaded should
return a value to define the module corresponding to the first argument's
name.


exec(text) 
-----------------------------
Executes the text. Normally just uses eval, but can be modified
to use a better, environment-specific call. Only used for transpiling
loader plugins, not for plain JS modules.

**Parameters**

**text**: String, the text to execute/evaluate.


---








