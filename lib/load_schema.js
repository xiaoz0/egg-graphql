'use strict';

const fs = require('fs');
const path = require('path');
const {
  makeExecutableSchema,
} = require('graphql-tools');
const _ = require('lodash');

const SYMBOL_SCHEMA = Symbol('Applicaton#schema');
const util = require('./util');

module.exports = app => {
  const basePath = path.join(app.baseDir, 'app/graphql');
  const types = util.walk(basePath, basePath);

  const schemas = [];
  const resolverMap = {};
  const directiveMap = {};
  const schemaDirectivesProps = {};
  const { defaultEmptySchema = false } = app.config.graphql;
  const defaultSchema = `
    type Query 
    type Mutation 
  `;
  if (defaultEmptySchema) {
    schemas.push(defaultSchema);
  }
  types.forEach(type => {
    // Load schema
    const schemaFile = path.join(basePath, type, 'schema.graphql');
    /* istanbul ignore else */
    if (fs.existsSync(schemaFile)) {
      const schema = fs.readFileSync(schemaFile, {
        encoding: 'utf8',
      });
      schemas.push(schema);
    }

    // Load resolver
    const resolverFile = app.loader.resolveModule(path.join(basePath, type, 'resolver'));
    if (fs.existsSync(resolverFile)) {
      const resolver = app.loader.loadFile(resolverFile);
      _.merge(resolverMap, resolver);
    }

    // Load directive resolver
    const directiveFile = app.loader.resolveModule(path.join(basePath, type, 'directive'));
    if (fs.existsSync(directiveFile)) {
      const directive = app.loader.loadFile(directiveFile);
      _.merge(directiveMap, directive);
    }

    // Load schemaDirectives
    let schemaDirectivesFile = app.loader.resolveModule(path.join(basePath, type, 'schemaDirective'));
    if (fs.existsSync(schemaDirectivesFile)) {
      schemaDirectivesFile = app.loader.loadFile(schemaDirectivesFile);
      _.merge(schemaDirectivesProps, schemaDirectivesFile);
    }
  });

  Object.defineProperty(app, 'schema', {
    get() {
      if (!this[SYMBOL_SCHEMA]) {
        this[SYMBOL_SCHEMA] = makeExecutableSchema({
          typeDefs: schemas,
          resolvers: resolverMap,
          directiveResolvers: directiveMap,
          schemaDirectives: schemaDirectivesProps,
        });
      }
      return this[SYMBOL_SCHEMA];
    },
  });
};
