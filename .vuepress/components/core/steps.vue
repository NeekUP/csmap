<template>
  <div>
    <template v-if="$page.frontmatter.steps && $page.frontmatter.steps.length > 0">
      <core-step v-for="step in $page.frontmatter.steps"  :title="step.title" :url="step.url" :type="step.type" :author="step.addedBy" :desc="step.desc" :reference="step.ref" />
    </template>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>