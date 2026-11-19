const starClip =
  "polygon(6px 0,4.31px 3.98px,0 4.34px,3.28px 7.18px,2.29px 11.4px,6px 9.16px,9.71px 11.4px,8.72px 7.18px,12px 4.34px,7.69px 3.98px,6px 0,20px 0,18.31px 3.98px,14px 4.34px,17.28px 7.18px,16.29px 11.4px,20px 9.16px,23.71px 11.4px,22.72px 7.18px,26px 4.34px,21.69px 3.98px,20px 0,34px 0,32.31px 3.98px,28px 4.34px,31.28px 7.18px,30.29px 11.4px,34px 9.16px,37.71px 11.4px,36.72px 7.18px,40px 4.34px,35.69px 3.98px,34px 0,48px 0,46.31px 3.98px,42px 4.34px,45.28px 7.18px,44.29px 11.4px,48px 9.16px,51.71px 11.4px,50.72px 7.18px,54px 4.34px,49.69px 3.98px,48px 0,62px 0,60.31px 3.98px,56px 4.34px,59.28px 7.18px,58.29px 11.4px,62px 9.16px,65.71px 11.4px,64.72px 7.18px,68px 4.34px,63.69px 3.98px,62px 0)";

const styles = {
  card: {
    boxSizing: "border-box" as const,
    display: "inline-block",
    background: "#fff",
    color: "#16171a",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: 400,
    paddingBottom: 18,
    paddingTop: 18,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 0,
    border: "1px solid #e0e0e0",
    fontSynthesis: "none" as const,
  },
  title: {
    margin: 0,
    color: "#16171a",
    fontSize: 21,
    lineHeight: "26px",
    fontWeight: 600,
  },
  row: {
    display: "flex",
    alignItems: "baseline",
    marginTop: 4,
    color: "#656773",
    fontSize: 14,
    lineHeight: "18px",
    whiteSpace: "nowrap" as const,
  },
  score: {
    marginRight: 5,
  },
  stars: {
    display: "block",
    width: 68,
    height: 11.4,
    flexShrink: 0,
    alignSelf: "center",
    color: "#fbbc04",
    background: "linear-gradient(to right, currentcolor 70px, #dadbe5 0)",
    clipPath: starClip,
  },
  reviews: {
    marginLeft: 5,
    color: "#1a0dab",
    textDecoration: "none",
  },
  info: {
    display: "block",
    width: 16,
    height: 16,
    marginLeft: 12,
    alignSelf: "center",
    color: "#656773",
    flexShrink: 0,
  },
  infoIcon: {
    display: "block",
    width: 16,
    height: 16,
    fill: "currentColor",
  },
  subtitle: {
    display: "block",
    marginTop: 10,
    color: "#656773",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
  },
} as const;

export default function GoogleReviewWidget() {
  return (
    <div aria-label="BunkerDigital business profile" style={styles.card}>
      <div style={styles.title} role="heading" aria-level={2}>
        BunkerDigital
      </div>
      <div style={styles.row}>
        <span aria-hidden="true" style={styles.score}>
          5.0
        </span>
        <span aria-label="Rated 5.0 out of 5" role="img" style={styles.stars} />
        <span style={styles.reviews}>26 Google reviews</span>
        {/* <span aria-label="More info" role="img" style={styles.info}>
          <svg
            viewBox="0 -960 960 960"
            aria-hidden="true"
            style={styles.infoIcon}
          >
            <path d="M440-280h80V-520H440v240Zm68.5-331.5Q520-623 520-640t-11.5-28.5T480-680t-28.5 11.5T440-640t11.5 28.5T480-600t28.5-11.5ZM480-80q-83 0-156-31.5T197-197T111.5-324T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480T848.5-324T763-197T636-111.5T480-80Zm0-80q134 0 227-93t93-227T707-707T480-800T253-707T160-480t93 227 227 93Zm0-320Z" />
          </svg>
        </span> */}
      </div>
      <span style={styles.subtitle}>Web designer in United Kingdom</span>
    </div>
  );
}
