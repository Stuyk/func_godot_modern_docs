FuncGodot Manual  

# Textures

## How Textures Work In FuncGodot

If you take a look at a _.map_ file, you'll see that it's just a text file describing the makeup of your map and doesn't actually store any other data, including texture images. Let's look at this example of a _Solid Entity_ in a map file:

![Solid Entity Example](./images/guide_tex_solident.png)

> `// entity 1   {   "classname" "func_detail"   // brush 0   {   ( -32 -64 -16 ) ( -32 -63 -16 ) ( -32 -64 -15 ) __TB_empty [ 0 -1 0 0 ] [ 0 0 -1 0 ] 0 1 1   ( -64 -32 -16 ) ( -64 -32 -15 ) ( -63 -32 -16 ) __TB_empty [ 1 0 0 0 ] [ 0 0 -1 0 ] 0 1 1   ( -64 -64 -32 ) ( -63 -64 -32 ) ( -64 -63 -32 ) special/clip [ -1 0 0 0 ] [ 0 -1 0 0 ] 0 1 1   ( 64 64 32 ) ( 64 65 32 ) ( 65 64 32 ) __TB_empty [ 1 0 0 0 ] [ 0 -1 0 0 ] 0 1 1   ( 64 32 16 ) ( 65 32 16 ) ( 64 32 17 ) special/clip [ -1 0 0 0 ] [ 0 0 -1 0 ] 0 1 1   ( 32 64 16 ) ( 32 64 17 ) ( 32 65 16 ) special/clip [ 0 1 0 0 ] [ 0 0 -1 0 ] 0 1 1   }   }   `

This is a _func\_detail_ entity from the default _FuncGodot.fgd_. As you can see, the map file structure is pretty straight-forward. This particular map uses the Valve 220 format, having additional options for UV mapping. Each line in a brush definition describes a face on the brush, and within that you can see that our texture is defined as just its location relative to the game's texture folder or map's WAD file.

_But if that's the case, how does FuncGodot know what file to use?_

[FuncGodot Map Settings](ref_func_godot_map.html#MapSettings) has several properties that help define and apply textures to your meshes on build:

*   **Base Texture Dir :** Root folder where your Godot map textures are located
  
*   **Texture File Extensions :** The extensions to search for if no matching material is found
  
*   **Texture Wads :** Array of WAD resources to search through
  
*   **Base Material Dir :** Root folder where your Godot map materials are located. If unspecified it falls back on _Base Texture Dir_.
  
*   **Material File Extension :** Format for custom texture materials, can be _.tres_, _.res_ or _.material_
  
*   **Default Material :** The default material that FuncGodot builds your map's materials from
  
*   **Default Material Albedo Uniform :** If the default material is a [ShaderMaterial](class_shadermaterial.md) rather than [StandardMaterial3D](class_standardmaterial3d.md), this is the shader uniform that provides the albedo texture
  
*   **Save Generated Materials :** Save automatically generated materials to disk, allowing reuse across multiple FuncGodot maps. FuncGodot will skip saving materials using clip, skip, or missing textures.  
    _NOTE: once saved, materials will no longer inherit from the_ Default Material_. If you want to make any changes to their settings you will have to either do so manually or delete the materials and allow FuncGodot to rebuild and resave them._

![FuncGodotMapSettings properties](./images/ref_func_godot_map_settings.png)

FuncGodot's first step is to search the _Base Material Dir_ for a prebuilt material as defined by the brush face's texture name in the format defined by _Material File Extension_.

If it does not find this prebuilt material, it will search the _Base Texture Dir_ for the _Texture2D_ resource by the brush face's texture name using any one of the extensions defined by _Texture File Extensions_. If it finds the Texture2D, it will create a copy of the _Default Material_ and apply the Texture2D as the duplicated material's albedo.

If it does not find the Texture2D, then it will use the _default\_texture.png_ found in the _addons/func\_godot/textures/_ folder.

![Default texture](./images/default_texture.png)

Once the material generation is completed, you can optionally have FuncGodot save generated materials so they can be reused by multiple FuncGodotMaps. Otherwise each FuncGodotMap will have its own unique material for each texture used in the map.

> _NOTE: If a Solid Entity definition's_ **Build Visuals** _property is set to_ `false`_, no materials will be generated._

## Automatic PBR / ORM Generation

You may have noticed that we skipped over a few settings before, all of them with the suffix "Map Pattern". When using a Default Material extending from [BaseMaterial3D](class_basematerial3d.md), FuncGodot has the ability to automatically generate PBR and ORM materials on build. Each of the "Map Pattern" properties tell FuncGodot's Texture Loader how to find each texture map for our material.

_What's with all the %s everywhere?_

It's a placeholder token that gets replaced during texture loading. Each pattern requires two _%s_ tokens. The first token is for the texture's name as it appears in the map file. The second token is for the file extension; this is replaced as the Texture Loader cycles through the Map Settings' Texture File Extensions searching for your texture. So if Texture Loader is looking for the normal map of a texture entry named "rock" and our Map Settings' Normal Map Pattern is "%s\_normal.%s" and it is currently checking for the "png" Texture File Extension, then it will be looking to see if the texture resource "rock\_normal.png" exists, and if so it will be applied to the Map Settings' Default Material if it is a StandardMaterial3D.

FuncGodot will look for PBR / ORM texture maps in both the same folder as the texture applied in the map file, or it will look in a subfolder with the same name. As an example: a brush is applied with the "textures/rock" texture in TrenchBroom, FuncGodot will first look for "textures/rock\_normal.png" and then check "textures/rock/rock\_normal.png".

## Shader Material Uniform Mapping

So you've decided to use a [ShaderMaterial](class_shadermaterial.md) with a custom GDShader. FuncGodot has the ability to automatically assign textures to your shader uniforms when generating ShaderMaterials on build through the use of the use of Map Settings' _shader\_material\_uniform\_map\_patterns_ Dictionary.

The dictionary is fairly straightforward: add your shader's uniforms as the dictionary's keys, while your values are the naming patterns for that uniform's textures. Unlike Automatic PBR generation, you only use one placeholder token, used for the base texture's name. An example of an entry would be a key "normal\_map" paired with a value "%s\_n"; if FuncGodot finds a texture named "textures/brick.png", it will then search for "textures/brick\_n.png" and assign it to the generated ShaderMaterial's "normal\_map" uniform.

> _NOTE: When using PBR materials with TrenchBroom, remember that you can add _Texture Exclusion Patterns_ to the TrenchBroom Game Config to hide specific textures in the editor._

## Clip and Skip Textures

### Mapping for ~~Quake~~ Godot

We started off this manual with the point that [FuncGodot is _not_ a BSP compiler](start.html#FuncGodotIsNotABspCompiler). If we map like we do in traditional Quake mapping...

![](./images/guide_tex_bsp1.png) ![](./images/guide_tex_notbsp1.png)

... we don't get the same result.

![](./images/guide_tex_bsp2.jpg) ![](./images/guide_tex_notbsp2.png)

Instead we need to change our approach.

For those not familiar with traditional Quake mapping, the finished MAP gets compiled into a BSP file to be read by the engine. The compiling process calculates visibility between all of the rooms of your map and removes all faces that won't be viewed due to being outside the map. That means maps must be sealed completely, but you're also allowed to be lazy with brush texturing since if a face is "outside" the map it will get culled.

With Godot we need to think of these brushes as what they'll become in-engine: composited [MeshInstance3Ds](class_meshinstance3d.md) and [CollisionShape3Ds](class_collisionshape3d.md). If we want to achieve the culled result on the left, we'll need to change the way we do things on the right.

### Skip It

![Clip texture](./images/clip.png) ![Skip texture](./images/skip.png)

The **Clip** and **Skip** textures are arguably our most important textures when mapping for Godot. You can assign any texture's name to the Clip and Skip properties of the FuncGodotMapSettings resource. But what do they do?

The Clip texture will remove any face textured with it from the generated _MeshInstance3D_. The Skip texture behaves the same way if the Solid Entity's Collision Type is set to _Convex_. However, if the Solid Entity's Collision Type is set to _Concave_, this also removes the Skip textured faces from the generated [CollisionPolygonShape3D](class_collisionpolygon3d.md).

Just keep in mind the general rule of thumb: if you want your entities to collide with the brush, use Clip...

![](./images/guide_tex_clip_example.png) ![](./images/guide_tex_clip_example2.png)

... and if you want them to pass through, use Skip (with Concave collision).

![](./images/guide_tex_skip_example.png) ![](./images/guide_tex_skip_example2.png)

## The Origin Texture

![Origin texture](./images/origin.png)

In Half-Life mapping, some entities like rotating doors require an **origin brush** to determine where the hinge should be. FuncGodot provides a means to emulate this behavior using a special origin texture. Just like Clip and Skip, the Origin texture is assigned by the FuncGodotMapSettings resource.

To use it, first you must set your Solid Entity class resource **origin type** to _BRUSH_. Then in your map editor, create your brush entity as you normally would. Once you've done that, add an additional brush to your entity, move it to where you want the entity's pivot point to be, and texture it with the Origin texture.

Once you build the map in Godot, your entity should now have its pivot point set to the center of where the Origin brush was in the map file, and the Origin brush is removed.

![](./images/guide_tex_org1.png) ![](./images/guide_tex_org2.png)

One last note: if you don't create an Origin brush on a Solid Entity with the _BRUSH_ origin type, it will fall back to using the [BOUNDS\_CENTER origin type](ref_fgd_resources.html#Solid).

## WAD Files

FuncGodot provides the option to use [Texture WAD files](https://quakewiki.org/wiki/Texture_Wad) for your map materials. It's generally not recommended if it can be helped, but support for loose texture images varies from map editor to map editor. FuncGodot supports both the Quake WAD2 format and the Half-Life WAD3 format.

To use a WAD file with your [FuncGodotMap](ref_func_godot_map.md) just add your imported WAD resource to the map node's _Texture Wads_ array.

The neat thing about how FuncGodot handles map textures is that we can technically use a completely different folder in TrenchBroom and even different image formats than the location and formats we keep them in Godot. This can be useful for advanced users, but you may want to just keep all of your textures unified.

## _Why Are My Textures Blurry!?_

You may be encountering at least one of two issues: texture compression and / or material sampling settings.

Make sure your texture resource is set to either _Lossless_ or _VRAM uncompressed_. Please refer to the Godot documentation on [texture compression](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_images.html#compress-mode).

If you had created your own materials for your map, check that the material's or texture's _Sampling Filter_ is set to **_Nearest Mipmap_**. Please refer to the Godot documentation on [texture filtering](https://docs.godotengine.org/en/stable/classes/class_basematerial3d.html#enum-basematerial3d-texturefilter).