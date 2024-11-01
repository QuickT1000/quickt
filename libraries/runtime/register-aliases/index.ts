import moduleAlias from 'module-alias';
import aliases from './aliases.json';

Object.keys(aliases).forEach(alias => moduleAlias.addAlias(alias, `${module.parent.path}/${aliases[alias]}`));
