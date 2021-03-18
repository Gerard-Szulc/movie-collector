<template>
  <div class="">
    <div class="">
      <div class="col-sm-12">
        <div class="container">
          <list-item :item="movie" item-title-prop="">
            <template v-slot:list-item-header>
              <MovieListItemHeader :element="movie"/>
            </template>
          </list-item>
        </div>
      </div>
      <div class="movie-details col-sm-12">
        <div class="container">
          <h1 class="display-4">{{ movie.title }}</h1>
          <AdditionalInfo :movie="movie" class="col-xs-12 col-md-4"></AdditionalInfo>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdditionalInfo from '@/components/Movie/AdditionalInfo.vue'
import MovieListItemHeader from '@/components/Item/MovieListItemHeader.vue'
import ListItem from '@/components/Item/ListItem.vue'
export default {
  name: 'MovieHeader',
  components: { ListItem, MovieListItemHeader, AdditionalInfo },
  props: {
    movie: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

.movie-details {
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
