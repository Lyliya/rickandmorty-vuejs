<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->

    <input
      type="text"
      placeholder="Morty"
      @keyup.enter="onEnter"
      v-model="filter"
    />

    <p>Current Page: {{ currentPage }}</p>
    <p>Count: {{ count }}</p>
    <p>TotalPage: {{ totalPage }}</p>
    <div v-if="characters">
      <div v-for="(character, idx) in characters.results" :key="idx">
        <img :src="character.image" :alt="character.name" />
        <p>{{ character.name }}</p>
      </div>
    </div>

    <div v-if="currentPage < totalPage">
      <button @click="getNextPage">{{ currentPage + 1 }}</button>
    </div>
    <div>
      <p>{{ currentPage }}</p>
    </div>
    <div v-if="currentPage > 1">
      <button @click="getPreviousPage">{{ currentPage - 1 }}</button>
    </div>
    <!-- <div v-if="pages[pages.length - 1] && pages[pages.length - 1].info.next">
      <button @click="getNextPage">Next page</button>
    </div> -->
    <!-- <button v-if="pages[0].info.next">Next page</button> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    // HelloWorld
  },

  data: function () {
    return {
      filter: ""
    };
  },

  methods: {
    getNextPage: function () {
      console.log("NextPage");
      this.$store.commit("setCurrentPage", this.currentPage + 1);
      this.$store.dispatch("getCharacters");
    },
    getPreviousPage: function () {
      console.log("PreviousPage");
      this.$store.commit("setCurrentPage", this.currentPage - 1);
      this.$store.dispatch("getCharacters");
    },

    onEnter: function () {
      console.log("onEnter", this.filter);
      this.$store.commit("setCurrentName", this.filter);
    }
  },

  computed: {
    ...mapGetters({
      count: "getCurrentCount",
      totalPage: "getTotalPage",
      currentPage: "getCurrentPage"
    }),

    characters() {
      console.log(
        "Debug:",
        this.$store.getters.getCharactersPage(this.currentPage)
      );
      return this.$store.getters.getCharactersPage(this.currentPage);
    }
  },

  mounted() {
    this.$store.dispatch("getCharacters");
  }
};
</script>
