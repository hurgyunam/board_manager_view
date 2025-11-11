import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Box,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  onSearch: (query: string) => void;
}

const SearchComponent: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query.trim());
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Paper
      component="form"
      elevation={0}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <FormControl fullWidth variant="outlined">
        <OutlinedInput
          fullWidth
          placeholder="제목, 내용, 작성자로 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          // ★ InputProps 대신 OutlinedInput의 표준 prop으로 직접 전달합니다.
          //   OutlinedInput은 InputBase의 상위 컴포넌트이므로 InputProps가 아닌
          //   endAdornment를 직접 prop으로 받습니다.
          endAdornment={
            // endAdornment를 직접 OutlinedInput의 prop으로 전달
            <InputAdornment position="end">
              <IconButton
                onClick={handleSearch}
                sx={{ p: "10px" }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          // ★ OutlinedInput 내부의 루트 엘리먼트에 스타일을 직접 적용합니다.
          sx={{
            borderRadius: 2,
            backgroundColor: "background.paper",
          }}
        />
      </FormControl>
    </Paper>
  );
};

export default SearchComponent;
