export class CatalogModel {
  constructor(id, name, description, createdAt = null, updatedAt = null) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
