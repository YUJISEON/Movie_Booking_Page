var $container = document.getElementById("seat-container"); // 영화별 좌석 컨테이너
var $allSeats = document.querySelectorAll(".row .seat");
var $seats = document.querySelectorAll(".row .seat:not(.occupied)"); // 선택 가능한 좌석 (배열)
var $count = document.getElementById("count"); // 영화별 선택한 좌석들 개수
var $total = document.getElementById("total"); // 영화별 선택 금액
var $movieSelect = document.getElementById("movie-name"); // select 영화
var $movieIndex = $movieSelect.selectedIndex; // select.option.index 선택한 영화 인덱스
var $ticketPrice = $movieSelect.value; // select.option.value 선택한 영화 금액
var $movieImg = document.getElementById("movie-images"); // 영화 포스터 컨테이너
var $movieCount = document.querySelectorAll(".seats").length; // 좌석 개수 (배열)
var seatsIndex = []; // 선택한 영화별 좌석 인덱스값이 저장할 새로운 배열
var $bookingBtn = document.getElementsByClassName("booking-Btn")[0]; // 결제 버튼 (배열)
var $bookingInfo = document.getElementsByClassName("booking-info")[0]; // 결제 정보 (배열)

localStorage.removeItem("selectedSeats${" + $movieIndex + "}");

console.log("============basic================");
console.log("$container : " + $container);
console.log("$seats : " + $seats + " / " + $seats.length);
console.log("$movieSelect : " + $movieSelect);
console.log("$movieIndex : " + $movieIndex);
console.log("$ticketPrice : " + $ticketPrice);
console.log("$movieCount : " + $movieCount);

populateUI(0); // 영화 데이터 - 인덱스 설정, 좌석 셋팅
$ticketPrice = $movieSelect.value;
updateSelectedCount(0); // 영화별 좌석 데이터

// 인덱스 설정, 좌석 셋팅
function populateUI(index) {
  console.log("============populateUI================");

  // 선택한 영화 인덱스 - 로컬스토리지 가져오기
  var selectedMovieIndex = JSON.parse(
    localStorage.getItem("selectedMovieIndex")
  );
  console.log("selectedMovieIndex : " + selectedMovieIndex);

  // 영화 인덱스에 값이 있으면(이젠 기록이 남아 있으면) '$movieSelect.selectedIndex' 초기값 셋팅
  if (selectedMovieIndex !== null) {
    $movieSelect.selectedIndex = $movieIndex = selectedMovieIndex;
    console.log("$movieIndex: " + $movieIndex);
    console.log("$movieSelect.selectedIndex: " + $movieSelect.selectedIndex);
  }

  // 영화별 좌석 - 로컬스토리지 가져오기
  var selectedSeats = JSON.parse(
    localStorage.getItem("selectedSeats${" + index + "}")
  );
  console.log("selectedSeats : " + selectedSeats);

  // 영화별 '전체 좌석 배열'
  $allSeats = document.querySelectorAll(
    ".movie-" + $movieIndex + " .row .seat"
  );

  // 영화별 '선택 가능한 좌석 배열'
  $seats = document.querySelectorAll(
    ".movie-" + $movieIndex + " .row .seat:not(.occupied)"
  );

  // 영화별 좌석 - 선택된 좌석이 있을 경우
  // '선택 가능한 좌석 배열' 반복문을 통해 '선택한 좌석 배열'에 해당 값이 있는지 확인 후
  // 있으면 '선택 가능한 좌석 배열'의 클라스에  'selected' 클라스 추가 및 css 처리
  if (selectedSeats !== null && selectedSeats.length > 0) {
    $seats.forEach((seat, index) => {
      console.log(
        "selectedSeats.indexOf(index)" + selectedSeats.indexOf(index)
      );
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  pageSetting($movieIndex);
}

// 영화별 포스터, 좌석 컨테이너, 결제 등 css 처리 (hidden/show)
function pageSetting(index) {
  console.log(">>>>>>>>>>>>>>>>>>pageSetting");

  // 영화별 좌석 컨테이너 hidden/show 처리
  var start_seats = document.querySelectorAll(".seats");
  start_seats.forEach((seats, index) => {
    //seats.classList.add("movie-hidden");
    seats.classList.remove("movie-show");
  });

  // 선택된 영화 인덱스 좌석 컨테이너만 show 처리
  if ($movieSelect.selectedIndex === index) {
    document.querySelectorAll(".movie-" + index)[0].classList.add("movie-show");
  }

  // 선택된 영화 인덱스 포스터(이미지) hidden/show 처리
  for (var i = 0; i < $movieCount; i++) {
    $movieImg.classList.remove("movieImg" + i);
  }
  if ($movieSelect.selectedIndex === index) {
    $movieImg.classList.add(`movieImg` + index);
  }

  // 부킹 컨테이너 박스 hidden/show 처리
  if (index === 0) {
    $bookingInfo.style.visibility = "hidden";
    $bookingBtn.style.visibility = "hidden";
  } else {
    $bookingInfo.style.visibility = "visible";
    $bookingBtn.style.visibility = "visible";
  }
}

function updateSelectedCount(index) {
  console.log("============updateSelectedCount================");
  console.log("$movieIndex : " + $movieIndex);

  // 선택된 영화 - 선택된 좌석들 배열로 저장
  var selectedSeats = document.querySelectorAll(
    ".movie-" + index + " .row .seat.selected"
  );

  for (var i = 0; i <= 100; i++) {
    console.log("selectedSeats : " + selectedSeats[i]);
  }

  // 선택된 좌석들의 인덱스 번호 새로운 배열에 저장
  // '선택한 좌석 배열'들을 복사 >> 해당의 배열값이 '선택 가능한 좌석 배열'에 값이 있는지 확인
  // 확인 후 'indexOf' 결과값이 '-1' 아니라면, '선택 가능한 좌석 배열'의 인덱스 값을 새로운 배열에 저장
  seatsIndex[index] = [...selectedSeats].map((seat) => {
    console.log("seat : " + seat);
    return [...$allSeats].indexOf(seat);
  });
  console.log("seatsIndex : " + seatsIndex[index]);

  // 선택된 영화 좌석 - 로컬스토리지 저장하기
  localStorage.setItem(
    "selectedSeats${" + index + "}",
    JSON.stringify(seatsIndex)
  );

  // '선택한 좌석 배열'의 길이(선택 좌석 갯수) 확인
  // 좌석 개수, 금액을 계산하여 출력
  var selectedSeatsCount = selectedSeats.length;
  console.log("selectedSeatsCount : " + selectedSeatsCount);
  $count.innerText = parseInt(selectedSeatsCount);
  $total.innerText = numberWithCommas(selectedSeatsCount * $ticketPrice);
}

$movieSelect.addEventListener("change", (e) => {
  console.log(">>>>>>>>>>>>>>>>>>movieSelect change");
  // select에서 영화를 변경 시 'index 값'과 '영화 금액'을 새로 저장
  $movieIndex = e.target.selectedIndex;
  $ticketPrice = +e.target.value;

  // 선택한 영화의 '선택 가능한 좌석 배열'
  // $seats = document.querySelectorAll(
  //   ".movie-" + $movieIndex + " .row .seat:not(.occupied)"
  // );
  setMovieData(e.target.selectedIndex, e.target.value);
  populateUI($movieIndex);
  updateSelectedCount($movieIndex);
});

// 선택된 영화 인덱스, 금액 - 로컬스토리지 저장하기
function setMovieData(movieIndex, moviePrice) {
  $movieImg.style.backgroundColor = "rgba(170, 169, 169, 0.849)";
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// 좌석 선택 컨테이너 '영역'에서 클릭 시
$container.addEventListener("click", (e) => {
  // 클릭된 '타켓'의 하위 클라스가 'seat' 클라스이고 'occupied' 인 경우 참
  // '.seat'와 '.occupied'가 'container'의 하위 요소인지 확인
  // 영화를 고르지 않은 상태에서는 좌석이 선택되지 않음 (option value가 1이상)
  if (
    $movieSelect.value > 1 &&
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    // '.selected' 클라스(선택 좌석) add/remove 처리
    e.target.classList.toggle("selected");

    // 선택된 영화의 좌석 현황을 업데이트
    updateSelectedCount($movieIndex);
  }
});

// 화폐 ',' 단위 설정
function numberWithCommas(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// // 함수별 호출 시 '인덱스' 체크,
// // 첫 접속 시에 인덱스값은 '0' 으로 시작
// function indexChk(index) {
//   if (
//     $movieSelect.selectedIndex === undefined ||
//     $movieSelect.selectedIndex === null ||
//     $movieSelect.selectedIndex === 0
//   ) {
//     return (index = 0);
//   } else {
//     return (index = $movieSelect.selectedIndex);
//   }
// }

// 결제하기 버튼 클릭
$bookingBtn.addEventListener("click", (e) => {
  var seatNum = [];
  var alp = ["A", "B", "C", "D", "E", "F", "G"];
  var seatAlp;
  var colNum = 8;
  console.log("결제 클릭 >>> " + $count.innerText);
  if ($count.innerText === "0") {
    alert("좌석을 선택해주세요.");
  } else if ($movieIndex !== 0) {
    for (var i = 0; i < $count.innerText; i++) {
      if ((seatsIndex[$movieIndex][i] + 1) % colNum === 0) {
        seatNum[i] = colNum;
      } else {
        seatNum[i] = (seatsIndex[$movieIndex][i] + 1) % colNum;
      }
      seatAlp = Math.floor((seatsIndex[$movieIndex][i] + 1) / colNum);
    }
    if (
      confirm(
        "아래와 같이 예매를 진행하시겠습니까?" +
          "\n" +
          "■ 선택 영화 : " +
          $movieSelect.options[$movieIndex].text +
          "\n" +
          "■ 선택 좌석 : " +
          alp[seatAlp] +
          "행 / " +
          seatNum.toString() +
          "\n" +
          "■ 티켓 수량 : " +
          $count.innerText +
          "\n" +
          "■ 총 결제 금액 : " +
          $total.innerText
      )
    ) {
      alert("예약이 완료되었습니다.");
      updateOccupied(seatNum);
    } else {
      console.log("You pressed Cancel!");
    }
  }
});

// 새로고침 >> 모든 데이터 초기화, 선택했던 영화는 그대로
window.onload = function () {
  document.onkeydown = function (e) {
    if (e.which === 116 || e.keyCode === 116) {
      //e.preventDefault();
      //localStorage.removeItem("selectedSeats${" + $movieIndex + "}");
      // localStorage.removeItem("selectedMovieIndex");
      populateUI($movieIndex);
      updateSelectedCount($movieIndex);
    }
  };
};

// 선택한 좌석 -> 선택불가('occupied') css 처리
function updateOccupied(updateSeat) {
  var $updateMovie = document.querySelectorAll(
    ".movie-" + $movieIndex + " .row .seat"
  );

  for (var i = 0; i < $updateMovie.length; i++) {
    if (updateSeat[i]) {
      var num = updateSeat[i] - 1;
      $updateMovie[num].classList.remove("selected");
      $updateMovie[num].classList.add("occupied");
    }
  }

  $count.innerText = 0;
  $total.innerText = 0;
}
