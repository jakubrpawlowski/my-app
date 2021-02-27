import Head from "next/head";
import { CSSProperties, PropsWithChildren, useEffect, useRef } from "react";

interface ScrollViewProps {
  initialScrollNormalized: number;
  setScrollNormalized: (value: number) => void;
}

// This component only SETS scrollNormalized
// It keeps the value it last set in a ref to avoid infinite loop when resizing
export const ScrollView = (props: PropsWithChildren<ScrollViewProps>) => {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const { initialScrollNormalized, setScrollNormalized } = props;
  const scrollNormalizedRef = useRef<number>(initialScrollNormalized);

  useEffect(() => {
    // https://stackoverflow.com/questions/49675898/programmatically-scroll-with-non-integral-scale-values
    // Display scale messes with scrollTop.
    // Temp solution:
    // A. Check if scroll is less than 2 or more than max-2
    // B. Scroll to 5 or max-5 when needed
    const handleScroll = () => {
      if (scrollableRef.current) {
        const clientHeight = scrollableRef.current.clientHeight;
        const scrollHeight = scrollableRef.current.scrollHeight;
        const scrollMax = scrollHeight - clientHeight;
        const scrollTop = scrollableRef.current.scrollTop;

        if (scrollTop >= scrollMax - 2) {
          scrollableRef.current.scrollTop = 5;
        } else if (scrollTop < 2) {
          scrollableRef.current.scrollTop = scrollMax - 5;
        }

        scrollNormalizedRef.current =
          scrollableRef.current.scrollTop / scrollMax;
        setScrollNormalized(scrollNormalizedRef.current);
      }
    };

    const handleResize = () => {
      if (scrollableRef.current) {
        const clientHeight = scrollableRef.current.clientHeight;
        const scrollHeight = scrollableRef.current.scrollHeight;
        const scrollMax = scrollHeight - clientHeight;
        scrollableRef.current.scrollTop =
          scrollNormalizedRef.current * scrollMax;
      }
    };

    if (scrollableRef.current) {
      const clientHeight = scrollableRef.current.clientHeight;
      const scrollHeight = scrollableRef.current.scrollHeight;
      const scrollMax = scrollHeight - clientHeight;
      scrollableRef.current.scrollTop = initialScrollNormalized * scrollMax;

      scrollableRef.current.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }
    window.addEventListener("resize", handleResize);

    return () => {
      if (scrollableRef.current) {
        scrollableRef.current.removeEventListener("scroll", handleScroll);
      }

      window.removeEventListener("resize", handleResize);
    };
  }, [setScrollNormalized]);

  return (
    <div ref={scrollableRef} style={styles.scrollable}>
      <Head>
        <style>{body}</style>
      </Head>
      {props.children}
    </div>
  );
};

const styles: {
  scrollable: CSSProperties;
} = {
  scrollable: {
    height: "100%",
    overflow: "auto",
  },
};

const body = `
html, body, #__next {
  height: 100%;
  overflow: hidden;
}
`;
