type Territory = {
  id: string;
  name: string;
  parent: string | null;
};

type SubTerritory = {
  id: string;
  name: string;
  territory: Territory[];
};

type GroupTerritory = {
  id: string;
  parent: string | null;
  name: string;
  subTerritory: {
    name: string;
    id: string;
    subTerritory: SubTerritory[];
  }[];
};

type LoginInputs = {
  username: string;
  password: string;
};
