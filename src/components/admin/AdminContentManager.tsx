'use client';

import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import ImageUploadInput from './ImageUploadInput';

type FieldOption = { label:string; value:string };
type FieldType = 'text'|'number'|'checkbox'|'date'|'textarea'|'richtext'|'image'|'gallery'|'coordinates'|'availability'|'menuItems'|'socialLinks'|'footerColumns'|'pageBlocks'|'select'|'multiselect'|'array'|'itinerary';
export interface AdminFieldConfig { name:string; label:string; type:FieldType; folder?:string; placeholder?:string; options?:FieldOption[]; optionSource?:{collection:string;filter?:Record<string,any>}; }
export interface TranslationFieldConfig { name:string; label:string; type:'text'|'textarea'|'richtext'|'array'|'itinerary'|'footerColumns'; }
export interface AdminModuleConfig { collection:string; title:string; description?:string; fields:AdminFieldConfig[]; translationFields:TranslationFieldConfig[]; defaultItem:Record<string,any>; }
const defaultLanguage='en-US';
const inputClass='w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-slate-100 outline-none transition focus:border-[#1C398E] focus:ring-4 focus:ring-[#1C398E]/10';
const smallInputClass='w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-[#1C398E] focus:ring-4 focus:ring-[#1C398E]/10';
const panelClass='rounded-xl border border-white/10 bg-slate-900/70 p-4';
const removeButtonClass='rounded-lg border border-rose-400/30 px-3 py-1.5 text-sm text-rose-300 hover:bg-rose-400/10';
const secondaryButtonClass='rounded-lg border border-white/15 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40';

export default function AdminContentManager({config}:{config:AdminModuleConfig}){
 const [items,setItems]=useState<any[]>([]),[languages,setLanguages]=useState<{code:string;name:string}[]>([]),[editing,setEditing]=useState<any|null>(null);
 const [activeLanguage,setActiveLanguage]=useState(defaultLanguage),[search,setSearch]=useState(''),[busy,setBusy]=useState(false),[notice,setNotice]=useState('');
 const titleField=useMemo(()=>config.translationFields.find(f=>f.name==='title')||config.translationFields[0],[config.translationFields]);
 async function load(){const r=await fetch(`/api/admin/collections/${config.collection}?pageSize=100&search=${encodeURIComponent(search)}`);const j=await r.json();setItems(j.data?.items||[])}
 async function loadLanguages(){const r=await fetch('/api/languages');const j=await r.json();setLanguages(j.data||[])}
 // Initial API hydration.
 // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
 useEffect(()=>{void loadLanguages();void load()},[]);
 function emptyTranslation(){return Object.fromEntries(config.translationFields.map(f=>[f.name,f.type==='array'||f.type==='itinerary'||f.type==='footerColumns'?[]:'']))}
 function availableLanguages(){return languages.length?languages:[{code:defaultLanguage,name:'English'}]}
 function newItem(){const langs=availableLanguages();setEditing({...structuredClone(config.defaultItem),translations:langs.map(l=>({languageCode:l.code,...emptyTranslation()}))});setActiveLanguage(langs[0]?.code||defaultLanguage)}
 function editItem(item:any){const langs=availableLanguages();setEditing({...structuredClone(item),translations:langs.map(l=>({languageCode:l.code,...emptyTranslation(),...(item.translations||[]).find((t:any)=>t.languageCode===l.code)}))});setActiveLanguage(langs[0]?.code||defaultLanguage)}
 function setField(name:string,value:any){setEditing((c:any)=>({...c,[name]:value}))}
 function setTranslationField(code:string,name:string,value:any){setEditing((c:any)=>({...c,translations:(c.translations||[]).map((t:any)=>t.languageCode===code?{...t,[name]:value}:t)}))}
 function normalizePayload(value:any){
  const copy={...value};
  ['_id','createdAt','updatedAt','__v'].forEach(k=>delete copy[k]);
  for(const f of config.fields){
   if(f.type==='number')copy[f.name]=Number(copy[f.name]||0);
   if(f.type==='gallery')copy[f.name]=normalizeMediaList(copy[f.name]);
   if(f.type==='coordinates')copy[f.name]=normalizeCoordinates(copy[f.name]);
   if(f.type==='availability')copy[f.name]=normalizeAvailability(copy[f.name]);
   if(f.type==='menuItems')copy[f.name]=normalizeMenuItems(copy[f.name]);
   if(f.type==='socialLinks')copy[f.name]=normalizeSocialLinks(copy[f.name]);
   if(f.type==='footerColumns')copy[f.name]=normalizeFooterColumns(copy[f.name]);
   if(f.type==='pageBlocks')copy[f.name]=normalizePageBlocks(copy[f.name]);
   if(f.type==='date'&&copy[f.name])copy[f.name]=new Date(copy[f.name]);
  }
  const hasTitle=config.translationFields.some(f=>f.name==='title');
  copy.translations=normalizeTranslations(copy.translations,hasTitle,copy);
  return copy
 }
 async function save(e:React.FormEvent){e.preventDefault();if(!editing)return;setBusy(true);setNotice('');try{const update=Boolean(editing._id);const r=await fetch(update?`/api/admin/collections/${config.collection}/${editing._id}`:`/api/admin/collections/${config.collection}`,{method:update?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(normalizePayload(editing))});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.message||'Save failed');setEditing(null);setNotice('Saved successfully.');await load()}catch(err:any){setNotice(err.message||'Save failed')}finally{setBusy(false)}}
 async function remove(item:any){if(!confirm('Delete this record? This action cannot be undone.'))return;const r=await fetch(`/api/admin/collections/${config.collection}/${item._id}`,{method:'DELETE'});setNotice(r.ok?'Record deleted.':'Delete failed.');await load()}
 function displayTitle(item:any){const t=(item.translations||[]).find((x:any)=>x.languageCode===defaultLanguage)||item.translations?.[0];return t?.[titleField?.name||'title']||item.slug||item.key||item.bookingNumber||item.originalName||item.leadEmail||item._id}
 const activeTranslation=editing?.translations?.find((t:any)=>t.languageCode===activeLanguage);
 return <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl sm:p-6">
  <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div><h1 className="text-2xl font-bold text-white">{config.title}</h1>{config.description&&<p className="mt-1 max-w-3xl text-sm text-slate-400">{config.description}</p>}</div><button onClick={newItem} className="rounded-full bg-[#1C398E] px-5 py-2.5 font-semibold text-white shadow-lg shadow-[#0F172A]/30 hover:-translate-y-0.5 hover:bg-[#152d73] flex items-center gap-2 justify-center"><Plus size={18} /> Create</button></div>
  {notice&&<div className="mb-4 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">{notice}</div>}
  <div className="mb-5 flex gap-2"><input className={inputClass} value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==='Enter'&&load()} placeholder={`Search ${config.title.toLowerCase()}...`}/><button onClick={load} className="rounded-xl border border-white/15 px-5 font-medium text-white hover:bg-white/10 flex items-center gap-2"><Search size={18} /> Search</button></div>
  <div className="overflow-hidden rounded-xl border border-white/10"><div className="overflow-x-auto"><table className="min-w-full divide-y divide-white/10 text-sm"><thead className="bg-slate-950/70 text-left text-xs uppercase tracking-wider text-slate-400"><tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Slug / Key</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Updated</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-white/5">{items.map(item=><tr key={item._id} className="transition hover:bg-white/[.04]"><td className="px-4 py-4 font-medium text-white">{displayTitle(item)}</td><td className="px-4 py-4 font-mono text-xs text-slate-400">{item.slug||item.key||item.bookingNumber||item.folder||item.email||'-'}</td><td className="px-4 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.isVisible===false||item.status==='draft'?'bg-slate-700 text-slate-200':'bg-emerald-500/15 text-emerald-300'}`}>{item.isVisible===false||item.status==='draft'?'Hidden / Draft':'Active'}</span></td><td className="px-4 py-4 text-slate-400">{item.updatedAt?new Date(item.updatedAt).toLocaleString():'-'}</td><td className="px-4 py-4 text-right"><div className="flex justify-end gap-2"><button onClick={()=>editItem(item)} className="rounded-lg border border-sky-400/40 px-3 py-1.5 text-sky-300 hover:bg-sky-400/10 flex items-center gap-1"><Edit2 size={16} /> Edit</button><button onClick={()=>remove(item)} className="rounded-lg border border-rose-400/40 px-3 py-1.5 text-rose-300 hover:bg-rose-400/10 flex items-center gap-1"><Trash2 size={16} /> Delete</button></div></td></tr>)}</tbody></table></div>{items.length===0&&<div className="p-10 text-center text-slate-500">No records found.</div>}</div>
  {editing&&<form onSubmit={save} className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4 sm:p-6"><div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-semibold text-white">{editing._id?'Edit':'Create'} {config.title}</h2><button type="button" onClick={()=>setEditing(null)} className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/10 flex items-center gap-1"><X size={16} /> Close</button></div><div className="grid gap-5 md:grid-cols-2">{config.fields.map(field=><div key={field.name} className={wideFieldTypes.has(field.type)?'md:col-span-2':''}><label className="mb-2 block text-sm font-semibold text-slate-200">{field.label}</label><Field field={field} value={editing[field.name]} onChange={v=>setField(field.name,v)} languages={availableLanguages()}/></div>)}</div>
   {config.translationFields.length>0&&<div className="mt-7"><div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">{availableLanguages().map(l=><button type="button" key={l.code} onClick={()=>setActiveLanguage(l.code)} className={`rounded-full px-4 py-2 text-sm font-medium ${activeLanguage===l.code?'bg-[#1C398E] text-white':'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}>{l.name}</button>)}</div><div className="mt-5 space-y-5">{activeTranslation&&config.translationFields.map(field=><div key={field.name}><label className="mb-2 block text-sm font-semibold text-slate-200">{field.label}</label>{field.type==='richtext'?<RichTextEditor value={activeTranslation[field.name]} onChange={v=>setTranslationField(activeLanguage,field.name,v)}/>:field.type==='textarea'?<textarea className={inputClass} rows={4} value={activeTranslation[field.name]||''} onChange={e=>setTranslationField(activeLanguage,field.name,e.target.value)}/>:field.type==='array'?<StringListRepeater value={Array.isArray(activeTranslation[field.name])?activeTranslation[field.name]:[]} onChange={v=>setTranslationField(activeLanguage,field.name,v)} placeholder={field.label}/>:field.type==='itinerary'?<ItineraryRepeater value={Array.isArray(activeTranslation[field.name])?activeTranslation[field.name]:[]} onChange={v=>setTranslationField(activeLanguage,field.name,v)}/>:field.type==='footerColumns'?<FooterColumnsRepeater value={Array.isArray(activeTranslation[field.name])?activeTranslation[field.name]:[]} onChange={v=>setTranslationField(activeLanguage,field.name,v)}/>:<input className={inputClass} value={activeTranslation[field.name]||''} onChange={e=>setTranslationField(activeLanguage,field.name,e.target.value)}/>}</div>)}</div></div>}
   <div className="mt-7 flex justify-end"><button disabled={busy} className="rounded-full bg-[#1C398E] px-8 py-3 font-semibold text-white hover:bg-[#152d73] disabled:cursor-not-allowed disabled:opacity-60">{busy?'Saving...':'Save changes'}</button></div></form>}
 </div>
}

function StringListRepeater({value,onChange,placeholder}:{value:string[];onChange:(v:string[])=>void;placeholder:string}){
 const update=(i:number,next:string)=>onChange(value.map((item,idx)=>idx===i?next:item));
 const add=()=>onChange([...value,'']);
 const remove=(i:number)=>onChange(value.filter((_,idx)=>idx!==i));
 return <div className="space-y-3">{value.map((item,i)=><div className="flex gap-2" key={i}><input className={inputClass} value={item||''} onChange={e=>update(i,e.target.value)} placeholder={`${placeholder} ${i+1}`}/><button type="button" onClick={()=>remove(i)} className={removeButtonClass}>Remove</button></div>)}<button type="button" onClick={add} className="w-full rounded-xl border border-dashed border-[#C5A880]/50 px-4 py-3 font-medium text-[#C5A880] hover:bg-[#1C398E]/10">+ Add item</button></div>
}

function MediaGalleryRepeater({value,onChange,folder}:{value:any[];onChange:(v:any[])=>void;folder:string}){
 const update=(i:number,key:string,next:any)=>onChange(value.map((item,idx)=>idx===i?{...item,[key]:next}:item));
 const add=()=>onChange([...value,{url:'',altText:'',caption:'',sortOrder:value.length}]);
 const remove=(i:number)=>onChange(renumber(value.filter((_,idx)=>idx!==i)));
 const move=(i:number,dir:number)=>moveItem(value,i,dir,next=>onChange(renumber(next)));
 return <div className="space-y-4">{value.map((image,i)=><div key={image._id||i} className={panelClass}><RepeaterHeader title={`Image ${i+1}`} onMoveUp={()=>move(i,-1)} onMoveDown={()=>move(i,1)} onRemove={()=>remove(i)} disableUp={i===0} disableDown={i===value.length-1}/><div className="grid gap-4 md:grid-cols-2"><div className="md:col-span-2"><label className="mb-1 block text-xs text-slate-400">Image</label><ImageUploadInput value={image.url||''} folder={folder} onChange={next=>update(i,'url',next)}/></div><LabeledInput label="Alt Text" value={image.altText||''} onChange={next=>update(i,'altText',next)}/><LabeledInput label="Caption" value={image.caption||''} onChange={next=>update(i,'caption',next)}/><LabeledInput label="Sort Order" type="number" value={image.sortOrder??i} onChange={next=>update(i,'sortOrder',Number(next||0))}/></div></div>)}<button type="button" onClick={add} className="w-full rounded-xl border border-dashed border-[#C5A880]/50 px-4 py-3 font-medium text-[#C5A880] hover:bg-[#1C398E]/10">+ Add image</button></div>
}

function CoordinatesInput({value,onChange}:{value:any;onChange:(v:any)=>void}){
 const update=(key:string,next:string)=>onChange({...value,[key]:next===''?'':Number(next)});
 return <div className="grid gap-4 md:grid-cols-2"><LabeledInput label="Latitude" type="number" value={value?.latitude??''} onChange={next=>update('latitude',next)}/><LabeledInput label="Longitude" type="number" value={value?.longitude??''} onChange={next=>update('longitude',next)}/></div>
}

function AvailabilityRepeater({value,onChange}:{value:any[];onChange:(v:any[])=>void}){
 const update=(i:number,key:string,next:any)=>onChange(value.map((item,idx)=>idx===i?{...item,[key]:next}:item));
 const add=()=>onChange([...value,{startDate:'',endDate:'',seats:0,bookedSeats:0,status:'open'}]);
 const remove=(i:number)=>onChange(value.filter((_,idx)=>idx!==i));
 const move=(i:number,dir:number)=>moveItem(value,i,dir,onChange);
 return <div className="space-y-4">{value.map((slot,i)=><div key={slot._id||i} className={panelClass}><RepeaterHeader title={`Availability ${i+1}`} onMoveUp={()=>move(i,-1)} onMoveDown={()=>move(i,1)} onRemove={()=>remove(i)} disableUp={i===0} disableDown={i===value.length-1}/><div className="grid gap-4 md:grid-cols-2"><LabeledInput label="Start Date" type="date" value={toDateInputValue(slot.startDate)} onChange={next=>update(i,'startDate',next)}/><LabeledInput label="End Date" type="date" value={toDateInputValue(slot.endDate)} onChange={next=>update(i,'endDate',next)}/><LabeledInput label="Seats" type="number" value={slot.seats??0} onChange={next=>update(i,'seats',Number(next||0))}/><LabeledInput label="Booked Seats" type="number" value={slot.bookedSeats??0} onChange={next=>update(i,'bookedSeats',Number(next||0))}/><div><label className="mb-1 block text-xs text-slate-400">Status</label><select className={smallInputClass} value={slot.status||'open'} onChange={e=>update(i,'status',e.target.value)}><option value="open">Open</option><option value="limited">Limited</option><option value="sold-out">Sold Out</option><option value="closed">Closed</option></select></div></div></div>)}<button type="button" onClick={add} className="w-full rounded-xl border border-dashed border-[#C5A880]/50 px-4 py-3 font-medium text-[#C5A880] hover:bg-[#1C398E]/10">+ Add availability</button></div>
}

function MenuItemsRepeater({value,onChange,languages}:{value:any[];onChange:(v:any[])=>void;languages:{code:string;name:string}[]}){
 const update=(i:number,key:string,next:any)=>onChange(value.map((item,idx)=>idx===i?{...item,[key]:next}:item));
 const updateTranslation=(i:number,code:string,label:string)=>{const item=value[i]||{};const translations=ensureTranslations(item.translations,languages).map(t=>t.languageCode===code?{...t,label}:t);update(i,'translations',translations)};
 const add=()=>onChange([...value,{url:'/',target:'_self',parentId:'',icon:'',sortOrder:value.length,isVisible:true,translations:languages.map(l=>({languageCode:l.code,label:''}))}]);
 const remove=(i:number)=>onChange(renumber(value.filter((_,idx)=>idx!==i)));
 const move=(i:number,dir:number)=>moveItem(value,i,dir,next=>onChange(renumber(next)));
 return <div className="space-y-4">{value.map((item,i)=>{const translations=ensureTranslations(item.translations,languages);const currentId=String(item._id||'');const parentOptions=value.filter((candidate,idx)=>idx!==i&&String(candidate._id||'')!==''&&String(candidate._id)!==currentId).map(candidate=>{const candidateTranslations=ensureTranslations(candidate.translations,languages);const defaultLabel=candidateTranslations.find(t=>t.languageCode===defaultLanguage)?.label||candidateTranslations[0]?.label||candidate.url||String(candidate._id);return {value:String(candidate._id),label:String(defaultLabel)}});return <div key={item._id||i} className={panelClass}><RepeaterHeader title={`Menu item ${i+1}`} onMoveUp={()=>move(i,-1)} onMoveDown={()=>move(i,1)} onRemove={()=>remove(i)} disableUp={i===0} disableDown={i===value.length-1}/><div className="grid gap-4 md:grid-cols-2"><LabeledInput label="URL" value={item.url||''} onChange={next=>update(i,'url',next)}/><div><label className="mb-1 block text-xs text-slate-400">Target</label><select className={smallInputClass} value={item.target||'_self'} onChange={e=>update(i,'target',e.target.value)}><option value="_self">Same Tab</option><option value="_blank">New Tab</option></select></div><div><label className="mb-1 block text-xs text-slate-400">Parent Menu Item (for dropdown)</label><select className={smallInputClass} value={String(item.parentId||'')} onChange={e=>update(i,'parentId',e.target.value)}><option value="">None (Top level)</option>{parentOptions.map(option=><option key={option.value} value={option.value}>{option.label}</option>)}</select>{parentOptions.length===0&&<p className="mt-1 text-xs text-slate-500">Save items first to assign parent-child hierarchy.</p>}</div><LabeledInput label="Icon Class" value={item.icon||''} onChange={next=>update(i,'icon',next)}/><LabeledInput label="Sort Order" type="number" value={item.sortOrder??i} onChange={next=>update(i,'sortOrder',Number(next||0))}/><label className="inline-flex cursor-pointer items-center gap-3"><input type="checkbox" className="h-5 w-5 accent-[#1C398E]" checked={item.isVisible!==false} onChange={e=>update(i,'isVisible',e.target.checked)}/><span className="text-sm text-slate-400">Visible</span></label><div className="md:col-span-2 grid gap-3">{languages.map(l=><LabeledInput key={l.code} label={`Label (${l.name})`} value={translations.find(t=>t.languageCode===l.code)?.label||''} onChange={next=>updateTranslation(i,l.code,next)}/>)}</div></div></div>})}<button type="button" onClick={add} className="w-full rounded-xl border border-dashed border-[#C5A880]/50 px-4 py-3 font-medium text-[#C5A880] hover:bg-[#1C398E]/10">+ Add menu item</button></div>
}

function SocialLinksRepeater({value,onChange}:{value:any[];onChange:(v:any[])=>void}){
 const update=(i:number,key:string,next:any)=>onChange(value.map((item,idx)=>idx===i?{...item,[key]:next}:item));
 const add=()=>onChange([...value,{platform:'',url:'',icon:'bi-link-45deg'}]);
 const remove=(i:number)=>onChange(value.filter((_,idx)=>idx!==i));
 return <div className="space-y-4">{value.map((link,i)=><div key={i} className={panelClass}><RepeaterHeader title={`Social link ${i+1}`} onRemove={()=>remove(i)}/><div className="grid gap-4 md:grid-cols-3"><LabeledInput label="Platform" value={link.platform||''} onChange={next=>update(i,'platform',next)}/><LabeledInput label="URL" value={link.url||''} onChange={next=>update(i,'url',next)}/><LabeledInput label="Icon Class" value={link.icon||''} onChange={next=>update(i,'icon',next)}/></div></div>)}<button type="button" onClick={add} className="w-full rounded-xl border border-dashed border-[#C5A880]/50 px-4 py-3 font-medium text-[#C5A880] hover:bg-[#1C398E]/10">+ Add social link</button></div>
}

function FooterColumnsRepeater({value,onChange}:{value:any[];onChange:(v:any[])=>void}){
 const update=(i:number,key:string,next:any)=>onChange(value.map((item,idx)=>idx===i?{...item,[key]:next}:item));
 const add=()=>onChange([...value,{title:'',sortOrder:value.length,links:[]}]);
 const remove=(i:number)=>onChange(renumber(value.filter((_,idx)=>idx!==i)));
 const move=(i:number,dir:number)=>moveItem(value,i,dir,next=>onChange(renumber(next)));
 return <div className="space-y-4">{value.map((column,i)=><div key={i} className={panelClass}><RepeaterHeader title={`Footer column ${i+1}`} onMoveUp={()=>move(i,-1)} onMoveDown={()=>move(i,1)} onRemove={()=>remove(i)} disableUp={i===0} disableDown={i===value.length-1}/><div className="grid gap-4 md:grid-cols-2"><LabeledInput label="Column Title" value={column.title||''} onChange={next=>update(i,'title',next)}/><LabeledInput label="Sort Order" type="number" value={column.sortOrder??i} onChange={next=>update(i,'sortOrder',Number(next||0))}/><div className="md:col-span-2"><FooterLinksRepeater value={Array.isArray(column.links)?column.links:[]} onChange={links=>update(i,'links',links)}/></div></div></div>)}<button type="button" onClick={add} className="w-full rounded-xl border border-dashed border-[#C5A880]/50 px-4 py-3 font-medium text-[#C5A880] hover:bg-[#1C398E]/10">+ Add footer column</button></div>
}

function FooterLinksRepeater({value,onChange}:{value:any[];onChange:(v:any[])=>void}){
 const update=(i:number,key:string,next:any)=>onChange(value.map((item,idx)=>idx===i?{...item,[key]:next}:item));
 const add=()=>onChange([...value,{label:'',url:''}]);
 const remove=(i:number)=>onChange(value.filter((_,idx)=>idx!==i));
 return <div className="space-y-3 rounded-lg border border-white/10 bg-slate-950/40 p-3"><div className="text-sm font-semibold text-slate-200">Links</div>{value.map((link,i)=><div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]" key={i}><LabeledInput label="Label" value={link.label||''} onChange={next=>update(i,'label',next)}/><LabeledInput label="URL" value={link.url||''} onChange={next=>update(i,'url',next)}/><div className="flex items-end"><button type="button" onClick={()=>remove(i)} className={removeButtonClass}>Remove</button></div></div>)}<button type="button" onClick={add} className="rounded-lg border border-dashed border-[#C5A880]/50 px-3 py-2 text-sm font-medium text-[#C5A880] hover:bg-[#1C398E]/10">+ Add link</button></div>
}

function PageBlocksRepeater({value,onChange,languages}:{value:any[];onChange:(v:any[])=>void;languages:{code:string;name:string}[]}){
 const update=(i:number,key:string,next:any)=>onChange(value.map((block,idx)=>idx===i?{...block,[key]:next}:block));
 const updateTranslation=(i:number,code:string,key:string,next:string)=>{const block=value[i]||{};const translations=ensureTranslations(block.translations,languages).map(t=>t.languageCode===code?{...t,[key]:next}:t);update(i,'translations',translations)};
 const add=()=>onChange([...value,{type:'richText',sortOrder:value.length,settings:{},translations:languages.map(l=>({languageCode:l.code,title:'',body:''}))}]);
 const remove=(i:number)=>onChange(renumber(value.filter((_,idx)=>idx!==i)));
 const move=(i:number,dir:number)=>moveItem(value,i,dir,next=>onChange(renumber(next)));
 return <div className="space-y-4">{value.map((block,i)=>{const translations=ensureTranslations(block.translations,languages);return <div key={block._id||i} className={panelClass}><RepeaterHeader title={`Block ${i+1}`} onMoveUp={()=>move(i,-1)} onMoveDown={()=>move(i,1)} onRemove={()=>remove(i)} disableUp={i===0} disableDown={i===value.length-1}/><div className="grid gap-4 md:grid-cols-2"><div><label className="mb-1 block text-xs text-slate-400">Block Type</label><select className={smallInputClass} value={block.type||'richText'} onChange={e=>update(i,'type',e.target.value)}><option value="hero">Hero</option><option value="richText">Rich Text</option><option value="image">Image</option><option value="video">Video</option><option value="cta">CTA</option><option value="gallery">Gallery</option><option value="faq">FAQ</option></select></div><LabeledInput label="Sort Order" type="number" value={block.sortOrder??i} onChange={next=>update(i,'sortOrder',Number(next||0))}/><div className="md:col-span-2"><KeyValueRepeater value={objectToPairs(block.settings)} onChange={pairs=>update(i,'settings',pairsToObject(pairs))}/></div><div className="md:col-span-2 grid gap-4">{languages.map(l=>{const translation=translations.find(t=>t.languageCode===l.code);return <div key={l.code} className="rounded-lg border border-white/10 bg-slate-950/40 p-3"><div className="mb-3 text-sm font-semibold text-slate-200">{l.name}</div><div className="grid gap-3"><LabeledInput label="Title" value={translation?.title||''} onChange={next=>updateTranslation(i,l.code,'title',next)}/><div><label className="mb-1 block text-xs text-slate-400">Body</label><textarea className={smallInputClass} rows={4} value={translation?.body||''} onChange={e=>updateTranslation(i,l.code,'body',e.target.value)}/></div></div></div>})}</div></div></div>})}<button type="button" onClick={add} className="w-full rounded-xl border border-dashed border-[#C5A880]/50 px-4 py-3 font-medium text-[#C5A880] hover:bg-[#1C398E]/10">+ Add page block</button></div>
}

function KeyValueRepeater({value,onChange}:{value:{key:string;value:string}[];onChange:(v:{key:string;value:string}[])=>void}){
 const update=(i:number,key:'key'|'value',next:string)=>onChange(value.map((item,idx)=>idx===i?{...item,[key]:next}:item));
 const add=()=>onChange([...value,{key:'',value:''}]);
 const remove=(i:number)=>onChange(value.filter((_,idx)=>idx!==i));
 return <div className="space-y-3 rounded-lg border border-white/10 bg-slate-950/40 p-3"><div className="text-sm font-semibold text-slate-200">Settings</div>{value.map((pair,i)=><div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]" key={i}><LabeledInput label="Name" value={pair.key||''} onChange={next=>update(i,'key',next)}/><LabeledInput label="Value" value={pair.value||''} onChange={next=>update(i,'value',next)}/><div className="flex items-end"><button type="button" onClick={()=>remove(i)} className={removeButtonClass}>Remove</button></div></div>)}<button type="button" onClick={add} className="rounded-lg border border-dashed border-[#C5A880]/50 px-3 py-2 text-sm font-medium text-[#C5A880] hover:bg-[#1C398E]/10">+ Add setting</button></div>
}

function RepeaterHeader({title,onMoveUp,onMoveDown,onRemove,disableUp,disableDown}:{title:string;onMoveUp?:()=>void;onMoveDown?:()=>void;onRemove:()=>void;disableUp?:boolean;disableDown?:boolean}){
 return <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div className="font-semibold text-white">{title}</div><div className="flex gap-2">{onMoveUp&&<button type="button" onClick={onMoveUp} className={secondaryButtonClass} disabled={disableUp}>Up</button>}{onMoveDown&&<button type="button" onClick={onMoveDown} className={secondaryButtonClass} disabled={disableDown}>Down</button>}<button type="button" onClick={onRemove} className={removeButtonClass}>Remove</button></div></div>
}

function LabeledInput({label,value,onChange,type='text'}:{label:string;value:string|number;onChange:(v:string)=>void;type?:string}){
 return <div><label className="mb-1 block text-xs text-slate-400">{label}</label><input className={smallInputClass} type={type} value={value??''} onChange={e=>onChange(e.target.value)}/></div>
}

function toStringList(value:any){if(Array.isArray(value))return value.map(item=>String(item??''));if(typeof value==='string')return value.split('\n').map(item=>item.trim()).filter(Boolean);return []}
function normalizeStringList(value:any){return toStringList(value).map(item=>item.trim()).filter(Boolean)}
function normalizeMediaList(value:any){return (Array.isArray(value)?value:[]).map((item,index)=>({url:String(item.url||'').trim(),altText:String(item.altText||'').trim(),caption:String(item.caption||'').trim(),sortOrder:Number(item.sortOrder??index)})).filter(item=>item.url)}
function normalizeCoordinates(value:any){const latitude=toOptionalNumber(value?.latitude);const longitude=toOptionalNumber(value?.longitude);if(latitude===undefined&&longitude===undefined)return undefined;return {latitude,longitude}}
function normalizeAvailability(value:any){return (Array.isArray(value)?value:[]).map(item=>({startDate:item.startDate?new Date(item.startDate):undefined,endDate:item.endDate?new Date(item.endDate):undefined,seats:Number(item.seats||0),bookedSeats:Number(item.bookedSeats||0),status:item.status||'open'})).filter(item=>item.startDate)}
function normalizeItinerary(value:any){return (Array.isArray(value)?value:[]).map((day,index)=>({dayNumber:index+1,title:String(day.title||'').trim(),body:String(day.body||''),meals:String(day.meals||''),accommodation:String(day.accommodation||'')})).filter(day=>day.title)}
function normalizeMenuItems(value:any){return (Array.isArray(value)?value:[]).map((item,index)=>({parentId:String(item.parentId||'').trim()||undefined,url:String(item.url||'').trim(),target:item.target==='_blank'?'_blank':'_self',icon:String(item.icon||'').trim(),sortOrder:Number(item.sortOrder??index),isVisible:item.isVisible!==false,translations:(item.translations||[]).map((translation:any)=>({languageCode:translation.languageCode,label:String(translation.label||'').trim()})).filter((translation:any)=>translation.languageCode&&translation.label)})).filter(item=>item.url)}
function normalizeSocialLinks(value:any){return (Array.isArray(value)?value:[]).map(item=>({platform:String(item.platform||'').trim(),url:String(item.url||'').trim(),icon:String(item.icon||'bi-link-45deg').trim()})).filter(item=>item.platform&&item.url)}
function normalizeFooterColumns(value:any){return (Array.isArray(value)?value:[]).map((column,index)=>({title:String(column.title||'').trim(),sortOrder:Number(column.sortOrder??index),links:(Array.isArray(column.links)?column.links:[]).map((link:any)=>({label:String(link.label||'').trim(),url:String(link.url||'').trim()})).filter((link:any)=>link.label&&link.url)})).filter(column=>column.title)}
function normalizePageBlocks(value:any){return (Array.isArray(value)?value:[]).map((block,index)=>({type:block.type||'richText',sortOrder:Number(block.sortOrder??index),settings:block.settings&&typeof block.settings==='object'?block.settings:{},translations:(block.translations||[]).map((translation:any)=>({languageCode:translation.languageCode,title:String(translation.title||'').trim(),body:String(translation.body||'')})).filter((translation:any)=>translation.languageCode&&(translation.title||translation.body))})).filter(block=>block.type)}
function normalizeTranslations(value:any,hasTitle:boolean,item:any){const fallback=titleFallback(item);const normalized=(Array.isArray(value)?value:[]).map((translation:any)=>{const copy={...translation};if(Array.isArray(copy.itinerary))copy.itinerary=normalizeItinerary(copy.itinerary);if(Array.isArray(copy.highlights))copy.highlights=normalizeStringList(copy.highlights);const meaningful=Object.entries(copy).some(([key,fieldValue])=>key!=='languageCode'&&(Array.isArray(fieldValue)?fieldValue.length>0:Boolean(String(fieldValue||'').trim())));if(!meaningful)return null;if(hasTitle&&!String(copy.title||'').trim())copy.title=fallback;return copy}).filter(Boolean);if(hasTitle&&normalized.length===0)normalized.push({languageCode:defaultLanguage,title:fallback});return normalized}
function titleFallback(item:any){const raw=String(item.title||item.slug||item.key||item.country||item.city||item.author||'Untitled').trim()||'Untitled';return raw.replace(/[-_]+/g,' ').replace(/\s+/g,' ').replace(/\b\w/g,letter=>letter.toUpperCase())}
function toOptionalNumber(value:any){if(value===undefined||value===null||value==='')return undefined;const numberValue=Number(value);return Number.isNaN(numberValue)?undefined:numberValue}
function toDateInputValue(value:any){if(!value)return '';if(typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value))return value;const date=new Date(value);if(Number.isNaN(date.getTime()))return '';return date.toISOString().slice(0,10)}
function ensureTranslations(translations:any[]|undefined,languages:{code:string;name:string}[]){return languages.map(language=>({languageCode:language.code,...(translations||[]).find(translation=>translation.languageCode===language.code)}))}
function renumber<T extends Record<string,any>>(items:T[]){return items.map((item,index)=>({...item,sortOrder:index}))}
function moveItem<T>(items:T[],index:number,dir:number,onChange:(v:T[])=>void){const next=index+dir;if(next<0||next>=items.length)return;const copy=[...items];[copy[index],copy[next]]=[copy[next],copy[index]];onChange(copy)}
function objectToPairs(value:any){if(!value||typeof value!=='object'||Array.isArray(value))return [];return Object.entries(value).map(([key,pairValue])=>({key,value:String(pairValue??'')}))}
function pairsToObject(pairs:{key:string;value:string}[]){return pairs.reduce<Record<string,string>>((result,pair)=>{const key=pair.key.trim();if(key)result[key]=pair.value;return result},{})}

const wideFieldTypes=new Set<FieldType>(['richtext','textarea','gallery','availability','menuItems','socialLinks','footerColumns','pageBlocks','multiselect']);

function DynamicSelectField({field,value,onChange}:{field:AdminFieldConfig;value:any;onChange:(v:any)=>void}){
 const [options,setOptions]=useState<FieldOption[]>([]);
 const [loaded,setLoaded]=useState(false);
 useEffect(()=>{
  if(!field.optionSource)return;
  fetch(`/api/admin/collections/${field.optionSource.collection}?pageSize=200`).then(r=>r.json()).then(j=>{
   const items=j.data?.items||[];
   setOptions(items.map((item:any)=>{const t=(item.translations||[]).find((x:any)=>x.languageCode==='en-US')||item.translations?.[0];const label=t?.title||item.slug||item.name||item._id;return {label:String(label),value:String(item._id)}}));
   setLoaded(true);
  }).catch(()=>setLoaded(true));
 },[field.optionSource?.collection]);
 if(field.type==='multiselect'){
  const selected=Array.isArray(value)?value.map(String):[];
  const toggle=(id:string)=>onChange(selected.includes(id)?selected.filter(x=>x!==id):[...selected,id]);
  return <div className="space-y-2 rounded-xl border border-white/10 bg-slate-950/60 p-3 max-h-52 overflow-y-auto">{!loaded&&<span className="text-xs text-slate-400">Loading...</span>}{options.map(opt=><label key={opt.value} className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="h-4 w-4 accent-[#1C398E]" checked={selected.includes(opt.value)} onChange={()=>toggle(opt.value)}/><span className="text-sm text-slate-300">{opt.label}</span></label>)}</div>;
 }
 return <select className={inputClass} value={String(value||'')} onChange={e=>onChange(e.target.value)}><option value="">-- Select --</option>{options.map(opt=><option key={opt.value} value={opt.value}>{opt.label}</option>)}</select>;
}

function Field({field,value,onChange,languages}:{field:AdminFieldConfig;value:any;onChange:(v:any)=>void;languages:{code:string;name:string}[]}){
 if(field.type==='checkbox')return <label className="inline-flex cursor-pointer items-center gap-3"><input type="checkbox" className="h-5 w-5 accent-[#1C398E]" checked={Boolean(value)} onChange={e=>onChange(e.target.checked)}/><span className="text-sm text-slate-400">Enabled</span></label>;
 if(field.type==='select'&&field.optionSource)return <DynamicSelectField field={field} value={value} onChange={onChange}/>;
 if(field.type==='multiselect')return <DynamicSelectField field={field} value={value} onChange={onChange}/>;
 if(field.type==='select')return <select className={inputClass} value={String(value||'')} onChange={e=>onChange(e.target.value)}><option value="">-- Select --</option>{(field.options||[]).map(option=><option key={option.value} value={option.value}>{option.label}</option>)}</select>;
 if(field.type==='richtext')return <RichTextEditor value={value||''} onChange={onChange}/>;
 if(field.type==='image')return <ImageUploadInput value={value||''} folder={field.folder||'media'} onChange={onChange}/>;
 if(field.type==='array')return <StringListRepeater value={toStringList(value)} onChange={onChange} placeholder={field.placeholder||'Item'}/>;
 if(field.type==='gallery')return <MediaGalleryRepeater value={Array.isArray(value)?value:[]} onChange={onChange} folder={field.folder||'gallery'}/>;
 if(field.type==='coordinates')return <CoordinatesInput value={value||{}} onChange={onChange}/>;
 if(field.type==='availability')return <AvailabilityRepeater value={Array.isArray(value)?value:[]} onChange={onChange}/>;
 if(field.type==='itinerary')return <ItineraryRepeater value={Array.isArray(value)?value:[]} onChange={onChange}/>;
 if(field.type==='menuItems')return <MenuItemsRepeater value={Array.isArray(value)?value:[]} onChange={onChange} languages={languages}/>;
 if(field.type==='socialLinks')return <SocialLinksRepeater value={Array.isArray(value)?value:[]} onChange={onChange}/>;
 if(field.type==='footerColumns')return <FooterColumnsRepeater value={Array.isArray(value)?value:[]} onChange={onChange}/>;
 if(field.type==='pageBlocks')return <PageBlocksRepeater value={Array.isArray(value)?value:[]} onChange={onChange} languages={languages}/>;
 if(field.type==='textarea')return <textarea className={inputClass} rows={4} value={value||''} onChange={e=>onChange(e.target.value)} placeholder={field.placeholder}/>;
 return <input className={inputClass} type={field.type} value={field.type==='date'?toDateInputValue(value):value||''} onChange={e=>onChange(field.type==='number'?Number(e.target.value):e.target.value)} placeholder={field.placeholder}/>;
}

function ItineraryRepeater({value,onChange}:{value:any[];onChange:(v:any[])=>void}){
 const update=(i:number,key:string,val:any)=>onChange(value.map((d,idx)=>idx===i?{...d,[key]:val}:d));
 const add=()=>onChange([...value,{dayNumber:value.length+1,title:'',body:'',meals:'',accommodation:''}]);
 const remove=(i:number)=>onChange(value.filter((_,idx)=>idx!==i).map((d,idx)=>({...d,dayNumber:idx+1})));
 const move=(i:number,dir:number)=>{const n=i+dir;if(n<0||n>=value.length)return;const copy=[...value];[copy[i],copy[n]]=[copy[n],copy[i]];onChange(copy.map((d,idx)=>({...d,dayNumber:idx+1})))};
 return <div className="space-y-4">{value.map((day,i)=><div key={day._id||i} className="rounded-xl border border-white/10 bg-slate-900/70 p-4"><div className="mb-4 flex items-center justify-between"><div className="font-semibold text-white">Day {i+1}</div><div className="flex gap-2"><button type="button" onClick={()=>move(i,-1)} className="rounded border border-white/10 px-2 py-1 text-slate-300 disabled:opacity-30" disabled={i===0}>↑</button><button type="button" onClick={()=>move(i,1)} className="rounded border border-white/10 px-2 py-1 text-slate-300 disabled:opacity-30" disabled={i===value.length-1}>↓</button><button type="button" onClick={()=>remove(i)} className="rounded border border-rose-400/30 px-2 py-1 text-rose-300">Remove</button></div></div><div className="grid gap-4 md:grid-cols-2"><div className="md:col-span-2"><label className="mb-1 block text-xs text-slate-400">Title</label><input className={inputClass} value={day.title||''} onChange={e=>update(i,'title',e.target.value)}/></div><div className="md:col-span-2"><label className="mb-1 block text-xs text-slate-400">Description</label><textarea className={inputClass} rows={4} value={day.body||''} onChange={e=>update(i,'body',e.target.value)}/></div><div><label className="mb-1 block text-xs text-slate-400">Meals</label><input className={inputClass} value={day.meals||''} onChange={e=>update(i,'meals',e.target.value)}/></div><div><label className="mb-1 block text-xs text-slate-400">Accommodation</label><input className={inputClass} value={day.accommodation||''} onChange={e=>update(i,'accommodation',e.target.value)}/></div></div></div>)}<button type="button" onClick={add} className="w-full rounded-xl border border-dashed border-[#C5A880]/50 px-4 py-3 font-medium text-[#C5A880] hover:bg-[#1C398E]/10">+ Add itinerary day</button></div>
}
