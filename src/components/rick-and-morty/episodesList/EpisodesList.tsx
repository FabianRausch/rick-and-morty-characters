import type { SingleEpisode } from "@/interfaces";
import { EpisodeItem } from "../episodeItem/EpisodeItem";

interface Props {
  title: string;
  description: string;
  episodes: SingleEpisode[];
}
export const EpisodeList = ({ title, description, episodes }: Props) => {
  return (
    <div className="flex flex-col  border rounded-xl p-4 text-center ">
      <p className=" font-extrabold mb-4">{title}</p>
      <h2 className="text-xl font-extrabold mb-4">{description}</h2>
      <div className="flex flex-col p-4 items-start gap-2">
        {episodes.length === 0 ? (
          <p>There are not shared episodes try other combination</p>
        ) : (
          episodes.map((episode) => (
            <EpisodeItem key={episode.id} {...episode} />
          ))
        )}
      </div>
    </div>
  );
};
