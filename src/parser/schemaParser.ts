import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export function parseSchema(validationMetadata?: any): any {
    const schemas = validationMetadatasToSchemas(validationMetadata); 

    return schemas;
}
  