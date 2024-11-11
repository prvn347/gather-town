import { useEffect } from "react";

export function GameComponent({ config }) {
  useEffect(() => {
    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  });
  return <div id="phaser-container " />;
}
