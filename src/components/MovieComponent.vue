<template>
  <div class=" rounded-md border bg-gray-100 border-grey-900" style="height: 100%;
    display: flex;">
    <div class="p-1">
      <img class="rounded-l-md" style="height: 100%" :src="posterUrlFormatted" :alt="posterUrlFormatted"/>
    </div>
    <div style="display: block; position:relative;" class="lg:w-80 py-4 px-2.5">
      <div class="font-bold">{{ film.Title }}</div>
      <div style="position: absolute; bottom: 1rem">
        <div style="display: flex"><img :src="calenderIconPath" :alt="calenderIconPath"/>
          <div style="padding-left: .5rem">{{ dateFormatted }}</div>
        </div>
        <div>{{ genresFormatted }}</div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState} from "vuex";
import moment from "moment";

export default {
  name: "MovieComponent",
  props: {film: Object},
  data() {
    return {
      posterDefaultPath: require('/src/assets/loader.png'),
      calenderIconPath: require('/src/assets/calender.svg')
    }
  },
  computed: {
    dateFormatted () {
      return moment(this.film.releaseDate).format("YYYY-MM-DD");
    },
    posterUrlFormatted() {
      const imageSizePrefix = "/w185";
      return `${this.film.imageBaseUrl}${imageSizePrefix}${this.film.posterPath}`;
    },
    ...mapState([
      "films"
    ]),
    genresFormatted() {
      if (this.film)
        return this.film.genres.map(g => g.name).join(" . ");
      else
        return ""
    }
  },
}
</script>

<style scoped>

</style>