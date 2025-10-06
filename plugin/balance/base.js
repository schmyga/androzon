// Базовый класс для балансеров
class BaseBalancer {
    constructor(name) {
        this.name = name;
        this.baseURL = '';
        this.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        };
    }
    
    // Поиск
    search(params) {
        return Promise.resolve([]);
    }
    
    // Получение элемента
    item(params) {
        return Promise.resolve({});
    }
    
    // Получение источника
    source(params) {
        return Promise.resolve([]);
    }
    
    // HTTP запрос
    async request(url, options = {}) {
        try {
            options.headers = {...this.headers, ...options.headers};
            var response = await fetch(url, options);
            return await response.text();
        } catch (error) {
            throw error;
        }
    }
    
    // Парсинг HTML
    parseHTML(html) {
        var parser = new DOMParser();
        return parser.parseFromString(html, 'text/html');
    }
}
