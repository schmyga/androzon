(function() {
    class RezkaBalancer extends BaseBalancer {
        constructor() {
            super('rezka');
            this.baseURL = 'https://rezka.ag';
        }
        
        async search(params) {
            try {
                var url = this.baseURL + '/search/?do=search&subaction=search&q=' + encodeURIComponent(params.text);
                var html = await this.request(url);
                var doc = this.parseHTML(html);
                var results = [];
                
                var items = doc.querySelectorAll('.b-content__inline_item');
                items.forEach(item => {
                    var titleElem = item.querySelector('.b-content__inline_item-link a');
                    var yearElem = item.querySelector('.b-content__inline_item-link div');
                    var posterElem = item.querySelector('.b-content__inline_item-cover img');
                    
                    if (titleElem) {
                        var result = {
                            title: titleElem.textContent.trim(),
                            year: yearElem ? yearElem.textContent.trim() : '',
                            poster: posterElem ? posterElem.src : '',
                            url: titleElem.href,
                            balancer: this.name,
                            type: this.detectType(item)
                        };
                        
                        results.push(result);
                    }
                });
                
                return results;
            } catch (error) {
                console.error('Rezka search error:', error);
                return [];
            }
        }
        
        detectType(item) {
            var classes = item.className;
            if (classes.includes('series')) return 'series';
            if (classes.includes('film')) return 'movie';
            return 'movie';
        }
    }
    
    return new RezkaBalancer();
})();
