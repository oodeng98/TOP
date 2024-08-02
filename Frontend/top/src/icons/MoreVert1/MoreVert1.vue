<template>
  <svg
    :class="['more-vert-1', className]"
    fill="none"
    height="16"
    viewBox="0 0 16 16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g class="g" :clip-path="`url(#clip0_${Math.floor(Math.random() * 100)}_${Math.floor(Math.random() * 100)})`">
      <path
        class="path"
        d="M7.90674 5.4792C8.62433 5.4792 9.21144 4.90116 9.21144 4.19468C9.21144 3.48819 8.62433 2.91016 7.90674 2.91016C7.18916 2.91016 6.60205 3.48819 6.60205 4.19468C6.60205 4.90116 7.18916 5.4792 7.90674 5.4792ZM7.90674 6.76372C7.18916 6.76372 6.60205 7.34176 6.60205 8.04824C6.60205 8.75473 7.18916 9.33276 7.90674 9.33276C8.62433 9.33276 9.21144 8.75473 9.21144 8.04824C9.21144 7.34176 8.62433 6.76372 7.90674 6.76372ZM7.90674 10.6173C7.18916 10.6173 6.60205 11.1953 6.60205 11.9018C6.60205 12.6083 7.18916 13.1863 7.90674 13.1863C8.62433 13.1863 9.21144 12.6083 9.21144 11.9018C9.21144 11.1953 8.62433 10.6173 7.90674 10.6173Z"
        fill="#A0AEC0"
      />
    </g>
    <defs class="defs">
      <clipPath class="clip-path" :id="`clip0_${Math.floor(Math.random() * 100)}_${Math.floor(Math.random() * 100)}`">
        <rect
          class="rect"
          fill="white"
          height="15.4143"
          :transform="`translate(0.0786133 0.341064)`"
          width="15.6563"
        />
      </clipPath>
    </defs>
  </svg>
</template>

<script>
export default {
  name: "MoreVert1",
  props: {
    className: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
</style>
