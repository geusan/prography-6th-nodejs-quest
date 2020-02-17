import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';
import pluralize from 'pluralize';
import { camelCase, snakeCase } from 'lodash';

const adapter = new FileSync(path.join(__dirname, '..', '..', 'data', 'todo-sample.json'));
const db = low(adapter);

class BaseModel {
  constructor() {
    this.attributes = {};
    this.db = db;
  }

  get savable() {
    return Object.keys(this.attributes || {}).reduce((acc, key) => ({
      ...acc,
      [snakeCase(key)]: this.attributes[key]
    }), {})
  }

  get responsable() {
    return Object.keys(this.attributes || {}).reduce((acc, key) => ({
      ...acc,
      [camelCase(key)]: this.attributes[key]
    }), {})
  }

  get modelName() {
    return pluralize(this.constructor.name.toLowerCase());
  }

  get model() {
    const model = this.db.get(this.modelName);
    return model;
  }

  static getModelName() {
    return pluralize(this.constructor.name.toLowerCase());
  }

  getLastId() {
    const items = this.findAll();
    return items.length ? items.slice(-1)[0].get(BaseModel.ID) : 0;
  }

  save() {
    let isCreate = !this.attributes.id;
    if (isCreate) {
      this.attributes.id = this.getLastId() + 1;
      this.attributes[BaseModel.CREATED_AT] = new Date();
      this.attributes[BaseModel.UPDATED_AT] = new Date();
      this.model.push(this.savable).write();
    } else {
      const index = this.model.value().findIndex((item) => item.id === this.attributes.id);
      this.attributes[BaseModel.UPDATED_AT] = new Date();
      this.model.set(`${this.modelName}[${index}]`, this.savable).write();
    }
    this.attributes = this.model.find({ id: this.attributes.id }).value();
  }

  remove() {
    this.model.remove({ id: this.attributes.id }).write();
  }

  get(key) {
    return this.attributes[key];
  }

  set(key, value) {
    this.attributes[key] = value;
  }

  static createInstance() {
    return new BaseModel();
  }
  
  find(id) {
    this.attributes = this.model.find({ id: Number(id) }).value()
    return this;
  }

  static find(id) {
    const instance = this.createInstance();
    return instance.find(id);
  }
  
  findAll(condition = () => true) {
    const items = this.model.cloneDeep().value() || [];
    const result = items.filter(condition);
    return result.map((item) => this.factory(item));
  }

  static findAll(condition) {
    const instance = this.createInstance();
    return instance.findAll(condition);
  }

  static create(attributes) {
    const instance = this.createInstance();
    instance.attributes = attributes || instance.attributes;
    return instance;
  }

  static findOrCreate(attributes) {
    const instance = this.createInstance();
    instance.attributes = attributes || instance.attributes;
    if (attributes.id) {
      instance.attributes = instance.model.find({ id: attributes.id }).value()
    }
    return instance;
  }

  toJSON() {
    return this.responsable;
  }

  static factory(attributes) {
    const instance = this.create(attributes);
    return instance;
  }
}

BaseModel.ID = 'id';
BaseModel.CREATED_AT = 'created_at';
BaseModel.UPDATED_AT = 'updated_at';

export default BaseModel;
