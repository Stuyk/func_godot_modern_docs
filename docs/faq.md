FuncGodot Manual  

# Frequently Asked Questions

[Why are my textures blurry?!](#WhyBlurryTex)  
[Can I do...](#CanIDo)  
[How does FuncGodot handle source control?](#SourceControl)  
[Why am I getting an error trying to export my Local Configuration?](#LocalConfigWontExport)  
[Why are my new entities not building? Why can't I find them in my map editor?](#EntitiesNotBuilding)  
[Why are all my entities being generated as scriptless _Node3Ds_?](#EntitiesNotBuilding2)  
[Help! I manually added some nodes to my FuncGodotMap and when I hit build again they all disappeared!](#NodesDisappeared)  
[How do I split up my map? It only comes out as one big mesh](#SplitMap)  
[I'm getting a lot of overdraw, why doesn't FuncGodot get rid of unseen faces?](#Overdraw)  
[Why are my textures blurry?!](#WhyBlurryTex2)

* * *

**Why are my textures blurry?!**  
[**Please don't skim the manual.**](guide_textures.html#WhyAreMyTexturesBlurry)

**Can I do...**  
Yes.

**How does FuncGodot handle source control?**  
All resources that need to access or reference global paths go through the [**FuncGodot Local Config**](ref_local_config.md) settings that are local to each machine. The various tool and project paths do need to be set per machine. Additionally, the FuncGodotMap has the option for using a local path to map files.

**Why am I getting an error trying to export my Local Configuration?**  
You need to run your project at least once so that Godot can create the **user://** folder. This can be any scene. After the first run, you'll be able to export your Local Config.

**Why are my new entities not building? Why can't I find them in my map editor?**  
Double check to make sure you set a [Classname](ref_fgd_resources.html#Entity) in the entity resource before you exported the FGD. If this doesn't exist, FuncGodot will skip adding it to the FGD file and will only generate a _Node3D_.

**Why are all my entities being generated as scriptless _Node3Ds_?**  
Make sure your [FuncGodotMap node](ref_func_godot_map.md) is using the correct [FuncGodotMapSettings resource](ref_func_godot_map.html#MapSettings). The Map Settings resource determines the [FGD File resource](ref_fgd_resources.html#File) used for the map generation, and any entities it does not recognize will generate as _Node3Ds_.

**Help! I manually added some nodes to my FuncGodotMap and when I hit build again they all disappeared!**  
FuncGodotMap nodes will always erase every child they have when rebuilt. There's no practical way for FuncGodot to confidently differentiate what it built, what was programmatically built as a result of its build, and what was hand placed by the user. If you feel the need to manually place nodes you should do so outside of the FuncGodotMap node in order to not lose any work.

**How do I split up my map? It only comes out as one big mesh**  
You're still mapping like you're compiling for the Quake engine. [You need to map like your target is the Godot Engine.](tips_worldspawn.md)

**I'm getting a lot of overdraw, why doesn't FuncGodot get rid of unseen faces?**  
You're still mapping like you're compiling for the Quake engine. [You need to map like your target is the Godot Engine.](tips_worldspawn.html#OcclusionCulling)

**Why are my textures blurry?!**  
...