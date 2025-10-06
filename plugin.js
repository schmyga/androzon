(function(Plugin, Manager) {
    
    var plugin = {};
    
    plugin.name = 'Androzon';
    plugin.version = '1.0.0';
    
    plugin.search = function(text, type) {
        return new Promise(function(resolve){
            // Тестовые данные
            var items = [{
                title: 'Androzon: ' + text,
                description: 'Плагин работает!',
                year: '2024', 
                type: type || 'movie'
            }];
            
            resolve(items);
        });
    };
    
    // Регистрация плагина
    Manager.add(plugin);
    
})(Plugin, Manager);
