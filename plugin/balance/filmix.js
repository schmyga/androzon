(function() {
    class FilmixBalancer extends BaseBalancer {
        constructor() {
            super('filmix');
            this.baseURL = 'https://filmix.ac';
        }
        
        async search(params) {
            try {
                var url = this.baseURL + '/search/' + encodeURIComponent(params.text);
                var html = await this.request(url);
                var doc = this.parseHTML(html);
                var results = [];
                
                var items = doc.querySelectorAll('.story');
                items.forEach(item => {
                    var titleElem = item.querySelector('.story-header a');
                    var posterElem = item.querySelector('.story-cover img');
                    
                    if (titleElem) {
                        var result = {
                            title: titleElem.textContent.trim(),
                            year: this.extractYear(item),
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
                console.error('Filmix search error:', error);
                return [];
            }
        }
        
        extractYear(item) {
            var text = item.textContent;
            var yearMatch = text.match(/(19|20)\d{2}/);
            return yearMatch ? yearMatch[0] : '';
        }
        
        detectType(item) {
            var text = item.textContent.toLowerCase();
            if (text.includes('сериал')) return 'series';
            return 'movie';
        }
    }
    
    return new FilmixBalancer();
})();
