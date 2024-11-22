import { useEffect, useRef } from "react";
import * as THREE from "three";

const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  
  varying vec2 vUv;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
    return -1.0 + 2.0 * fract(sin(p)*43758.5453123);
  }

  float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    
    vec2 i = floor(p + (p.x + p.y)*K1);
    vec2 a = p - i + (i.x + i.y)*K2;
    vec2 o = (a.x > a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0*K2;
    
    vec3 h = max(0.5 - vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
    vec3 n = h*h*h*h * vec3(dot(a,hash2(i+0.0)), dot(b,hash2(i+o)), dot(c,hash2(i+1.0)));
    
    return dot(n, vec3(70.0));
  }

  float metaball(vec2 p, vec2 center, float radius, float softness) {
    // Add slight pulsing to make the size variation more dynamic
    float r = radius * (0.95 + 0.1 * sin(time * 0.8 + dot(center, vec2(1.0))));
    float dist = length(p - center);
    return pow(r / dist, softness);
  }

  vec3 gradient(float t) {
    vec3 a = vec3(0.05, 0.1, 0.15);
    vec3 b = vec3(0.2, 0.3, 0.4);
    vec3 c = vec3(0.25, 0.35, 0.45);
    vec3 d = vec3(0.1, 0.2, 0.3);
    
    return a + b*cos( 6.28318*(c*t+d) );
  }

  vec2 orbit(float t, vec2 center, vec2 size, float speed, float offset) {
    // Calculate base position
    vec2 pos = center + size * vec2(
      sin(t * speed + offset),
      cos(t * speed * 1.3 + offset * 2.1)
    );
    
    // Define boundaries
    float maxX = 1.6;
    float maxY = 1.2;
    
    // Bounce effect by reflecting the sine/cosine wave
    pos.x = maxX * sin(asin(clamp(pos.x / maxX, -1.0, 1.0)));
    pos.y = maxY * sin(asin(clamp(pos.y / maxY, -1.0, 1.0)));
    
    return pos;
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    
    float slowTime = time * 0.15;

    float screenWidth = 1.2;
    float screenHeight = 0.9;
    
    // Create movement paths with constrained boundaries
    vec2 center1 = orbit(
      slowTime,
      vec2(0.0),
      vec2(screenWidth, screenHeight),
      0.3,
      0.0
    );
    
    vec2 center2 = orbit(
      slowTime,
      vec2(0.0),
      vec2(screenWidth, screenHeight),
      0.25,
      2.0
    );
    
    vec2 center3 = orbit(
      slowTime,
      vec2(0.0),
      vec2(screenWidth, screenHeight),
      0.2,
      4.0
    );
    
    vec2 center4 = orbit(
      slowTime,
      vec2(0.0),
      vec2(screenWidth, screenHeight),
      0.15,
      6.0
    );

    vec2 noise1 = vec2(
      noise(vec2(slowTime * 0.3)) * 0.15,
      noise(vec2(slowTime * 0.4)) * 0.15
    );
    vec2 noise2 = vec2(
      noise(vec2(slowTime * 0.5)) * 0.15,
      noise(vec2(slowTime * 0.6)) * 0.15
    );
    vec2 noise3 = vec2(
      noise(vec2(slowTime * 0.7)) * 0.15,
      noise(vec2(slowTime * 0.8)) * 0.15
    );
    vec2 noise4 = vec2(
      noise(vec2(slowTime * 0.9)) * 0.15,
      noise(vec2(slowTime * 1.0)) * 0.15
    );

    center1 += clamp(noise1, vec2(-0.2), vec2(0.2));
    center2 += clamp(noise2, vec2(-0.2), vec2(0.2));
    center3 += clamp(noise3, vec2(-0.2), vec2(0.2));
    center4 += clamp(noise4, vec2(-0.2), vec2(0.2));

    float field = 0.0;
    // Different sizes for each metaball
    field += metaball(uv, center1, 0.28, 1.6);  // Large
    field += metaball(uv, center2, 0.24, 1.6);  // Medium-large
    field += metaball(uv, center3, 0.22, 1.6);  // Medium
    field += metaball(uv, center4, 0.20, 1.6);  // Smaller

    float edge = smoothstep(0.95, 1.05, field);
    float innerGlow = smoothstep(1.05, 2.0, field);

    vec3 baseColor = vec3(0.02, 0.03, 0.05);
    vec3 blobColor = gradient(edge + time * 0.05);
    vec3 glowColor = vec3(0.2, 0.3, 0.4);

    vec3 color = mix(baseColor, blobColor, edge * 0.8);
    color += glowColor * innerGlow * 0.3;

    float noisePattern = noise(uv * 6.0 + time * 0.05) * 0.02;
    color += noisePattern * edge;

    float vignette = smoothstep(1.8, 0.5, length(uv + noise(uv * 1.5) * 0.05));
    color *= vignette;

    color = pow(color, vec3(0.9));
    color *= 1.2;

    gl_FragColor = vec4(color, 0.95);
  }
`;

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 1;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
      transparent: true,
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const clock = new THREE.Clock();

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      material.uniforms.time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.resolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // Change from fixed to absolute positioning
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default HeroBackground;
