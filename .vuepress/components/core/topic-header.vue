<template>
  <div class="topic-header"><h1>{{title}}</h1></div>
</template>

<script>
export default {
props: {
    title: String,
  },
}
</script>

<style>
.topic-header{
    text-align: center;
    font-size: 3.2em;
}

.topic-header h1{
    font-size: 1.1em;
}
</style>