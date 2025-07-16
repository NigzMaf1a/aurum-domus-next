import Unit from '../interfaces/unit';

function returnUnitNames(mockUnits: Unit[]): string[] {
  return mockUnits.map((unit) => unit.UnitName);
}

export { returnUnitNames};