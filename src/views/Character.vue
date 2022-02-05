<template>
  <div class="character">
    <p class="return" @click="goBack">&#x3008; Go Back</p>
    <img :src="character.image" :alt="character.name" class="background" />
    <div class="data">
      <img :src="character.image" :alt="character.name" class="main" />

      <div class="name">
        <h1>{{ character.name }}</h1>
      </div>

      <div class="info">
        <p><span class="bold">Status:</span> {{ character.status }}</p>
        <p>
          <span class="bold">Species:</span>
          {{ character.species || "Unknown" }}
        </p>
        <p>
          <span class="bold">Gender:</span> {{ character.gender || "Unknown" }}
        </p>
        <p><span class="bold">Type:</span> {{ character.type || "Unknown" }}</p>
        <p>
          <span class="bold">Origin:</span>
          {{ character.origin?.name || "Unknown" }}
        </p>
        <p>
          <span class="bold">Location:</span>
          {{ character.location?.name || "Unknown" }}
        </p>
        <p>Appear in {{ character.episode?.length }} episode(s)</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Character",
  components: {},
  created() {
    document.title = this.character.name;
  },
  computed: {
    character() {
      const cache = this.$store.getters.getCurrentCharacter;

      if (Object.keys(cache).length == 0) {
        this.$store.dispatch("getCharacterById", { id: this.$route.params.id });
      }
      return cache;
    }
  },
  methods: {
    goBack: function () {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.character {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.background {
  width: 100%;
  height: 400px;
  object-fit: cover;
  filter: blur(1rem);
  z-index: 0;
}

.data {
  z-index: 1;
}

.name {
  text-align: center;
}

.info {
  max-width: 1300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 1.3em;
}

.bold {
  font-weight: bold;
}

.main {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: -200px;
  border: 5px solid #ffffff;
}

.return {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  padding-right: 10px;
  position: absolute;
  font-weight: bold;
  font-size: 1.5em;
  left: 0px;
  margin: 10px;
  z-index: 10;
  cursor: pointer;
  background-color: rgba(109, 109, 109, 0.644);
  border-radius: 5px;
}
</style>
