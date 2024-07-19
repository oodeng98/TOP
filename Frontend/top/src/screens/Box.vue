<template>
  <div class="box">
    <div class="dash-board">
      <div class="main-dashboard">
        <div class="breadcrumb">
          <div class="text">
            <div class="text-wrapper">Dashboard</div>
          </div>
          <div class="div">
            <div class="text-wrapper-2">EDIT</div>
            <EditComponent class="edit-1" />
          </div>
        </div>
      </div>
      <div class="sidebar">
        <div class="menu">
          <div class="friends">
            <div class="overlap-group">
              <div class="overlap">
                <IoniconPPersonDefault1 class="ionicon-p-person" />
              </div>
              <div class="text-wrapper-3">Friends</div>
              <div class="list">
                <div class="items">
                  <div class="freduardo-hill">
                    <img class="line" alt="Line" src="/img/line-2.png" />
                    <div class="content">
                      <div class="avatar">
                        <div class="name">
                          <div class="text-wrapper-4">Freduardo Hill</div>
                        </div>
                        <img class="image" alt="Image" src="/img/image-2.png" />
                      </div>
                      <img class="status" alt="Status" src="/img/status.png" />
                    </div>
                  </div>
                </div>
                <div class="freduardo-hill-wrapper">
                  <div class="freduardo-hill">
                    <img class="line" alt="Line" src="/img/line-2.png" />
                    <div class="content">
                      <div class="avatar">
                        <div class="name">
                          <div class="text-wrapper-4">Freduardo Hill</div>
                        </div>
                        <img class="image" alt="Image" src="/img/image-2.png" />
                      </div>
                      <img
                        class="status"
                        alt="Status"
                        src="/img/status-2.png"
                      />
                    </div>
                  </div>
                </div>
                <div class="div-wrapper">
                  <div class="freduardo-hill-2">
                    <img class="img" alt="Line" src="/img/line-2.png" />
                    <img class="line-2" alt="Line" src="/img/line-3.png" />
                    <div class="content-2">
                      <div class="avatar">
                        <div class="name">
                          <div class="text-wrapper-4">Freduardo Hill</div>
                        </div>
                        <img class="image" alt="Image" src="/img/image-2.png" />
                      </div>
                      <img
                        class="status"
                        alt="Status"
                        src="/img/status-2.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="overlap-wrapper">
            <div class="overlap-2">
              <div class="ionicon-s-stats-wrapper">
                <IoniconSStatsChartComponent class="ionicon-s-stats" />
              </div>
              <div class="text-wrapper-5">DashBoard</div>
            </div>
          </div>
        </div>
        <div class="logo">
          <div class="top">TOP</div>
          <img
            class="logo-creative-tim"
            alt="Logo creative tim"
            src="/img/logo-creative-tim-black.png"
          />
        </div>
        <img class="vector" alt="Vector" src="/img/vector-6.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import EditComponent from "../icons/EditComponent/EditComponent.vue";
import IoniconPPersonDefault1 from "../icons/IoniconPPersonDefault1.vue";
import IoniconSStatsChartComponent from "../icons/IoniconSStatsChartComponent/IoniconSStatsChartComponent.vue";

export default {
  name: "Box",
  components: {
    EditComponent,
    IoniconPPersonDefault1,
    IoniconSStatsChartComponent,
  },
};
</script>

<style>
.box {
  height: 1580px;
  position: relative;
  width: 1283px;
}

.box .dash-board {
  height: 1580px;
  left: 0;
  position: fixed;
  top: 0;
  width: 1283px;
}

.box .main-dashboard {
  height: 32px;
  left: 296px;
  position: absolute;
  top: 14px;
  width: 987px;
}

.box .breadcrumb {
  height: 32px;
  position: relative;
}

.box .text {
  height: 19px;
  left: 0;
  position: absolute;
  top: 0;
  width: 134px;
}

.box .text-wrapper {
  color: #2d3748;
  font-family: "Helvetica-Bold", Helvetica;
  font-size: 25px;
  font-weight: 700;
  left: 0;
  letter-spacing: 0;
  line-height: 35px;
  position: absolute;
  top: 0;
  white-space: nowrap;
  width: 132px;
}

.box .div {
  height: 32px;
  left: 910px;
  position: absolute;
  top: 0;
  width: 79px;
}

.box .text-wrapper-2 {
  color: #2d3748;
  font-family: "Helvetica-Bold", Helvetica;
  font-size: 24px;
  font-weight: 700;
  left: 19px;
  letter-spacing: 0;
  line-height: 36px;
  position: absolute;
  top: 0;
  white-space: nowrap;
  width: 58px;
}

.box .edit-1 {
  height: 28px !important;
  left: 0 !important;
  position: absolute !important;
  top: 4px !important;
  width: 19px !important;
}

.box .sidebar {
  background-color: #f8f9fa;
  height: 1580px;
  left: 0;
  position: absolute;
  top: 0;
  width: 270px;
}

.box .menu {
  height: 374px;
  left: 23px;
  position: absolute;
  top: 87px;
  width: 226px;
}

.box .friends {
  height: 304px;
  left: 0;
  position: absolute;
  top: 70px;
  width: 227px;
}

.box .overlap-group {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 304px;
  position: relative;
  width: 225px;
}

.box .overlap {
  background-color: #5865f2;
  border-radius: 12px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 30px;
  left: 16px;
  position: absolute;
  top: 20px;
  width: 31px;
}

.box .ionicon-p-person {
  height: 15px !important;
  left: 8px !important;
  position: absolute !important;
  top: 8px !important;
  width: 15px !important;
}

.box .text-wrapper-3 {
  color: #2d3748;
  font-family: "Helvetica-Bold", Helvetica;
  font-size: 12px;
  font-weight: 700;
  height: 18px;
  left: 59px;
  letter-spacing: 0;
  line-height: 18px;
  position: absolute;
  top: 26px;
  white-space: nowrap;
  width: 45px;
}

.box .list {
  height: 183px;
  left: 13px;
  position: absolute;
  top: 71px;
  width: 199px;
}

.box .items {
  height: 46px;
  left: 0;
  position: absolute;
  top: 137px;
  width: 199px;
}

.box .freduardo-hill {
  height: 46px;
  position: relative;
}

.box .line {
  height: 1px;
  left: 0;
  position: absolute;
  top: 45px;
  width: 199px;
}

.box .content {
  align-items: center;
  display: flex;
  left: 0;
  position: absolute;
  top: 0;
  width: 182px;
}

.box .avatar {
  height: 40px;
  position: relative;
  width: 149px;
}

.box .name {
  height: 20px;
  left: 52px;
  position: absolute;
  top: 11px;
  width: 99px;
}

.box .text-wrapper-4 {
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

.box .image {
  height: 51px;
  left: -6px;
  position: absolute;
  top: -2px;
  width: 49px;
}

.box .status {
  height: 10px;
  left: 182px;
  position: absolute;
  top: 16px;
  width: 9px;
}

.box .freduardo-hill-wrapper {
  height: 46px;
  left: 0;
  position: absolute;
  top: 77px;
  width: 199px;
}

.box .div-wrapper {
  height: 64px;
  left: 0;
  position: absolute;
  top: 0;
  width: 199px;
}

.box .freduardo-hill-2 {
  height: 64px;
  position: relative;
}

.box .img {
  height: 1px;
  left: 0;
  position: absolute;
  top: 63px;
  width: 199px;
}

.box .line-2 {
  height: 1px;
  left: 1px;
  position: absolute;
  top: 0;
  width: 199px;
}

.box .content-2 {
  align-items: center;
  display: flex;
  left: 0;
  position: absolute;
  top: 18px;
  width: 182px;
}

.box .overlap-wrapper {
  height: 54px;
  left: 0;
  position: absolute;
  top: 0;
  width: 228px;
}

.box .overlap-2 {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 54px;
  position: relative;
  width: 226px;
}

.box .ionicon-s-stats-wrapper {
  background-color: #5865f2;
  border-radius: 12px;
  height: 30px;
  left: 16px;
  position: absolute;
  top: 12px;
  width: 31px;
}

.box .ionicon-s-stats {
  height: 15px !important;
  left: 7px !important;
  position: absolute !important;
  top: 7px !important;
  width: 15px !important;
}

.box .text-wrapper-5 {
  color: #2d3748;
  font-family: "Helvetica-Bold", Helvetica;
  font-size: 12px;
  font-weight: 700;
  height: 18px;
  left: 60px;
  letter-spacing: 0;
  line-height: 18px;
  position: absolute;
  top: 18px;
  white-space: nowrap;
  width: 67px;
}

.box .logo {
  height: 40px;
  left: 27px;
  position: absolute;
  top: 14px;
  width: 223px;
}

.box .top {
  color: #2d3748;
  font-family: "Helvetica-Bold", Helvetica;
  font-size: 30px;
  font-weight: 700;
  height: 37px;
  left: 56px;
  letter-spacing: 0;
  line-height: 45px;
  position: absolute;
  top: 3px;
  white-space: nowrap;
  width: 165px;
}

.box .logo-creative-tim {
  height: 38px;
  left: 0;
  position: absolute;
  top: 0;
  width: 52px;
}

.box .vector {
  height: 1px;
  left: 22px;
  object-fit: cover;
  position: absolute;
  top: 64px;
  width: 240px;
}
</style>
