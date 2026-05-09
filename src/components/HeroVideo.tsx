export default function HeroVideo() {
  return (
    <>
      {/* Pexels video background by Rostislav Uzunov */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      >
        <source
          src="https://videos.pexels.com/video-files/30767274/13161042_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark gradient overlay - top for text readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '35%',
          background: 'linear-gradient(180deg, rgba(5,5,15,0.85) 0%, rgba(5,5,15,0.4) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Dark gradient overlay - bottom for text readability */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '45%',
          background: 'linear-gradient(180deg, rgba(5,5,15,0.2) 0%, rgba(5,5,15,0.95) 100%)',
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
