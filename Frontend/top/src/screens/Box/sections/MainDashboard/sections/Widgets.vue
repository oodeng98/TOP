
<template>
  <div class="widgets">
    <Element />
    <ElementX />
    <BanProgram />
    <Timeline />
    <OverlapWrapper />
    <OverlapGroupWrapper />
    <ElementWrapper />
    <StreakHalfYear />
    <Timer />
  </div>
</template>

<script>
import Element from "./Widgets/sections/Element.vue";
import ElementX from "./Widgets/sections/ElementX/ElementX.vue";
import BanProgram from "./Widgets/sections/BanProgram.vue";
import Timeline from "./Widgets/sections/Timeline.vue";
import OverlapWrapper from "./Widgets/sections/OverlapWrapper.vue";
import OverlapGroupWrapper from "./Widgets/sections/OverlapGroupWrapper.vue";
import ElementWrapper from "./Widgets/sections/ElementWrapper.vue";
import StreakHalfYear from "./Widgets/sections/StreakHalfYear.vue";
import Timer from "./Widgets/sections/Timer.vue";

export default {
  name: "Widgets",
  components: {
    Element,
    ElementX,
    BanProgram,
    Timeline,
    OverlapWrapper,
    OverlapGroupWrapper,
    ElementWrapper,
    StreakHalfYear,
    Timer,
  },
};
</script>


<style>
.widgets {
  height: 1044px;
  left: 16px;
  position: absolute;
  top: 65px;
  width: 1003px;
}

</style>