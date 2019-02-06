(function () {
    const NEWS_URL = 'https://api.telegra.ph/getPageList?access_token=b968da509bb76866c35425099bc0989a5ec3b32997d55286c657e6994bbb&limit=3';
    const app = new Vue({
        el: '#vue-app',
        template: `
            <div>
                <news-item  v-for="item in news" :key="item.url" v-bind:item="item"></news-item>
            </div>`,
        data: {
            news: [],
            loading: false
        },
        mounted() {
            this.loading = true
            axios
                .get(NEWS_URL)
                .then(response => {
                    console.log(response.data.result.pages)
                    this.news = response.data.result.pages;
                    this.loading = false;
                })
        }
    })

    Vue.component('news-item', {
        props: ['item'],
        template: '<div>{{JSON.stringify(item)}}</div>',
        mounted() {
            console.log(this.item);
        },
        data: {
            elm: document.getElementById('hi')
        },
        methods: {
            showModal: function() {
                console.log(this.item.path)
                axios.get(`https://api.telegra.ph/getPage/${this.item.path}?return_content=true`)
                .then(response => {
                    formatResponse(response.data.result);
                });
            }
        },
        template: `
        <article class="uk-section uk-section-small uk-padding-remove-top">
            <header>
                <h2 class="uk-margin-remove-adjacent uk-text-bold uk-margin-small-bottom">
                    <a title="{{}}" class="uk-link-reset" href="#">{{item.title}}</a>
                </h2>
                <p class="uk-article-meta">
                    Written on March 23, 2018. Posted in 
                    <a href="#">Blog</a>
                     | 
                     <span data-uk-icon="icon: future"></span> 
                     Takes 7 min reading.
                </p>
            </header>
            <figure>
                <img src="https://picsum.photos/800/300/?random=3" alt="Alt text">
                <figcaption class="uk-padding-small uk-text-center uk-text-muted">Caption of the image</figcaption>
            </figure>
            <p>
                {{ item.description }}
            </p>
            <a href="#modal-full" title="Read More" uk-toggle class="uk-button uk-button-default uk-button-small" v-on:click="showModal">READ MORE</a>
            <hr>
        </article>
        `
    })

})();