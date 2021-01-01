<template>
  <div class="step-container">
    <!-- <div><img :src="author+ '.png'" :alt="author" :width="imgWidth" :height="imgHeight"/></div> -->
    <div>
      <h2>
        <a :href="u">{{ t }}</a>
      </h2>
    </div>
    <p>
      added by:
      <a :href="a" target="_blank" rel="noopener noreferrer"
        >NeekUP<span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            width="15"
            height="15"
            class="icon outbound"
          >
            <path
              fill="currentColor"
              d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
            ></path>
            <polygon
              fill="currentColor"
              points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
            ></polygon>
          </svg>
          <!-- <span class="sr-only">(opens new window)</span> -->
          </span>
          </a>
      type: <code>{{ tp }}</code> <span v-if="h"> domain: <code>{{ h }}</code></span>
    </p>
  </div>
</template>

<script>
import refsData from "../../../refs.json";
export default {
  data: function () {
    return {
      t: "",
      u: "",
      h: "",
      a: "",
      d: "",
      tp: "",
    };
  },
  props: {
    title: String,
    reference: String,
    url: String,
    type: String,
    author: String,
    desc: String,
  },
  created: function () {
    this.t = this.title;
    this.u = this.url;
    this.a = this.author;
    this.d = this.desc;
    this.tp = this.type;
    this.h = this.getHost(this.u)

    if (this.reference) {
      var r = this.getRef(this.reference);
      if (r) {
        this.t = r.name;
        this.u = r.url;
        this.tp = r.type;
      } else {
        this.t = "[link not found]";
        this.u = "/404.html";
        this.tp = "unknown";
      }
    }
  },
  methods: {
    getHost: function (url) {
      if (!url || !url.includes("://")) return null;
      var a = document.createElement("a");
      a.href = url;
      return a.hostname;
    },
    getRef: function (ref) {
      var r = refsData.find((a) => a.id == ref);
      return r;
    },
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