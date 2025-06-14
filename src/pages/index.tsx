import { useCharactersContext } from "@/contexts/CharactersContext";
import { getAllCharactersUseCase } from "@/core";
import { AllCharactersData } from "@/interfaces";
import { RickAndMorty } from "@/templates";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";

export const getServerSideProps = (async () => {
  try {
    const data = await getAllCharactersUseCase({});
    return { props: { data } };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
}) satisfies GetServerSideProps<{
  data: AllCharactersData;
}>;

export default function Page({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { setAllCharactersData } = useCharactersContext();
  useEffect(() => {
    setAllCharactersData(data);
  }, []);
  return (
    <main className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-extrabold p-4">
        Rick and Morty - Characters
      </h2>
      <RickAndMorty />
    </main>
  );
}
