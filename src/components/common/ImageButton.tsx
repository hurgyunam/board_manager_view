import IconImage from "@/src/components/icons/Image";
import { ChangeEvent, useRef } from "react";

export default function ImageButton({
  insertImage,
}: {
  insertImage: (fileDir: string) => void;
}) {
  const inputFile = useRef<HTMLInputElement | null>(null);

  const uploadFileToServer = async (file: File): Promise<string> => {
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    // 1. FormData 객체 생성
    const formData = new FormData();
    formData.append("file", file); // 서버에서 'file' 파라미터로 파일을 받도록 설정

    try {
      // 2. 서버의 파일 업로드 API 엔드포인트로 POST 요청
      const response = await fetch(`${API_URL}/api/v1/posts/image`, {
        method: "POST",
        body: formData,
        // 'Content-Type': 'multipart/form-data'는 FormData를 사용할 때
        // 브라우저가 자동으로 설정하므로 명시할 필요는 없습니다.
      });

      if (!response.ok) {
        throw new Error(`File upload failed with status: ${response.status}`);
      }

      // 3. 서버 응답에서 이미지 URL 추출 (서버 응답 구조에 따라 수정 필요)
      const result = await response.json();

      // 서버 응답 예시: { success: true, url: "/uploads/new_image.jpg" }
      return `${API_URL}/${result.fileName}`;
    } catch (error) {
      console.error("Upload failed:", error);
      // 실패 시 빈 문자열 또는 사용자 정의 오류 처리
      return "";
    }
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log("onFileChange", e.target.files);
    const file = e.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      // 1. 파일을 읽어 Base64로 변환하고 에디터에 삽입
      const fileDir = await uploadFileToServer(file);

      insertImage(fileDir);
    }
    // 파일 선택 후 input 값 초기화 (연속 선택 가능하게)
    e.target.value = "";
  };

  const onClickImage = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  return (
    <div className="btn btn-image" onClick={onClickImage}>
      <input
        ref={inputFile}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
      <IconImage />
      Add Image
    </div>
  );
}
