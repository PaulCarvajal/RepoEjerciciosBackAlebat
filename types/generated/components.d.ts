import type { Schema, Struct } from '@strapi/strapi';

export interface DetailsDetailsClass extends Struct.ComponentSchema {
  collectionName: 'components_details_details_classes';
  info: {
    displayName: 'Details_Class';
  };
  attributes: {
    Additional_Details: Schema.Attribute.Component<'details.site', false> &
      Schema.Attribute.Required;
  };
}

export interface DetailsSite extends Struct.ComponentSchema {
  collectionName: 'components_details_sites';
  info: {
    description: '';
    displayName: 'Site';
    icon: 'dashboard';
  };
  attributes: {
    Date: Schema.Attribute.Date & Schema.Attribute.Required;
    Hour: Schema.Attribute.Time & Schema.Attribute.Required;
    Site: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MaterialsStudyMaterials extends Struct.ComponentSchema {
  collectionName: 'components_materials_study_materials';
  info: {
    description: '';
    displayName: 'Study_materials';
    icon: 'pencil';
  };
  attributes: {
    Audio: Schema.Attribute.Media<'audios'>;
    Image: Schema.Attribute.Media<'images'>;
    Video: Schema.Attribute.Media<'videos'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'details.details-class': DetailsDetailsClass;
      'details.site': DetailsSite;
      'materials.study-materials': MaterialsStudyMaterials;
    }
  }
}
