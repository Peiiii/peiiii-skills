import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {SkillRegistry} from '../scripts/skills.mjs';

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(),'personal-skills-'));
  t.after(() => fs.rm(root,{recursive:true,force:true}));
  const installRoot = path.join(root,'global');
  await fs.mkdir(path.join(root,'skills/example'),{recursive:true});
  await fs.writeFile(path.join(root,'skills/example/SKILL.md'),'---\nname: example\ndescription: Example capability\n---\nOriginal');
  const data = {version:1,repositories:{'personal-skills':{visibility:'public',url:'https://github.com/Peiiii/personal-skills',checkout:'explorations/personal-skills'},project:{visibility:'private'}},skills:[{id:'example',owner:'personal-skills',mode:'hosted',path:'skills/example'}]};
  const save = async () => fs.writeFile(path.join(root,'registry.json'),JSON.stringify(data));
  await save();
  return {root,installRoot,data,save,registry:()=>new SkillRegistry(root,{installRoot})};
}
test('hosted install is idempotent and edits reach the global entry without copies',async t=>{
  const f=await fixture(t),r=await f.registry().load();
  assert.equal((await r.check()).hosted,1);
  assert.equal((await r.install(['example']))[0].action,'link');
  assert.equal((await r.install(['example']))[0].action,'unchanged');
  await fs.appendFile(path.join(f.root,'skills/example/SKILL.md'),'\nUpdated');
  assert.match(await fs.readFile(path.join(f.installRoot,'example/SKILL.md'),'utf8'),/Updated/);
  assert.equal((await r.doctor())[0].status,'ok');
});
test('invalid IDs, traversal and unknown owners cannot become installation paths',async t=>{
  const f=await fixture(t);
  for (const change of [{id:'../escape'},{path:'../escape'},{owner:'missing'}]) {
    const original={...f.data.skills[0]};Object.assign(f.data.skills[0],change);await f.save();
    await assert.rejects(f.registry().load());f.data.skills[0]=original;
  }
  f.data.skills.push({...f.data.skills[0]});await f.save();await assert.rejects(f.registry().load(),/duplicate/);
});
test('all-target preflight protects real directories and avoids partial installs',async t=>{
  const f=await fixture(t);
  f.data.skills.push({id:'blocked',owner:'personal-skills',mode:'hosted',path:'skills/blocked'});await f.save();
  await fs.mkdir(path.join(f.root,'skills/blocked'));await fs.writeFile(path.join(f.root,'skills/blocked/SKILL.md'),'source');
  await fs.mkdir(path.join(f.installRoot,'blocked'),{recursive:true});await fs.writeFile(path.join(f.installRoot,'blocked/keep'),'original');
  const r=await f.registry().load();await assert.rejects(r.install(['example','blocked'],{replaceLink:true}),/non-symlink/);
  await assert.rejects(fs.lstat(path.join(f.installRoot,'example')),/ENOENT/);
  assert.equal(await fs.readFile(path.join(f.installRoot,'blocked/keep'),'utf8'),'original');
});
test('unexpected links require explicit replacement and keep old sources untouched',async t=>{
  const f=await fixture(t);await fs.mkdir(f.installRoot);const old=path.join(f.root,'old');await fs.mkdir(old);
  await fs.writeFile(path.join(old,'keep'),'old');await fs.symlink(old,path.join(f.installRoot,'example'));
  const r=await f.registry().load();await assert.rejects(r.install(['example']),/Different existing link/);
  assert.equal((await r.install(['example'],{replaceLink:true}))[0].action,'replace-link');
  assert.equal(await fs.readFile(path.join(old,'keep'),'utf8'),'old');
});
test('private project binding resolves owner and detects missing global install',async t=>{
  const f=await fixture(t);f.data.skills.push({id:'project-skill',owner:'project',mode:'project',path:'.agents/skills/project-skill'});await f.save();
  let r=await f.registry().load();assert.throws(()=>r.resolve('project-skill'),/Bind project/);
  const owner=path.join(f.root,'owner');await fs.mkdir(path.join(owner,'.agents/skills/project-skill'),{recursive:true});await fs.writeFile(path.join(owner,'.agents/skills/project-skill/SKILL.md'),'project-owned');
  await fs.writeFile(path.join(f.root,'registry.local.json'),JSON.stringify({repositories:{project:{path:owner}}}));
  r=await f.registry().load();assert.equal(r.resolve('project-skill').ownerRoot,owner);
  assert.equal((await r.doctor()).find(x=>x.id==='project-skill').status,'unavailable');
  await r.install(['project-skill']);assert.equal((await r.doctor()).find(x=>x.id==='project-skill').status,'ok');
});
test('public registry rejects embedded private bindings',async t=>{
  const f=await fixture(t);f.data.repositories.project.checkout='secret';await f.save();await assert.rejects(f.registry().load(),/registry.local/);
});
test('real registry is readable from a different cwd',()=>{
  const result=spawnSync(process.execPath,[path.resolve('scripts/skills.mjs'),'resolve','clear-ui'],{cwd:os.tmpdir(),encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);assert.equal(JSON.parse(result.stdout).owner,'personal-skills');
});
