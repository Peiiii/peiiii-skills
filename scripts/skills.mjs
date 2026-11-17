#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';

const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const relative = value => typeof value === 'string' && value.length > 0 && !path.isAbsolute(value) && !value.includes('\\') && value.split('/').every(part => part && part !== '.' && part !== '..');
const optionalJSON = async file => {try {return JSON.parse(await fs.readFile(file, 'utf8'));} catch (error) {if (error.code === 'ENOENT') return {}; throw error;}};
const exists = async file => {try {return await fs.lstat(file);} catch (error) {if (error.code === 'ENOENT') return null; throw error;}};

export class SkillRegistry {
  constructor(root = defaultRoot, {projectsRoot = process.env.SKILL_PROJECTS_ROOT || path.join(os.homedir(), 'Projects'), installRoot = process.env.SKILL_INSTALL_ROOT || path.join(os.homedir(), '.codex/skills')} = {}) {
    this.root = root; this.projectsRoot = projectsRoot; this.installRoot = installRoot;
  }
  load = async () => {
    this.data = JSON.parse(await fs.readFile(path.join(this.root, 'registry.json'), 'utf8'));
    this.local = await optionalJSON(path.join(this.root, 'registry.local.json'));
    const data = this.data;
    if (data.version !== 1 || !Array.isArray(data.skills) || !data.repositories || typeof data.repositories !== 'object') throw Error('Invalid registry schema');
    const ids = new Set();
    for (const [id, repository] of Object.entries(data.repositories)) {
      if (!slug.test(id) || !['public','private'].includes(repository.visibility)) throw Error(`Invalid repository: ${id}`);
      if (repository.visibility === 'public' && (!/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+$/.test(repository.url || '') || !relative(repository.checkout))) throw Error(`Invalid public repository: ${id}`);
      if (repository.visibility === 'private' && (repository.url || repository.checkout)) throw Error(`Private location belongs in registry.local.json: ${id}`);
    }
    for (const entry of data.skills) {
      if (!slug.test(entry.id) || ids.has(entry.id)) throw Error(`Invalid or duplicate ID: ${entry.id}`);
      ids.add(entry.id);
      if (!data.repositories[entry.owner] || !['hosted','project','upstream'].includes(entry.mode) || !relative(entry.path)) throw Error(`Invalid source: ${entry.id}`);
      if (entry.mode === 'hosted' && (entry.owner !== 'peiiii-skills' || entry.path !== `skills/${entry.id}`)) throw Error(`Invalid hosted owner: ${entry.id}`);
      if (entry.mode !== 'hosted' && entry.owner === 'peiiii-skills') throw Error(`Invalid external owner: ${entry.id}`);
      if (entry.mode === 'upstream' && !entry.upstream) throw Error(`Missing upstream: ${entry.id}`);
    }
    for (const resource of data.resources || []) if (!slug.test(resource.id) || !relative(resource.checkout) || !/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+$/.test(resource.url || '')) throw Error('Invalid resource');
    return this;
  };
  get = id => {const entry = this.data.skills.find(entry => entry.id === id); if (!entry) throw Error(`Unknown skill: ${id}`); return entry;};
  resolve = id => {
    const entry = this.get(id), repository = this.data.repositories[entry.owner];
    const binding = this.local.repositories?.[entry.owner];
    const ownerRoot = entry.owner === 'peiiii-skills' ? this.root : binding?.path || (repository.checkout ? path.join(this.projectsRoot, repository.checkout) : null);
    if (!ownerRoot || !path.isAbsolute(ownerRoot)) throw Error(`Bind ${entry.owner} in registry.local.json before local maintenance`);
    return {...entry, repository: binding?.url || repository.url || null, ownerRoot, source: path.join(ownerRoot, entry.path), globalEntry: path.join(this.installRoot, entry.id), writable: entry.mode !== 'upstream'};
  };
  resource = id => {
    const item = (this.data.resources || []).find(item => item.id === id);
    if (!item) throw Error(`Unknown resource: ${id}`);
    return {...item, source: path.join(this.projectsRoot,item.checkout)};
  };
  check = async () => {
    for (const entry of this.data.skills.filter(entry => entry.mode === 'hosted')) {
      const file = path.join(this.root, entry.path, 'SKILL.md');
      const text = await fs.readFile(file, 'utf8');
      if (!text.startsWith('---\n') || !text.includes(`name: ${entry.id}\n`) || !/^description: .+/m.test(text)) throw Error(`Invalid hosted frontmatter: ${entry.id}`);
    }
    const files = await fs.readdir(path.join(this.root, 'skills'), {withFileTypes:true});
    for (const entry of files) if (!entry.isDirectory() || !this.data.skills.some(item => item.mode === 'hosted' && item.id === entry.name)) throw Error(`Unregistered hosted directory: ${entry.name}`);
    return {skills:this.data.skills.length, hosted:this.data.skills.filter(entry => entry.mode === 'hosted').length, external:this.data.skills.filter(entry => entry.mode !== 'hosted').length};
  };
  planInstall = async (ids, replaceLink = false) => {
    const plan = [];
    for (const id of ids) {
      const item = this.resolve(id);
      await fs.access(path.join(item.source, 'SKILL.md'));
      const current = await exists(item.globalEntry);
      if (current && !current.isSymbolicLink()) throw Error(`Refusing to overwrite non-symlink: ${item.globalEntry}`);
      const same = current && await fs.realpath(item.globalEntry).catch(() => null) === await fs.realpath(item.source);
      if (current && !same && !replaceLink) throw Error(`Different existing link; inspect then use --replace-link: ${id}`);
      plan.push({...item, action:same ? 'unchanged' : current ? 'replace-link' : 'link'});
    }
    return plan;
  };
  install = async (ids, {replaceLink = false} = {}) => {
    const plan = await this.planInstall(ids, replaceLink); // Preflight all targets before any mutation.
    await fs.mkdir(this.installRoot, {recursive:true});
    for (const item of plan) {
      if (item.action === 'unchanged') continue;
      const temporary = `${item.globalEntry}.tmp-${process.pid}`;
      try {await fs.symlink(item.source, temporary, 'dir'); await fs.rename(temporary, item.globalEntry);}
      finally {await fs.unlink(temporary).catch(error => {if (error.code !== 'ENOENT') throw error;});}
    }
    return plan.map(({id,action}) => ({id,action}));
  };
  doctor = async () => {
    const results = [];
    for (const entry of this.data.skills) {
      try {
        const item = this.resolve(entry.id);
        await fs.access(path.join(item.source, 'SKILL.md'));
        const link = await fs.lstat(item.globalEntry);
        const matches = link.isSymbolicLink() && await fs.realpath(item.globalEntry) === await fs.realpath(item.source);
        results.push({id:entry.id, status:matches?'ok':'different-install'});
      } catch (error) {results.push({id:entry.id,status:'unavailable',reason:error.message});}
    }
    return results;
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const registry = await new SkillRegistry().load();
    const [command = 'list', id, ...flags] = process.argv.slice(2);
    if (command === 'list') console.log(registry.data.skills.map(({id,owner,mode}) => `${id}\t${mode}\t${owner}`).join('\n'));
    else if (command === 'resolve' && id) console.log(JSON.stringify(registry.resolve(id), null, 2));
    else if (command === 'resource' && id) console.log(JSON.stringify(registry.resource(id),null,2));
    else if (command === 'check') console.log(JSON.stringify(await registry.check()));
    else if (command === 'install' && id) console.log(JSON.stringify(await registry.install(id === '--all' ? registry.data.skills.map(entry => entry.id) : [id], {replaceLink:flags.includes('--replace-link')}), null, 2));
    else if (command === 'doctor') {const results = await registry.doctor(); console.log(JSON.stringify(results,null,2)); if (results.some(result => result.status !== 'ok')) process.exitCode = 1;}
    else throw Error('Usage: skills.mjs list | resolve <id> | resource <id> | check | doctor | install <id|--all> [--replace-link]');
  } catch (error) {console.error(error.message); process.exitCode = 1;}
}
