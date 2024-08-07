<template>
  <div class="sidebar" :class="{ open: isOpen }">
    <div class="sidebar-content">
      <h2>Available Components</h2>
      <div v-for="(component, index) in availableComponents" :key="index">
        <button @click="addComponent(component.name)">
          Add {{ component.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    availableComponents: Array,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    addComponent(name) {
      this.$emit('addComponent', name);
    },
  },
  mounted() {
    this.isOpen = true;
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px;
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
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.sidebar-content button:hover {
  background-color: #2980b9;
}
</style>