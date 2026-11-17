import React from 'react';
import { GarmentModel, GarmentModelProps, DecalLayer, GarmentType } from './GarmentModel';

export type { DecalLayer, GarmentType };

export const PoloShirtModel: React.FC<GarmentModelProps> = (props) => {
  return <GarmentModel garmentType="polo" {...props} />;
};

export default PoloShirtModel;
