package com.ssafy.top.onedays.presentation;

import com.ssafy.top.global.domain.CommonResponseDto;
import com.ssafy.top.onedays.application.OneDaysService;
import com.ssafy.top.onedays.dto.request.TimeGoalRequest;
import com.ssafy.top.onedays.dto.response.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "일자별 집중시간 API", description = "날짜에 관련된 집중시간과 목표 집중시간 API")
@RestController
@RequiredArgsConstructor
public class OneDaysController {

    private final OneDaysService oneDaysService;

    @Operation(summary = "일간/주간/월간 집중시간 통계 조회",
            description = "period 파라미터에 따라 일간/주간/월간 집중시간 통계를 조회한다.")
    @Parameters(value = {
            @Parameter(name = "period", description = "일간=day, 주간=week, 월간=month")
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "통계 조회 성공",
                    content = @Content(schema = @Schema(implementation = PeriodTotalFocusTimeResponse.class))),
            @ApiResponse(responseCode = "400",
                    description = "통계 조회 실패(부적절한 period 값)")
    })
    @GetMapping("/dash/stats/focus-time")
    public ResponseEntity<?> findTotalFocusTimeByPeriod(@RequestParam(name = "period") String period, HttpSession session) {
        String loginId = (String) session.getAttribute("loginId");
        loginId = "Timo1@gmail.com";
        CommonResponseDto<?> response = oneDaysService.findTotalFocusTimeByLoginIdAndPeriod(loginId, period);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "전체 집중 시간 조회",
            description = "처음 시작한 때부터 현재 시점까지의 총 집중 시간을 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "전체 집중 시간 조회 성공",
                    content = @Content(schema = @Schema(implementation = TotalFocusTimeResponse.class)))
    })
    @GetMapping("/dash/stats/focus-time/total")
    public ResponseEntity<?> findTotalFocusTime(HttpSession session) {
        String loginId = (String) session.getAttribute("loginId");
        loginId = "Timo1@gmail.com";
        CommonResponseDto<?> response = oneDaysService.findTotalFocusTimeByLoginId(loginId);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "일간/주간/월간 통계 그래프에 사용되는 단위 집중 시간 조회",
            description = "period 파라미터에 따라 일간/주간/월간 집중시간 통계를 조회한다.")
    @Parameters(value = {
            @Parameter(name = "period", description = "일간=day, 주간=week, 월간=month")
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "통계 조회 성공",
                    content = @Content(schema = @Schema(implementation = FocusTimeListDayResponse.class))),
            @ApiResponse(responseCode = "400",
                    description = "통계 조회 실패(부적절한 period 값)")
    })
    @GetMapping("/dash/stats/focus-time/detail")
    public ResponseEntity<CommonResponseDto<?>> findFocusTimeListByPeriod(@RequestParam(name = "period") String period, HttpSession session) {
        String loginId = (String) session.getAttribute("loginId");
        loginId = "Timo1@gmail.com";
        CommonResponseDto<?> response = oneDaysService.findFocusTimeListByLoginIdAndPeriod(loginId, period);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "스트릭에 표시할 데이터 조회",
            description = "month 파라미터에 따라 1개월/6개월 집중시간 통계를 조회한다.")
    @Parameters(value = {
            @Parameter(name = "month", description = "1개월 = 1, 6개월 = 6")
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "스트릭 데이터 조회 성공",
                    content = @Content(schema = @Schema(implementation = FocusTimeListResponse.class))),
            @ApiResponse(responseCode = "400",
                    description = "스트릭 데이터 조회 실패(부적절한 month 값)")
    })
    @GetMapping("/dash/streak")
    public ResponseEntity<CommonResponseDto<?>> findFocusTimeListByMonth(@RequestParam(name="month") int month, HttpSession session){
        String loginId = (String) session.getAttribute("loginId");
        loginId = "Timo1@gmail.com";
        CommonResponseDto<?> response = oneDaysService.findFocusTimeListByLoginIdAndMonth(loginId, month);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "캘린더에 표시할 데이터 조회",
            description = "year, month 파라미터에 따라 캘린더 집중시간 통계를 조회한다.")
    @Parameters(value = {
            @Parameter(name = "year", description = "year = 2024"),
            @Parameter(name = "month", description = "month = 8")
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "캘린더 데이터 조회 성공",
                    content = @Content(schema = @Schema(implementation = FocusTimeListCalendarResponse.class))),
            @ApiResponse(responseCode = "400",
                    description = "캘린더 데이터 조회 실패(부적절한 year/month 값)")
    })
    @GetMapping("/dash/calendar")
    public ResponseEntity<?> findFocusTimeListByYearAndMonth(@RequestParam(name="year") int year, @RequestParam(name="month") int month, HttpSession session){
        String loginId = (String) session.getAttribute("loginId");
        loginId = "Timo1@gmail.com";
        CommonResponseDto<?> response = oneDaysService.findFocusTimeListByLoginIdAndYearAndMonth(loginId, year, month);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "전체 인원 대비 집중 시간 백분율 조회",
            description = "전체 인원 대비 일간/주간/월간 백분율을 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "백분율 조회 성공",
                    content = @Content(schema = @Schema(implementation = FocusTimePercentResponse.class)))
    })
    @GetMapping("/dash/stats/focus-time/percent")
    public ResponseEntity<?> findFocusTimePercent(HttpSession session){
        String loginId = (String) session.getAttribute("loginId");
        loginId = "Timo1@gmail.com";
        CommonResponseDto<?> response = oneDaysService.findFocusTimePercentByLoginId(loginId);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "목표 집중시간 조회",
            description = "period 파라미터에 따라 일간/주간/월간 목표 시간을 조회한다.")
    @Parameters(value = {
            @Parameter(name = "period", description = "일간=day, 주간=week, 월간=month")
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "목표 집중 시간 조회 성공",
                    content = @Content(schema = @Schema(implementation = TimeGoalAndDayResponse.class))),
            @ApiResponse(responseCode = "400",
                    description = "캘린더 데이터 조회 실패(부적절한 period 값)")
    })
    @GetMapping("/focus-time/goal")
    public ResponseEntity<?> findByTimeGoal(@RequestParam(name="period") String period, HttpSession session) {
        String loginId = (String) session.getAttribute("loginId");
        loginId = "Timo1@gmail.com";
        CommonResponseDto<?> response = oneDaysService.findTimeGoalByLoginIdAndPeriod(loginId, period);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @Operation(summary = "목표 집중 시간 추가",
            description = "오늘의 목표 집중 시간을 추가한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",
                    description = "목표 시간 추가 성공",
                    content = @Content(schema = @Schema(implementation = TimeGoalResponse.class)))
    })
    @PostMapping("/focus-time/goal")
    public ResponseEntity<?> saveTimeGoal(@RequestBody TimeGoalRequest timeGoal, HttpSession session) {
        String loginId = (String) session.getAttribute("loginId");
        loginId = "Timo1@gmail.com";
        CommonResponseDto<?> response = oneDaysService.saveTimeGoal(loginId, timeGoal);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "목표 집중 시간 수정",
            description = "오늘의 목표 집중 시간을 수정한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",
                    description = "목표 시간 추가 성공",
                    content = @Content(schema = @Schema(implementation = TimeGoalResponse.class)))
    })
    @PutMapping("/focus-time/goal")
    public ResponseEntity<?> updateTimeGoal(@RequestBody TimeGoalRequest timeGoal, HttpSession session) {
        String loginId = (String) session.getAttribute("loginId");
        loginId = "Timo1@gmail.com";
        CommonResponseDto<?> response = oneDaysService.updateTimeGoal(loginId, timeGoal);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
