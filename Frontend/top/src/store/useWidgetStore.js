// src/store/useWidgetStore.js
import { defineStore } from 'pinia';

export const useWidgetStore = defineStore('widget', {
  state: () => ({
    widgets: [], // widgets 배열을 상태로 관리
  }),
  actions: {
    setWidgets(widgets) {
      this.widgets = widgets;
    },
    addWidget(widget) {
      this.widgets.push(widget);
    },
    removeWidget(widgetName) {
      this.widgets = this.widgets.filter(widget => widget.name !== widgetName);
    },
  },
});