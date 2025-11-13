import React, { useRef, useCallback } from "react";
import { Editor } from "@tiptap/react";

// ⚠️ 참고: 실제 백엔드 업로드 로직은 이 함수에 구현되어야 합니다.
// 여기서는 임시 이미지 URL을 사용합니다.
const uploadImageToBackend = async (file: File): Promise<string> => {
  // 1. 파일 업로드 API 호출 (예: fetch('/api/upload', { method: 'POST', body: formData }))
  // 2. 업로드 후 백엔드가 반환한 이미지의 공개 URL을 리턴

  console.log("Uploading file:", file.name);

  // 💡 실제 구현 시 이 부분을 백엔드 업로드 코드로 교체하세요!
  // 임시로 더미 URL을 반환합니다.
  await new Promise((resolve) => setTimeout(resolve, 500));
  const dummyUrl = "https://picsum.photos/seed/" + Date.now() + "/800/400";

  return dummyUrl;
};

interface ImageUploadButtonProps {
  editor: Editor | null;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ editor }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (editor && file) {
        // 1. 에디터 포커스를 유지하고 입력 모드를 활성화
        editor.chain().focus().run();

        // 2. 이미지 업로드 시작 (UI 블로킹 방지를 위해 로딩 상태 표시 고려 필요)
        const imageUrl = await uploadImageToBackend(file);

        // 3. 업로드가 성공하면, Tiptap에 Image 노드를 추가합니다.
        if (imageUrl) {
          editor.chain().focus().setImage({ src: imageUrl }).run();
        }

        // 4. 파일 입력 초기화 (같은 파일을 다시 선택할 수 있도록)
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [editor]
  );

  const handleClick = () => {
    // 숨겨진 file input 클릭 트리거
    fileInputRef.current?.click();
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }} // 숨김 처리
        accept="image/*" // 이미지 파일만 허용
      />
      <button
        onClick={handleClick}
        disabled={!editor.isEditable}
        // Tailwind CSS 예시: 'bg-gray-200 p-2 rounded'
      >
        🖼️ 이미지 첨부
      </button>
    </>
  );
};

export default ImageUploadButton;
