// import Vue from 'vue'
import Vuex from 'vuex';
import api from "./api";
import moment from "moment";

const store = new Vuex.Store({
    state: {
        totalPages: undefined,
        currentPage: undefined,
        startDate: "07/16/2020",
        endDate: "07/16/2022",
        films: [],
        filmDetail: {},
        genreList: undefined,
        filmCast: {},
    },
    actions: {
        SET_DATE: function (context, startDate, endDate) {
            // mutation set date states
            context.commit('SET_DATE', startDate, endDate);

            // action set page 1
            context.dispatch('SET_PAGE', 1);
        },
        SET_PAGE: function (context, page) {
            // fetch first page of search page
            api.discover_movies({
                'language': 'en-US',
                'sort_by': 'popularity.desc',
                'include_video': 'false',
                'with_watch_monetization_types': 'flatrate',
                'page': page,
                'release_date.gte': moment(this.state.startDate).format('YYYY-MM-DD'),
                'release_date.lte': moment(this.state.endDate).format('YYYY-MM-DD'),
            }).then((res) => {
                context.commit('SET_FILM_LIST', res.films);

                // mutation page 1
                context.commit('SET_PAGE', res.page.currentPage, res.page.totalPages);

                // check for genres to update
                 context.dispatch('UPDATE_GENRE_NAMES');
            })
        },
        NEXT_PAGE() {
            // checking max page to next navigate
            if (this.state.currentPage + 1 <= this.state.totalPages)
                this.dispatch('SET_PAGE', this.state.currentPage + 1);
        },
        PREV_PAGE() {
            // checking min page to previous navigate
            if (this.state.currentPage > 1)
                this.dispatch('SET_PAGE', this.state.currentPage - 1);
        },
        GET_MOVIE_DETAILS: function (context, filmId) {
            api.movie_detail({
                'language': 'en-US',
            }, filmId).then((res) => {
                context.commit('GET_MOVIE_DETAILS', res);
            })
        },
        GET_MOVIE_CREDITS: function (context, filmId) {
          api.movie_credits({
              'language': 'en-US',
          }, filmId).then((res) => {
              context.commit('GET_MOVIE_CREDITS', res);
          })
        },
        CACHE_GENRE_LIST: function (context) {
            api.fetchGenreList({
                'language': 'en-US',
            }).then((res) => {
                context.commit('SET_GENRES', res);

                // updating cached films in store with their name
                context.dispatch('UPDATE_GENRE_NAMES');
            });
        },
        UPDATE_GENRE_NAMES: function (context) {
            if (context.state.genreList && context.state.films) {
                context.state.films.forEach((film) => {
                    film.genres.forEach((genre) => {
                        const relatedGenre = context.state.genreList.filter(g => g.id === genre.id);
                        if (relatedGenre.length) {
                            // const relatedGenreName = relatedGenre[0].name;
                            // const relatedGenreId = relatedGenre[0].id;
                            context.commit('UPDATE_FILM_GENRE_NAME', {
                                filmId: film.id,
                                genreId: relatedGenre[0].id,
                                genreName: relatedGenre[0].name,
                            });
                        }
                    })
                })
            }
        }
    },
    mutations: {
        SET_DATE: (state, startDate, endDate) => {
            state.startDate = startDate;
            state.endDate = endDate;
        },
        SET_PAGE: (state, page, totalPages) => {
            state.currentPage = page;
            state.totalPages = totalPages;
        },
        GET_MOVIE_CREDITS: (state, detail) => {
            state.filmCast = detail;
        },
        SET_FILM_LIST: (state, list) => {
            state.films = [];
            state.films.push(...list);
        },
        GET_MOVIE_DETAILS: (state, detail) => {
            state.filmDetail = detail;
        },
        SET_GENRES: (state, genres) => {
            state.genreList = genres;
        },
        UPDATE_FILM_GENRE_NAME: (state, args) => {
            const film = state.films.filter(f => f.id === args.filmId)[0];
            const genre = film.genres.filter(g => g.id === args.genreId)[0];
            if (genre) {
                genre.name = args.genreName;
            }
        },
    },
    getters: {
        openProjects: state => {
            return state.films.filter(films => films.date)
        },
    },
})
export default store