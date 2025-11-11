// src/context/ThemeContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  PaletteMode,
} from "@mui/material";
import { CssBaseline } from "@mui/material";

// 1. Context 타입 정의
interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: "light", // 기본 모드를 light로 설정
});

export const useColorMode = () => useContext(ColorModeContext);

// 2. 테마 Provider 컴포넌트
export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // 초기 상태를 'light'로 고정하여 시스템 설정을 무시
  const [mode, setMode] = useState<PaletteMode>("light");

  // 토글 함수
  const toggleColorMode = React.useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  // MUI 테마 객체 생성 (mode가 바뀔 때만 재계산)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode, // 현재 상태의 모드를 적용
          primary: {
            main: "#1976D2", // 주 색상
          },
          // ... 기타 사용자 정의 색상이나 설정 추가
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <MuiThemeProvider theme={theme}>
        {/* MUI 기본 스타일 및 배경색 리셋 (여기서 배경색이 적용됨) */}
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};
