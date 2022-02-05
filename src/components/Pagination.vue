<template>
  <div class="page-nav">
    <div v-if="currentPage > 2" class="flex">
      <p
        @click="
          () => {
            getPage(1);
          }
        "
      >
        1
      </p>
      <p>...</p>
    </div>
    <div v-if="currentPage > 1">
      <p
        @click="
          () => {
            getPage(currentPage - 1);
          }
        "
      >
        {{ currentPage - 1 }}
      </p>
    </div>
    <div>
      <p class="active">{{ currentPage }}</p>
    </div>
    <div v-if="currentPage < totalPage">
      <p
        @click="
          () => {
            getPage(currentPage + 1);
          }
        "
      >
        {{ currentPage + 1 }}
      </p>
    </div>

    <div v-if="currentPage + 1 < totalPage" class="flex">
      <p>...</p>

      <p
        @click="
          () => {
            getPage(totalPage);
          }
        "
      >
        {{ totalPage }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Pagination",
  computed: {
    ...mapGetters({
      count: "getCurrentCount",
      totalPage: "getTotalPage",
      currentPage: "getCurrentPage",
      getCharactersPage: "getCharactersPage"
    }),

    characters() {
      return this.getCharactersPage(this.currentPage);
    }
  },
  methods: {
    getPage: function (page) {
      this.$router.push({ path: `/characters`, query: { page } });
    }
  }
};
</script>

<style scoped>
.page-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
}

.page-nav p {
  margin: 20px;
  cursor: pointer;
}

.active {
  font-weight: bold;
}
.flex {
  display: flex;
}
</style>
