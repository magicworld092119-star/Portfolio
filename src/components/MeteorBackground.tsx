import * as THREE from "three";
import React, { useEffect, useRef } from "react";

const MeteorBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // 🌌 Background Stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 400;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 100;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.015 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // ☄️ Meteors / Rockets
    const meteorGroup = new THREE.Group();
    scene.add(meteorGroup);

    // Shared geometry & material for meteors to avoid continuous memory allocation
    const meteorGeometry = new THREE.SphereGeometry(0.07, 16, 16);
    const meteorMaterial = new THREE.MeshBasicMaterial({ color: 0xffd966 });

    const createMeteor = () => {
      const meteor = new THREE.Mesh(meteorGeometry, meteorMaterial);

      // Glow effect (light around the meteor)
      const glow = new THREE.PointLight(0xffaa33, 2, 5);
      glow.position.copy(meteor.position);
      meteor.add(glow);

      // High starting position so it travels long
      meteor.position.set(
        Math.random() * 8 - 4,  // X spread
        Math.random() * 6 + 3,  // Y start high
        Math.random() * -3
      );

      // Slow velocity for visible movement
      meteor.userData.velocity = new THREE.Vector3(
        -0.15 - Math.random() * 0.001, // slow horizontal drift
        -0.10 - Math.random() * 0.1,  // slow vertical fall
        0
      );

      // Long lifetime
      meteor.userData.life = 4.5 + Math.random() * 2;
      meteorGroup.add(meteor);
    };

    const clock = new THREE.Clock();
    let spawnTimer = 0;
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      spawnTimer += delta;

      // Spawn less frequently, slower objects stay visible longer
      if (spawnTimer > 0.8) {
        createMeteor();
        spawnTimer = 0;
      }

      for (let i = meteorGroup.children.length - 1; i >= 0; i--) {
        const meteor = meteorGroup.children[i] as THREE.Mesh;
        meteor.position.add(meteor.userData.velocity);
        meteor.userData.life -= delta;

        if (meteor.userData.life <= 0) {
          meteor.traverse((child) => {
            if (child instanceof THREE.Light) {
              child.dispose();
            }
          });
          meteorGroup.remove(meteor);
        }
      }

      stars.rotation.y += 0.0006;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      // Clean up meteors
      meteorGroup.children.forEach((child) => {
        child.traverse((obj) => {
          if (obj instanceof THREE.Light) obj.dispose();
        });
      });
      meteorGroup.clear();

      meteorGeometry.dispose();
      meteorMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();

      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full -z-20"
      style={{ position: "absolute", top: 0, left: 0 }}
    />
  );
};

export default MeteorBackground;
