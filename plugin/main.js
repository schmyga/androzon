(function(plugin) {
    var name = 'Androzon';
    var logo = 'https://androzon.my1.ru/s_logo.png';
    
    // Регистрация плагина
    plugin.add({
        name: name,
        logo: logo,
        id: 'androzon',
        version: '1.0.0',
        description: 'Универсальный плагин для поиска контента',
        platforms: ['android','tizen','web'],
        
        // Основные функции
        onStart: function() {
            console.log('Androzon plugin started');
        },
        
        // Поиск контента
        search: function(text, year, type) {
            return new Promise((resolve, reject) => {
                var results = [];
                
                // Балансеры будут добавлять результаты
                var balancers = [
                    'rezka',
                    'filmix'
                    // Можно добавить другие балансеры
                ];
                
                var promises = balancers.map(balancer => {
                    return this.balance(balancer, 'search', {
                        text: text,
                        year: year,
                        type: type
                    }).catch(error => {
                        console.log('Balancer error:', balancer, error);
                        return [];
                    });
                });
                
                Promise.all(promises).then(balancerResults => {
                    balancerResults.forEach(balancerResult => {
                        results = results.concat(balancerResult);
                    });
                    resolve(results);
                }).catch(reject);
            });
        },
        
        // Получение информации о контенте
        getItem: function(source) {
            return this.balance(source.balancer, 'item', {
                source: source
            });
        },
        
        // Получение ссылок для воспроизведения
        getSource: function(source) {
            return this.balance(source.balancer, 'source', {
                source: source
            });
        },
        
        // Система балансеров
        balance: function(name, method, params) {
            try {
                var balancer = this.balancers[name];
                if (balancer && balancer[method]) {
                    return balancer[method](params);
                } else {
                    return Promise.reject('Method not found in balancer');
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
        
        // Инициализация балансеров
        balancers: {}
    });
    
    // Загрузка балансеров
    function loadBalancer(name) {
        try {
            var balancerScript = plugin.utils.loadScript(plugin.path + 'balance/' + name + '.js');
            if (balancerScript) {
                plugin.balancers[name] = balancerScript;
                console.log('Balancer loaded:', name);
            }
        } catch (error) {
            console.error('Error loading balancer:', name, error);
        }
    }
    
    // Инициализация при загрузке
    plugin.on('start', function() {
        // Загружаем стандартные балансеры
        loadBalancer('rezka');
        loadBalancer('filmix');
    });
    
})(this);
