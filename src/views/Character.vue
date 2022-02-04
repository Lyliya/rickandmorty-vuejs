<template>
  <div>
    <h1>{{ character.name }}</h1>
    <img :src="character.image" :alt="character.name" />

    <p>{{ character }}</p>
  </div>
</template>

<script>
export default {
  name: "Character",
  components: {},
  computed: {
    character() {
      const cache = this.$store.getters.getCurrentCharacter;

      if (Object.keys(cache).length == 0) {
        this.$store.dispatch("getCharacterById", { id: this.$route.params.id });
      }
      return cache;
    }
  }
};
</script>
