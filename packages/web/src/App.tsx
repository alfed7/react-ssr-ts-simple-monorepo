import type { FC } from "react";
import { ThemeProvider, css } from "@emotion/react";
import { theme } from "./theme";

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div
        css={css`
          color: green;
          padding: 32px;
          background-color: hotpink;
          font-size: 24px;
          border-radius: 4px;
          &:hover {
            color: red;
          }
        `}
      >
        <h1>React and TypeScript App with Emotion test!</h1>
      </div>
    </ThemeProvider>
  );
};

export default App;
