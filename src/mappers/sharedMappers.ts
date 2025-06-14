export const idsMapper = (longIds: string[]) =>
  longIds.map((longId: string) => longId.split("/").at(-1)) as string[];
