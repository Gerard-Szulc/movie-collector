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
      <transition name="list" >
        <transition-group name="list" class="horizontal-list" tag="div" v-if="list.length !== 0">
          <template v-for="element in list">
            <slot v-bind:element="element" name="list-item"/>
          </template>
        </transition-group>
        <div v-else>
          <slot name="notice"></slot>
        </div>
      </transition>

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

<style lang="scss">
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
  overflow-y: hidden;

  scroll-behavior: smooth;
}

.horizontal-list {
  flex-direction: row;
  display: inline-flex;
  flex-wrap: nowrap;
  overflow: hidden;
}

.btn-tmbd-style {
  background-color: #01b4e4;
}

.list-enter-active, .list-leave-active {
  transition: all ease-in-out 0.2s;
  opacity: 1;
}
.list-enter, .list-leave-to  {
  opacity: 0;
  transform: scale(1.2);
}
</style>
