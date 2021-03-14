<template>
  <div class="card movie-card">
    <router-link :to="{
        name: 'movie',
        params: { id: item.id }
      }">
      <img
        v-if="item[itemImageProp]"
        :src="`${baseImageUrlGetter}${posterSizesGetter[3]}${item[itemImageProp]}`"
        class="card-img-top"
        :alt="item[itemTitleProp]"
      >
      <img v-else
           src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
           class="card-img-top"
           :alt="item[itemTitleProp]">
      <div v-if="itemTitleProp" class="card-body">
        <p class="card-title"><strong>{{ item[itemTitleProp] }}</strong></p>
        <slot name="movie-info">
        </slot>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ListItem',
  props: {
    item: {
      required: true,
      type: Object
    },
    itemImageProp: {
      type: String,
      default: () => 'poster_path'
    },
    itemTitleProp: {
      type: String,
      default: () => 'title'
    }
  },
  computed: {
    ...mapGetters({
      posterSizesGetter: 'posterSizesGetter',
      baseImageUrlGetter: 'baseImageUrlGetter'
    })
  },
  methods: {
    ...mapActions({
      addFavorite: 'movies/favorites/addFavoriteMovie'
    })
  }
}
</script>

<style scoped>
.card.movie-card {
  cursor: pointer;
  width: 10rem;
  min-width: 10rem;
  margin: 14px;
  border-radius: 10px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 15px 0 rgba(0, 0, 0, 0.19);
  overflow: hidden;
}

.movie-card img {
  border-radius: 10px;
  height: 15rem;
}

.movie-info {
  color: #706f6f;
}

.card-body {
  position: absolute;
  display: flex;
  bottom: 0;
  max-height: 35%;
  min-height: 35%;
  width: 100%;
  padding: 0.55rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: all ease-in-out 0.3s;
  background-color: rgba(255, 255, 255, 0.8);
}

.card-title {
  text-align: center;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 1024px), (orientation: landscape;) {
  .card .card-body, .card .card-title {
    max-height: 100%;
    white-space: normal;
  }
}

.card:hover .card-body, .card:hover .card-title {
  max-height: 100%;
  white-space: normal;
}
</style>
