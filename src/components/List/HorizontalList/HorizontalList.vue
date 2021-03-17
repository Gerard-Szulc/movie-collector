<template>
  <div>
    <div class="horizontal-list-header">
      <h3>{{ title }}</h3>
      <div class="btn-group">
        <button class="btn btn-primary btn-tmbd-style" @click="() => handleScrollList(false)"><i class="bi-arrow-left-circle"></i></button>
        <button class="btn btn-primary btn-tmbd-style" @click="() => handleScrollList(true)"><i class="bi-arrow-right-circle"></i></button>
      </div>
    </div>
    <div class="horizontal-list-wrapper" ref="horizontalListWrapper" v-if="!loading">
        <div  class="horizontal-list" v-if="list.length !== 0">
          <div v-if="pagination && previous > 0" :key="'prev-page'" class="horizontal-list-next-page" @click="getPreviousPage"><i class="bi-chevron-left"></i></div>
          <template v-for="element in list">
            <slot v-bind:element="element" name="list-item"/>
          </template>
          <div v-if="pagination && next <= totalPages" :key="'next-page'" class="horizontal-list-next-page" @click="getNextPage"><i class="bi-chevron-right"></i></div>
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
  computed: {
    next () {
      return this.currentPage + 1
    },
    previous () {
      return this.currentPage - 1
    }
  },
  methods: {
    handleScrollList (direction) {
      const step = this.$refs.horizontalListWrapper.scrollWidth / ((this.list.length || 20) / 2)
      this.$refs.horizontalListWrapper.scrollLeft += direction ? step : -step
    },
    getPreviousPage () {
      this.$refs.horizontalListWrapper.scrollLeft = 0
      this.changePage(this.previous)
    },
    getNextPage () {
      this.$refs.horizontalListWrapper.scrollLeft = 0
      this.changePage(this.next)
    }
  }
}
</script>

<style lang="scss">
@import "../../../../node_modules/bootstrap/scss/bootstrap";
@import "../../../../node_modules/bootstrap/scss/variables";

.horizontal-list-header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.horizontal-list-wrapper {
  max-width: 100vw;
  overflow: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px $secondary;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: $primary;
    border-radius: 10px;
  }
}

.horizontal-list {
  flex-direction: row;
  display: inline-flex;
  flex-wrap: nowrap;
  overflow: hidden;
  & .horizontal-list-next-page {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 237px;
    border-radius: 10px;
    margin: 14px;
    &:hover {
      cursor: pointer;
      background-color: #90cea136;;
    }
  }
}

.btn-tmbd-style {
  background-color: #01b4e4;
}
</style>
