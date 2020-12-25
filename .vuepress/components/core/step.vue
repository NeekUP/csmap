<template>
  <div class="step-container">
    <!-- <div><img :src="author+ '.png'" :alt="author" :width="imgWidth" :height="imgHeight"/></div> -->
    <div>
      <h2>
        <a :href="url">{{ title }}</a>
      </h2>
    </div>
    <p>
      added by:
      <a
        href="https://github.com/NeekUP"
        target="_blank"
        rel="noopener noreferrer"
        >NeekUP<span><svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            width="15"
            height="15"
            class="icon outbound">
            <path
              fill="currentColor"
              d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
            ></path>
            <polygon
              fill="currentColor"
              points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
            ></polygon>
          </svg>
          <span class="sr-only">(opens new window)</span></span
        ></a
      >
      type: <code>article</code> url: <code>http://ya.ru/</code>
    </p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      imgWidth: 32,
      imgHeight: 32,
    };
  },
  props: {
    title: String,
    url: String,
    type: String,
    author: String,
    desc: String,
  },
};
</script>

<style>
.step-container {
  display: flex;
  flex-direction: column;
}

.step-container h2 {
  margin: 0;
  margin-top: 1em;
  border-bottom: none;
}

.step-container p {
  margin-top: 0;
  border-bottom: none;
  font-size: 0.9em;
}
</style>