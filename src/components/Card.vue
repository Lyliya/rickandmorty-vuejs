<template>
  <div class="card-container">
    <p class="status" :class="character.status.toLowerCase()">
      {{ character.status }}
    </p>
    <img :src="character.image" :alt="character.name" />
    <div class="card-body">
      <h1>{{ character.name }}</h1>
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
  position: relative;
}

.card-container > img {
  border-radius: 20px 20px 0px 0px;
  object-fit: contain;
  z-index: 0;
}

.status {
  position: absolute;
  z-index: 1;
  font-size: 1.5em;
  font-weight: bold;
  right: 10px;
  top: -10px;
  padding: 5px;
  border-radius: 5px;
}

.alive {
  background-color: rgb(0, 117, 0);
}

.dead {
  background-color: rgb(117, 22, 22);
}

.unknown {
  background-color: rgb(59, 59, 59);
}

.card-body {
  margin-top: -5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  background-color: #383838;
  border-radius: 0px 0px 20px 20px;
}

.card-body h1 {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 1.3em;
}
</style>
