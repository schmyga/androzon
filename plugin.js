// Androzon Plugin
(function(plugin) {
    
    console.log('Androzon loaded');
    
    plugin.add({
        name: 'Androzon',
        version: '1.0.0',
        
        search: function(text) {
            return new Promise((resolve) => {
                resolve([{
                    title: 'Test: ' + text,
                    description: 'Androzon works!'
                }]);
            });
        }
    });
    
})(this);
