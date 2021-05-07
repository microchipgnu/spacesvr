import { ReactNode, useMemo, useRef } from "react";
import { useWorld } from "../core/contexts/world";
import { Group, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useLimiter } from "../services/limiter";

type ScaledProps = {
  children: ReactNode | ReactNode[];
  level: number;
};

export function Scaled(props: ScaledProps) {
  const { children, level } = props;

  const { level: curLevel } = useWorld();
  const group = useRef<Group>();

  const limiter = useLimiter(50);
  const targetScale = useMemo(() => getScale(curLevel, level), [
    level,
    curLevel,
  ]);

  useFrame(({ clock }) => {
    if (!limiter.isReady(clock) || !group.current) return;

    if (group.current.scale !== targetScale) {
      group.current.scale.lerp(targetScale, 0.1);
    }
  });

  return (
    <group name="modifier-scaled" ref={group}>
      {children}
    </group>
  );
}

function getScale(curLevel: number, level: number): Vector3 {
  const diff = level - curLevel;

  if (diff == 0) return new Vector3(1, 1, 1);

  const size = 3;
  return new Vector3(diff * size, diff * size, diff * size);
}
