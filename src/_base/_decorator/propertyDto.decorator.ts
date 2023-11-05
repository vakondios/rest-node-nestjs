/*
-------------------------------------------
Decorator ONLY FOR ENTITIES @PropertyDto().
-------------------------------------------
Creates an array of the entity fields, so to compare with DTOS, incase that the user 
tries to insert a new field on the body of Create/Update DTOs, which they are not members
of the Entity Class.
*/
const properties = Symbol('properties');
export const PropertyDto = () => {
  return (obj: any, propertyName: string) => {
    (obj[properties] || (obj[properties] = [])).push(propertyName);
  };
};

// This is a function to retrieve the list of properties for a class
export function getProperties(obj: any): [] {
  return obj.prototype[properties];
}
