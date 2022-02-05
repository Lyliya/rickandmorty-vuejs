<template>
  <div class="characters">
    <div>
      <input
        type="text"
        placeholder="Morty"
        @keyup.enter="onEnter"
        v-model="filter"
        class="filter-input"
      />

      <select v-model="status" class="status-select">
        <option value="">All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>

    <div v-if="!characters || characters.length == 0">No character found</div>

    <h1>Total: {{ count }}</h1>
    <div v-if="characters" class="container">
      <div
        v-for="(character, idx) in characters.results"
        :key="idx"
        @click="
          () => {
            redirect(character);
          }
        "
        class="card-holder"
      >
        <Card :character="character" />
      </div>
    </div>

    <Pagination />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

import Card from "@/components/Card.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "Characters",
  components: {
    Card,
    Pagination
  },
  created() {
    document.title = "Rick & Morty Characters";
  },

  data: function () {
    return {
      filter: "",
      status: ""
    };
  },

  watch: {
    status: function (newStatus) {
      this.setCurrentStatus(newStatus);
    },
    "$route.query.page": function () {
      this.setCurrentPage(this.$route.query.page);
      this.getCharacters();
    }
  },

  methods: {
    ...mapActions(["getCharacters"]),
    ...mapMutations([
      "setCurrentPage",
      "setCurrentName",
      "setCurrentCharacter",
      "setCurrentStatus"
    ]),

    onEnter: function () {
      this.setCurrentName(this.filter);
    },

    redirect: function (character) {
      this.setCurrentCharacter(character);
      this.$router.push({ path: `/characters/${character.id}` });
    }
  },

  computed: {
    ...mapGetters({
      count: "getCurrentCount",
      totalPage: "getTotalPage",
      currentPage: "getCurrentPage",
      getCharactersPage: "getCharactersPage",
      getCurrentStatus: "getCurrentStatus"
    }),

    characters() {
      return this.getCharactersPage(this.currentPage);
    }
  },

  mounted() {
    if (this.$route.query.page) {
      this.setCurrentPage(this.$route.query.page);
    }
    this.getCharacters();
  }
};
</script>

<style scoped>
.characters {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1300px;
}

.container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.card-holder {
  width: 300px;
  margin-bottom: 10px;
  cursor: pointer;
}

.filter-input {
  margin-top: 30px;
  margin-bottom: 30px;
  width: 200px;
  font-size: 1.5em;
  color: #e2e2e2;
  background-color: #383838;
  border: 0;
  text-align: center;
}

.status-select {
  font-size: 1.5em;
  background-color: #383838;
  border: 0;
  color: #e2e2e2;
  margin-left: 20px;
  text-align: center;
}
</style>
