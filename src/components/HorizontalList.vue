<template>
  <div>
    <div class="popular-movies-header">
      <h3>{{ title }}</h3>
      <div>
        <button class="btn" @click="() => handleScrollList(false)"><i class="bi-arrow-left-circle"></i></button>
        <button class="btn" @click="() => handleScrollList(true)"><i class="bi-arrow-right-circle"></i></button>
      </div>
    </div>
    <div class="horizontal-list-wrapper" ref="horizontalListWrapper" v-if="!loading">
      <div class="horizontal-list" v-if="list.length !== 0">
        <template v-for="element in list">
          <ListItem :movie="element" :key="element.id" @listElementEvent="handleElementEvent"></ListItem>
        </template>
      </div>
      <div v-else>
        <div class="alert alert-warning" role="alert">
          Sorry, no available element on this list.
        </div>
      </div>
    </div>
    <div v-else class="horizontal-list-wrapper">
      <Loading></Loading>
    </div>
  </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'HorizontalList',
  components: {
    Loading,
    ListItem
  },
  props: {
    title: {
      type: String,
      default: () => ''
    },
    list: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    handleElementEvent ({
      eventName,
      payload
    }) {
      console.log()
      this.$emit(eventName, payload)
    },
    handleScrollList (direction) {
      const step = this.$refs.horizontalListWrapper.scrollWidth / ((this.list.length || 20) / 2)
      this.$refs.horizontalListWrapper.scrollLeft += direction ? step : -step
    }
  }
}
</script>

<style scoped lang="scss">
.popular-movies-header {
  display: flex;
  justify-content: space-between;
}

.horizontal-list-wrapper {
  max-width: 100vw;
  overflow: auto;
  scroll-behavior: smooth;;
}

.horizontal-list {
  flex-direction: row;
  display: inline-flex;
  flex-wrap: nowrap;
  overflow: auto;
}
</style>
