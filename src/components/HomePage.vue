<template>
  <div class="py-12 md:w-auto lg:mx-32 md:mx-24 sm:mx-12">
    <div class="py-6 px-12 rounded-md bg-gray-300" style="width: 100% ;   display: flex;
    align-items: center; position:relative;">
      <div style="padding-right: 1vw">Search by release date :</div>
      <div style="width: 20vw">
        <DatePicker v-model="date" range :enableTimePicker="false" :disabled-week-days="true"/>
      </div>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              @click="setDate"
              style="position: absolute; right: 2.5rem">Search
      </button>
    </div>
    <div v-show="!films.length">
      <img :src="loader" style="margin: 30px auto">
    </div>
    <div v-if="films.length"
        class="rounded-md my-8 grid lg:grid-cols-3 md:grid-cols-2 gap-x-12 gap-y-6">
      <MovieComponent
          @click="gotoDetailPage(f.id)"
          v-for="f in films.slice(perPage * (currentPage -1), perPage * currentPage)" :film="f"
          :key="f.id" style="height: 25vh; cursor: pointer" class="lg:2/6 md:3/6 "/>
    </div>
    <div class="py-6" style="width: 100%; text-align: center">
      <div class="divide-gray-900 divide-x">
        <button style="color: #29b3ed" :disabled="currentPage === 1" class="px-4" type="button" @click="PREV_PAGE">
          Previous
          Page
        </button>
        <button style="color: #29b3ed"  class="px-4" type="button"
                @click="NEXT_PAGE">Next Page
        </button>
      </div>
      <div>Showing result {{ currentPage }}-{{ Math.ceil(films.length / 20) }}</div>
    </div>
  </div>
</template>

<script>

import MovieComponent from "@/components/MovieComponent";
// import {ref} from 'vue';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {mapState, mapActions} from "vuex";
import store from "@/Store/store";

export default {
  name: "HomePage",
  store,
  // eslint-disable-next-line vue/no-unused-components
  components: {MovieComponent, DatePicker},
  data() {
    return {
      date: undefined,
      // films: [],
      // page: 1,
      perPage: 20,
      loader: require('/src/assets/loader.png'),
      // pages: [],
    };
  },
  methods: {
    gotoDetailPage(filmId) {
      console.log(filmId)
      this.$router.push(`/Detailpage/${filmId}`);
    },
    setDate() {
      console.log(...this.date);
      this.$store.dispatch("SET_DATE", ...this.date);
    },
    ...mapActions([
      "NEXT_PAGE",
      "PREV_PAGE",
    ])
  },
  computed: mapState([
    "films",
    "currentPage",
    "totalPages",
  ]),
  created() {
    this.$store.dispatch('CACHE_GENRE_LIST');
  }
  // setup() {
  //   const date = ref();
  //   return {
  //     date
  //   }
  // }
}
</script>

<style scoped>

</style>