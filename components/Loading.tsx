import { CSSProperties, memo } from "react";

export const Loading = memo(() => <p style={styles.p}>LOADING...</p>);

const styles: {
  p: CSSProperties;
} = {
  p: {
    // Margin has to be reset to prevent scrolling when loading gets unmounted
    margin: 0,
  },
};
