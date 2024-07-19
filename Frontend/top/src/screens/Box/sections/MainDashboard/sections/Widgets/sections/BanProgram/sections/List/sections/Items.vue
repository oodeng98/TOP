<template>
  <div class="items">
    <SoftUiXd />
    <SoftUiXdWrapper />
    <DivWrapper />
    <Div />
    <SectionComponentNode />
    <SoftUiXd1 />
  </div>
</template>

<script>
import SoftUiXd from "./Items/sections/SoftUiXd.vue";
import SoftUiXd1 from "./Items/sections/SoftUiXd1.vue";
import SoftUiXdWrapper from "./Items/sections/SoftUiXdWrapper.vue";
import DivWrapper from "./Items/sections/DivWrapper/DivWrapper.vue";
import Div from "./Items/sections/Div.vue";
import SectionComponentNode from "./Items/sections/SectionComponentNode.vue";

export default {
  name: "Items",
  components: {
    SoftUiXd,
    SoftUiXd1,
    SoftUiXdWrapper,
    DivWrapper,
    Div,
    SectionComponentNode,
  },
};
</script>


<style>
.items {
  height: 275px;
  left: 0;
  position: absolute;
  top: 35px;
  width: 431px;
}
</style>