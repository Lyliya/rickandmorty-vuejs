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
    setCurrentStatus(state, payload) {
      state.currentStatus = payload;
      state.currentPage = 1;
      state.characters = [];
      this.dispatch("getCharacters");
    },
    setCurrentCharacter(state, payload) {
      state.currentCharacter = payload;
    },
    setCurrentPage(state, payload) {
      let pageNb = parseInt(payload);
      if (isNaN(pageNb) || pageNb < 1) state.currentPage = 1;
      else state.currentPage = pageNb;
    }
  },
  actions: {
    async getCharacters(state) {
      const page = state.getters.getCurrentPage;
      let current = state.getters.getCharactersPage(page);

      if (current) {
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

      const rawCharacters = await fetch(url);

      if (rawCharacters.status != 200) {
        state.commit("setCurrentCharacter", []);
        state.commit("setTotalPage", 0);
        state.commit("setCharacterCount", 0);
        return;
      }

      const characters = await rawCharacters.json();

      state.commit("setCharacters", { page, results: characters.results });
      state.commit("setTotalPage", characters.info.pages);
      state.commit("setCharacterCount", characters.info.count);
    },
    async getCharacterById(state, payload) {
      const id = payload.id;
      let url = `${base_url}/${id}`;

      const rawCharacter = await fetch(url);

      if (rawCharacter.status != 200) {
        return;
      }

      const character = await rawCharacter.json();
      state.commit("setCurrentCharacter", character);
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
    getCurrentCount: state => state.currentCharacterCount,
    getCurrentCharacter: state => state.currentCharacter
  }
});
