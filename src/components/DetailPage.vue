<template>
  <div class="py-12 md:w-auto lg:mx-24 md:mx-28 sm:mx-12">
    <div class="py-6 px-12 rounded-md bg-gray-300" style="width: 100% ;   display: flex;
    align-items: center; position:relative;">
      <button style="display: flex" @click="gotoHomePage()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        <i class="material-icons">arrow_back</i>back
      </button>
      <div style="display: flex">
        <div class="px-6 font-bold">{{ (filmDetail.title) ? filmDetail.title : "" }}</div>
        <div class="px-6 font-light">{{ (filmDetail.originalTitle) ? filmDetail.originalTitle : "" }}</div>
      </div>
    </div>
<!--    <div v-show="!filmDetail.length">-->
<!--      <img :src="loader" style="margin: 30px auto">-->
<!--    </div>-->
    <div  class="py-12 md:flex sm:block">
      <div>
        <img class="rounded-lg" :src=posterUrlFormatted :alt="posterUrlFormatted">
      </div>
      <div class="px-6 py-6" style="width: 100%">
        <div style="display: flex; justify-content: space-between"><div class="font-bold">Budget</div><div>{{ (costCurrency) ? costCurrency : "" }}</div></div>
        <br/>
        <div style="display: flex; justify-content: space-between"><div class="font-bold">Revenue</div><div>{{ (filmDetail.revenue) ? filmDetail.revenue : "" }}</div></div>
        <br/>
        <div style="display: flex; justify-content: space-between"><div class="font-bold">Release Date</div><div>{{ (dateFormatted) ? dateFormatted : "" }}</div></div>
        <br/>
        <div style="display: flex; justify-content: space-between"><div class="font-bold">Run Time</div><div>{{ (filmDetail.runtime) ? filmDetail.runtime : "" }}</div></div>
        <br/>
        <div style="display: flex; justify-content: space-between"><div class="font-bold">Score</div><div>{{ (filmDetail.popularity) ? filmDetail.popularity : "" }}</div></div>
        <br/>
        <div style="display: flex; justify-content: space-between"><div class="font-bold">Genres</div><div>{{ genresFormatted }}</div></div>
        <br/>
        <div style="display: flex; justify-content: space-between"><div class="font-bold">IMDB Link</div><p><a :href="'https://www.imdb.com/title/'+ filmDetail.imdbId">Link</a></p></div>
        <br/>
        <div style="display: flex; justify-content: space-between"><div class="font-bold">HomePage</div><p><a :href="filmDetail.homepage">Link</a></p></div>
      </div>
    </div>
    <div>{{ (filmDetail.overview) ? filmDetail.overview : "" }}</div>
    <div class="py-24">
      <div class="font-bold">Credits:</div>
      <br/>
      <div>{{(castsFormatted) ? castsFormatted: ""}}</div>
    </div>
  </div>
</template>

<script>

// import MovieComponent from "@/components/MovieComponent";
import {mapState} from "vuex";
import moment from "moment";
const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})

export default {
  name: "DetailPage",
  components: {},
  props: {filmId: String},
  data() {
    return {
      loader: require('/src/assets/loader.png'),
      // films: []
    }
  },
  methods: {
    gotoHomePage() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.$store.dispatch('GET_MOVIE_DETAILS', this.filmId);
    this.$store.dispatch('GET_MOVIE_CREDITS', this.filmId)
  },
  computed: {
     costCurrency() {
       return formatter.format(this.filmDetail.budget)
    },
    genresFormatted() {
      if (this.filmDetail.genres)
        return this.filmDetail.genres.map(g => g.name).join(" ,  ");
      else
        return ""
    },
    castsFormatted() {
      if (this.filmCast.cast)
        return this.filmCast.cast.map(g => g.character).join(" ,  ");
      else
        return ""
    },
    // film() {
    //   return this.films.filter(f => f.id === parseInt(this.filmId))[0];
    // },
    dateFormatted() {
      if (this.filmDetail.releaseDate)
        return moment(this.filmDetail.releaseDate).format("YYYY-MM-DD");
      return ""
    },
    posterUrlFormatted() {
      const imageSizePrefix = "/w500";
      if (this.filmDetail.genres)
        return `${this.filmDetail.imageBaseUrl}${imageSizePrefix}${this.filmDetail.posterPath}`;
      return ""
    },
    ...mapState([
      "films",
      "filmDetail",
      "filmCast"
    ]),
  }
}
</script>

<style scoped>

</style>