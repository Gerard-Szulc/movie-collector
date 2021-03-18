<template>
  <div v-if="castLoaded" class="col-xs-12">
    <HorizontalList
      :title="'Cast'"
      :list="primaryCast"
      :loading="false"
    >
      <template v-slot:list-item="{ element }">
        <ListItem :item="element" item-title-prop="original_name" item-image-prop="profile_path"
                  :key="element.cast_id" :redirect-enabled="false">
          <div slot="element-info" class="cast-character">
            {{ element.character }}
          </div>
        </ListItem>
      </template>
      <template v-slot:notice>
        <div class="alert alert-warning" role="alert">
          Sorry, no available cast for this movie.
        </div>
      </template>
    </HorizontalList>
  </div>
</template>

<script>
import HorizontalList from '@/components/List/HorizontalList/HorizontalList.vue'
import ListItem from '@/components/Item/ListItem.vue'
import { request } from '@/utils/apiClient.js'

export default {
  name: 'CastList',
  components: {
    ListItem,
    HorizontalList
  },
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      castLoaded: false,
      cast: []
    }
  },
  computed: {
    primaryCast () {
      return this.cast.slice(0, 20)
    }
  },
  created () {
    this.getCast(this.movie.id)
  },
  methods: {
    getCast (id) {
      request(`/movie/${id}/credits`, 'get').then(({ data }) => {
        this.cast = data.cast
        this.castLoaded = true
      }).catch(e => {
        this.castLoaded = true
        console.error(e)
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../node_modules/bootstrap/scss/bootstrap";
@import "../../../node_modules/bootstrap/scss/variables";

.cast-list {
  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px $secondary;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: $primary;
    border-radius: 10px;
  }

  overflow: auto;
  max-height: 40rem;
}

.cast-character {
  text-align: center;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cast-character:hover {
  max-height: 100%;
  white-space: normal;
}

</style>
