import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=f93d908946e0055b641a4c731a2d3110&autoload=false';
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          var options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 5,
          };

          map.current = new window.kakao.maps.Map(mapRef.current, options);
        }
      });
    };
    return () => script.remove();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          map.current.setCenter(
            new window.kakao.maps.LatLng(33.450701, 126.570667)
          );
        }}
      >
        카카오
      </button>
      <button
        onClick={() => {
          map.current.setCenter(
            new window.kakao.maps.LatLng(35.1595454, 126.8526012)
          );
        }}
      >
        광주
      </button>
      <button
        onClick={() => {
          map.current.setMapTypeId(window.kakao.maps.MapTypeId.HYBRID);
        }}
      >
        지도 타입변경
      </button>
      <input
        type="range"
        min="1"
        max="20"
        onChange={(v) => {
          map.current.setLevel(v.currentTarget.value, { animate: true });
        }}
      />
      <div ref={mapRef} style={{ width: 300, height: 300 }}></div>
    </div>
  );
}

export default App;
