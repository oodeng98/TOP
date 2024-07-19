
<template>
  <div class="sidebar">
    <div class="menu">
      <div class="friends">
        <div class="overlap-group-12">
          <div class="ionicon-p-person-wrapper">
            <IoniconPPersonDefault1 class="ionicon-p-person" />
          </div>
          <div class="text-wrapper-58">Friends</div>
          <div class="items-wrapper">
            <div class="freduardo-hill-wrapper">
              <div class="freduardo-hill">
                <img class="line-9" alt="Line" src="/img/line-14.png" />
                <img class="line-10" alt="Line" src="/img/line-15.png" />
                <div class="content-9">
                  <div class="avatar">
                    <div class="name">
                      <div class="text-wrapper-59">Freduardo Hill</div>
                    </div>
                    <img class="image" alt="Image" src="/img/image.png" />
                  </div>
                  <img class="status" alt="Status" src="/img/status.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dash-board">
        <div class="overlap-15">
          <div class="ionicon-s-stats-wrapper">
            <IoniconSStatsChart1 class="ionicon-s-stats" />
          </div>
          <div class="text-wrapper-60">DashBoard</div>
        </div>
      </div>
    </div>
    <div class="logo">
      <div class="top">TOP</div>
      <img class="icon-9" alt="Icon" src="/img/icon-12.png" />
    </div>
    <img class="vector" alt="Vector" src="/img/vector-6.svg" />
  </div>
</template>

<script>
import IoniconPPersonDefault1 from "../../../icons/IoniconPPersonDefault1.vue";
import IoniconSStatsChart1 from "../../../icons/IoniconSStatsChart1.vue";

export default {
  name: "Sidebar",
  components: {
    IoniconPPersonDefault1,
    IoniconSStatsChart1,
  },
};
</script>


<style>
.sidebar {
  background-color: #f8f9fa;
  height: 1446px;
  left: 0;
  position: absolute;
  top: 0;
  width: 270px;
}

.sidebar .menu {
  height: 342px;
  left: 23px;
  position: absolute;
  top: 80px;
  width: 226px;
}

.sidebar .friends {
  height: 278px;
  left: 0;
  position: absolute;
  top: 64px;
  width: 227px;
}

.sidebar .overlap-group-12 {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 278px;
  position: relative;
  width: 225px;
}

.sidebar .ionicon-p-person-wrapper {
  background-color: #5865f2;
  border-radius: 12px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 27px;
  left: 16px;
  position: absolute;
  top: 18px;
  width: 31px;
}

.sidebar .ionicon-p-person {
  height: 14px !important;
  left: 8px !important;
  position: absolute !important;
  top: 7px !important;
  width: 15px !important;
}

.sidebar .text-wrapper-58 {
  color: #2d3748;
  font-family: "Helvetica-Bold", Helvetica;
  font-size: 12px;
  font-weight: 700;
  height: 16px;
  left: 59px;
  letter-spacing: 0;
  line-height: 18px;
  position: absolute;
  top: 24px;
  white-space: nowrap;
  width: 45px;
}

.sidebar .items-wrapper {
  height: 59px;
  left: 13px;
  position: absolute;
  top: 65px;
  width: 199px;
}

.sidebar .freduardo-hill-wrapper {
  height: 59px;
}

.sidebar .freduardo-hill {
  height: 59px;
  position: relative;
  width: 199px;
}

.sidebar .line-9 {
  height: 1px;
  left: 0;
  position: absolute;
  top: 58px;
  width: 199px;
}

.sidebar .line-10 {
  height: 1px;
  left: 1px;
  position: absolute;
  top: 0;
  width: 199px;
}

.sidebar .content-9 {
  align-items: center;
  display: flex;
  left: 0;
  position: absolute;
  top: 16px;
  width: 182px;
}

.sidebar .avatar {
  height: 40px;
  position: relative;
  width: 149px;
}

.sidebar .name {
  height: 20px;
  left: 52px;
  position: absolute;
  top: 11px;
  width: 99px;
}

.sidebar .text-wrapper-59 {
  color: #2d3748;
  font-family: "Helvetica-Bold", Helvetica;
  font-size: 14px;
  font-weight: 700;
  left: 0;
  letter-spacing: 0;
  line-height: 19.6px;
  position: absolute;
  top: 0;
  white-space: nowrap;
  width: 97px;
}

.sidebar .image {
  height: 51px;
  left: -6px;
  position: absolute;
  top: -2px;
  width: 49px;
}

.sidebar .status {
  height: 10px;
  left: 182px;
  position: absolute;
  top: 16px;
  width: 9px;
}

.sidebar .dash-board {
  height: 49px;
  left: 0;
  position: absolute;
  top: 0;
  width: 228px;
}

.sidebar .overlap-15 {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 49px;
  position: relative;
  width: 226px;
}

.sidebar .ionicon-s-stats-wrapper {
  background-color: #5865f2;
  border-radius: 12px;
  height: 27px;
  left: 16px;
  position: absolute;
  top: 11px;
  width: 31px;
}

.sidebar .ionicon-s-stats {
  height: 14px !important;
  left: 7px !important;
  position: absolute !important;
  top: 6px !important;
  width: 15px !important;
}

.sidebar .text-wrapper-60 {
  color: #2d3748;
  font-family: "Helvetica-Bold", Helvetica;
  font-size: 12px;
  font-weight: 700;
  height: 16px;
  left: 60px;
  letter-spacing: 0;
  line-height: 18px;
  position: absolute;
  top: 16px;
  white-space: nowrap;
  width: 67px;
}

.sidebar .logo {
  height: 37px;
  left: 27px;
  position: absolute;
  top: 13px;
  width: 223px;
}

.sidebar .top {
  color: #2d3748;
  font-family: "Helvetica-Bold", Helvetica;
  font-size: 30px;
  font-weight: 700;
  height: 34px;
  left: 56px;
  letter-spacing: 0;
  line-height: 45px;
  position: absolute;
  top: 3px;
  white-space: nowrap;
  width: 165px;
}

.sidebar .icon-9 {
  height: 35px;
  left: 0;
  position: absolute;
  top: 0;
  width: 52px;
}

.sidebar .vector {
  height: 1px;
  left: 22px;
  object-fit: cover;
  position: absolute;
  top: 59px;
  width: 240px;
}

</style>