<template>
  <div class="list">
    <Items />
    <img class="line-6" alt="Line" src="/img/line-13.png" />
    <Titles />
  </div>
</template>

<script>
import Items from "./List/sections/Items.vue";
import Titles from "./List/sections/Titles.vue";

export default {
  name: "List",
  components: {
    Items,
    Titles,
  },
};
</script>


<style>
.list {
  height: 310px;
  left: 31px;
  position: absolute;
  top: 81px;
  width: 431px;
}

.list .line-6 {
  height: 4px;
  left: 0;
  position: absolute;
  top: 21px;
  width: 421px;
}

</style>