<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <p>Current Page: {{ currentPage }}</p>
    <p>Count: {{ count }}</p>
    <p>TotalPage: {{ totalPage }}</p>
    <div v-for="(page, pageIdx) in pages" :key="pageIdx">
      <p>Page nb: {{ page.page }}</p>
      <div v-for="(character, idx) in page.results" :key="idx">
        <p>{{ character.name }}</p>
      </div>
    </div>

    <div v-if="currentPage < totalPage">
      <button @click="getNextPage">Get Next Page</button>
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

  methods: {
    getNextPage: function () {
      console.log("NextPage");
      this.$store.commit("setCurrentPage", this.currentPage + 1);
      this.$store.dispatch("getCharacters");
    }
  },

  computed: {
    ...mapGetters({
      pages: "getCharacters",
      count: "getCurrentCount",
      totalPage: "getTotalPage",
      currentPage: "getCurrentPage"
    })
  },

  mounted() {
    this.$store.dispatch("getCharacters");
  }
};
</script>
