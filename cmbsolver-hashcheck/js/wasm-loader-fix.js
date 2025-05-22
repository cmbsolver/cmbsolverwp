/**
 * WASM Loader Fix - Forces ArrayBuffer instantiation instead of streaming
 * This avoids MIME type errors with WebAssembly.instantiateStreaming
 */
(function() {
    // Store original instantiateStreaming function
    if (typeof WebAssembly !== 'undefined' && WebAssembly.instantiateStreaming) {
        WebAssembly._originalInstantiateStreaming = WebAssembly.instantiateStreaming;

        // Override instantiateStreaming to always use ArrayBuffer approach instead
        WebAssembly.instantiateStreaming = function(response, importObject) {
            console.log('WASM: Falling back to ArrayBuffer instantiation');

            return response.arrayBuffer()
                .then(function(buffer) {
                    return WebAssembly.instantiate(buffer, importObject);
                });
        };
    }

    console.log('WASM loader fix applied');
})();