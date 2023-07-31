const API1 = 'https://youtube-v3-alternative.p.rapidapi.com/channel?id=UCR7Ls5FuT6UKTcsMkcwgCUA&maxResults=9';
const API2 = 'https://spotify-web2.p.rapidapi.com/search/?q=mastodon&type=albums&offset=0&limit=10&numberOfTopResults=5';

const content = null || document.querySelector('#content')
const contentAlb = null || document.querySelector('#contentAlbums')

const optionsYT = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'be75c30503mshbb980780118646dp1b4d79jsnd683affb4778',
        'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
    }
};
const optionsSF = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'be75c30503mshbb980780118646dp1b4d79jsnd683affb4778',
		'X-RapidAPI-Host': 'spotify-web2.p.rapidapi.com'
	}
};

async function fetchData(urlApi, urlOptions) {
    try {
        const response = await fetch(urlApi, urlOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

(async () => {
    try {
        const videos = await fetchData(API1, optionsYT);
        const resAlb = await fetchData(API2, optionsSF)
        const albums = resAlb.albums.items.sort((a,b) => {
            if(b.data.date.year > a.data.date.year){
                return 1
            }
            if(b.data.date.year < a.data.date.year){
                return -1;
            }
            return 0;
        });
        console.log(albums)
        let viewYT = `
            ${videos.data.map(video => `
            <div class="group relative">
                <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.thumbnail[0].url}" alt="${video.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-400">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.title}
                    </h3>
                </div>
            </div>
            `).slice(0,4).join('')}
        `;
        
        let viewSF = `
            ${albums.map(album => `
            <div class="group relative">
                <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${album.data.coverArt.sources[0].url}" alt="${album.data.name}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-400">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${album.data.name}
                    </h3>
                </div>
            </div>
            `).slice(0,8).join('')} 
        `;
    content.innerHTML = viewYT;
    contentAlb.innerHTML = viewSF;
    } catch (error) {
        console.log(error);
    }
})()