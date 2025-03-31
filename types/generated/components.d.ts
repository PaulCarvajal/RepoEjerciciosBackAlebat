import type { Schema, Struct } from '@strapi/strapi';

export interface DetailsDetailsClass extends Struct.ComponentSchema {
  collectionName: 'components_details_details_classes';
  info: {
    description: '';
    displayName: 'Details_Class';
  };
  attributes: {
    classroom: Schema.Attribute.String & Schema.Attribute.Required;
    schedule: Schema.Attribute.Time;
  };
}

export interface DetailsDetailsTeacher extends Struct.ComponentSchema {
  collectionName: 'components_details_details_teachers';
  info: {
    description: '';
    displayName: 'Details_Teacher';
  };
  attributes: {
    especialidad: Schema.Attribute.String & Schema.Attribute.Required;
    experienceK: Schema.Attribute.RichText;
    experiencia: Schema.Attribute.String;
  };
}

export interface DetailsSite extends Struct.ComponentSchema {
  collectionName: 'components_details_sites';
  info: {
    description: '';
    displayName: 'Details_Event';
    icon: 'dashboard';
  };
  attributes: {
    Date: Schema.Attribute.Date & Schema.Attribute.Required;
    Hour: Schema.Attribute.Time & Schema.Attribute.Required;
    Site: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface EventThemesSubTheme extends Struct.ComponentSchema {
  collectionName: 'components_event_themes_sub_themes';
  info: {
    displayName: 'Sub-theme';
    icon: 'feather';
  };
  attributes: {
    Title: Schema.Attribute.String;
  };
}

export interface EventThemesTheme extends Struct.ComponentSchema {
  collectionName: 'components_event_themes_themes';
  info: {
    description: '';
    displayName: 'Theme';
    icon: 'brush';
  };
  attributes: {
    Sub_theme: Schema.Attribute.Component<'event-themes.sub-theme', true> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ImageGalleryImages extends Struct.ComponentSchema {
  collectionName: 'components_image_gallery_images';
  info: {
    displayName: 'Images';
    icon: 'chartPie';
  };
  attributes: {
    Media: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface LinksListOfLinks extends Struct.ComponentSchema {
  collectionName: 'components_links_list_of_links';
  info: {
    displayName: 'List_of_Links';
  };
  attributes: {
    Title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    Url: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface NewComponentComponentNew extends Struct.ComponentSchema {
  collectionName: 'components_new_component_component_news';
  info: {
    displayName: 'ComponentNew';
    icon: 'archive';
  };
  attributes: {
    Content: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'details.details-class': DetailsDetailsClass;
      'details.details-teacher': DetailsDetailsTeacher;
      'details.site': DetailsSite;
      'event-themes.sub-theme': EventThemesSubTheme;
      'event-themes.theme': EventThemesTheme;
      'image-gallery.images': ImageGalleryImages;
      'links.list-of-links': LinksListOfLinks;
      'materials.study-materials': MaterialsStudyMaterials;
      'new-component.component-new': NewComponentComponentNew;
    }
  }
}
