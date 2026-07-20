export type Styles = {
  scoreBg: string;
  scoreCircle: string;
  scoreCircleContainer: string;
  scoreProgress: string;
  scoreText: string;
  scoreTrack: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
