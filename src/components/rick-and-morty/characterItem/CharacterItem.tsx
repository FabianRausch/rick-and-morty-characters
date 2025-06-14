/* eslint-disable @next/next/no-img-element */

interface Props {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  isSelected: boolean;
  onSelect: (selectedId: number) => void;
}

export const CharacterItem = ({
  id,
  name,
  status,
  species,
  image,
  isSelected,
  onSelect,
}: Props) => {
  return (
    <div
      onClick={() => !isSelected && onSelect(id)}
      className={`flex flex-wrap w-full rounded-xl border p-2 justify-evenly h-fit ${
        isSelected ? "shadow opacity-50" : "cursor-pointer hover:bg-gray-500"
      }`}
    >
      <img src={image} className="h-20 max-w-20 rounded-full pr-2" alt={name} />
      <div className="text-center">
        <h2 className="font-extrabold  m-2">{name}</h2>
        <div className="flex flex-row gap-2">
          <div className="background-[--foreground] border rounded-xl px-2">
            <p className="font-extrabold color-[--background] p-0">{status}</p>
          </div>
          -<p>{species}</p>
        </div>
      </div>
    </div>
  );
};
