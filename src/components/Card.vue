<template>
  <div class="card-container">
    <img :src="character.image" :alt="character.name" />
    <div class="card-body">
      <h1>{{ character.name }}</h1>
      <p>{{ character.status }} - {{ character.species }}</p>

      <h2>Origin</h2>
      <p>{{ character.origin.name }}</p>

      <h2>Location</h2>
      <p>{{ character.location.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    character: Object
  }
};
</script>

<style scoped>
.card-container {
  border-radius: 20px;
  background-color: lightblue;
  display: flex;
  height: 100%;
  width: 100%;
}

.card-container > img {
  border-radius: 20px 0px 0px 20px;
}

.card-body {
  padding-left: 10px;
  height: 100%;
  width: 100%;
  background-color: #383838;
  display: flex;
  flex-direction: column;
  border-radius: 0px 20px 20px 0px;
}

.card-body p {
  margin-top: 1px;
  margin-bottom: 5px;
}

.card-body h1,
h2 {
  margin-bottom: 5px;
}
</style>
