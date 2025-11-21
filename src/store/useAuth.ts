import { useQuery, useQueryClient } from "@tanstack/react-query";

export interface IUserInfo {
  userId: number;
  username: string;
  email: string;
  role: "USER" | "ADMIN" | "MANAGER";
}

const fetchUserInfo = async (): Promise<IUserInfo | null> => {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(`${API_URL}/api/v1/users/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    // 💡 1. 새로운 Error 객체를 생성합니다.
    const error = new Error(`Failed to fetch auth: ${response.status}`);

    // 💡 2. 가장 중요한 부분: Error 객체에 'status' 속성을 추가합니다.
    //      (이 속성을 useQuery의 retry 함수에서 사용합니다.)
    (error as any).status = response.status;

    throw error;
  }

  if (!response.ok) throw new Error("Failed to fetch auth");

  const json = await response.json();

  return json.data;
};

export const useAuth = () => {
  return useQuery<IUserInfo | null, Error>({
    queryKey: ["auth"], // 🚨 이 키가 글로벌 상태의 식별자입니다!
    queryFn: fetchUserInfo,
    retry: (failureCount, error) => {
      // 400, 401, 403 에러는 영구적 오류로 간주하고 재시도하지 않습니다.
      const status = (error as any).status;

      if (status === 400 || status === 401 || status === 403) {
        return false; // 재시도 하지 않음
      }

      // 5xx (서버 오류), 408 (타임아웃) 등은 네트워크 문제일 수 있으므로 재시도합니다.
      // 기본 재시도 횟수 (3)까지만 허용합니다.
      return failureCount <= 3;
    },
  });
};

export const useAuthActions = () => {
  const queryClient = useQueryClient();

  // 🚨 클리어할 쿼리 키를 명시합니다.
  const AUTH_QUERY_KEY = ["auth"];

  /**
   * @description 로그아웃 처리를 수행하고 'auth' 캐시를 완전히 제거하여 초기화합니다.
   * 실제 API 로그아웃 호출은 여기에 추가해야 합니다.
   */
  const logout = async () => {
    try {
      // 1. (선택적) 서버 로그아웃 API 호출
      // await fetch('/api/v1/logout', { method: 'POST' });

      // 2. [핵심] 'auth' 쿼리 캐시를 완전히 제거합니다.
      // 캐시에서 데이터를 지우면 useAuth를 사용하는 모든 컴포넌트의 data가 undefined가 됩니다.
      queryClient.setQueryData(AUTH_QUERY_KEY, () => null); // data를 IUserInfo | null에서 null로 변경

      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });

      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

      await fetch(`${API_URL}/api/v1/users/logout`, {
        method: "POST",
        credentials: "include",
      });

      console.log("TanStack Query: 'auth' 캐시가 제거되었습니다.");
    } catch (error) {
      console.error("로그아웃 처리 중 오류 발생:", error);
    }
  };

  /**
   * @description 인증 정보를 수동으로 새로고침(Refetch)하도록 무효화합니다.
   */
  const refetchAuth = () => {
    queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
  };

  return { logout, refetchAuth };
};
