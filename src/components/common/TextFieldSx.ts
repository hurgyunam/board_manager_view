export const TextFieldSx = {
  // MuiFilledInput-root 클래스를 타겟팅합니다.
  width: "100%", // <--- 여기에 추가!
  "& .MuiFilledInput-root": {
    // 배경색을 흰색으로 설정 (요청 사항)
    backgroundColor: "white",

    // 테두리 추가 (새로운 요청 사항)
    border: "1px solid #ccc", // 1px solid 연한 회색 (#ccc)
    borderRadius: "4px", // 테두리에 둥근 모서리 추가

    // 기본 MUI의 밑줄(underline)을 숨깁니다.
    "&:after, &:before": {
      display: "none",
    },

    // 호버 및 포커스 시 배경색 및 테두리 유지/변경
    "&:hover": {
      backgroundColor: "white",
      borderColor: "#999", // 호버 시 테두리 색상 진하게
    },

    "&.Mui-focused": {
      backgroundColor: "white",
      borderColor: "primary.main", // 포커스 시 테두리 색상을 MUI Primary 색상으로 변경
    },
  },
};
