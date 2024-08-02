<template>
  <svg
    :class="['edit-1', className]"
    fill="none"
    height="21"
    viewBox="0 0 14 21"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g class="g" :clip-path="`url(#clip0_${Math.random()})`">
      <path
        class="path"
        d="M1.69092 15.05V17.5833C1.69092 17.8167 1.81494 18 1.97278 18H3.68651C3.75979 18 3.83307 17.9583 3.88381 17.875L10.0397 8.78334L7.92572 5.65834L1.77548 14.75C1.7191 14.8333 1.69092 14.9333 1.69092 15.05ZM11.6745 6.36667C11.8943 6.04167 11.8943 5.51667 11.6745 5.19167L10.3554 3.24167C10.1355 2.91667 9.78038 2.91667 9.56053 3.24167L8.52891 4.76667L10.6429 7.89167L11.6745 6.36667V6.36667Z"
        fill="#2D3748"
      />
    </g>
    <defs class="defs">
      <clipPath class="clip-path" :id="`clip0_${Math.random()}`">
        <rect class="rect" fill="white" height="20" :transform="`translate(0 0.5)`" width="13.5294" />
      </clipPath>
    </defs>
  </svg>
</template>

<script>
export default {
  name: "Edit1",
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
