import { render } from "@testing-library/react";
import Component, { getServerSideProps } from "..";
import { mappedCharactersApiResponse } from "@/__mocks__";

jest.mock("@/core", () => ({
  getAllCharactersUseCase: jest.fn(),
}));

import { getAllCharactersUseCase } from "@/core";

const mockGetAllCharactersUseCase = getAllCharactersUseCase as jest.Mock;

describe("Test on Home page", () => {
  it("Should match with snapshot", () => {
    const { asFragment } = render(
      <Component data={mappedCharactersApiResponse} />
    );
    expect(asFragment).toMatchSnapshot();
  });
});

describe("Test on getServerSideProps Home", () => {
  beforeEach(() => {
    mockGetAllCharactersUseCase.mockClear();
  });

  it("should return initial characters data on successful fetch", async () => {
    mockGetAllCharactersUseCase.mockResolvedValueOnce(
      mappedCharactersApiResponse
    );

    const result = await getServerSideProps();
    expect(mockGetAllCharactersUseCase).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      props: {
        data: mappedCharactersApiResponse,
      },
    });
  });

  it("should return error on fetch", async () => {
    mockGetAllCharactersUseCase.mockRejectedValueOnce(
      mappedCharactersApiResponse
    );

    const result = await getServerSideProps();
    expect(mockGetAllCharactersUseCase).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      redirect: {
        destination: "/error",
        permanent: false,
      },
    });
  });
});
