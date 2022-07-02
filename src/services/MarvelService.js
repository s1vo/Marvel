class MarvelService { 
    
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=cdf2284839ea96a5b12bfa2bb1a50ee9' 

    getResoource = async (url) => {
        let res = await fetch(url); 
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        return await res.json();
    }

    // получение всех персонажей 
    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transtormCharacter);
    }
    // получение персонажа по ID 
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transtormCharacter(res.data.results[0]); 
    }

    _transtormCharacter = (char)=> {

        return {
            name: char.name,
            desctiption : char.desctiption,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki : char.urls[1].url,
        }
    }

}

export default MarvelService