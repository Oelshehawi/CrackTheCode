import { play } from '../fonts';

export const TitleHeader = () => {
  return (
    <div
      className={`bg-white text-blue rounded p-4 text-4xl md:text-6xl font-bold ${play.className} border-2 border-gray-800 shadow-md animate-swing`}
    >
      Crack The Code!
    </div>
  );
};
