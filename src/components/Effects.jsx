/** Full-screen VHS atmosphere: film grain, scanlines, rolling scan bar, vignette. */
export default function Effects() {
  return (
    <>
      <div className="fx fx-grain" aria-hidden="true" />
      <div className="fx fx-scan" aria-hidden="true" />
      <div className="fx fx-scanbar" aria-hidden="true" />
      <div className="fx fx-vignette" aria-hidden="true" />
    </>
  );
}
