<template>
  <div class="input-withaddons">
    <div class="input-fieldtext">
      <div class="text-wrapper-21">프로그램/URL 입력</div>
      <div class="min-width">
        <div class="content-7" />
      </div>
    </div>
    <div class="auto-added-frame" />
  </div>
</template>

<script>
export default {
  name: "InputWithaddons",
};
</script>


<style>
 .input-withaddons {
  align-items: center;
  background-color: #ffffff;
  border: 0.5px solid;
  border-color: #5865f2;
  border-radius: 15px;
  display: flex;
  height: 40px;
  left: 213px;
  overflow: hidden;
  position: absolute;
  top: 11px;
  width: 199px;
}

.input-withaddons .input-fieldtext {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding: 0px 10px;
  position: relative;
}

.input-withaddons .text-wrapper-21 {
  color: #a0aec0;
  font-family: "Helvetica-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  height: 18px;
  letter-spacing: 0;
  line-height: 18px;
  margin-top: -0.5px;
  position: relative;
  white-space: nowrap;
  width: 171px;
}

.input-withaddons .min-width {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  justify-content: center;
  padding: 0px 74px;
  position: relative;
}

.input-withaddons .content-7 {
  height: 1px;
  margin-right: -0.99px;
  position: relative;
  width: 1px;
}

.input-withaddons .auto-added-frame {
  align-self: stretch;
  position: relative;
  width: 37.5px;
}

</style>
