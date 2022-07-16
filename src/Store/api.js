import axios from 'axios';
import moment from "moment";

const apiKey = "91c3cff042a773aea5650fe15f3209d5";
const baseUrl = "https://api.themoviedb.org/3/";
const imagesUri = "https://image.tmdb.org/t/p";


export default {
    discover_movies: (args) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: '/discover/movie',
                baseURL: baseUrl,
                params: {
                    'api_key': apiKey,
                    ...args,
                }
            }).then((res) => {
                console.log(res.data);

                // mutate films list state
                const translatedFilms = res.data.results.map((item) => {
                    return {
                        originalTitle: item.original_title,
                        genres: item.genre_ids.map((g) => {
                            return {
                                id: g,
                                name: undefined,
                            }
                        }),
                        id: item.id,
                        posterPath: item.poster_path,
                        imageBaseUrl: imagesUri,
                        releaseDate: moment(item.release_date, "YYYY-MM-DD").toDate(),
                        Title: item.title,
                    }
                });

                resolve({
                    films: translatedFilms,
                    page: {
                        currentPage: res.data.page,
                        totalPages: res.data.total_pages,
                        totalResults: res.data.total_results,
                    }
                });
            }).catch((err) => {
                console.error(err);
                reject(err);
            });
        })
    },
    movie_detail: (args, filmId) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: `/movie/${filmId}`,
                baseURL: baseUrl,
                params: {
                    'api_key': apiKey,
                    ...args,
                }
            }).then((res) => {
                console.log(res.data);

                // mutate films list state
                const translatedFilmDetail = {
                    budget: res.data.budget,
                    genres: res.data.genres,
                    id: res.data.id,
                    posterPath: res.data.poster_path,
                    homepage: res.data.homepage,
                    imdbId: res.data.imdb_id,
                    runtime: res.data.runtime,
                    popularity:res.data.popularity,
                    title: res.data.title,
                    revenue: res.data.revenue,
                    release_date: moment(res.data.release_date, "YYYY-MM-DD").toDate(),
                    imageBaseUrl: imagesUri,
                    overview: res.data.overview,
                }

                resolve(translatedFilmDetail);
            }).catch((err) => {
                console.error(err);
                reject(err);
            });
        })
    },
    movie_credits: (args, filmId) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: `/movie/${filmId}/credits`,
                baseURL: baseUrl,
                params: {
                    'api_key': apiKey,
                    ...args,
                }
            }).then((res) => {
                console.log(res.data);

                // mutate films list state
                const translatedFilmCredits = {
                    cast: res.data.cast,
                    // genres: res.data.genres,

                }

                resolve(translatedFilmCredits);
            }).catch((err) => {
                console.error(err);
                reject(err);
            });
        })
    },
    fetchGenreList: (args) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: '/genre/movie/list',
                baseURL: baseUrl,
                params: {
                    'api_key': apiKey,
                    ...args,
                }
            }).then((res) => {
                console.log(res.data);
                resolve(res.data.genres);
            }).catch((err) => {
                console.error(err);
                reject(err);
            });
        })
    },
}