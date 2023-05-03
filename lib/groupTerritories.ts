export const groupTerritories = (data: Territory[]) => {
  const groupedRegions: GroupTerritory[] = [];

  for (const region of data) {
    if (region.parent === null) {
      groupedRegions.push({
        parent: region.parent,
        subTerritory: [],
        name: region.name,
        id: region.id,
      });
    } else {
      const parentIndex = groupedRegions.findIndex(
        (groupedRegion) => groupedRegion.id === region.parent
      );
      if (parentIndex !== -1) {
        groupedRegions[parentIndex].subTerritory.push({
          name: region.name,
          id: region.id,
          subTerritory: [],
        });
      } else {
        const subTerritoryIndex = groupedRegions.map((groupedRegion) =>
          groupedRegion.subTerritory.findIndex(
            (subTerritory) => subTerritory.id === region.parent
          )
        );
        const subTerritoryParentIndex = subTerritoryIndex.findIndex(
          (index) => index !== -1
        );
        if (subTerritoryParentIndex !== -1) {
          groupedRegions[subTerritoryParentIndex].subTerritory[
            subTerritoryIndex[subTerritoryParentIndex]
          ].subTerritory.push({
            id: region.id,
            name: region.name,
            territory: [],
          });
        }
      }
    }
  }

  return groupedRegions;
};
