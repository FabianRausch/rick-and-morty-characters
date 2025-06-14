interface Props {
  id: number;
  name: string;
  air_date: string;
}

export const EpisodeItem = ({ id, name, air_date }: Props) => {
  return (
    <div className="flex flex-row gap-4">
      <p>{id}</p>-<p>{name}</p>-<p>{air_date}</p>
    </div>
  );
};
