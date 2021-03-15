<template>
  <div>
    <div class="horizontal-list-header">
      <h3>{{ title }}</h3>
      <div>
        <button class="btn" @click="() => handleScrollList(false)"><i class="bi-arrow-left-circle"></i></button>
        <button class="btn" @click="() => handleScrollList(true)"><i class="bi-arrow-right-circle"></i></button>
      </div>
    </div>
    <div class="horizontal-list-wrapper" ref="horizontalListWrapper" v-if="!loading">
      <div class="horizontal-list" v-if="list.length !== 0">
        <template v-for="element in list">
          <slot v-bind:element="element" name="list-item"/>
        </template>
      </div>
      <div v-else>
        <slot name="notice"></slot>
      </div>
    </div>
    <div v-else class="horizontal-list-wrapper">
      <Loading></Loading>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import ListMixin from '@/components/List/ListMixin.js'

export default {
  name: 'HorizontalList',
  components: {
    Loading
  },
  mixins: [
    ListMixin
  ],
  methods: {
    handleScrollList (direction) {
      const step = this.$refs.horizontalListWrapper.scrollWidth / ((this.list.length || 20) / 2)
      this.$refs.horizontalListWrapper.scrollLeft += direction ? step : -step
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../../node_modules/bootstrap/scss/bootstrap";
@import "../../../../node_modules/bootstrap/scss/variables";

.horizontal-list-header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.horizontal-list-wrapper {
  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px $secondary;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: $primary;
    border-radius: 10px;
  }

  max-width: 100vw;
  overflow: auto;
  scroll-behavior: smooth;
}

.horizontal-list {
  flex-direction: row;
  display: inline-flex;
  flex-wrap: nowrap;
  overflow: auto;
}
</style>
