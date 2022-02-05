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
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

import Card from "@/components/Card.vue";

export default {
  name: "Characters",
  components: {
    Card
  },

  data: function () {
    return {
      filter: "",
      status: ""
    };
  },

  watch: {
    status: function (newStatus) {
      this.$store.commit("setCurrentStatus", newStatus);
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
      "setCurrentCharacter"
    ]),

    changeStatus: function (evt, status) {
      if (this.$store.getters.getCurrentStatus == status) {
        evt.preventDefault();
        this.status = "";
        evt.target.checked = false;
      }
    },
    getPage: function (page) {
      this.setCurrentPage(page);
      this.getCharacters();
      this.$router.push({ path: `/characters`, query: { page } });
    },

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
      getCharactersPage: "getCharactersPage"
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
}

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

.flex {
  display: flex;
}
</style>
