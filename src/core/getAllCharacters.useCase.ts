import type { AllCharactersData } from "@/interfaces";
import { isPositiveInteger } from "@/helpers";
import { charactersMapper } from "@/mappers";

interface Props {
  page?: number | string;
}

const API_URL = process.env.NEXT_PUBLIC_RICK_AND_MORTY_API;

export const getAllCharactersUseCase = async ({
  page,
}: Props): Promise<AllCharactersData> => {
  try {
    const isValidPage = isPositiveInteger(page as string);
    const urlParams = new URLSearchParams();
    if (isValidPage) urlParams.append("page", page as string);

    const resp = await fetch(`${API_URL}/character?${urlParams.toString()}`, {
      next: { revalidate: 3600 },
    });

    if (!resp.ok) throw new Error(`Error on service ==> ${resp.url}`);

    const data: AllCharactersData = await resp.json();
    return charactersMapper(data);
  } catch (error) {
    console.log("Error on getAllCharactersUseCase =>", error);
    throw new Error("Something went wrong");
  }
};
