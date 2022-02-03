import { createStore } from "vuex";

const base_url = "https://rickandmortyapi.com/api/character";

export default createStore({
  state: {
    currentPage: 1,
    currentStatus: "",
    currentName: "",
    currentCharacter: {},
    currentCharacterCount: 0,
    currentTotalPage: 0,
    characters: []
  },
  mutations: {
    setCharacters(state, payload) {
      state.characters = state.characters.concat(payload);
    },
    setCharacterCount(state, payload) {
      state.currentCharacterCount = payload;
    },
    setTotalPage(state, payload) {
      state.currentTotalPage = payload;
    },
    setCurrentName(state, payload) {
      state.currentName = payload;
      state.currentPage = 1;
      state.characters = [];

      this.dispatch("getCharacters");
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    }
  },
  actions: {
    async getCharacters(state) {
      const page = state.getters.getCurrentPage;
      let current = state.getters.getCharactersPage(page);

      if (current) {
        console.log("use cached page", page);
        return page;
      }

      const status = state.getters.getCurrentStatus;
      const name = state.getters.getCurrentName;
      let url = `${base_url}?page=${page}`;

      if (status) {
        url += `&status=${status}`;
      }
      if (name) {
        url += `&name=${name}`;
      }

      console.log(url);

      const rawCharacters = await fetch(url);

      if (rawCharacters.status != 200) {
        console.log("error");
        return;
      }

      const characters = await rawCharacters.json();

      console.log(characters);
      state.commit("setCharacters", { page, results: characters.results });
      state.commit("setTotalPage", characters.info.pages);
      state.commit("setCharacterCount", characters.info.count);
    }
  },
  modules: {},
  getters: {
    getCharacters: state => state.characters,
    getCurrentPage: state => state.currentPage,
    getCharactersPage: state => page =>
      state.characters.find(e => e.page == page),
    getCurrentStatus: state => state.currentStatus,
    getCurrentName: state => state.currentName,
    getTotalPage: state => state.currentTotalPage,
    getCurrentCount: state => state.currentCharacterCount
  }
});
