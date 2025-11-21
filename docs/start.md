FuncGodot v2025.8 Manual  

# ![FuncGodot Ranger](./images/godot_ranger.svg)  
What _IS_ FuncGodot?

[**FuncGodot**](https://github.com/func-godot/func_godot_plugin) is a plugin for [**Godot 4**](https://godotengine.org/) that allows users to generate Godot scenes using the [**Quake MAP file format**](https://quakewiki.org/wiki/Quake_Map_Format). Map files can be made in a variety of editors, the most commonly recommended one being [**TrenchBroom**](https://trenchbroom.github.io/). It is a reworking and rewrite of the [**Qodot**](https://github.com/QodotPlugin/Qodot) plugin for Godot 3 and 4.

### _It is _not_ a framework._

FuncGodot will not make your game for you. FuncGodot does not make doors, it does not make players, it does not make buttons. _You_ make the entities and FuncGodot will instantiate them and apply the properties you gave to them in your map file and entity definitions: the rest is up to you.

### _It is _not_ a BSP Compiler._

FuncGodot does not compile maps into BSP files. It has no concept of vis, no concept of lit, no concept of bsp. It will not automatically cull faces. Godot does not work like the early BSP engines. You cannot use FuncGodot to map for Godot the same way you map for Quake. What you map is what you get. This makes it more consistent and reliable than a compiled BSP, since you get to choose what faces get culled, how your mesh is separated, and how your collision is generated.

### _FuncGodot is, at its core, an _interpreter_._

FuncGodot is a map parser and geometry generator, utilizing entity definition resources in order to translate map files' entities and their properties into Godot nodes and packed scenes. It can be used for purposes as simple as only generating CSG geometry from the map file to purposes as complex as completing your entire level in your chosen map editor and only needing to click build in Godot. How much FuncGodot builds for you is dependent on how much work you put into defining how to build your maps. What you put in is what you get out.

Understanding this concept will hopefully put you on the right path forward to being able to use this wonderfully flexible tool to make some incredible games.

This manual assumes an intermediate to advanced level of experience with the Godot Engine and your map editor of choice. This manual will only cover them insofar as how they relate to the FuncGodot work flow.

  

# ![Godambler](./images/godambler.svg)  
Who _MADE_ FuncGodot?

FuncGodot was created by [**Hannah "Embyr" Crawford**](https://github.com/EMBYRDEV), [**Emberlynn Bland**](https://github.com/DeerTears), and [**Tim "RhapsodyInGeek" Maccabe**](https://github.com/RhapsodyInGeek), [**Vera "sinewavey" Lux**](https://github.com/sinewavey), reworked from the [Godot 4 port of Qodot](https://github.com/QodotPlugin/Qodot/tree/main) by Embyr, with contributions from members of the FuncGodot, Qodot, Godot, and Quake Mapping Communities.

Both plugins are based on the original [Qodot for Godot 3.5](https://github.com/QodotPlugin/qodot-plugin/) created by [**Josh "Shifty" Palmer**](https://github.com/Shfty).