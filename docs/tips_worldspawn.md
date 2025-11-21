FuncGodot Manual  

# Why Not Worldspawn?

### First things first... What _IS_ Worldspawn?

[As mentioned before](guide_fgd.html#DefaultEntities), FuncGodot comes with a set of example Entity Definitions, including one for the _worldspawn_ class that comes built-in to every Quake map file. But what _is_ **worldspawn**?

Every Quake map file contains a list of entities containing a set of key value pairs. Some optionally include brush definitions. In Quake, the entity's **classname** is also the spawn function that is called upon map start. The very first entity that needs to load is the world, so entity 0 is always **worldspawn**. There can also only ever be one Worldspawn in a Quake map (with one weird exception I'll mention later).

Simply put, Worldspawn is just another entity. It's not even a Solid Entity by default. It needs to be defined in your FGD just like any other entity, too, or else it will revert to a simple _Node3D_ with a mesh and no collision. The only special behavior Worldspawn has is that its position will _always_ be the FuncGodotMap's position, unlike other Solid Entities.

The example Worldspawn entity is defined as a Solid Class StaticBody3D with convex collision, and the general understanding is that it's a built in mechanic of FuncGodot. Some of you need to have your stage geometry cut up for occlusion or per-collider purposes. In Tim's game [_They Came From Dimension X_](https://store.steampowered.com/app/2115890/They_Came_From_Dimension_X/), worldspawn was changed into a [WorldEnvironment](class_worldenvironment.md) that instantiates a [LightmapGI](class_lightmapgi.md) while also handling default music playback and other map-wide settings. You might think of a completely different use case for it.

> _NOTE: Setting Worldspawn as a Point Class may have undefined side effects due to being able to place a second Worldspawn in your map. It is recommended that any Worldspawn definition be a Solid Class._

_So why not Worldspawn?_

## Occlusion Culling

Performance on larger or heavily populated maps mostly. [Godot culls objects by the VisualInstance](occlusion_culling.md); in the case of our maps, this means mesh by mesh. In order to get better performance we'll need to split our map up into smaller chunks.

Meshes are generated on a per-entity basis: every brush in a Solid Entity is merged into a single mesh. Since Worldspawn is an entity, any brush that is a part of Worldspawn gets merged into the same mesh. If we want to split up our mesh, we need to split our Worldspawn into separate entities.

Remember: [FuncGodot is not a BSP compiler](start.html#FuncGodotIsNotABspCompiler). This means mapping for Godot like you're mapping for Quake is counterproductive. Instead, make sure you give some thought to how you'll split up your geometry entities, and how the brush vertices meet with each other. In exchange for full automation, FuncGodot instead gives you full control.

## Surface "Materials"

A common question a lot of Godot devs have is _how do I get the texture of the surface my character is stepping on or shooting?_ and the answer is... you don't! Well, the short answer anyway. Since Godot's CollisionObjects are completely separate from the MeshInstance3Ds, there's no real good performant way to actually do it surface by surface. Any possible solutions that involve getting the stage mesh's texture on a particular face are just not worth it. But why work against the engine when you can work _with_ it?

If we can control how our stage geometry is split up, we can also provide that stage geometry with key value properties, including one that supplies a _Material Type_ that can easily be passed to any character stepping on or shooting it. This is something that can't be done with a singular Worldspawn entity.

## How Do I Live Without Worldspawn?

You'll want to create a [Solid Class entity](ref_fgd_resources.html#Solid) that matches the _Worldspawn_ entity definition. It's recommended that you change the _Spawn Type_ to **ENTITY** though. Feel free to also add any _Class Properties_ you feel would benefit your game's design. The world geometry solid class entity used in Tim's games is typically called **func\_geo**. He never shuts up about it.

## A World Alongside Worldspawn

It would also help to create your own new _worldspawn_ entity definition that doesn't build visuals or collision, so that you can more easily tell if that stage geometry was given its own _func\_geo_ or was accidentally left as worldspawn. Keep in mind that a Quake map file's first entity will always be _worldspawn_, and that all map editors will only allow you to have one that they make automatically.

With that in mind... why not a _WorldEnvironment_? Let's take a look at an example of how you might repurpose a Worldspawn for one.

In TrenchBroom we can have our \`worldspawn\` settings set up like this in our FGD. We're assuming you know how this is done by now, but if not [please go back and reread the section on Entities](guide_fgd.html#EntityClass) near the beginning of the manual.

![](./images/tips_worldspawn_env1.png)  

Then in Godot, when the map is built and the Worldspawn's `func_godot_properties` dictionary is set, it runs the `_func_godot_apply_properties(props)` method.

```
@tool
extends WorldEnvironment
class_name Worldspawn

const LIGHT_LAYER_MASK: int = 31

@export var func_godot_properties: Dictionary = {}

func _func_godot_apply_properties(props: Dictionary) -> void:
	# WORLD ENVIRONMENT
	var env: Environment = Environment.new()
	# Base settings
	env.set_fog_enabled(false);
	env.set_tonemapper(Environment.TONE_MAPPER_FILMIC)
	env.set_glow_enabled(false)
	# Background
	env.set_background(Environment.BG_COLOR);
	if props.has("color_bg"):
		env.set_bg_color(props["color_bg"]);
	else:
		env.set_bg_color(Color());
	# Ambient light
	env.set_ambient_source(Environment.AMBIENT_SOURCE_COLOR);
	if props.has("color_ambient"):
		env.set_ambient_light_color(props["color_ambient"]);
	else:
		env.set_ambient_light_color(Color.hex(0xFFFFFFFF));
	if props.has("ambient_light"):
		env.set_ambient_light_energy(props["ambient_light"]);
	else:
		env.set_ambient_light_energy(0.0);
	env.set_ambient_light_sky_contribution(0.0)
	# Brightness setup
	env.set_adjustment_enabled(true)
	env.set_adjustment_brightness(1.0)
	set_environment(env)
```

It doesn't stop there, by the way. You may have noticed a number of key value pairs in our TrenchBroom entity: _lit\_bounces_, _lit\_denoiser_, etc... Instead of manually creating the lightmap for each map, we can have our Worldspawn entity programmatically create and modify the _LightmapGI_ node any time the map is built. To do this, we'll use the `_func_godot_build_complete()` method, automatically called as a deferred call at the end of the build process.

```
func _func_godot_build_complete() -> void:
	# Find existing lightmap, else build a new one
	var lit: LightmapGI
	if get_owner().has_node("lightmap"):
		lit = get_owner().get_node("lightmap")
	else:
		lit = LightmapGI.new()
		lit.set_name("lightmap")
		get_owner().add_child(lit)
		lit.set_owner(get_owner())
	lit.get_parent().call_deferred("move_child", lit, 0);
	lit.set_layer_mask(LIGHT_LAYER_MASK)
	# Bake Quality
	if func_godot_properties.has("lit_quality"):
		lit.set_bake_quality(func_godot_properties["lit_quality"] as LightmapGI.BakeQuality)
	else:
		lit.set_bake_quality(LightmapGI.BakeQuality.BAKE_QUALITY_MEDIUM);
	# Bounces
	if func_godot_properties.has("lit_bounces"):
		lit.set_bounces(func_godot_properties["lit_bounces"] as int)
	else:
		lit.set_bounces(3);
	# Lightmapper Probes Subdivision
	if func_godot_properties.has("lit_probes_subdiv"):
		lit.set_generate_probes(func_godot_properties["lit_probes_subdiv"] as LightmapGI.GenerateProbes)
	else:
		lit.set_generate_probes(LightmapGI.GenerateProbes.GENERATE_PROBES_SUBDIV_8);
	# Use Denoiser
	if func_godot_properties.has("lit_denoiser"):
		lit.set_use_denoiser(func_godot_properties["lit_denoiser"] as bool);
	else:
		lit.set_use_denoiser(true);
```

That's right: during the build process you can have your entities' properties affect other entities or nodes outside of the FuncGodotMap node. This is somewhat advanced Godot scripting, as you do need to understand a bit more about when objects will exist in the SceneTree, but it's an extremely powerful tool at your disposal.

Hopefully this little essay asking you to question the role of Worldspawn has gotten you thinking a bit more outside the box in regards to what you can do with FuncGodot. Be sure to join our Discord community and let us know what you did with _your_ Worldspawn!