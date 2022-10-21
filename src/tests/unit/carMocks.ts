export const validCarId = '63530220155073c626fe0cc8';
export const invalidCarId = 'xprot';

export const newCar = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2,
};

export const newCarInvalid = {
  model: 'Uno da Escada',
  year: 1963,
  seatsQty: 2,
  doorsQty: 2,
};

export const car = {
  doorsQty: 2,
  seatsQty: 2,
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  _id: '63530220155073c626fe0cc8',
};

export const cars = [
  {
    doorsQty: 2,
    seatsQty: 2,
    model: 'Uno da Escada',
    year: 1963,
    color: 'red',
    buyValue: 3500,
    _id: '63530220155073c626fe0cc8',
  },

  {
    doorsQty: 4,
    seatsQty: 5,
    model: 'T-Cross',
    year: 2022,
    color: 'azul',
    buyValue: 120000,
    _id: '63530527c78ad21a53520f57',
  },
];

export const updateCarRequest = {
  model: 'Uno da Balada',
  year: 1967,
}

export const updatedCar = {
  doorsQty: 2,
  seatsQty: 2,
  model: 'Uno da Balada',
  year: 1967,
  color: 'red',
  buyValue: 3500,
  _id: '63530220155073c626fe0cc8',
}