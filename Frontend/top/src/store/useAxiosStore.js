import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useAxiosStore = defineStore('axiosStore', () => {
    const defaultUrl = "https://i11a707.p.ssafy.io/api/";
    const intervalId = null

    // BannedProgramList
    const bannedList = ref([]);
    const fetchProgramLists = async function() {
        try {
          const response = await axios.get(
            defaultUrl + "focus-time/ban"
          );
          this.bannedList = response.data.data;
        } catch (error) {
          console.error("Error to fetch data:", error);
        }
      }
    
    // FocusTimeEachPrograms
    const appListFTEP = ref([])
    const FocusTimeEachPrograms = async function() {
        try {
          const response = await axios.get(
            defaultUrl + "dash/stats/app"
          );
          if (response.status === 200 && response.data.statusCode === 200) {
            this.appListFTEP = response.data.data.map((app) => ({
              ...app,
              imagePath: this.getImagePath(app.name),
            }));
          } else {
            console.error("Failed to fetch data:", "데이터 조회에 실패했습니다");
          }
        } catch (error) {
          console.error("FocusTimeEachPrograms API request failed:", error);
        }
      }

    // FocusTimeEachProgramsPercentage
    const appListFTEPP = ref([])
    const FocusTimeEachProgramsPercentage = async function() {
        try {
          const response = await axios.get(
            "https://i11a707.p.ssafy.io/api/dash/stats/app"
          );
          if (response.status === 200 && response.data.statusCode === 200) {
            this.appListFTEPP = response.data.data.map((app) => ({
              ...app,
              percentage: app.focusRate,
            }));
          } else {
            console.error(
              "Failed to fetch data:",
              "프로그램 조회에 실패하였습니다."
            );
          }
        } catch (error) {
          console.error("API request failed:", error);
        }
      }
      
    // MonthtAchievementBig
    const monthlyFocusTime = ref('')
    const fetchFocusTime = async function () {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io/api/dash/stats/focus-time",
          {
            params: {
              period: "month",
            },
          }
        );
        monthlyFocusTime.value = timeStringToSeconds(
          response.data.data.totalFocusTime
        );
        // return monthlyFocusTime;
      } catch (error) {
        console.error(
          "MonthAchievement2 데이터를 가져오는 중 오류 발생1:",
          error
        );
        return 0;
      }
    }

    const startFetching = () => {
        this.fetchProgramLists();
        this.intervalId = setInterval(this.fetchProgramLists, 60000);
      }

    const stopFetching = () => {
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
      }
    
    return { bannedList, fetchProgramLists,
             appListFTEP, FocusTimeEachPrograms,
             appListFTEPP, FocusTimeEachProgramsPercentage,
              startFetching, stopFetching}
}, {persist: true})