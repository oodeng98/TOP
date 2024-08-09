<template>
  <div class="sidebar" :class="{ open: isOpen }">
    <div class="sidebar-content">
      <h2>전체 위젯</h2>
      <div v-for="(component, index) in availableComponents" :key="index">
        <button
          :class="{ active: component.isActive }"
          @click="toggleComponent(component.name)"
        >
          <p>{{ component.name }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    availableComponents: Array,
    isOpen: Boolean,
  },
  methods: {
    toggleComponent(name) {
      this.$emit("toggleComponent", name);
    },
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: #f8f9fa;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar-content {
  padding: 20px;
  height: calc(100% - 40px);
}

.sidebar-content button {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #5865f2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.sidebar-content button.active {
  background-color: #a9a9a9;
}

.sidebar-content button:hover {
  background-color: #5865f2;
}

p {
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 0;
}

h2 {
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-weight: 700;
  font-size: 30px;
}
</style>
